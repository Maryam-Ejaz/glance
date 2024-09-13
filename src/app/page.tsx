"use client"
import { useCallback, useEffect, useState } from "react";
import Header from "./header";
import DemoTable from "./profiles/components/Table";
import Profiles from "./profiles/page";

export default function Home() {
  const [showDemoTable, setShowDemoTable] = useState(false);

  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) {
      setShowDemoTable(savedViewMode === "table");
    }
  }, []);

  const handleToggle = useCallback(() => {
    setShowDemoTable(prev => {
      const newViewMode = !prev ? "table" : "list";
      localStorage.setItem("viewMode", newViewMode);
      return !prev;
    });
  }, []);

  return (
    <>
      <Header onToggle={handleToggle} isTableView={showDemoTable} />
      <main className="p-[2vw] pt-[10vh] dark text-foreground bg-background">
        {showDemoTable ? <DemoTable /> : <Profiles />}
      </main>
    </>
  );
}
