import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HomeClient from '@/components/HomeClient'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Already logged in → go to dashboard
  if (user) redirect('/dashboard')

  return <HomeClient />
}
