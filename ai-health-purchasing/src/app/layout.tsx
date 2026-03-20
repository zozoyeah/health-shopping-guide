import type { Metadata } from "next";
import "./globals.css";
import { UserProfileProvider } from "@/context/UserProfileContext";

export const metadata: Metadata = {
  title: "AI 家庭健康采购馆",
  description: "不教你懂有机，只帮你买对东西",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <UserProfileProvider>
          <div className="page-container">
            {children}
          </div>
        </UserProfileProvider>
      </body>
    </html>
  );
}
