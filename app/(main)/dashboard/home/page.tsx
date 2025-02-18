"use client";

import HomeBots from "@/components/home-bots";
import PostsCount from "@/components/home-total-scheduled";
import HomeTweetBrain from "@/components/home-tweet-brain";
import OnboardChecklist from "@/components/onboarding-checklist";
import ToolTip from "@/components/ui/tooltip";
import { useAuth } from "@/lib/authContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="mb-8 w-full">
      <div className="flex justify-between items-center mb-8 flex-wrap ">
        <h2 className="font-semibold text-2xl flex items-center gap-2">
          Welcome, {user?.name?.split(" ")[0] || "User"}
          <ToolTip>
            This your app home where you will be see your stats and other basic
            details.
          </ToolTip>
        </h2>
      </div>
      <div className="flex  gap-4 flex-wrap" id="content">
        <OnboardChecklist  />
        <div className=" flex flex-col  gap-4" id="3nd">
          <HomeTweetBrain />
          <HomeBots />
        </div>
        <div className="flex-grow">
        <PostsCount /></div>
        
      </div>
    </div>
  );
}
