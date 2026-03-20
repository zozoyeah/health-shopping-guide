export type Goal =
  | "healthy"
  | "lose_weight"
  | "stable_blood_sugar"
  | "family_safe"
  | "less_additives"
  | "slow_upgrade";

export type Lifestyle =
  | "busy_worker"
  | "cook_often"
  | "have_kids"
  | "solo_simple"
  | "quality_first"
  | "budget_sensitive";

export type PainPoint =
  | "dont_know_where_to_start"
  | "too_many_choices"
  | "dont_trust_marketing"
  | "no_time"
  | "budget_pressure"
  | "hard_to_keep";

export type PurchaseStyle =
  | "one_stop"
  | "multi_platform"
  | "random_buy"
  | "fixed_repurchase"
  | "see_advice_first";

export type FirstCategory =
  | "oil"
  | "seasoning"
  | "grains"
  | "drinks"
  | "snacks"
  | "produce"
  | "decide_for_me";

export type UserProfile = {
  goal: Goal;
  lifestyle: Lifestyle;
  painPoint: PainPoint;
  purchaseStyle: PurchaseStyle;
  firstCategory: FirstCategory;
};

export type PersonaResult = {
  personaTitle: string;
  personaDescription: string;
  recommendedCategoryIds: string[];
  recommendedPlatformIds: string[];
  shoppingStyleAdvice: string;
  first14DayPlanId: string;
};

export type Platform = {
  id: string;
  name: string;
  roleLabel: string;
  summary: string;
  suitableFor: string[];
  strengths: string[];
  notIdealFor: string[];
  recommendedCategoryIds: string[];
  qrCode?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  oneLineConclusion: string;
  whyImportant: string;
  quickAdvice: string[];
  commonMistakes: string[];
  recommendedPlatformIds: string[];
  aiHints: string[];
};

export type AIResponseKey =
  | "budgetLimited"
  | "noTimeToResearch"
  | "wantToLoseWeight"
  | "haveKids"
  | "whichPlatformFirst"
  | "startWithMostImportant";

export type AIResponse = {
  key: AIResponseKey;
  label: string;
  response: string;
  followUpOptions?: string[];
};

export type PlanWeek = {
  week: number;
  title: string;
  whyThis: string;
  tasks: string[];
  recommendedPlatformIds: string[];
  avoidNow: string[];
};

export type Plan = {
  id: string;
  title: string;
  intro: string[];
  weeks: PlanWeek[];
  nextUp: string[];
};

export type Question = {
  id: number;
  question: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
};

export type TransitionMessage =
  | "recognizing"
  | "narrowing"
  | "matching"
  | "preparing";

// Order types
export type OrderMode = "trial" | "annual";

export type RiceOrder = {
  productId: string;
  mode: OrderMode;
  variantId?: string;
  quantity: number;
  createdAt: string;
  annualType?: "single" | "multi" | "random";
};

// Replenishment types
export type ReplenishmentStatus = "normal" | "due_soon" | "due_now" | "postponed";

export type ReplenishmentAction = "confirm" | "postpone" | "skip";

export type ReplenishmentUnit = {
  productId: string;
  productName: string;
  variantLabel: string;
  lastOrderDate?: string;
  averageCycleDays?: number;
  bufferDays?: number;
  nextSuggestedDate?: string;
  status: ReplenishmentStatus;
  sourceMode?: OrderMode;
  action?: ReplenishmentAction;
  actionDate?: string;
};

// Product types
export type ProductVariant = {
  id: string;
  name: string;
  sizeKg: number;
  price: number;
  pricePerKg: number;
  platform: string;
  origin: string;
  description: string;
  notes?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  variants: ProductVariant[];
  aiAdvice: string;
  recommendedFor: string[];
};
