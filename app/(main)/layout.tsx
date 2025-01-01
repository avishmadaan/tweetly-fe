import { AppSidebar, SidebarContextProvider } from "@/components/app-sidebar";
import { AiContextProvider } from "@/lib/aiContext";
import { BrainContextProvider } from "@/lib/brainContext";
import { XContextProvider } from "@/lib/xContext";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarContextProvider>
      <AiContextProvider>
        <XContextProvider>
          <BrainContextProvider>
    <div className="md:flex h-screen max-h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
              {children}
            </div>
    </div>
    </BrainContextProvider>
    </XContextProvider>
    </AiContextProvider>
    </SidebarContextProvider>
  );
};

export default layout;
