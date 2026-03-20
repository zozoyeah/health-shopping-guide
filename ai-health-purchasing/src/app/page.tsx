"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Heart, Target, ShoppingBag, Users, Scan } from "lucide-react";
import { platforms } from "@/data/platforms";

export default function HomePage() {
  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "一个属于你的健康采购画像",
      description: "先了解你是谁，你的需求是什么",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "最值得先换的 3 个品类",
      description: "不是所有都重要，先换最有价值的",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "一个 14 天轻升级方案",
      description: "不需要一次性改变，慢慢来就好",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "适合你的平台组合建议",
      description: "不是越多越好，够用就好",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          {/* Logo & Title */}
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-6">
              <span className="text-4xl">🌿</span>
            </div>
            <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4">
              AI 家庭健康采购馆
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted mb-12 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            不需要你一下子学懂有机、营养和配料表。
            我会先帮你找到：最值得先换的东西、适合你的采购路径、和最省心的购买组合。
          </p>

          {/* AI 顾问欢迎 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👩‍⚕️</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground mb-1">你好，我是你的健康采购顾问</p>
                <p className="text-sm text-muted leading-relaxed">
                  我不会让你一次性改变所有饮食习惯，也不会给你一堆看起来很健康、但很难坚持的建议。
                  我会先根据你的生活方式和目标，帮你整理出一份适合你和你家庭的轻升级方案。
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/onboarding" className="btn-primary text-lg px-8 py-4">
              开始我的采购画像
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/hall/kitchen" className="btn-secondary text-lg px-8 py-4">
              我想先随便逛逛
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-serif text-2xl font-semibold text-center mb-12">
            你将获得
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`stagger-item card p-6 flex items-start gap-4`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 推荐采购平台 */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-serif text-2xl font-semibold text-center mb-4">
            推荐采购平台
          </h2>
          <p className="text-muted text-center mb-10">
            扫码即可进入小程序选购
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="card p-6 flex flex-col items-center text-center"
              >
                {platform.qrCode && (
                  <div className="w-32 h-32 relative mb-4 bg-white rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={platform.qrCode}
                      alt={`${platform.name}小程序码`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-1">{platform.name}</h3>
                <p className="text-sm text-accent mb-2">{platform.roleLabel}</p>
                <p className="text-sm text-muted">{platform.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-sm text-muted">
          生态采购馆 · 帮你建立更健康的家庭采购方式
        </p>
      </footer>
    </main>
  );
}
