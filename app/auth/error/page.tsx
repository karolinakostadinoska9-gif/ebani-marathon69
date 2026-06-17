export default function AuthError() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1c0804',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffebdc',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      flexDirection: 'column',
      gap: 16
    }}>
      <div style={{ fontSize: 48 }}>⚠️</div>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>Ошибка авторизации</h1>
      <p style={{ color: '#c89682', fontSize: 14 }}>Попробуйте войти ещё раз</p>
      <a href="/" style={{
        background: '#e85d04',
        color: '#fff',
        padding: '10px 24px',
        borderRadius: 8,
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 14
      }}>На главную</a>
    </div>
  )
}
