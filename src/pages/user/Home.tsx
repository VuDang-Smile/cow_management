import { sampleCowStatus } from '../../mocks/user'
import { Link } from 'react-router-dom'
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
    <div className="grid" style={{ gap: 16 }}>
      <header className="row" style={{ justifyContent:'space-between' }}>
        <div className="row" style={{ gap: 8, alignItems:'center' }}>
          <div className="badge green" style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center' }}>👤</div>
          <div>{t('hello_owner')}</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Link to="/user/tasks" className="btn secondary">{t('daily_task')}</Link>
          <Link to="/user/rank" className="btn secondary">{t('rank')}</Link>
        </div>
      </header>

      <div className="card">
        <div className="section-title" style={{ textAlign:'center' }}>{t('cows_status')}</div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 12 }}>
          <div className="card">
            <div className="muted">{t('health_overall')}</div>
            <div className={`badge ${statusColor[s.healthOverall]}`}>{s.healthOverall}</div>
          </div>
          <div className="card">
            <div className="muted">{t('milk_yield')}</div>
            <div className="row" style={{ gap: 8, alignItems:'center' }}>
              <div className="stat" style={{ fontSize: 18 }}>{s.milkYieldLPerDay} L/day</div>
              <span className={`badge ${s.trend==='Up'? 'green': s.trend==='Down'?'red':'yellow'}`}>{s.trend}</span>
            </div>
          </div>
          <div className="card">
            <div className="muted">{t('feeding')}</div>
            <div className="row" style={{ alignItems:'center', gap: 8 }}>
              <div style={{ flex:1, height:8, background:'#e5e7eb', borderRadius:999 }}>
                <div style={{ width:`${s.feedingPercent}%`, height:'100%', background:'#16a34a', borderRadius:999 }} />
              </div>
              <div className="muted">{s.feedingPercent}%</div>
            </div>
          </div>
          <div className="card">
            <div className="muted">{t('latest_activity')}</div>
            <div>{s.latestActivity.activity} – {Math.round(s.latestActivity.minutesAgo/60)}h ago</div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  )
}

function BottomBar(){
  const tabs = [
    { to:'/user/home', label:'home' },
    { to:'/user/cow', label:'cow_profile' },
    { to:'/user/scan', label:'scan_qr' },
    { to:'/user/reports', label:'report' },
    { to:'/user/notifications', label:'notification' },
  ]
  return (
    <div className="row" style={{ position:'sticky', bottom: 0, background:'#fff', border:'1px solid var(--border)', borderRadius:16, padding:8, justifyContent:'space-between' }}>
      {tabs.map(tb=> <Link key={tb.to} to={tb.to} className="btn secondary" style={{ flex:1, textAlign:'center' }}>{useI18n().t(tb.label)}</Link>)}
    </div>
  )
}


