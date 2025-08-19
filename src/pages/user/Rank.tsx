import { farmRanks } from '../../mocks/user'
import Card from '../../components/Card'
import { useI18n } from '../../i18n'
import { NavLink } from 'react-router-dom'

export default function Rank(){
  const { t } = useI18n()
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">📊</div>
            <div>{t('farm_rank')}</div>
          </div>
          <div className="right" />
        </header>

        <Card title={t('farm_rank')}>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('farm_col')}</th>
                <th>{t('province')}</th>
                <th>{t('production_per_day')}</th>
                <th>{t('health_score')}</th>
                <th>{t('completion_rate')}</th>
              </tr>
            </thead>
            <tbody>
              {farmRanks.map(r=> (
                <tr key={r.rank}>
                  <td>{r.rank}</td>
                  <td>{r.farmName}</td>
                  <td>{r.region}</td>
                  <td>{r.totalMilkYield.toLocaleString()}</td>
                  <td>{r.avgHealthScore}%</td>
                  <td>{r.taskCompletionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

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


