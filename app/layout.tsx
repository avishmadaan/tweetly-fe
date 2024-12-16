import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { NotificationProvider } from "@/components/notification/notificationContext";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
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
    <html lang="en">
      <body
        className={`${firaCode.variable} antialiased`}
      >
        <NotificationProvider>
                  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
        {children}

          </main>
          <ModeToggle />

        </SidebarProvider>
        </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
