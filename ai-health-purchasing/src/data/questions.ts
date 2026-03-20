import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: 1,
    question: "你现在最想改善的是什么？",
    options: [
      { value: "healthy", label: "吃得更健康一点" },
      { value: "lose_weight", label: "想减脂 / 控制体重" },
      { value: "stable_blood_sugar", label: "想稳定血糖 / 少吃得忽高忽低" },
      { value: "family_safe", label: "想给家人买更安心的食材" },
      { value: "less_additives", label: "想减少添加剂和加工食品" },
      { value: "slow_upgrade", label: "还说不清，只是想从日常开始慢慢换好" },
    ],
  },
  {
    id: 2,
    question: "你的生活更像下面哪一种？",
    options: [
      { value: "busy_worker", label: "工作忙，没太多时间研究" },
      { value: "cook_often", label: "经常做饭，愿意慢慢升级食材" },
      { value: "have_kids", label: "家里有孩子，想更安心一点" },
      { value: "solo_simple", label: "一个人住，希望简单省心" },
      { value: "quality_first", label: "比较看重品质，愿意认真选" },
      { value: "budget_sensitive", label: "预算也重要，希望花得值" },
    ],
  },
  {
    id: 3,
    question: "你现在最大的卡点是什么？",
    options: [
      { value: "dont_know_where_to_start", label: "不知道该先换什么" },
      { value: "too_many_choices", label: "选择太多，越看越乱" },
      { value: "dont_trust_marketing", label: '很多"健康产品"看不懂真假' },
      { value: "no_time", label: "没时间慢慢研究" },
      { value: "budget_pressure", label: "预算有限，怕一换就很贵" },
      { value: "hard_to_keep", label: "我知道一些，但很难长期坚持" },
    ],
  },
  {
    id: 4,
    question: "你通常怎么买？",
    options: [
      { value: "one_stop", label: "希望一次尽量买齐" },
      { value: "multi_platform", label: "愿意分 2–3 个地方买，只要值得" },
      { value: "random_buy", label: "平时想到什么买什么" },
      { value: "fixed_repurchase", label: "喜欢先从固定复购品类开始" },
      { value: "see_advice_first", label: "更想先看建议，再决定怎么买" },
    ],
  },
  {
    id: 5,
    question: "你最愿意先换哪一类？",
    options: [
      { value: "oil", label: "食用油" },
      { value: "seasoning", label: "调味品" },
      { value: "grains", label: "主食 / 杂粮" },
      { value: "drinks", label: "牛奶 / 饮品" },
      { value: "snacks", label: "零食" },
      { value: "produce", label: "蔬菜水果" },
      { value: "decide_for_me", label: "你帮我判断就好" },
    ],
  },
];
