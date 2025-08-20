import { useState } from 'react'
import { useI18n } from '../../i18n'
import Card from '../../components/Card'

interface Notification {
  id: string
  title: string
  message: string
  type: 'task' | 'inventory' | 'vaccination' | 'health' | 'order' | 'general'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  date: string
  isRead: boolean
  actionRequired: boolean
  relatedId?: string
  category: string
}

export default function Notifications() {
  const { t } = useI18n()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const notifications: Notification[] = [
    {
      id: 'N001',
      title: t('notif_task_new_assigned_title'),
      message: t('notif_task_new_assigned_message'),
      type: 'task',
      priority: 'high',
      date: '2024-01-15 08:30',
      isRead: false,
      actionRequired: true,
      relatedId: 'T001',
      category: t('task')
    },
    {
      id: 'N002',
      title: t('notif_inventory_low_title'),
      message: t('notif_inventory_low_message'),
      type: 'inventory',
      priority: 'urgent',
      date: '2024-01-15 07:15',
      isRead: false,
      actionRequired: true,
      relatedId: 'I001',
      category: t('cat_inventory')
    },
    {
      id: 'N003',
      title: t('notif_vaccination_upcoming_title'),
      message: t('notif_vaccination_upcoming_message'),
      type: 'vaccination',
      priority: 'medium',
      date: '2024-01-14 16:45',
      isRead: true,
      actionRequired: false,
      category: t('vaccination')
    },
    {
      id: 'N004',
      title: t('notif_order_confirmed_title'),
      message: t('notif_order_confirmed_message'),
      type: 'order',
      priority: 'low',
      date: '2024-01-14 14:20',
      isRead: true,
      actionRequired: false,
      relatedId: 'O001',
      category: t('order')
    },
    {
      id: 'N005',
      title: t('notif_health_watch_title'),
      message: t('notif_health_watch_message'),
      type: 'health',
      priority: 'high',
      date: '2024-01-14 10:30',
      isRead: false,
      actionRequired: true,
      relatedId: 'A002',
      category: t('health')
    },
    {
      id: 'N006',
      title: t('notif_policy_update_title'),
      message: t('notif_policy_update_message'),
      type: 'general',
      priority: 'medium',
      date: '2024-01-13 09:00',
      isRead: true,
      actionRequired: false,
      category: t('general')
    },
    {
      id: 'N007',
      title: t('notif_med_expiry_title'),
      message: t('notif_med_expiry_message'),
      type: 'inventory',
      priority: 'medium',
      date: '2024-01-13 15:30',
      isRead: false,
      actionRequired: true,
      relatedId: 'I002',
      category: t('cat_inventory')
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return '📋'
      case 'inventory': return '📦'
      case 'vaccination': return '💉'
      case 'health': return '🏥'
      case 'order': return '📋'
      case 'general': return '📢'
      default: return '📌'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🔴'
      case 'high': return '🟠'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Khẩn cấp'
      case 'high': return 'Cao'
      case 'medium': return 'Trung bình'
      case 'low': return 'Thấp'
      default: return 'Không xác định'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.isRead
    if (filter === 'urgent') return notification.priority === 'urgent'
    return notification.type === filter
  })

  const markAsRead = (notificationId: string) => {
    // Đánh dấu thông báo đã đọc
    console.log('Đánh dấu đã đọc:', notificationId)
  }

  const handleAction = (notification: Notification) => {
    // Xử lý hành động tương ứng với loại thông báo
    console.log('Thực hiện hành động cho thông báo:', notification.id)
    markAsRead(notification.id)
  }

  return (
    <div className="notifications-page">
      <h1>🔔 {t('staff_notifications')}</h1>
      
      <div className="grid">
        {/* Bộ lọc thông báo */}
        <Card title={`🔍 ${t('notification_filter')}`}>
          <div className="filter-controls">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
                              <option value="all">{t('all_notifications')}</option>
                <option value="unread">{t('unread_notifications')}</option>
                <option value="urgent">{t('urgent_notifications')}</option>
                <option value="task">{t('task_notifications')}</option>
                <option value="inventory">{t('inventory_notifications')}</option>
                <option value="vaccination">{t('vaccination_notifications')}</option>
                <option value="health">{t('health_notifications')}</option>
                <option value="order">{t('order_notifications')}</option>
                <option value="general">{t('general_notifications')}</option>
            </select>
          </div>
        </Card>

        {/* Danh sách thông báo */}
        <Card title={`📝 ${t('notifications_list')} (${filteredNotifications.length})`}>
          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div className="no-notifications">
                <p>📭 {t('no_notifications')}</p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${selectedNotification?.id === notification.id ? 'selected' : ''} ${notification.isRead ? 'read' : 'unread'}`}
                  onClick={() => setSelectedNotification(notification)}
                >
                  <div className="notification-header">
                    <span className="notification-icon">
                      {getTypeIcon(notification.type)}
                    </span>
                    <span className="notification-title">{notification.title}</span>
                    <div className="notification-badges">
                                          <span className={`priority ${notification.priority}`}>
                      {getPriorityColor(notification.priority)} {t(notification.priority)}
                    </span>
                      {!notification.isRead && (
                        <span className="unread-badge">🔴</span>
                      )}
                      {notification.actionRequired && (
                        <span className="action-badge">⚡</span>
                      )}
                    </div>
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <div className="notification-meta">
                      <span className="category">{t(notification.category)}</span>
                      <span className="date">{notification.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Chi tiết thông báo */}
        {selectedNotification && (
          <Card title={`📊 ${t('notification_details')}`}>
            <div className="notification-detail">
              <div className="notification-info">
                <h3>{selectedNotification.title}</h3>
                <div className="notification-meta-detail">
                  <p><strong>{t('notification_type')}:</strong> {getTypeIcon(selectedNotification.type)} {t(selectedNotification.category)}</p>
                  <p><strong>{t('notification_priority')}:</strong> {getPriorityColor(selectedNotification.priority)} {t(selectedNotification.priority)}</p>
                  <p><strong>{t('notification_time')}:</strong> {selectedNotification.date}</p>
                  <p><strong>{t('notification_status')}:</strong> {selectedNotification.isRead ? `✅ ${t('read')}` : `🔴 ${t('unread')}`}</p>
                  {selectedNotification.actionRequired && (
                    <p><strong>{t('action_required')}:</strong> ⚡ {t('action_required')}</p>
                  )}
                </div>
                <div className="notification-message-detail">
                  <h4>{t('notification_content')}:</h4>
                  <p>{selectedNotification.message}</p>
                </div>
                {selectedNotification.relatedId && (
                  <div className="related-item">
                    <p><strong>{t('related_item')}:</strong> {selectedNotification.relatedId}</p>
                  </div>
                )}
              </div>

              <div className="notification-actions">
                {!selectedNotification.isRead && (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => markAsRead(selectedNotification.id)}
                  >
                    ✅ {t('mark_as_read')}
                  </button>
                )}
                {selectedNotification.actionRequired && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAction(selectedNotification)}
                  >
                    ⚡ {t('perform_action')}
                  </button>
                )}
                <button 
                  className="btn btn-info"
                  onClick={() => setSelectedNotification(null)}
                >
                                      🔙 {t('go_back')}
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
