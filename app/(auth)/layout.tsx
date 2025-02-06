import Image from "next/image";
import icon_v1_dark from "../../assets/iocn_v1_dark.png";

import React from "react";
import Footer from "@/components/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="w-full flex items-center justify-between pl-6 py-2">
        <div className="flex items-center gap-1 py-2">
          <Image
            src={icon_v1_dark}
            className="w-[50px] cursor-pointer  brightness-0 dark:invert"
            alt="logo"
            width={50}
            height={50}
          />
          <h1 className="text-4xl font-bold cursor-pointer">Tweetly</h1>
        </div>
      </div>

      {children}
      <Footer />
    </div>
  );
};

export default Layout;
