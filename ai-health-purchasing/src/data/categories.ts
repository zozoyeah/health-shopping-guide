import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "oil",
    name: "食用油",
    icon: "🫒",
    oneLineConclusion: "日常炒菜用双低菜籽油，凉拌用特级初榨橄榄油，就够了。",
    whyImportant:
      "天天都用，对全家健康影响大。比起偶尔买贵价食物，先把家里天天用的油换好，更有价值。",
    quickAdvice: [
      "日常炒菜 → 双低菜籽油（性价比高、烟点高）",
      "凉拌 → 特级初榨橄榄油（营养保留多）",
      "一开始不要囤太多种类",
    ],
    commonMistakes: [
      "一开始囤太多种油",
      '把"更健康"理解成"买越贵越好"',
      "忽视油的储存条件",
    ],
    recommendedPlatformIds: ["pulan", "lvzhishou"],
    aiHints: [
      "先从一瓶开始试点",
      "用完再换新的，不要浪费",
      "选物理压榨工艺的",
    ],
  },
  {
    id: "seasoning",
    name: "调味品",
    icon: "🧂",
    oneLineConclusion: "先换酱油和醋，看配料表里有没有糖、添加剂、味精。",
    whyImportant:
      "容易被忽略，但其实使用频率很高。升级空间大，很多'健康'调味品其实并不健康。",
    quickAdvice: [
      "配料表越短越好",
      "酱油看氨基酸态氮含量",
      "醋选酿造醋而非配制醋",
      "先从最常用的酱油和醋开始",
    ],
    commonMistakes: [
      "儿童酱油不一定更健康",
      "零添加不等于完全没有问题",
      "价格高不等于品质好",
    ],
    recommendedPlatformIds: ["pulan", "yimi"],
    aiHints: [
      "先换1-2种，不要一次性全换厨房",
      "关注配料表前三位",
      "注意钠含量",
    ],
  },
  {
    id: "grains",
    name: "主食杂粮",
    icon: "🌾",
    oneLineConclusion: "优先选真空包装的糙米/燕麦米，看产区和生产日期。",
    whyImportant:
      "膳食纤维是健康饮食的关键，但现代人摄入严重不足。主食是每天都会吃的基础食物。",
    quickAdvice: [
      "从每周1-2次糙米饭开始",
      "不用一下子全部替换",
      "选真空包装，保鲜效果好",
    ],
    commonMistakes: [
      "认为必须全部换成粗粮",
      "忽视主食的储存条件",
      "一次买太多导致过期",
    ],
    recommendedPlatformIds: ["yimi", "pulan", "yungu"],
    aiHints: [
      "从一周1-2次开始",
      "糙米需要提前浸泡",
      "混合白米一起煮口感更好",
    ],
  },
  {
    id: "drinks",
    name: "牛奶/饮品",
    icon: "🥛",
    oneLineConclusion: "巴氏奶比常温奶保留更多活性蛋白。",
    whyImportant: "家庭刚需，营养差异大，品质容易感知。",
    quickAdvice: [
      "巴氏奶 → 需要冷藏，保质期短",
      "常温奶 → 可囤货，方便",
      "看蛋白质和钙含量",
    ],
    commonMistakes: [
      "认为进口奶一定更好",
      "忽视乳糖不耐受问题",
      "把含乳饮料当牛奶",
    ],
    recommendedPlatformIds: ["lvzhishou", "yimi"],
    aiHints: [
      "蛋白质≥3.0g/100ml较好",
      "巴氏奶营养更好",
      "乳糖不耐可选舒化奶",
    ],
  },
  {
    id: "snacks",
    name: "零食",
    icon: "🍪",
    oneLineConclusion: "配料表越短越好，添加剂越多越要避免。",
    whyImportant: "偶尔消费但对健康有影响，选择不当容易热量超标。",
    quickAdvice: [
      "配料表越短越好",
      "添加剂越少越好",
      "优先选坚果、水果干等天然零食",
    ],
    commonMistakes: [
      '认为"健康零食"一定健康',
      "忽视隐形糖和盐",
      "一次买太多",
    ],
    recommendedPlatformIds: ["pulan", "yimi", "lvzhishou"],
    aiHints: [
      "先从减少频率开始",
      "用完再买，不要囤",
      "关注配料表而非广告词",
    ],
  },
  {
    id: "produce",
    name: "蔬菜水果",
    icon: "🥬",
    oneLineConclusion: "选当季本地菜，不用非追求有机。",
    whyImportant: "高频消费，季节性强，选择复杂度高。",
    quickAdvice: [
      "选当季蔬菜",
      "本地菜更新鲜",
      "不用非追求有机",
    ],
    commonMistakes: [
      "认为有机一定更营养",
      "忽视季节性",
      "一次买太多吃不完",
    ],
    recommendedPlatformIds: ["liangren", "baiouhuan", "yungu"],
    aiHints: [
      "当季的最好吃也最便宜",
      "本地新鲜蔬菜不比有机的差",
      "一次少买，勤买",
    ],
  },
];
