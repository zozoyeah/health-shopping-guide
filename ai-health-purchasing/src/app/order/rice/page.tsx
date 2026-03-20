"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, Info, Leaf, Droplets, Sun } from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { products } from "@/data/products";
import { createDefaultReplenishmentUnit } from "@/data/replenishment";
import { clearReplenishmentData } from "@/lib/storage";
import { ProductVariant } from "@/types";

// 大米类型图标映射
const getRiceTypeIcon = (name: string) => {
  if (name.includes("糙米")) return <Droplets className="w-5 h-5" />;
  if (name.includes("胚芽米")) return <Leaf className="w-5 h-5" />;
  return <Sun className="w-5 h-5" />;
};

// 大米类型颜色映射
const getRiceTypeColor = (name: string) => {
  if (name.includes("糙米")) return "from-amber-50 to-orange-50 border-amber-200";
  if (name.includes("胚芽米")) return "from-green-50 to-emerald-50 border-green-200";
  return "from-blue-50 to-sky-50 border-blue-200";
};

export default function OrderRicePage() {
  const router = useRouter();
  const { setRiceOrder, setReplenishmentUnit, riceOrder: existingOrder } = useUserProfile();
  const [selectedMode, setSelectedMode] = useState<"trial" | "annual" | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [showVariants, setShowVariants] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const riceProduct = products.find((p) => p.id === "organic_rice");

  if (!riceProduct) {
    return <div>产品数据加载失败</div>;
  }

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setShowVariants(false);
  };

  const handleBackToVariants = () => {
    setSelectedVariant(null);
    setSelectedMode(null);
    setShowVariants(true);
  };

  const handleSelectTrial = () => {
    setSelectedMode("trial");
  };

  const handleSelectAnnual = () => {
    setSelectedMode("annual");
  };

  const handleConfirm = () => {
    if (!selectedMode || !selectedVariant) return;

    const order = {
      productId: riceProduct.id,
      mode: selectedMode,
      variantId: selectedVariant.id,
      quantity: selectedMode === "trial" ? 1 : 12,
      createdAt: new Date().toISOString(),
    };
    setRiceOrder(order);

    const replenishmentUnit = createDefaultReplenishmentUnit(
      riceProduct.id,
      riceProduct.name,
      `${selectedVariant.name} ${selectedVariant.sizeKg}kg`,
      selectedMode
    );
    setReplenishmentUnit(replenishmentUnit);

    setShowConfirm(true);
  };

  const handleSuccess = () => {
    router.push("/plan");
  };

  const handleRebook = () => {
    clearReplenishmentData();
    setSelectedMode(null);
    setSelectedVariant(null);
    setShowVariants(true);
    setShowConfirm(false);
    router.refresh();
  };

  // 已有订单状态
  if (existingOrder && !showConfirm) {
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="heading-serif text-2xl font-semibold mb-4">
              你已经订购过了
            </h2>
            <p className="text-muted mb-8">
              你已选择了{existingOrder.mode === "trial" ? "初次尝试" : "一年常备"}模式
            </p>
            <div className="space-y-3">
              <Link href="/plan" className="btn-primary w-full">
                返回我的方案
              </Link>
              <Link href="/replenish/rice" className="btn-secondary w-full">
                查看补货状态
              </Link>
              <button onClick={handleRebook} className="w-full py-3 text-primary hover:underline">
                重新选择大米
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 确认成功状态
  if (showConfirm) {
    return (
      <main className="min-h-screen pb-24">
        <header className="py-8 px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
        </header>

        <div className="max-w-lg mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="heading-serif text-2xl font-semibold mb-4">
              {selectedMode === "trial" ? "初次尝试已确认" : "一年常备计划已建立"}
            </h2>
            <p className="text-muted mb-4">
              {selectedMode === "trial"
                ? "先试一袋，感受一下品质。如果合适，以后可以通过冰箱贴轻松补货。"
                : "已建立一年常备关系。之后每当米快吃完时，冰箱贴会提醒你补货，不需要重新选择。"}
            </p>
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-6 border border-primary/10">
              <p className="text-sm text-foreground/80">
                你选择的是：<span className="font-semibold">{selectedVariant?.name}</span>
                <span className="text-muted"> {selectedVariant?.sizeKg}kg</span>
              </p>
              <p className="text-sm text-muted">
                来自 {selectedVariant?.platform} · 产地 {selectedVariant?.origin}
              </p>
            </div>
            <button onClick={handleSuccess} className="btn-primary w-full">
              返回我的方案
            </button>
          </div>
        </div>
      </main>
    );
  }

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
        {/* 标题区 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              🍚
            </div>
            <div>
              <h1 className="heading-serif text-2xl md:text-3xl font-semibold text-foreground">
                选择你想常备的大米
              </h1>
            </div>
          </div>
          <p className="text-muted leading-relaxed">
            先把每天都会吃到的基础食材固定下来，往往比零散买很多"健康单品"更重要。
          </p>
        </section>

        {/* 大米选择列表 */}
        {showVariants ? (
          <section className="mb-10">
            <div className="space-y-4">
              {riceProduct.variants.map((variant, idx) => (
                <button
                  key={variant.id}
                  onClick={() => handleSelectVariant(variant)}
                  className={`w-full text-left p-5 rounded-2xl border-2 bg-gradient-to-r ${getRiceTypeColor(variant.name)} hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md`}
                >
                  <div className="flex items-start gap-4">
                    {/* 序号 */}
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-muted shadow-sm flex-shrink-0">
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getRiceTypeIcon(variant.name)}</span>
                            <h3 className="font-semibold text-lg text-foreground">{variant.name}</h3>
                          </div>
                          <p className="text-sm text-muted">{variant.platform} · {variant.origin}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xl font-bold text-primary">¥{variant.price}</p>
                          <p className="text-xs text-muted">{variant.sizeKg}kg 装</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted line-clamp-2 mb-3">{variant.description}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-3 py-1 bg-white/80 text-primary rounded-full font-medium">
                          ¥{variant.pricePerKg}/kg
                        </span>
                        {variant.notes && (
                          <span className="text-xs text-muted truncate max-w-[200px]">{variant.notes.split('。')[0]}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : selectedVariant ? (
          /* 选中变体后的模式选择 */
          <section className="mb-10 animate-fade-in-up">
            {/* 选中信息 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted mb-1">已选择</p>
                  <h3 className="font-semibold text-xl text-foreground flex items-center gap-2">
                    {getRiceTypeIcon(selectedVariant.name)}
                    {selectedVariant.name}
                  </h3>
                </div>
                <button
                  onClick={handleBackToVariants}
                  className="text-sm text-primary hover:underline"
                >
                  重新选择
                </button>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-border">
                <span className="text-muted">{selectedVariant.platform}</span>
                <span className="font-bold text-lg text-primary">¥{selectedVariant.price}</span>
              </div>
            </div>

            {/* AI 建议 */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-5 border border-accent/20 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">AI 顾问建议</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    对很多家庭来说，先固定一种长期吃得安心的大米，比一次性研究很多品类更容易坚持。
                    如果还在观察消耗节奏，可以先试一袋；如果已经确定适合，可以直接建立一年常备关系。
                  </p>
                </div>
              </div>
            </div>

            {/* 选择模式 */}
            <h3 className="heading-serif text-lg font-semibold mb-4">你想怎么开始？</h3>
            <div className="space-y-4">
              {/* 初次尝试 */}
              <button
                onClick={handleSelectTrial}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMode === "trial"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedMode === "trial" ? "border-primary bg-primary" : "border-muted-light"
                    }`}
                  >
                    {selectedMode === "trial" && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">初次尝试</h4>
                    <p className="text-sm text-muted mb-3">
                      先试一袋，感受品质和消耗节奏。低门槛开始，不会有负担。
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full">
                      <span className="text-sm font-medium">先试一袋</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* 一年份额 */}
              <button
                onClick={handleSelectAnnual}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMode === "annual"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedMode === "annual" ? "border-primary bg-primary" : "border-muted-light"
                    }`}
                  >
                    {selectedMode === "annual" && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">一年份额</h4>
                    <p className="text-sm text-muted mb-3">
                      建立一年常备关系，按你的消耗节奏分批送。以后只需确认补货，无需重新选择。
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full">
                      <span className="text-sm font-medium">建立一年常备计划</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* 一年份额说明 */}
            {selectedMode === "annual" && (
              <div className="mt-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 animate-fade-in-up border border-primary/10">
                <p className="text-sm text-foreground/80">
                  一年份额不是一次发12袋，而是你确定后会将大米加入你的"常备清单"，
                  之后每当快吃完时，你会收到补货提醒，只需要确认即可。
                </p>
              </div>
            )}
          </section>
        ) : null}

        {/* 确认按钮 */}
        {selectedMode && !showVariants && (
          <section className="mb-8 animate-fade-in-up">
            <button onClick={handleConfirm} className="btn-primary w-full py-4 text-lg">
              {selectedMode === "trial" ? "确认先试一袋" : "确认建立一年常备计划"}
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
