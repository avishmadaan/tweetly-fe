import { AppSidebar, SidebarContextProvider } from "@/components/app-sidebar";
import { AiContextProvider } from "@/lib/aiContext";
import { BrainContextProvider } from "@/lib/brainContext";
import { MediaContextProvider } from "@/lib/mediaContext";
import { XContextProvider } from "@/lib/xContext";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarContextProvider>
      <AiContextProvider>
        <XContextProvider>
          <BrainContextProvider>
          <MediaContextProvider>
    <div className="md:flex h-screen max-h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-grow overflow-hidden h-screen">
              {children}
            </div>
    </div>
    </MediaContextProvider>
    </BrainContextProvider>
    </XContextProvider>
    </AiContextProvider>
    </SidebarContextProvider>
  );
};

export default layout;
