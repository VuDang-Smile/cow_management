import { playerNotifications } from '../../mocks/user'
import Card from '../../components/Card'
import { useI18n } from '../../i18n'

export default function UserNotifications(){
  const { t } = useI18n()
  return (
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
  )
}

function format(template: string, params?: Record<string, any>){
  if(!params) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''))
}


