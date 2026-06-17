'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import styles from './DashboardClient.module.css'

type User = {
  id: string
  email?: string
  user_metadata?: { full_name?: string; avatar_url?: string }
}

type Participant = {
  id: string
  user_id: string
  full_name: string
  phone?: string
  city?: string
  bib_number?: number
  created_at: string
}

export default function DashboardClient({
  user,
  participants,
  myRegistration,
}: {
  user: User
  participants: Participant[]
  myRegistration: Participant | null
}) {
  const supabase = createClient()
  const router = useRouter()
  const [tab, setTab] = useState<'my' | 'list'>('my')
  const [form, setForm] = useState({
    full_name: user.user_metadata?.full_name ?? '',
    phone: '',
    city: '',
  })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function register(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.from('participants').insert({
      user_id: user.id,
      full_name: form.full_name,
      phone: form.phone,
      city: form.city,
    })
    setLoading(false)
    router.refresh()
  }

  async function unregister() {
    if (!confirm('Отменить регистрацию?')) return
    await supabase.from('participants').delete().eq('user_id', user.id)
    router.refresh()
  }

  const filtered = participants.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (p.city ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const avatar = user.user_metadata?.avatar_url
  const name = user.user_metadata?.full_name ?? user.email ?? 'Участник'

  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <span>🏃</span>
          <div>
            <div className={styles.navTitle}>MARATHON SKILLS</div>
            <div className={styles.navYear}>2026</div>
          </div>
        </div>
        <div className={styles.navRight}>
          {avatar && <img src={avatar} className={styles.avatar} alt={name} />}
          <span className={styles.navName}>{name}</span>
          <button className={styles.signOutBtn} onClick={signOut}>Выйти</button>
        </div>
      </nav>

      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={tab === 'my' ? styles.tabActive : styles.tab}
          onClick={() => setTab('my')}
        >
          Моя регистрация
        </button>
        <button
          className={tab === 'list' ? styles.tabActive : styles.tab}
          onClick={() => setTab('list')}
        >
          Участники ({participants.length})
        </button>
      </div>

      <main className={styles.main}>
        {/* MY REGISTRATION */}
        {tab === 'my' && (
          <div className={styles.section}>
            {myRegistration ? (
              <div className={styles.registeredCard}>
                <div className={styles.regBadge}>✅ Вы зарегистрированы!</div>
                {myRegistration.bib_number && (
                  <div className={styles.bibNumber}>
                    <span className={styles.bibLabel}>Номер участника</span>
                    <span className={styles.bibValue}>#{myRegistration.bib_number}</span>
                  </div>
                )}
                <div className={styles.regInfo}>
                  <div className={styles.regRow}>
                    <span className={styles.regLabel}>Имя</span>
                    <span>{myRegistration.full_name}</span>
                  </div>
                  {myRegistration.city && (
                    <div className={styles.regRow}>
                      <span className={styles.regLabel}>Город</span>
                      <span>{myRegistration.city}</span>
                    </div>
                  )}
                  {myRegistration.phone && (
                    <div className={styles.regRow}>
                      <span className={styles.regLabel}>Телефон</span>
                      <span>{myRegistration.phone}</span>
                    </div>
                  )}
                </div>
                <button className={styles.cancelBtn} onClick={unregister}>
                  Отменить регистрацию
                </button>
              </div>
            ) : (
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Регистрация на марафон</h2>
                <p className={styles.formSub}>15 июня 2026 · 21.097 км · Боровое</p>
                <form onSubmit={register} className={styles.form}>
                  <label className={styles.label}>
                    Имя и фамилия *
                    <input
                      className={styles.input}
                      value={form.full_name}
                      onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                      required
                      placeholder="Иван Иванов"
                    />
                  </label>
                  <label className={styles.label}>
                    Телефон
                    <input
                      className={styles.input}
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+7 (777) 000-00-00"
                      type="tel"
                    />
                  </label>
                  <label className={styles.label}>
                    Город
                    <input
                      className={styles.input}
                      value={form.city}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      placeholder="Астана"
                    />
                  </label>
                  <button className={styles.submitBtn} type="submit" disabled={loading}>
                    {loading ? 'Регистрируемся...' : 'Зарегистрироваться →'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* PARTICIPANTS LIST */}
        {tab === 'list' && (
          <div className={styles.section}>
            <input
              className={styles.searchInput}
              placeholder="Поиск по имени или городу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {filtered.length === 0 ? (
              <div className={styles.empty}>Никого не найдено</div>
            ) : (
              <div className={styles.participantList}>
                {filtered.map((p, i) => (
                  <div key={p.id} className={styles.participantRow}>
                    <div className={styles.participantNum}>
                      {p.bib_number ? `#${p.bib_number}` : i + 1}
                    </div>
                    <div className={styles.participantInfo}>
                      <div className={styles.participantName}>{p.full_name}</div>
                      {p.city && <div className={styles.participantCity}>{p.city}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        MARATHON SKILLS 2026 · БОРОВОЕ 🏔️
      </footer>
    </div>
  )
}
