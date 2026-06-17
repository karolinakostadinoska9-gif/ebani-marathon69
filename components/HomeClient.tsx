'use client'
import { createClient } from '@/lib/supabase/client'
import styles from './HomeClient.module.css'

export default function HomeClient() {
  const supabase = createClient()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <span className={styles.navEmoji}>🏃</span>
          <div>
            <div className={styles.navTitle}>MARATHON SKILLS</div>
            <div className={styles.navYear}>2026</div>
          </div>
        </div>
        <button className={styles.googleBtnSmall} onClick={signInWithGoogle}>
          <GoogleIcon size={16} />
          Войти
        </button>
      </nav>

      {/* HERO */}
      <main className={styles.hero}>
        <div className={styles.heroBadge}>15 ИЮНЯ 2026 · БОРОВОЕ, КАЗАХСТАН</div>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLine}>MARATHON</span>
          <span className={styles.heroTitleLine2}>SKILLS</span>
        </h1>
        <div className={styles.heroDist}>21.097 КМ</div>
        <p className={styles.heroSub}>
          Сосновые леса, горные озёра и хребет Бойлектау.<br />
          Испытай себя на одном из красивейших маршрутов Казахстана.
        </p>

        <button className={styles.googleBtnLarge} onClick={signInWithGoogle}>
          <GoogleIcon size={22} />
          Войти через Google и зарегистрироваться
        </button>

        <a
          href="https://t.me/MarathonSkills2026_AssistantBot"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.tgCard}
        >
          <div className={styles.tgIcon}>✈️</div>
          <div className={styles.tgText}>
            <div className={styles.tgTitle}>Есть вопросы? Спроси бота в Telegram</div>
            <div className={styles.tgSub}>Найди участника по имени · Узнай как зарегистрироваться</div>
          </div>
          <div className={styles.tgBtn}>Открыть →</div>
        </a>
      </main>

      {/* INFO CARDS */}
      <section className={styles.cards}>
        <InfoCard
          accent="#e85d04"
          icon="🏃"
          title="Полумарафон — испытание воли"
          text="21.097 км объединяют профессионалов и любителей в едином порыве выносливости."
        />
        <InfoCard
          accent="#e65014"
          icon="💪"
          title="«Стена» на 16–18 км"
          text="На подъёмах хребта Бойлектау силы на исходе. Преодоление — вопрос чистого упрямства."
        />
        <InfoCard
          accent="#ff781e"
          icon="🌲"
          title="Природа Бурабая"
          text="Сосновые леса, горные озёра и вершины Бойлектау — невероятный маршрут среди дикой природы."
        />
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        МАРАФОН 2026 · БОРОВОЕ · КАЗАХСТАН 🏔️
      </footer>
    </div>
  )
}

function InfoCard({ accent, icon, title, text }: {
  accent: string; icon: string; title: string; text: string
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardStripe} style={{ background: accent }} />
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{icon} {title}</div>
        <div className={styles.cardText}>{text}</div>
      </div>
    </div>
  )
}

function GoogleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}
