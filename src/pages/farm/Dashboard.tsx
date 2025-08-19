import Card from '../../components/Card'
import Gauge from '../../components/Gauge'
import { getDashboardMetrics } from '../../mocks/farm'
import { useI18n } from '../../i18n'

export default function Dashboard(){
  const { t, lang } = useI18n()
  const locale = lang === 'JP' ? 'ja-JP' : 'vi-VN'
  const metrics = getDashboardMetrics()
  const topHealth = Object.entries(metrics.healthSummary)
    .sort((a,b)=> b[1]-a[1])[0]

  const proportion = metrics.supplyDemand.farmSupplyForecast / Math.max(1, metrics.supplyDemand.allocatedDemandForecast)
  const gaugeValue = proportion < 1 ? 0.5 - (1 - proportion) * 0.5 : 0.5 + (proportion - 1) * 0.5

  return (
    <div className="grid col-3">
      <div className="grid" style={{ gap: 16 }}>
        <Card title={t('dash_internal')}>
          <div className="grid" style={{ gap: 12 }}>
            <div className="card" style={{ background: '#f8fbff' }}>
              <div className="muted">{t('total_cows')}</div>
              <div className="stat">{metrics.totalCows}</div>
            </div>
            <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 12 }}>
              <div className="card">
                <div className="muted">{t('top_health')}</div>
                <div className="stat" style={{ fontSize: 18 }}>{topHealth?.[0]}</div>
                <div className="muted">{t('count')}: {topHealth?.[1]}</div>
              </div>
              <div className="card">
                <div className="muted">{t('today_milk')}</div>
                <div className="stat">{metrics.todayMilkProduction.toLocaleString()} L</div>
                <div className="badge green">+{metrics.milkChangePercentage}% {t('vs_yesterday')}</div>
              </div>
            </div>
            <div className="card">
              <div className="muted">{t('inventory')}</div>
              <div className="row" style={{ gap: 16 }}>
                <div className="badge green">{t('available')}: {metrics.inventorySummary.availableCount}</div>
                <div className="badge yellow">{t('low')}: {metrics.inventorySummary.lowStockCount}</div>
                <div className="badge red">{t('out_of_stock')}: {metrics.inventorySummary.outOfStockCount}</div>
                <div className="right muted">{t('total_value')}: {metrics.inventorySummary.totalValue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title={t('supply_demand_7d')}>
        <Gauge value={gaugeValue} label={`${t('forecast_supply')}: ${metrics.supplyDemand.farmSupplyForecast.toLocaleString()} L · ${t('forecast_demand')}: ${metrics.supplyDemand.allocatedDemandForecast.toLocaleString()} L`} />
        <div style={{ height: 12 }} />
        <Card title={t('analysis_recommendations')}>
          <div className="grid" style={{ gap: 8 }}>
            {metrics.recommendations.map((r, idx)=> (
              <div key={idx} className="row" style={{ justifyContent:'space-between' }}>
                <div>
                  <span className={`badge ${r.type.includes('Cảnh báo') ? 'red' : r.type.includes('Cơ hội') ? 'yellow':'green'}`}>{r.type.includes('Cảnh báo') ? t('rec_type_alert') : r.type.includes('Cơ hội') ? t('rec_type_opportunity') : t('rec_type_action')}</span>
                  <span style={{ marginLeft: 8 }}>{(r as any).descriptionKey ? t((r as any).descriptionKey!) : r.description}</span>
                </div>
                {r.actionLink && <a className="btn secondary" href={r.actionLink}>{t('view')}</a>}
              </div>
            ))}
          </div>
        </Card>
      </Card>

      <Card title={t('alerts_and_tasks')}>
        <Card title={t('smart_alerts')}>
          <div className="grid" style={{ gap: 8 }}>
            {metrics.alerts.map((a: any, i)=> (
              <div key={i} className="card" style={{ background: '#fff7f7' }}>
                <div className="row"><div className="badge red">{t('alert')}</div><div style={{ marginLeft: 8 }}>{a.descriptionKey ? t(a.descriptionKey) : a.description}</div></div>
                <div className="muted">{a.predictedImpactKey ? format(t(a.predictedImpactKey), a.params) : a.predictedImpact}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ height: 12 }} />
        <Card title={t('priority_tasks_today')} rightSlot={<button className="btn success">+ {t('add_task')}</button>}>
          <table className="table">
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('assignee')}</th>
                <th>{t('type')}</th>
                <th>{t('due')}</th>
                <th>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.priorityTasks.slice(0,5).map(task => (
                <tr key={task.id}>
                  <td>{(task as any).titleKey ? t((task as any).titleKey) : task.title}</td>
                  <td>{task.assignedTo}</td>
                  <td>
                    <span className={`badge ${task.type==='Nhiệm vụ Chiến lược' ? 'yellow':'green'}`}>{task.type==='Nhiệm vụ Chiến lược' ? t('task_type_strategic') : t('task_type_routine')}</span>
                  </td>
                  <td>{new Date(task.dueDate).toLocaleDateString(locale)}</td>
                  <td>{task.isCompleted ? t('completed') : t('in_progress')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Card>
    </div>
  )
}

function format(template: string, params?: Record<string, any>){
  if(!params) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''))
}


