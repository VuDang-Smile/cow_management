import { playerNotifications } from '../../mocks/user'
import Card from '../../components/Card'
import { useI18n } from '../../i18n'
import { NavLink } from 'react-router-dom'

export default function UserNotifications(){
  const { t } = useI18n()
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">🔔</div>
            <div>{t('notification')}</div>
          </div>
          <div className="right" />
        </header>

        <Card title={t('notification')}>
          <div className="grid" style={{ gap: 8 }}>
            {playerNotifications.map(n=> (
              <div key={n.id} className="card">
                <div className="row" style={{ justifyContent:'space-between' }}>
                  <div>
                    <div className="section-title">{n.titleKey ? t(n.titleKey) : n.title}</div>
                    <div className="muted">{n.descKey ? format(t(n.descKey), n.params) : n.description}</div>
                  </div>
                  <div className="badge green">{n.type}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <BottomBar />
      </div>
    </div>
  )
}

function format(template: string, params?: Record<string, any>){
  if(!params) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''))
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


