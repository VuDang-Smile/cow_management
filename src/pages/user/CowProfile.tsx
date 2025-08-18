import { cows } from '../../mocks/farm'
import { activityStats, feedingStats, milkStats } from '../../mocks/user'
import { useI18n } from '../../i18n'
import { NavLink } from 'react-router-dom'

export default function CowProfile(){
  const { t } = useI18n()
  const cow = cows[0]
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">🐮</div>
            <div>{t('cow_profile')}</div>
          </div>
          <div className="right" />
        </header>

        <div className="grid" style={{ gap: 12 }}>
          <div className="card">
            <div className="section-title">{t('identity')}</div>
            <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
              <div>Mã số: <b>{cow.id}</b></div>
              <div>Giống: <b>{cow.breed}</b></div>
              <div>Ngày sinh: <b>{new Date(cow.birthDate).toLocaleDateString('vi-VN')}</b></div>
              <div>{t('origin')}: <b>ABC Farm</b></div>
            </div>
          </div>
          <div className="card">
            <div className="section-title">{t('health_rt')}</div>
            <div className="grid" style={{ gridTemplateColumns:'repeat(2,1fr)', gap: 12 }}>
              <Metric label={t('temperature')} value="38.5 °C" color="#16a34a" />
              <Metric label={t('heart_rate')} value="65 bpm" color="#16a34a" />
              <Metric label={t('sign')} value="OK" color="#16a34a" />
              <Metric label={t('overall')} value={cow.healthStatus} color="#16a34a" />
            </div>
          </div>
          <div className="card">
            <div className="section-title">{t('milk')}</div>
            <div className="muted"><b>{milkStats.todayLiters}</b> L</div>
          </div>
          <div className="card">
            <div className="section-title">{t('feeding_rt')}</div>
            <div className="muted">{t('meals_today')}: <b>{feedingStats.mealsToday}</b> · {t('consumption')}: <b>{feedingStats.consumptionPercent}%</b></div>
          </div>
          <div className="card">
            <div className="section-title">{t('last_activity')}</div>
            <div className="muted">Steps: <b>{activityStats.steps.toLocaleString()}</b> · Stand/Lie: <b>{activityStats.standHours}h/{activityStats.lieHours}h</b></div>
          </div>
          <div className="card">
            <div className="section-title">{t('vaccine_history')}</div>
            <ul>
              <li>FMD – 01/03/2024</li>
              <li>Brucellosis – 01/09/2024</li>
            </ul>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  )
}

function Metric({ label, value, color }:{ label:string; value:string; color:string }){
  return (
    <div className="card" style={{ background:'#f8fafc' }}>
      <div className="muted">{label}</div>
      <div style={{ color, fontWeight:700 }}>{value}</div>
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


