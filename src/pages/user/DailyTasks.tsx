import { dailyTasksPlayer } from '../../mocks/user'
import Card from '../../components/Card'
import { useI18n } from '../../i18n'

export default function DailyTasks(){
  const { t } = useI18n()
  return (
    <Card title={t('daily_tasks')}>
      <div className="grid" style={{ gap: 8 }}>
        {dailyTasksPlayer.map(t=> (
          <div key={t.id} className="row" style={{ justifyContent:'space-between', border:'1px solid var(--border)', borderRadius:12, padding:10 }}>
            <div>
              <div className="section-title">{t.title}</div>
              <div className="muted">{t.description}</div>
            </div>
            <div className="row" style={{ gap: 8, alignItems:'center' }}>
              {t.completed ? <span className="badge green">{t('done')}</span> : <button className="btn success">{t('mark_done')}</button>}
              {t.reward?.points && <span className="badge yellow">+{t.reward.points}pts</span>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}


