import { getApplications } from '@/utils/getApplications'

export default async function Data() {

    const data = await getApplications()

    return (
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">Twoje aplikacje</h1>
          <ul className="space-y-3">
            {data?.map(app => (
              <li key={app.id} className="border p-4 rounded-lg">
                <h2 className="font-semibold">{app.company}</h2>
                <p>{app.position}</p>
                <p className="text-sm text-gray-500">{app.status}</p>
              </li>
            ))}
          </ul>
        </main>
      )
}
