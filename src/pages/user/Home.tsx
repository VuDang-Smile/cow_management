import { sampleCowStatus } from '../../mocks/user'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n'

const statusColor = {
  Good: 'green',
  Fair: 'yellow',
  Poor: 'red',
} as const

export default function UserHome(){
  const { t } = useI18n()
  const s = sampleCowStatus
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">👤</div>
            <div>{t('hello_owner')}</div>
          </div>
          <div className="right" />
        </header>

        <div className="home-grid">
          <div>
            <div className="status-card">
              <div className="title">{t('cows_status')}</div>
              <div className="metric">
                <span className="name">{t('health_overall')}</span>
                <span className={`badge ${statusColor[s.healthOverall]}`}>{s.healthOverall}</span>
              </div>
              <div className="metric">
                <span className="name">{t('milk_yield')}</span>
                <span className="value">{s.milkYieldLPerDay} L/day</span>
              </div>
              <div className="metric">
                <span className="name">{t('feeding')}</span>
                <span className="progress"><span className="bar"><span className="fill" style={{ width:`${s.feedingPercent}%` }} /></span><span className="muted">{s.feedingPercent}%</span></span>
              </div>
              <div className="metric">
                <span className="name">{t('latest_activity')}</span>
                <span className="value">{s.latestActivity.activity} · {Math.round(s.latestActivity.minutesAgo/60)}h</span>
              </div>
            </div>
          </div>
          <div className="right-widgets">
            <Link to="/user/tasks" className="widget-card link">
              <div className="icon">🏁</div>
              <div className="label">{t('daily_task')}</div>
            </Link>
            <Link to="/user/rank" className="widget-card link">
              <div className="icon">📊</div>
              <div className="label">{t('rank')}</div>
            </Link>
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



