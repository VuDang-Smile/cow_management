import Card from '../../components/Card'
import { notifications } from '../../mocks/data'

export default function Notifications(){
  return (
    <Card title="Thông báo mới nhất">
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


