import { AppSidebar, SidebarContextProvider } from "@/components/app-sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarContextProvider>
    <div className="md:flex ">
      <AppSidebar />
      {children}
    </div>
    </SidebarContextProvider>
  );
};

export default layout;
