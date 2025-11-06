'use client';

import Logout from "@/components/logout";
import JobList from "@/components/jobList";
import AddJobForm from "@/components/AddJobForm";
import { ThemeToggle } from "@/components/ui/themeToggler";
import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";


export default function Page() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email ?? null;
      const username = email?.split('@')[0] ?? null;
      console.log(username)
      setUserEmail(username);
    };
    getUser();
  }, []);

 console.log(userEmail)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center shadow-md w-full px-8 py-4 bg-background z-50">
        <h1 className="text-xl font-bold">Twoje aplikacje</h1>
        <div className="flex items-center gap-2">
          {userEmail && (
            <span className="text-sm text-muted-foreground">{userEmail}</span>
          )}
          <ThemeToggle />
          <Logout />
        </div>
      </nav>
      <main className="pt-20 p-6 relative">
        <JobList refreshTrigger={refreshTrigger} />
        <AddJobForm refreshJobs={handleRefresh} />
      </main>
    </>
  );
}