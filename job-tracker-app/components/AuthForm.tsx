"use client"
import { useState } from "react"
import { createClient } from '@/utils/supabase/client';

export default function AuthForm() {
    
    
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) setMessage(error.message)
    else setMessage("Sprawdź skrzynkę e-mail — wysłaliśmy Ci magic link ✉️")
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Zaloguj się</h2>
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Twój e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-blue-600 text-white p-2 rounded">Zaloguj</button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}