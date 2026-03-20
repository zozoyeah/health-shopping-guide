import { AIResponse } from "@/types";

export const aiResponses: AIResponse[] = [
  {
    key: "budgetLimited",
    label: "我预算有限",
    response:
      "那我们更应该先换高频基础品类，而不是买很多看起来高级的东西。\n\n对你来说，先从食用油和最常用的调味品开始，通常比买零散的健康单品更值。\n\n朴门星球很适合你——性价比高，不会让你觉得'健康'= '贵'。",
    followUpOptions: [
      "那我先从哪个开始？",
      "食用油具体怎么选？",
      "我不想研究太多",
    ],
  },
  {
    key: "noTimeToResearch",
    label: "我不想研究太多",
    response:
      "很好，那我们就不要走'全懂了再买'的路线。\n\n你更适合先固定2个入口，先把最常用的3类买顺。\n\n我的建议是：朴门星球 + 一米市集，一个负责厨房基础，一个负责日常补货。你不用研究太多，看中就买。",
    followUpOptions: [
      "具体哪两个平台？",
      "我想先看看食用油",
      "我和顾问聊聊",
    ],
  },
  {
    key: "wantToLoseWeight",
    label: "我想减脂",
    response:
      "减脂的话，我会把重点放在更高频、更影响整体饮食结构的地方，而不是先带你看各种减肥产品。\n\n对你来说，更值得先看的通常是：\n\n1. 主食结构 —— 把部分白米换成糙米/燕麦\n2. 食用油 —— 用双低菜籽油代替部分动物油\n3. 调味习惯 —— 减盐减糖\n\n这些比买各种'减脂神器'实在多了。",
    followUpOptions: [
      "主食具体怎么换？",
      "食用油怎么选？",
      "给我一个14天方案",
    ],
  },
  {
    key: "haveKids",
    label: "家里有孩子",
    response:
      "那我会优先考虑高频，安全，执行难度低这三个维度。\n\n不一定要买最贵的，但会优先看那些适合长期稳定进入家庭餐桌的品类。\n\n对你来说：\n\n1. 食用油 —— 天天用，安全第一位\n2. 牛奶 —— 孩子成长需要\n3. 零食 —— 与其禁止，不如选更健康的替代\n\n绿手指 + 朴门星球的组合比较适合你——一个负责品质，一个负责性价比。",
    followUpOptions: [
      "孩子零食怎么选？",
      "牛奶怎么选？",
      "我该先买什么？",
    ],
  },
  {
    key: "whichPlatformFirst",
    label: "我该先看哪个平台",
    response:
      "这要看你想先从哪类开始：\n\n如果想先从油和调味品这种基础品类开始 → 朴门星球通常更顺\n\n如果想一次补更多综合型日常食材 → 一米市集会更省心\n\n如果追求品质，不在乎价格 → 绿手指\n\n如果想买当季新鲜蔬果 → 良人园子、百欧欢\n\n你更想先换哪类？",
    followUpOptions: [
      "我先从食用油开始",
      "我想一站式购齐",
      "我想买蔬果",
    ],
  },
  {
    key: "startWithMostImportant",
    label: "我只想先买最值得的",
    response:
      "那我们就把范围缩到最小：\n\n第一优先级：食用油\n- 天天都用，效果最明显\n- 一瓶油可以用一两个月\n\n第二优先级：调味品（酱油+醋）\n- 使用频率仅次于油\n- 换完这两个，你就已经比80%的家庭健康了\n\n先别想太多，把这两类跑顺了再说。",
    followUpOptions: [
      "食用油怎么选？",
      "酱油怎么选？",
      "好，我开始行动",
    ],
  },
];

export const quickPrompts = [
  { key: "budgetLimited", label: "💰 我预算有限" },
  { key: "noTimeToResearch", label: "😴 不想研究太多" },
  { key: "wantToLoseWeight", label: "🏃 想减脂" },
  { key: "haveKids", label: "👶 家里有孩子" },
  { key: "whichPlatformFirst", label: "🛒 该先看哪个平台" },
  { key: "startWithMostImportant", label: "🎯 先买最值得的" },
];
