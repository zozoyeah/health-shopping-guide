"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Package, Calendar } from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { replenismentMessages } from "@/data/replenishment";
import { ReplenishmentAction } from "@/types";

export default function ReplenishRicePage() {
  const router = useRouter();
  const { riceOrder, replenishmentUnit, updateReplenishmentAction } = useUserProfile();
  const [showDetails, setShowDetails] = useState(false);
  const [completedAction, setCompletedAction] = useState<ReplenishmentAction | null>(null);

  // 如果没有订单记录，跳转到订购页
  if (!riceOrder || !replenishmentUnit) {
    return (
      <main className="min-h-screen pb-24">
        <header className="py-8 px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
        </header>

        <div className="max-w-lg mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="heading-serif text-2xl font-semibold mb-4">
              还没有建立大米常备
            </h2>
            <p className="text-muted mb-8">
              你还没有订购过大米，无法使用补货功能。
            </p>
            <Link href="/order/rice" className="btn-primary w-full">
              先去建立常备
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleAction = (action: ReplenishmentAction) => {
    updateReplenishmentAction(action);
    setCompletedAction(action);
  };

  const handleBackToPlan = () => {
    router.push("/plan");
  };

  // 已完成操作的状态
  if (completedAction) {
    const message = replenismentMessages[completedAction];
    return (
      <main className="min-h-screen pb-24">
        <div className="max-w-lg mx-auto px-6 pt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="heading-serif text-2xl font-semibold mb-4">
              {message.title}
            </h2>
            <p className="text-muted mb-8">
              {message.description}
            </p>
            <button onClick={handleBackToPlan} className="btn-primary w-full">
              返回我的方案
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 正常补货页面
  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="py-8 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </header>

      <div className="max-w-lg mx-auto px-6">
        {/* 顶部状态区 */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <h1 className="heading-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
              你家的米差不多该补了
            </h1>
            <p className="text-muted">
              平时买的是：<span className="text-foreground font-medium">{replenishmentUnit.variantLabel}</span>
            </p>
          </div>

          {/* 状态信息 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted">当前状态</p>
                  <p className="font-medium text-foreground">
                    {replenishmentUnit.status === "due_now" ? "可以补货了" :
                     replenishmentUnit.status === "due_soon" ? "快吃完了，建议补货" : "正常"}
                  </p>
                </div>
              </div>
              {replenishmentUnit.sourceMode && (
                <span className={`text-xs px-3 py-1 rounded-full ${
                  replenishmentUnit.sourceMode === "annual"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                }`}>
                  {replenishmentUnit.sourceMode === "annual" ? "一年常备" : "试用中"}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* 本次建议 */}
        <section className="mb-10">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
            <h3 className="font-medium text-foreground mb-2">本次建议</h3>
            <p className="text-lg text-primary font-medium">
              按平时的方式补 1 袋
            </p>
            {replenishmentUnit.sourceMode === "annual" && (
              <p className="text-sm text-muted mt-2">
                这属于你的一年份额中的本次补货，不需要重新选择商品。
              </p>
            )}
            {replenishmentUnit.sourceMode === "trial" && (
              <p className="text-sm text-muted mt-2">
                你上次试的是这款米，如果觉得合适，这次可以继续按平时补一袋。
              </p>
            )}
          </div>
        </section>

        {/* 三个核心按钮 */}
        <section className="mb-10 space-y-3">
          <button
            onClick={() => handleAction("confirm")}
            className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            按平时来
          </button>
          <button
            onClick={() => handleAction("postpone")}
            className="w-full py-4 bg-white border border-border text-foreground rounded-xl font-medium hover:bg-card-hover transition-colors"
          >
            过几天再说
          </button>
          <button
            onClick={() => handleAction("skip")}
            className="w-full py-4 text-muted hover:text-foreground transition-colors"
          >
            这次先不用
          </button>
        </section>

        {/* 详情入口 */}
        <section>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between py-3 text-muted hover:text-foreground transition-colors"
          >
            <span className="text-sm">我想看详情</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDetails && (
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-2 animate-fade-in-up">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">为什么推荐这款米</h4>
                  <p className="text-sm text-muted">
                    这是你之前选择的大米，已被标记为家庭基础常备。
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">来自哪个平台</h4>
                  <p className="text-sm text-muted">
                    根据你的购买记录，这款大米来自你信任的平台。
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">为什么现在提醒</h4>
                  <p className="text-sm text-muted">
                    根据你的购买频率和消耗速度，现在正是补货的好时机。
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
