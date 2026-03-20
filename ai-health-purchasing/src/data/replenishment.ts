import { ReplenishmentUnit, ReplenishmentAction } from "@/types";

// Default replenishment cycle for rice (in days)
export const DEFAULT_RICE_CYCLE_DAYS = 30;
export const DEFAULT_RICE_BUFFER_DAYS = 7;

export const replenismentMessages = {
  confirm: {
    title: "好的，这次按平时来",
    description: "有机大米 5kg 已加入本次补货安排",
  },
  postpone: {
    title: "好的，先晚一点",
    description: "我会把这次补货往后放一放",
  },
  skip: {
    title: "明白了，这次先不用",
    description: "这次我先不安排补货",
  },
};

export function calculateNextReplenishmentDate(
  lastOrderDate: string,
  cycleDays: number = DEFAULT_RICE_CYCLE_DAYS,
  bufferDays: number = DEFAULT_RICE_BUFFER_DAYS
): { nextDate: Date; status: "normal" | "due_soon" | "due_now" } {
  const lastDate = new Date(lastOrderDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + cycleDays);

  const today = new Date();
  const daysUntilNext = Math.floor(
    (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let status: "normal" | "due_soon" | "due_now";
  if (daysUntilNext <= 0) {
    status = "due_now";
  } else if (daysUntilNext <= bufferDays) {
    status = "due_soon";
  } else {
    status = "normal";
  }

  return { nextDate, status };
}

export function createDefaultReplenishmentUnit(
  productId: string,
  productName: string,
  variantLabel: string,
  sourceMode?: "trial" | "annual"
): ReplenishmentUnit {
  return {
    productId,
    productName,
    variantLabel,
    averageCycleDays: DEFAULT_RICE_CYCLE_DAYS,
    bufferDays: DEFAULT_RICE_BUFFER_DAYS,
    status: "normal",
    sourceMode,
  };
}
