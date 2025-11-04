'use client';

import Logout from "@/components/logout";
import JobList from "@/components/data";
import AddJobForm from "@/components/AddJobForm";
import { useState, useCallback } from "react";

export default function Page() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Twoje aplikacje</h1>
        <Logout />
      </div>
      <JobList refreshTrigger={refreshTrigger} />
      <AddJobForm refreshJobs={handleRefresh} />
    </main>
  );
}