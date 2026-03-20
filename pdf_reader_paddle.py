#!/usr/bin/env python3
"""
PDF 读取工具 - 使用 PaddleOCR + fitz
不需要 poppler，直接用 pymupdf 转图片

使用方法:
    python3 pdf_reader_paddle.py <pdf文件> [起始页] [结束页]

示例:
    python3 pdf_reader_paddle.py book.pdf              # 读取前5页
    python3 pdf_reader_paddle.py book.pdf 50 80       # 读取50-80页
"""

import sys
import os

# 安装依赖
def check_deps():
    try:
        import fitz
        from paddleocr import PaddleOCR
        import numpy as np
        return True
    except ImportError as e:
        print(f"缺少依赖: {e}")
        print("请运行: pip3 install pymupdf paddleocr numpy")
        return False

def read_pdf(pdf_path, start_page=1, end_page=None):
    import fitz
    from paddleocr import PaddleOCR
    import numpy as np

    doc = fitz.open(pdf_path)
    total = len(doc)

    if end_page is None:
        end_page = min(start_page + 4, total)

    # 初始化 OCR（只初始化一次，更快）
    print("初始化 PaddleOCR...")
    ocr = PaddleOCR(use_textline_orientation=True, lang='ch', verbose=False)

    print(f"\n=== {os.path.basename(pdf_path)} (共{total}页) ===")
    print(f"=== 读取第 {start_page}-{end_page} 页 ===\n")

    for i in range(start_page - 1, end_page):
        page = doc[i]
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))  # 1.5倍清晰度
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, 3)

        if img.shape[2] == 4:
            img = img[:, :, :3]

        result = ocr.predict(img)
        texts = result[0]['rec_texts']

        print(f"\n--- 第 {i+1} 页 ---")
        if texts:
            for t in texts:
                print(t)
        else:
            print("[无文字]")

    doc.close()

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    pdf_path = sys.argv[1]
    start = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    end = int(sys.argv[3]) if len(sys.argv) > 3 else None

    if not os.path.exists(pdf_path):
        print(f"文件不存在: {pdf_path}")
        sys.exit(1)

    if not check_deps():
        sys.exit(1)

    read_pdf(pdf_path, start, end)

if __name__ == "__main__":
    main()
