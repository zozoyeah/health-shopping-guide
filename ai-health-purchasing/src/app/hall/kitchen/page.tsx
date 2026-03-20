"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X, MessageCircle, Lightbulb, ShoppingBag } from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import { getCategoryById, getPlatformById } from "@/lib/derivePersona";
import ChatDrawer from "@/components/chat/ChatDrawer";

export default function KitchenHallPage() {
  const { personaResult, profile, isCompleted } = useUserProfile();
  const [showChat, setShowChat] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 如果有画像，获取个性化推荐
  const recommendedCategoryIds = personaResult?.recommendedCategoryIds || ["oil", "seasoning", "grains"];
  const showPersonalizedHint = isCompleted && recommendedCategoryIds.length > 0;

  const hallZones = [
    {
      id: "oil",
      category: getCategoryById("oil"),
      platforms: platforms.filter((p) => p.recommendedCategoryIds.includes("oil")),
    },
    {
      id: "seasoning",
      category: getCategoryById("seasoning"),
      platforms: platforms.filter((p) => p.recommendedCategoryIds.includes("seasoning")),
    },
    {
      id: "grains",
      category: getCategoryById("grains"),
      platforms: platforms.filter((p) => p.recommendedCategoryIds.includes("grains")),
    },
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="py-8 px-6">
        <Link href={isCompleted ? "/plan" : "/"} className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        {/* 馆 Header */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-6">
            <span className="text-4xl">🍳</span>
          </div>
          <h1 className="heading-serif text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            厨房基础馆
          </h1>
          <p className="text-lg text-muted max-w-lg mx-auto">
            这些是每天都会用到的基础食材，先把它们换对，比买任何"高级补品"都值。
          </p>

          {/* AI 顾问提示卡 */}
          <div className="mt-8 bg-accent/10 rounded-2xl p-6 max-w-lg mx-auto border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground mb-1">这次先别逛太多</p>
                <p className="text-sm text-muted">
                  我们先看 <strong>2个区</strong> 就够了。其他的，等你把这几个跑顺了再说。
                </p>
              </div>
            </div>
          </div>

          {/* 个性化提示（如果有画像） */}
          {showPersonalizedHint && (
            <div className="mt-4 bg-primary/10 rounded-xl p-4 max-w-lg mx-auto">
              <p className="text-sm text-primary">
                ✨ 根据你的画像，推荐先看：<strong>{recommendedCategoryIds.slice(0, 2).map(id => getCategoryById(id)?.name).join("、")}</strong>
              </p>
            </div>
          )}
        </section>

        {/* Zones */}
        <section className="space-y-8 mb-12">
          {hallZones.map((zone, idx) => (
            <div
              key={zone.id}
              className="stagger-item bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Zone Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-4xl">
                    {zone.category?.icon}
                  </div>
                  <div>
                    <h2 className="heading-serif text-2xl font-semibold">{zone.category?.name}</h2>
                    <p className="text-primary font-medium">{zone.category?.oneLineConclusion}</p>
                  </div>
                </div>
              </div>

              {/* Zone Content */}
              <div className="p-6 space-y-6">
                {/* Why Important */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">为什么重要</h3>
                  <p className="text-muted leading-relaxed">{zone.category?.whyImportant}</p>
                </div>

                {/* Quick Advice */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    快速建议
                  </h3>
                  <ul className="space-y-2">
                    {zone.category?.quickAdvice.map((advice, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                <div className="bg-muted/10 rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    暂时不建议做什么
                  </h3>
                  <ul className="space-y-2">
                    {zone.category?.commonMistakes.map((mistake, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-sm text-muted">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Platforms */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    推荐平台
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {zone.platforms.slice(0, 3).map((platform) => (
                      <div
                        key={platform.id}
                        className="bg-card-hover border border-border rounded-xl px-4 py-2"
                      >
                        <span className="font-medium text-sm">{platform.name}</span>
                        <span className="text-muted text-sm ml-2">- {platform.roleLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="text-center mb-8">
          <Link href={isCompleted ? "/plan" : "/"} className="btn-primary">
            {isCompleted ? "查看我的完整方案" : "开始你的采购画像"}
            <ArrowRight className="w-4 h-4" />
          </Link>
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
