#!/usr/bin/env python3
"""
PDF 读取工具 - 支持文本型PDF和扫描型PDF
使用方法: python pdf_reader.py <pdf文件路径> [起始页] [结束页]

依赖安装:
- 文本型PDF: pip3 install pymupdf
- 扫描型PDF: brew install poppler && pip3 install pdf2image paddleocr pillow
"""

import sys
import os

def install_dependencies(ocr_mode=False):
    """安装依赖"""
    print("安装必要库...")
    os.system("pip3 install pymupdf -q")
    if ocr_mode:
        os.system("pip3 install pdf2image paddleocr pillow -q")
        print("请手动安装 poppler: brew install poppler")

def read_text_pdf(pdf_path, start_page=1, end_page=None):
    """读取文本型PDF"""
    import fitz

    doc = fitz.open(pdf_path)
    total = len(doc)

    if end_page is None:
        end_page = total

    print(f"\n=== {pdf_path} (共{total}页) ===")
    print(f"=== 显示第 {start_page}-{end_page} 页 ===\n")

    for i in range(start_page - 1, min(end_page, total)):
        page = doc[i]
        text = page.get_text().strip()

        if text:
            print(f"\n--- 第 {i+1} 页 ---")
            # 清理并显示文本
            lines = [l for l in text.split('\n') if l.strip()]
            for line in lines[:50]:  # 每页最多显示50行
                print(line)
            if len(lines) > 50:
                print(f"... (还有{len(lines)-50}行)")
        else:
            print(f"\n--- 第 {i+1} 页 ---")
            print("[此页无文本，可能是扫描版]")

    doc.close()

def read_scanned_pdf(pdf_path, start_page=1, end_page=None):
    """读取扫描型PDF (需要OCR)"""
    from pdf2image import convert_from_path
    from paddleocr import PaddleOCR

    # 检查 poppler
    if not os.system("which pdftoppm > /dev/null 2>&1"):
        print("错误: poppler 未安装")
        print("请运行: brew install poppler")
        return

    # 初始化 OCR
    print("初始化 PaddleOCR (首次运行需要下载模型，请稍候)...")
    ocr = PaddleOCR(use_textline_orientation=True, lang='ch')

    # 获取总页数
    import fitz
    doc = fitz.open(pdf_path)
    total = len(doc)
    doc.close()

    if end_page is None:
        end_page = min(start_page + 4, total)  # 默认读5页

    print(f"\n=== {pdf_path} (共{total}页) ===")
    print(f"=== OCR识别第 {start_page}-{end_page} 页 ===\n")

    # 逐页转换和识别
    for page_num in range(start_page, end_page + 1):
        print(f"\n--- 第 {page_num} 页 ---")
        try:
            images = convert_from_path(
                pdf_path,
                first_page=page_num,
                last_page=page_num,
                dpi=200
            )

            result = ocr.ocr(images[0], cls=True)

            if result and result[0]:
                for line in result[0][:30]:
                    print(line[1][0])
            else:
                print("[未识别到内容]")

        except Exception as e:
            print(f"[识别失败: {e}]")

def detect_pdf_type(pdf_path):
    """检测PDF类型"""
    import fitz

    doc = fitz.open(pdf_path)

    # 检查前10页是否有文本
    for i in range(min(10, len(doc))):
        page = doc[i]
        text = page.get_text().strip()
        if text and len(text) > 50:
            doc.close()
            return "text"

    doc.close()
    return "scanned"

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        print("\n示例:")
        print("  python pdf_reader.py document.pdf          # 读取前5页")
        print("  python pdf_reader.py document.pdf 1 10    # 读取1-10页")
        print("  python pdf_reader.py document.pdf 50 60    # 读取50-60页")
        sys.exit(1)

    pdf_path = sys.argv[1]
    start_page = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    end_page = int(sys.argv[3]) if len(sys.argv) > 3 else None

    if not os.path.exists(pdf_path):
        print(f"错误: 文件不存在: {pdf_path}")
        sys.exit(1)

    # 检测类型
    print(f"检测 PDF 类型...")
    pdf_type = detect_pdf_type(pdf_path)
    print(f"PDF 类型: {pdf_type} 型")

    if pdf_type == "text":
        read_text_pdf(pdf_path, start_page, end_page)
    else:
        read_scanned_pdf(pdf_path, start_page, end_page)

if __name__ == "__main__":
    main()
