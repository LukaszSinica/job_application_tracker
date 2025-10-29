"use client"
import { createClient } from "@/utils/supabase/client";

export default function Logout() {
  const supabase = createClient()
  return (
    <button className="bg-blue-600 text-white p-2 rounded" onClick={async () => {
        "use client"
        await supabase.auth.signOut()
        window.location.reload()
      }}>
        Wyloguj
      </button>
  )
}
