import { UserProfile, PersonaResult, RiceOrder, ReplenishmentUnit } from "@/types";

const STORAGE_KEYS = {
  USER_PROFILE: "ai-health-purchasing:user-profile",
  PERSONA_RESULT: "ai-health-purchasing:persona-result",
  ONBOARDING_STEP: "ai-health-purchasing:onboarding-step",
  RICE_ORDER: "ai-health-purchasing:rice-order",
  REPLENISHMENT_UNIT: "ai-health-purchasing:replenishment-unit",
} as const;

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save user profile:", e);
  }
}

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error("Failed to get user profile:", e);
    return null;
  }
}

export function savePersonaResult(result: PersonaResult): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PERSONA_RESULT, JSON.stringify(result));
  } catch (e) {
    console.error("Failed to save persona result:", e);
  }
}

export function getPersonaResult(): PersonaResult | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PERSONA_RESULT);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error("Failed to get persona result:", e);
    return null;
  }
}

export function saveOnboardingStep(step: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_STEP, step.toString());
  } catch (e) {
    console.error("Failed to save onboarding step:", e);
  }
}

export function getOnboardingStep(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ONBOARDING_STEP);
    return stored ? parseInt(stored, 10) : 0;
  } catch (e) {
    console.error("Failed to get onboarding step:", e);
    return 0;
  }
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (e) {
    console.error("Failed to clear data:", e);
  }
}

// Rice Order functions
export function saveRiceOrder(order: RiceOrder): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.RICE_ORDER, JSON.stringify(order));
  } catch (e) {
    console.error("Failed to save rice order:", e);
  }
}

export function getRiceOrder(): RiceOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RICE_ORDER);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error("Failed to get rice order:", e);
    return null;
  }
}

// Replenishment unit functions
export function saveReplenishmentUnit(unit: ReplenishmentUnit): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.REPLENISHMENT_UNIT, JSON.stringify(unit));
  } catch (e) {
    console.error("Failed to save replenishment unit:", e);
  }
}

export function getReplenishmentUnit(): ReplenishmentUnit | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REPLENISHMENT_UNIT);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error("Failed to get replenishment unit:", e);
    return null;
  }
}

export function clearReplenishmentData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.RICE_ORDER);
    localStorage.removeItem(STORAGE_KEYS.REPLENISHMENT_UNIT);
  } catch (e) {
    console.error("Failed to clear replenishment data:", e);
  }
}
