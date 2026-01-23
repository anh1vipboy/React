"use client";

import { useState, createContext, useContext } from "react";
import Sidebar from "./Sidebar";

interface SidebarContextType {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  sidebarWidth: 260,
  setSidebarWidth: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(260);

  return (
    <SidebarContext.Provider value={{ sidebarWidth, setSidebarWidth }}>
      <div className="d-flex">
        <Sidebar />
        <main className="flex-fill p-0" style={{ marginLeft: `${sidebarWidth}px`, transition: 'margin-left 0.3s ease' }}>
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
