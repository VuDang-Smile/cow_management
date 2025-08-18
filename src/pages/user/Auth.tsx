import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '../../i18n'

export default function Auth(){
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isSignup = pathname.endsWith('/signup')
  const { t } = useI18n()

  return (
    <div className="grid" style={{ gap: 16, maxWidth: 520, margin: '0 auto' }}>
      <div className="card" style={{ background: '#f0fdf4', textAlign: 'center' }}>
        <div className="section-title" style={{ fontSize: 24 }}>{t('brand')}</div>
      </div>
      <div className="card">
        <div className="row" style={{ gap: 12, marginBottom: 12 }}>
          <NavLink to="/user/login" className={({isActive})=> `pill ${isActive? 'active':''}`}>{t('login')}</NavLink>
          <NavLink to="/user/signup" className={({isActive})=> `pill ${isActive? 'active':''}`}>{t('signup')}</NavLink>
        </div>
        {!isSignup ? <LoginForm onSuccess={()=> navigate('/user/adopt')} /> : <SignUpForm onSuccess={()=> navigate('/user/adopt')} />}
      </div>
    </div>
  )
}

function LoginForm({ onSuccess }: { onSuccess: ()=>void }){
  const { t } = useI18n()
  return (
    <div className="grid" style={{ gap: 12 }}>
      <input placeholder={t('email')} />
      <input placeholder={t('password')} type="password" />
      <button className="btn" onClick={onSuccess}>{t('login')}</button>
      <div className="muted" style={{ textAlign: 'center' }}>{t('continue_with')}</div>
      <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
        <button className="btn secondary" onClick={onSuccess}>Google</button>
        <button className="btn secondary" onClick={onSuccess}>Facebook</button>
      </div>
    </div>
  )
}

function SignUpForm({ onSuccess }: { onSuccess: ()=>void }){
  const { t } = useI18n()
  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="muted" style={{ textAlign: 'center' }}>{t('continue_with')}</div>
      <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
        <button className="btn secondary" onClick={onSuccess}>Google</button>
        <button className="btn secondary" onClick={onSuccess}>Facebook</button>
      </div>
      <div className="muted" style={{ textAlign: 'center' }}>{t('or_create_with_email')}</div>
      <input placeholder={t('email')} />
      <input placeholder={t('password')} type="password" />
      <button className="btn" onClick={onSuccess}>{t('signup')}</button>
    </div>
  )
}


