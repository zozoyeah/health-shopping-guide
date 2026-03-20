"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RefreshCw, MessageCircle, Sparkles, Check, ShoppingBag, Clock } from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { plans } from "@/data/plans";
import { getPlatformById, getCategoryById } from "@/lib/derivePersona";
import ChatDrawer from "@/components/chat/ChatDrawer";

export default function PlanPage() {
  const router = useRouter();
  const { personaResult, profile, isCompleted, resetProfile } = useUserProfile();
  const [showChat, setShowChat] = useState(false);

  // 如果没有完成onboarding，跳转到onboarding
  useEffect(() => {
    if (!isCompleted || !personaResult) {
      router.push("/onboarding");
    }
  }, [isCompleted, personaResult, router]);

  if (!personaResult || !profile) {
    return null;
  }

  const recommendedPlatforms = personaResult.recommendedPlatformIds.map(getPlatformById).filter((p): p is NonNullable<typeof p> => p !== undefined);
  const recommendedCategories = personaResult.recommendedCategoryIds.map(getCategoryById).filter((c): c is NonNullable<typeof c> => c !== undefined);

  const handleRestart = () => {
    resetProfile();
    router.push("/onboarding");
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="py-8 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6">
        {/* A. 一句话画像 */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-foreground">
                  {personaResult.personaTitle}
                </h2>
                <p className="text-muted mt-1">这是我们对你的理解</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-foreground/90">
              {personaResult.personaDescription}
            </p>
          </div>
        </section>

        {/* B. AI 对用户的理解 */}
        <section className="mb-12">
          <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-foreground/80 leading-relaxed">
              对你来说，问题不是不重视健康，而是信息太杂、选择太多，而且真正能长期做到的方案很少。
              所以我不会带你一下子逛完整个馆。我们先只看最值得的几类。
            </p>
          </div>
        </section>

        {/* C. 最值得先看的 3 类 */}
        <section className="mb-12">
          <h3 className="heading-serif text-xl font-semibold mb-6">
            最值得先看的 3 类
          </h3>
          <div className="space-y-4">
            {recommendedCategories.map((category, idx) => (
              <div
                key={category.id}
                className="stagger-item card p-6 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{category.icon}</span>
                    <h4 className="font-semibold text-lg">{category.name}</h4>
                  </div>
                  <p className="text-muted">{category.oneLineConclusion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* D. 采购方式建议 */}
        <section className="mb-12">
          <h3 className="heading-serif text-xl font-semibold mb-6">
            采购方式建议
          </h3>
          <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-foreground/90 leading-relaxed">
              {personaResult.shoppingStyleAdvice}
            </p>
          </div>
        </section>

        {/* E. 平台组合建议 */}
        <section className="mb-12">
          <h3 className="heading-serif text-xl font-semibold mb-6">
            推荐的平台组合
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedPlatforms.map((platform, idx) => (
              <div
                key={platform.id}
                className="stagger-item card p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-semibold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{platform.name}</h4>
                    <p className="text-sm text-accent">{platform.roleLabel}</p>
                  </div>
                </div>
                <p className="text-sm text-muted">{platform.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* E2. 建立大米常备建议 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10 animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                🍚
              </div>
              <div className="flex-1">
                <h3 className="heading-serif text-lg font-semibold mb-2">
                  把大米加入家庭基础常备
                </h3>
                <p className="text-sm text-muted mb-4">
                  对很多家庭来说，先固定一种长期吃得安心的大米，比零散买很多"健康单品"更容易坚持。
                  以后通过冰箱贴就能轻松补货，不需要每次重新研究。
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/order/rice" className="btn-primary text-sm py-2">
                    建立大米常备
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* F. 14 天轻升级方案 */}
        <section className="mb-12">
          <h3 className="heading-serif text-xl font-semibold mb-6">
            🗓️ 14 天轻升级方案
          </h3>
          <div className="space-y-6">
            {plans.weeks.map((week, idx) => (
              <div
                key={week.week}
                className="stagger-item bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold">
                    {week.week}
                  </div>
                  <h4 className="font-semibold text-lg">{week.title}</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted mb-2">为什么是它：</p>
                    <p className="text-foreground/80">{week.whyThis}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted mb-2">这周任务：</p>
                    <ul className="space-y-2">
                      {week.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-accent/10 rounded-xl p-4">
                    <p className="text-sm font-medium text-accent mb-1">🚫 这周先别做什么</p>
                    <ul className="space-y-1">
                      {week.avoidNow.map((item, aIdx) => (
                        <li key={aIdx} className="text-sm text-muted">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Actions */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/hall/kitchen" className="btn-primary">
              进入厨房基础馆
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleRestart}
              className="btn-secondary"
            >
              <RefreshCw className="w-4 h-4" />
              重新调整画像
            </button>
          </div>
        </section>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-all hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Drawer */}
      <ChatDrawer isOpen={showChat} onClose={() => setShowChat(false)} />
    </main>
  );
}
