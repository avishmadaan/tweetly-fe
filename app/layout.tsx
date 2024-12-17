import type { Metadata } from "next";
import { Fira_Code, Geist } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/components/notification/notificationContext";
import { AuthContextProvider } from "@/lib/authContext";
import { Theme } from "@/lib/providers";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});
const geistCode = Geist({
  variable: "--font-geist-code",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Tweetly - AI-Powered Twitter Growth for Developers",
  description:
    "Tweetly is the ultimate SaaS platform for developers to boost their Twitter/X presence. Schedule tweets, train AI to match your style, automate engagement, and grow your audience authentically and efficiently. Built by a developer for developers.",
  icons: {
    icon: "/favicon_4.jpg", 
  },
};

// RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.variable}  ${geistCode.variable} antialiased`}
      >
        <NotificationProvider>
        <AuthContextProvider>
                  <Theme>
   {children}
        </Theme>
        </AuthContextProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
