import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "organic_rice",
    name: "有机大米",
    category: "主食杂粮",
    tagline: "家庭基础主食 | 适合长期常备 | 可加入智能补货",
    description:
      "先把每天都会吃到的基础食材固定下来，往往比零散买很多'健康单品'更重要。对很多家庭来说，先固定一种长期吃得安心的大米，比一次性研究很多品类更容易坚持。",
    variants: [
      {
        id: "wuchang-2.5kg",
        name: "五常大米",
        sizeKg: 2.5,
        price: 125,
        pricePerKg: 50,
        platform: "分享收获",
        origin: "黑龙江五常市杜家镇",
        description:
          "五常大米，有机种植，2025年新米。种植时间：第13个年头。真空包装。",
        notes: "种植负责人：崔海英（六婶）、刘金。保质期：真空包装后可保存6个月。",
      },
      {
        id: "eco-brown-5kg",
        name: "生态糙米",
        sizeKg: 5,
        price: 95,
        pricePerKg: 19,
        platform: "绿手指",
        origin: "浙江省衢州市常山县",
        description:
          "生态酵素稻米（糙米），嘉丰优二号品种。生态种植，不使用任何化学农药、化学肥料、除草剂。",
        notes: "生产者：梁万洪。保质期：12个月。",
      },
      {
        id: "eco-germ-5kg",
        name: "生态胚芽米",
        sizeKg: 5,
        price: 119,
        pricePerKg: 23.8,
        platform: "绿手指",
        origin: "浙江省衢州市常山县",
        description:
          "生态酵素稻米（胚芽米），嘉丰优二号品种。保留胚芽，营养更丰富。",
        notes: "生产者：梁万洪。保质期：12个月。夏季建议冷藏保存。",
      },
      {
        id: "deqing-white-2.5kg",
        name: "生态粳米（白米）",
        sizeKg: 2.5,
        price: 88,
        pricePerKg: 35.2,
        platform: "绿手指",
        origin: "浙江省湖州市德清县",
        description:
          "传统自然农耕种植，一年一季水稻，休耕时种植绿肥紫云英以养地。",
        notes: "生产者：王陆良。保质期：6个月。",
      },
      {
        id: "deqing-germ-2.5kg",
        name: "生态粳米（胚芽米）",
        sizeKg: 2.5,
        price: 88,
        pricePerKg: 35.2,
        platform: "绿手指",
        origin: "浙江省湖州市德清县",
        description:
          "传统自然农耕种植，一年一季水稻，保留胚芽营养。",
        notes: "生产者：王陆良。保质期：6个月。",
      },
      {
        id: "deqing-brown-2.5kg",
        name: "生态粳米（糙米）",
        sizeKg: 2.5,
        price: 88,
        pricePerKg: 35.2,
        platform: "绿手指",
        origin: "浙江省湖州市德清县",
        description:
          "传统自然农耕种植，一年一季水稻，糙米保留更多纤维。",
        notes: "生产者：王陆良。保质期：6个月。",
      },
      {
        id: "wuchang-eco-2.5kg",
        name: "生态五常大米（精米）",
        sizeKg: 2.5,
        price: 96,
        pricePerKg: 38.4,
        platform: "绿手指",
        origin: "黑龙江五常市七峰山林",
        description:
          "稻花香2号品种，有机方式种植，无化学投入物，人工除草，使用酵素、豆饼等肥料。",
        notes: "生产者：郭伟。质量等级：优质一等。保质期：1年。",
      },
    ],
    aiAdvice:
      "如果还在观察消耗节奏，可以先试一袋；如果已经确定适合，可以直接建立一年常备关系。一年份额不是一次发12袋，而是建立一年常备关系，后续按节奏分批补。",
    recommendedFor: [
      "想为家庭建立稳定基础主食的人",
      "注重食材来源和种植方式的人",
      "希望减少日常采购决策负担的人",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getVariantById(productId: string, variantId: string) {
  const product = getProductById(productId);
  return product?.variants.find((v) => v.id === variantId);
}
