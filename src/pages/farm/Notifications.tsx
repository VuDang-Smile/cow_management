import Card from '../../components/Card'
import { notifications } from '../../mocks/farm'
import { useI18n } from '../../i18n'

export default function Notifications(){
  const { t } = useI18n()
  return (
    <Card title={t('latest_notifications')}>
      <div className="grid" style={{ gap: 8 }}>
        {notifications.map(n=> (
          <div key={n.id} className="card">
            <div className="row" style={{ justifyContent:'space-between' }}>
              <div>
                <div className="section-title">{n.title}</div>
                <div className="muted">{n.description}</div>
              </div>
              <div className="badge yellow">{n.type}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}


