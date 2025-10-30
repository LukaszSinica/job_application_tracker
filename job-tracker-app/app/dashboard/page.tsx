import Logout from "@/components/logout";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <p>Musisz się zalogować, aby zobaczyć swoje aplikacje.</p>
  }

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("date_applied", { ascending: false })

  if (error) {
    console.error(error)
    return <p>Błąd pobierania danych</p>
  }


  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Twoje aplikacje</h1>
      {applications.length === 0 ? (
        <p>Brak danych.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {applications.map((app) => (
              <li key={app.id} className="border p-3 rounded-lg">
                <strong>{app.company}</strong> — {app.position}
              </li>
            ))}
          </ul>
          <Logout />
        </>
      )}
    </main>
  )
}