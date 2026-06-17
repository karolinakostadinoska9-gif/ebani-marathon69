import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  // Fetch participants from Supabase
  const { data: participants } = await supabase
    .from('participants')
    .select('*')
    .order('created_at', { ascending: true })

  // Check if user is already registered
  const { data: myRegistration } = await supabase
    .from('participants')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <DashboardClient
      user={user}
      participants={participants ?? []}
      myRegistration={myRegistration ?? null}
    />
  )
}
