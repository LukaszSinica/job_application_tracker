"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

export default function AuthCallbackPage() {
  const supabase = createClient()
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const exchangeCode = async () => {
      const code = params.get("code")
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.replace("/dashboard") 
        } else {
          console.error(error)
        }
      }
    }

    exchangeCode()
  }, [params, supabase, router])

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <p>Logowanie trwa... 🔄</p>
    </main>
  )
}