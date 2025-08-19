import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n'

export default function BottomBar(){
  const tabs = [
    { to:'/user/home', label:'home', icon:'🏠' },
    { to:'/user/cow', label:'cow_profile', icon:'🐮' },
    { to:'/user/scan', label:'scan_qr', icon:'🔳' },
    { to:'/user/reports', label:'report', icon:'📄' },
    { to:'/user/news', label:'news', icon:'📰' },
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


