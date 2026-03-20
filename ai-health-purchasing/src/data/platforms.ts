import { Platform } from "@/types";

export const platforms: Platform[] = [
  {
    id: "pulan",
    name: "朴门星球",
    roleLabel: "厨房基础款补货站",
    summary: "帮你把厨房基础打好",
    suitableFor: [
      "想先从油和调味品开始升级的人",
      "注重性价比的人",
      "希望买得安心但不想太贵的人",
    ],
    strengths: [
      "油品全、性价比高",
      "调味品强项",
      "包装环保",
      "选品逻辑贴近日常健康实践",
    ],
    notIdealFor: [
      "追求超丰富蔬果选择",
      "需要一站式购齐生鲜",
    ],
    recommendedCategoryIds: ["oil", "seasoning", "grains"],
    qrCode: "/images/qr/pulan.jpg",
  },
  {
    id: "lvzhishou",
    name: "绿手指",
    roleLabel: "品质严选综合站",
    summary: "帮你挑好的，你不用懂",
    suitableFor: [
      "品质优先的人",
      "愿意为好产品付溢价",
      "相信认证体系",
    ],
    strengths: [
      "品质有保障",
      "认证体系完善",
      "综合型、高品质",
      "牛奶和肉类强项",
    ],
    notIdealFor: [
      "预算极其有限",
      "追求极致性价比",
    ],
    recommendedCategoryIds: ["oil", "drinks", "produce", "snacks"],
    qrCode: "/images/qr/lvzhishou.png",
  },
  {
    id: "qianyi",
    name: "谦益农业",
    roleLabel: "生态主食专供",
    summary: "生态种植，安心主食",
    suitableFor: [
      "注重主食品质的人",
      "喜欢生态食材",
      "想尝试特色大米杂粮",
    ],
    strengths: [
      "生态种植",
      "主打大米杂粮",
      "产品种类丰富",
      "价格适中",
    ],
    notIdealFor: [
      "追求一站式购齐所有品类",
      "只买蔬果生鲜",
    ],
    recommendedCategoryIds: ["grains", "oil", "snacks"],
    qrCode: "/images/qr/qianyi.jpg",
  },
];
