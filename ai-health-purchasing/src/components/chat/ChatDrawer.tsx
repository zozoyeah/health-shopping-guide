"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { aiResponses, quickPrompts } from "@/data/aiResponses";
import { AIResponse } from "@/types";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content:
        "你好，我是你的健康采购顾问。\n\n如果你愿意，我可以先帮你收窄范围，而不是让你一次看太多。",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleQuickPrompt = (key: string) => {
    const response = aiResponses.find((r) => r.key === key);
    if (response) {
      // 用户发送消息
      setMessages((prev) => [...prev, { role: "user", content: response.label }]);
      // AI 回复
      simulateAIResponse(response.response);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // 用户发送消息
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // 简单的规则匹配
    const userInput = input.toLowerCase();
    let matchedResponse: AIResponse | undefined;

    if (userInput.includes("预算") || userInput.includes("钱")) {
      matchedResponse = aiResponses.find((r) => r.key === "budgetLimited");
    } else if (userInput.includes("研究") || userInput.includes("太复杂") || userInput.includes("不懂")) {
      matchedResponse = aiResponses.find((r) => r.key === "noTimeToResearch");
    } else if (userInput.includes("减脂") || userInput.includes("减肥") || userInput.includes("瘦")) {
      matchedResponse = aiResponses.find((r) => r.key === "wantToLoseWeight");
    } else if (userInput.includes("孩子") || userInput.includes("小孩") || userInput.includes("宝宝")) {
      matchedResponse = aiResponses.find((r) => r.key === "haveKids");
    } else if (userInput.includes("平台") || userInput.includes("哪里买") || userInput.includes("网站")) {
      matchedResponse = aiResponses.find((r) => r.key === "whichPlatformFirst");
    } else if (userInput.includes("最值得") || userInput.includes("先买")) {
      matchedResponse = aiResponses.find((r) => r.key === "startWithMostImportant");
    } else {
      // 默认回复
      matchedResponse = {
        key: "startWithMostImportant",
        label: "",
        response:
          "明白。\n\n对你来说，最重要的是先从高频、基础、容易坚持的品类开始，而不是一下子看太多。\n\n你可以说：\n• '我预算有限'\n• '我不想研究太多'\n• '我先从哪个开始'\n\n或者直接点击下面的快捷问题。",
      };
    }

    simulateAIResponse(matchedResponse?.response || "明白，我们慢慢来。");
    setInput("");
  };

  const simulateAIResponse = (responseText: string) => {
    setIsTyping(true);

    // 模拟打字效果
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: responseText }]);
      setIsTyping(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">健康采购顾问</h3>
              <p className="text-xs text-muted">随时为你服务</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-muted/10 text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted/10 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="pt-4">
              <p className="text-xs text-muted mb-3">快捷问题</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.key}
                    onClick={() => handleQuickPrompt(prompt.key)}
                    className="text-xs px-3 py-2 bg-muted/10 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="问个问题..."
              className="flex-1 px-4 py-3 rounded-full border border-border focus:border-primary focus:outline-none transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
