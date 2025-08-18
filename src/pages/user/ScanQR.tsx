import { useState } from 'react'
import { useI18n } from '../../i18n'
import { NavLink } from 'react-router-dom'

export default function ScanQR(){
  const { t } = useI18n()
  const [result, setResult] = useState<string>('')
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">🔳</div>
            <div>{t('scan_qr_title')}</div>
          </div>
          <div className="right" />
        </header>

        <div className="qr-card">
          <div className="qr-box">
            <div className="muted">Camera preview mock</div>
          </div>
          <div className="qr-actions">
            <input placeholder={t('paste_qr')} />
            <button className="btn primary" onClick={()=> setResult('+10 points!')}>{t('scan')}</button>
            {result && <div className="badge green" style={{ justifySelf:'center' }}>{result}</div>}
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  )
}

function BottomBar(){
  const tabs = [
    { to:'/user/home', label:'home', icon:'🏠' },
    { to:'/user/cow', label:'cow_profile', icon:'🐮' },
    { to:'/user/scan', label:'scan_qr', icon:'🔳' },
    { to:'/user/reports', label:'report', icon:'📄' },
    { to:'/user/notifications', label:'notification', icon:'🔔' },
  ] as const
  const { t } = useI18n()
  return (
    <nav className="bottom-nav">
      {tabs.map(tb=> (
        <NavLink key={tb.to} to={tb.to} className={({isActive})=> `nav-item ${isActive? 'active':''}`}>
          <span className="icon">{tb.icon}</span>
          <span className="muted">{t(tb.label)}</span>
        </NavLink>
      ))}
    </nav>
  )
}


