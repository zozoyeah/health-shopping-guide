"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { questions } from "@/data/questions";
import { useUserProfile } from "@/context/UserProfileContext";
import { Goal, Lifestyle, PainPoint, PurchaseStyle, FirstCategory, TransitionMessage } from "@/types";

const transitionMessages: Record<TransitionMessage, string> = {
  recognizing: "我大概认识你了，正在为你整理第一份采购轻升级方案……",
  narrowing: "在帮你收窄最值得先换的品类",
  matching: "在匹配更适合你的采购路径",
  preparing: "在挑选不需要你太费力的起步方式",
};

export default function OnboardingPage() {
  const router = useRouter();
  const { setProfile, completeOnboarding, profile: existingProfile } = useUserProfile();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState<TransitionMessage>("recognizing");
  const [showTransition, setShowTransition] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  // 如果已经有profile，跳转到plan
  useEffect(() => {
    if (existingProfile) {
      router.push("/plan");
    }
  }, [existingProfile, router]);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // 完成所有问题
      finishOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const finishOnboarding = async () => {
    // 保存答案
    const profile: {
      goal: Goal;
      lifestyle: Lifestyle;
      painPoint: PainPoint;
      purchaseStyle: PurchaseStyle;
      firstCategory: FirstCategory;
    } = {
      goal: (answers[0] as Goal) || "healthy",
      lifestyle: (answers[1] as Lifestyle) || "busy_worker",
      painPoint: (answers[2] as PainPoint) || "dont_know_where_to_start",
      purchaseStyle: (answers[3] as PurchaseStyle) || "one_stop",
      firstCategory: (answers[4] as FirstCategory) || "oil",
    };

    setProfile(profile);

    // 显示过渡动画
    setIsTransitioning(true);

    // 依次显示过渡消息
    const messages: TransitionMessage[] = ["recognizing", "narrowing", "matching", "preparing"];
    for (let i = 0; i < messages.length; i++) {
      setTransitionMessage(messages[i]);
      setShowTransition(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // 完成onboarding
    completeOnboarding(profile);

    // 跳转到plan
    router.push("/plan");
  };

  const canProceed = answers[currentStep] !== undefined;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </Link>
      </header>

      {/* Progress */}
      <div className="px-6 mb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between text-sm text-muted mb-2">
            <span>问题 {currentStep + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-lg w-full">
          {!isTransitioning ? (
            <>
              <div className="animate-fade-in-up">
                <h1 className="heading-serif text-2xl md:text-3xl font-semibold text-center mb-12">
                  {currentQuestion.question}
                </h1>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentStep] === option.value;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 stagger-item ${
                          isSelected
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border hover:border-primary/50 hover:bg-card-hover"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? "border-primary bg-primary" : "border-muted-light"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium">{option.label}</span>
                        </div>
                        {option.description && (
                          <p className="mt-2 ml-8 text-sm text-muted">{option.description}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    currentStep === 0
                      ? "text-muted-light cursor-not-allowed"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  上一题
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`btn-primary ${!canProceed ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {currentStep === questions.length - 1 ? "完成" : "下一题"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* Transition Screen */
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-6">
                  <span className="text-4xl animate-pulse">✨</span>
                </div>
              </div>
              <div className="space-y-4">
                <div
                  key={transitionMessage}
                  className="text-lg text-foreground animate-fade-in-up"
                >
                  {transitionMessages[transitionMessage]}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="pulse-dot"></span>
                  <span className="pulse-dot" style={{ animationDelay: "0.3s" }}></span>
                  <span className="pulse-dot" style={{ animationDelay: "0.6s" }}></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
