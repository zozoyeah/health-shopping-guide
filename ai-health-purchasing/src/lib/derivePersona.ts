import { UserProfile, PersonaResult, Goal, Lifestyle, PainPoint, PurchaseStyle, FirstCategory } from "@/types";
import { platforms } from "@/data/platforms";
import { categories } from "@/data/categories";

// 人画像标题映射
const personaTitles: Record<string, string> = {
  busy: "轻升级型采购者",
  cook: "品质成长型采购者",
  kids: "家庭守护型采购者",
  solo: "简单省心型采购者",
  quality: "品质理性型采购者",
  budget: "精打细算型采购者",
};

// 画像描述映射
const personaDescriptions: Record<string, string> = {
  busy: '你是一个"想吃得更好，但不想把生活搞复杂"的轻升级型采购者。忙碌是你的常态，但你也希望家人吃得健康。',
  cook: '你更像"忙碌但有判断力"的品质成长型采购者。你愿意花时间研究，但不需要被营销牵着走。',
  kids: '你是"愿意为家人付出但要花在刀刃上"的家庭守护型采购者。家人的健康是你最关心的。',
  solo: '你是一个"希望简单省心"的独自生活者。不需要太多复杂选项，够用就好。',
  quality: '你属于"愿意认真选，但不想被营销牵着走"的品质理性型用户。你有自己的判断标准。',
  budget: '你是一个"精打细算"的实用主义者。你希望每一分钱都花得值，不交"健康税"。',
};

// 购物风格建议映射
const shoppingStyleAdvices: Record<string, string> = {
  busy: "先固定2个入口（朴门星球+一米市集），先把基础品类跑顺，不需要一开始认识很多平台。",
  cook: "你可以从2-3个平台开始，先把高频品类买明白，再逐步扩展。",
  kids: "建议绿手指+朴门星球的组合，一个负责品质，一个负责性价比。",
  solo: "建议一个综合型平台（朴门星球或一米市集）就够了，不用太复杂。",
  quality: "建议绿手指+良人园子，重视品质的同时也有一些特色选择。",
  budget: "建议以朴门星球为主，它性价比最高，适合精打细算的家庭。",
};

// 获取基础画像类型
function getBasePersonaType(profile: UserProfile): string {
  const { lifestyle, painPoint, purchaseStyle, goal, firstCategory } = profile;

  // 有孩子家庭优先
  if (lifestyle === "have_kids") return "kids";

  // 忙碌上班族 + 一站式
  if (lifestyle === "busy_worker" && (purchaseStyle === "one_stop" || purchaseStyle === "see_advice_first")) {
    return "budget";
  }

  // 品质优先型
  if (lifestyle === "quality_first") return "quality";

  // 预算敏感型
  if (lifestyle === "budget_sensitive") return "budget";

  // 经常做饭
  if (lifestyle === "cook_often") return "cook";

  // 一个人住
  if (lifestyle === "solo_simple") return "solo";

  // 默认
  return "busy";
}

// 根据目标调整品类推荐
function adjustCategoriesByGoal(baseCategories: string[], goal: Goal): string[] {
  const categoryOrder = ["oil", "seasoning", "grains", "drinks", "snacks", "produce"];

  // 调整优先级
  if (goal === "lose_weight" || goal === "stable_blood_sugar") {
    // 减脂/控糖：主食优先
    return ["grains", "oil", "seasoning", "drinks", "snacks", "produce"];
  }

  if (goal === "family_safe") {
    // 家庭安全：油、奶、零食优先
    return ["oil", "drinks", "snacks", "seasoning", "grains", "produce"];
  }

  return baseCategories;
}

// 根据用户选择调整品类
function adjustCategoriesByChoice(baseCategories: string[], firstCategory: FirstCategory): string[] {
  if (firstCategory === "decide_for_me") {
    return baseCategories;
  }

  // 把用户选择的放到第一位
  const idx = baseCategories.indexOf(firstCategory);
  if (idx > 0) {
    const newOrder = [firstCategory, ...baseCategories.filter((c) => c !== firstCategory)];
    return newOrder;
  }

  return baseCategories;
}

// 根据画像类型获取平台推荐
function getRecommendedPlatforms(personaType: string, profile: UserProfile): string[] {
  const { lifestyle, purchaseStyle, painPoint } = profile;

  // 有孩子家庭
  if (lifestyle === "have_kids") {
    return ["lvzhishou", "pulan"];
  }

  // 品质优先
  if (lifestyle === "quality_first") {
    return ["lvzhishou", "liangren"];
  }

  // 预算敏感/忙碌
  if (lifestyle === "budget_sensitive" || lifestyle === "busy_worker") {
    return ["pulan", "yimi"];
  }

  // 经常做饭
  if (lifestyle === "cook_often") {
    return ["pulan", "liangren", "baiouhuan"];
  }

  // 默认
  return ["pulan", "yimi"];
}

// 主规则函数
export function derivePersona(profile: UserProfile): PersonaResult {
  const baseType = getBasePersonaType(profile);

  // 基础品类顺序
  let categoryOrder = ["oil", "seasoning", "grains", "drinks", "snacks", "produce"];
  categoryOrder = adjustCategoriesByGoal(categoryOrder, profile.goal);
  categoryOrder = adjustCategoriesByChoice(categoryOrder, profile.firstCategory);

  // 推荐品类（取前3个）
  const recommendedCategoryIds = categoryOrder.slice(0, 3);

  // 推荐平台
  const recommendedPlatformIds = getRecommendedPlatforms(baseType, profile);

  return {
    personaTitle: personaTitles[baseType] || "轻升级型采购者",
    personaDescription: personaDescriptions[baseType] || "你是一个想吃得更好，但不想把生活搞复杂的人。",
    recommendedCategoryIds,
    recommendedPlatformIds,
    shoppingStyleAdvice: shoppingStyleAdvices[baseType] || "先固定2个入口，先把基础品类跑顺。",
    first14DayPlanId: "light-upgrade-14",
  };
}

// 获取平台信息
export function getPlatformById(id: string) {
  return platforms.find((p) => p.id === id);
}

// 获取品类信息
export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
