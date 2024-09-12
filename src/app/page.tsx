"use client" 
import { useState } from "react";
import Profiles from "./profiles/page";
import TableComponent from "./profiles/components/TableComponent";
import DemoTable from "./profiles/components/DemoTable";
import Header from "./header";

export default function Home() {
  const [showDemoTable, setShowDemoTable] = useState(true);

  const handleToggle = () => {
    setShowDemoTable(prev => !prev);
  };

  return (
    <>
      <Header onToggle={handleToggle} />
      <main className="p-[2vw] pt-[10vh] dark text-foreground bg-background">
        {showDemoTable ? <DemoTable /> : <Profiles />}
      </main>
    </>
  );
}
