import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '../../i18n'

export default function Auth(){
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isSignup = pathname.endsWith('/signup')
  const { t } = useI18n()
  const onAuthSuccess = () => {
    localStorage.setItem('user_logged_in', '1')
    navigate('/user/adopt')
  }

  return (
    <div className="auth-page">
      <div className="auth-panel grid" style={{ gap: 16 }}>
        <div className="auth-brand">{t('brand')}</div>
        <div className="auth-card">
          <div className="row" style={{ gap: 12, marginBottom: 12, justifyContent:'center' }}>
            <NavLink to="/user/login" className={({isActive})=> `pill ${isActive? 'active':''}`}>{t('login')}</NavLink>
            <NavLink to="/user/signup" className={({isActive})=> `pill ${isActive? 'active':''}`}>{t('signup')}</NavLink>
          </div>
          {!isSignup ? <LoginForm onSuccess={onAuthSuccess} /> : <SignUpForm onSuccess={onAuthSuccess} />}
        </div>
      </div>
    </div>
  )
}

function LoginForm({ onSuccess }: { onSuccess: ()=>void }){
  const { t } = useI18n()
  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="input">
        <span className="icon">📧</span>
        <input placeholder={t('email')} />
      </div>
      <div className="input">
        <span className="icon">🔑</span>
        <input placeholder={t('password')} type="password" />
      </div>
      <div className="row" style={{ justifyContent:'space-between' }}>
        <label className="row" style={{ gap: 8 }}>
          <input type="checkbox" />
          <span className="muted">{t('remember_me')}</span>
        </label>
        <Link to="#" className="muted">{t('forgot_password')}</Link>
      </div>
      <button className="btn primary block" onClick={onSuccess}>{t('login')}</button>
      <div className="muted center">{t('continue_with')}</div>
      <div className="grid" style={{ gap: 8 }}>
        <button className="btn light social" onClick={onSuccess}>🟢 Google</button>
        <button className="btn light social" onClick={onSuccess}>🔵 Facebook</button>
      </div>
    </div>
  )
}

function SignUpForm({ onSuccess }: { onSuccess: ()=>void }){
  const { t } = useI18n()
  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="muted center">{t('continue_with')}</div>
      <div className="grid" style={{ gap: 8 }}>
        <button className="btn light social" onClick={onSuccess}>🟢 Google</button>
        <button className="btn light social" onClick={onSuccess}>🔵 Facebook</button>
      </div>
      <div className="muted center">{t('or_create_with_email')}</div>
      <div className="input">
        <span className="icon">📧</span>
        <input placeholder={t('email')} />
      </div>
      <div className="input">
        <span className="icon">🔑</span>
        <input placeholder={t('password')} type="password" />
      </div>
      <button className="btn primary block" onClick={onSuccess}>{t('signup')}</button>
    </div>
  )
}


