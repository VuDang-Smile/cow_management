import { useI18n } from '../../i18n'
import Card from '../../components/Card'
import Gauge from '../../components/Gauge'

export default function Dashboard() {
  const { t } = useI18n()

  const todayTasks = [
    { id: 1, title: `${t('task_check_health_title')} A001`, status: 'pending', priority: 'high' },
    { id: 2, title: t('task_clean_barn_title'), status: 'in_progress', priority: 'medium' },
    { id: 3, title: t('task_stock_in_title'), status: 'completed', priority: 'low' },
    { id: 4, title: `${t('task_vaccination_title')} B002`, status: 'pending', priority: 'high' }
  ]

  const inventoryAlerts = [
    { item: '飼料', current: 50, min: 100, unit: 'kg' },
    { item: '予防接種薬', current: 5, min: 20, unit: '本' },
    { item: 'ワクチン', current: 8, min: 15, unit: '回分' }
  ]

  const workProgress = {
    completed: 12,
    total: 20,
    percentage: 60
  }

  return (
    <div className="dashboard">
      <h1>🏠 {t('staff_home')}</h1>
      
      <div className="grid">
        {/* Tổng quan công việc */}
        <Card title={`📊 ${t('work_overview')}`}>
          <div className="progress-section">
            <Gauge value={workProgress.percentage} />
            <div className="progress-stats">
              <p>{t('completed_tasks')}: {workProgress.completed}/{workProgress.total} {t('total_tasks')}</p>
              <p>{t('progress_percentage')}: {workProgress.percentage}%</p>
            </div>
          </div>
        </Card>

        {/* Công việc trong ngày */}
        <Card title={`📋 ${t('daily_tasks')}`}>
          <div className="task-list">
            {todayTasks.map(task => (
              <div key={task.id} className={`task-item ${task.status}`}>
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className={`priority ${task.priority}`}>
                    {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {t(task.priority)}
                  </span>
                </div>
                <div className={`status ${task.status}`}>
                  {task.status === 'pending' ? `⏳ ${t('pending')}` :
                   task.status === 'in_progress' ? `🔄 ${t('in_progress')}` : `✅ ${t('completed')}`}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cảnh báo tồn kho */}
        <Card title={`⚠️ ${t('inventory_alerts')}`}>
          <div className="inventory-alerts">
            {inventoryAlerts.map((alert, index) => (
              <div key={index} className="alert-item">
                <div className="alert-info">
                  <span className="item-name">{alert.item}</span>
                  <span className="current-stock">
                    {t('current_stock')}: {alert.current} {alert.unit}
                  </span>
                </div>
                <div className="alert-status">
                  {alert.current < alert.min ? `🔴 ${t('need_supplement')}` : `🟢 ${t('sufficient_stock')}`}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Thông báo nhanh */}
        <Card title={`🔔 ${t('quick_notifications')}`}>
          <div className="quick-notifications">
                          <div className="notification-item">
                <span className="icon">🐄</span>
                <span>{t('health_check_needed')}</span>
              </div>
              <div className="notification-item">
                <span className="icon">💉</span>
                <span>{t('vaccination_schedule')}: 15 {t('nav_cows')}</span>
              </div>
              <div className="notification-item">
                <span className="icon">📦</span>
                <span>{t('feed_order_delivery')}</span>
              </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
