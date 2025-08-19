import Card from '../../components/Card'
import { reportDailyMilk, reportMilkWeekly, reportMilkMonthly } from '../../mocks/farm'
import { useI18n } from '../../i18n'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { NavLink } from 'react-router-dom'
import { useMemo, useState } from 'react'

export default function UserReports(){
  const { t } = useI18n()
  const [range, setRange] = useState<'week' | 'month' | 'day'>('day')
  const data = useMemo(() => {
    if(range === 'week') return reportMilkWeekly
    if(range === 'month') return reportMilkMonthly
    return reportDailyMilk.slice(-14)
  }, [range])
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">📄</div>
            <div>{t('report')}</div>
          </div>
          <div className="right" />
        </header>

        <div className="grid" style={{ gap: 12 }}>
          <Card title={t('health_report')}>
            <div className="grid" style={{ gridTemplateColumns:'repeat(2,1fr)', gap: 12 }}>
              <Stat label={t('avg_temp')} value="38.5 °C" />
              <Stat label={t('avg_hr')} value="65 bpm" />
              <Stat label={t('activity')} value="OK" />
              <Stat label={t('alerts')} value="0" />
            </div>
          </Card>

          <Card title={t('productivity_14d')}>
            <div className="row" style={{ justifyContent: 'flex-end', marginBottom: 8 }}>
              <div className="actions">
                <button className={`pill ${range === 'day' ? 'active' : ''}`} onClick={() => setRange('day')}>{t('range_day')}</button>
                <button className={`pill ${range === 'week' ? 'active' : ''}`} onClick={() => setRange('week')}>{t('range_week')}</button>
                <button className={`pill ${range === 'month' ? 'active' : ''}`} onClick={() => setRange('month')}>{t('range_month')}</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <BottomBar />
      </div>
    </div>
  )
}

function Stat({ label, value }:{ label:string; value:string }){
  return (
    <div className="card">
      <div className="muted">{label}</div>
      <div className="stat" style={{ fontSize: 18 }}>{value}</div>
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


