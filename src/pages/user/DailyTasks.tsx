import { dailyTasksPlayer } from '../../mocks/user'
import Card from '../../components/Card'
import { useI18n } from '../../i18n'
import { NavLink } from 'react-router-dom'

export default function DailyTasks(){
  const { t } = useI18n()
  return (
    <div className="user-home">
      <div className="home-panel">
        <header className="home-header">
          <div className="owner">
            <div className="avatar">🏁</div>
            <div>{t('daily_tasks')}</div>
          </div>
          <div className="right" />
        </header>

        <Card title={t('daily_tasks')}>
          <div className="grid" style={{ gap: 8 }}>
            {dailyTasksPlayer.map(task=> (
              <div key={task.id} className="row" style={{ justifyContent:'space-between', border:'1px solid var(--border)', borderRadius:12, padding:10 }}>
                <div>
                  <div className="section-title">{(task as any).titleKey ? t((task as any).titleKey) : task.title}</div>
                  <div className="muted">{(task as any).descKey ? t((task as any).descKey) : task.description}</div>
                </div>
                <div className="row" style={{ gap: 8, alignItems:'center' }}>
                  {task.completed ? <span className="badge green">{t('done')}</span> : <button className="btn success">{t('mark_done')}</button>}
                  {task.reward?.points && <span className="badge yellow">+{task.reward.points}pts</span>}
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


