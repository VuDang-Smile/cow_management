import { useState } from 'react'
import { useI18n } from '../../i18n'
import Card from '../../components/Card'

interface Task {
  id: string
  title: string
  description: string
  assignedBy: string
  assignedDate: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  category: string
  estimatedHours: number
  actualHours?: number
  notes: string
}

export default function Tasks() {
  const { t } = useI18n()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [taskUpdate, setTaskUpdate] = useState({
    status: '',
    actualHours: 0,
    notes: ''
  })

  const tasks: Task[] = [
    {
      id: 'T001',
      title: `${t('task_check_health_title')} A001`,
      description: t('task_check_health_desc'),
      assignedBy: t('assigned_by_farm_manager'),
      assignedDate: '2024-01-15',
      dueDate: '2024-01-16',
      priority: 'high',
      status: 'pending',
      category: t('health'),
      estimatedHours: 2,
      notes: t('notif_health_watch_message')
    },
    {
      id: 'T002',
      title: `${t('task_clean_barn_title')} A`,
      description: t('task_clean_barn_desc'),
      assignedBy: t('assigned_by_farm_manager'),
      assignedDate: '2024-01-15',
      dueDate: '2024-01-15',
      priority: 'medium',
      status: 'in_progress',
      category: t('general'),
      estimatedHours: 4,
      actualHours: 2,
      notes: ''
    },
    {
      id: 'T003',
      title: t('task_stock_in_title'),
      description: t('task_stock_in_desc'),
      assignedBy: t('assigned_by_inventory_manager'),
      assignedDate: '2024-01-14',
      dueDate: '2024-01-16',
      priority: 'low',
      status: 'completed',
      category: t('cat_inventory'),
      estimatedHours: 3,
      actualHours: 2.5,
      notes: ''
    },
    {
      id: 'T004',
      title: `${t('task_vaccination_title')} B002`,
      description: t('task_vaccination_desc'),
      assignedBy: t('assigned_by_vet'),
      assignedDate: '2024-01-13',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'overdue',
      category: t('vaccination'),
      estimatedHours: 1,
      notes: ''
    }
  ]

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTask) {
      // Cập nhật trạng thái công việc
      console.log('Cập nhật công việc:', {
        taskId: selectedTask.id,
        ...taskUpdate
      })
      setShowUpdateForm(false)
      setTaskUpdate({
        status: '',
        actualHours: 0,
        notes: ''
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'in_progress': return '🔄'
      case 'completed': return '✅'
      case 'overdue': return '🚨'
      default: return '⚪'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('pending')
      case 'in_progress': return t('in_progress')
      case 'completed': return t('completed')
      case 'overdue': return t('overdue')
      default: return t('unknown')
    }
  }

  const filteredTasks = tasks.filter(task => task.status !== 'completed')

  return (
    <div className="tasks-page">
      <h1>📋 {t('staff_tasks')}</h1>
      
      <div className="grid">
        {/* Danh sách công việc */}
        <Card title={`📝 ${t('assigned_tasks')}`}>
          <div className="task-list">
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-item ${selectedTask?.id === task.id ? 'selected' : ''} ${task.status}`}
                onClick={() => setSelectedTask(task)}
              >
                <div className="task-header">
                  <span className="task-id">{task.id}</span>
                  <span className="task-title">{task.title}</span>
                  <div className="task-badges">
                    <span className={`priority ${task.priority}`}>
                      {getPriorityColor(task.priority)} {task.priority}
                    </span>
                    <span className={`status ${task.status}`}>
                      {getStatusColor(task.status)} {getStatusText(task.status)}
                    </span>
                  </div>
                </div>
                <div className="task-details">
                  <p><strong>{t('task_description')}:</strong> {task.description}</p>
                  <p><strong>{t('task_category')}:</strong> {task.category}</p>
                  <p><strong>{t('assigned_by')}:</strong> {task.assignedBy}</p>
                  <p><strong>{t('assigned_date')}:</strong> {task.assignedDate}</p>
                  <p><strong>{t('due_date')}:</strong> {task.dueDate}</p>
                  <p><strong>{t('estimated_hours')}:</strong> {task.estimatedHours} {t('range_day')}</p>
                                      {task.actualHours && (
                      <p><strong>{t('actual_hours')}:</strong> {task.actualHours} {t('range_day')}</p>
                    )}
                    {task.notes && (
                      <p><strong>{t('notes_label')}:</strong> {task.notes}</p>
                    )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chi tiết và cập nhật công việc */}
        {selectedTask && (
          <Card title={`📊 ${t('task_details')} ${selectedTask.id}`}>
            <div className="task-detail">
              <div className="task-info">
                <h3>{t('task_info')}</h3>
                <p><strong>{t('task_title')}:</strong> {selectedTask.title}</p>
                <p><strong>{t('task_description')}:</strong> {selectedTask.description}</p>
                <p><strong>{t('task_category')}:</strong> {selectedTask.category}</p>
                <p><strong>{t('assigned_by')}:</strong> {selectedTask.assignedBy}</p>
                <p><strong>{t('assigned_date')}:</strong> {selectedTask.assignedDate}</p>
                <p><strong>{t('due_date')}:</strong> {selectedTask.dueDate}</p>
                <p><strong>{t('priority')}:</strong> {getPriorityColor(selectedTask.priority)} {t(selectedTask.priority)}</p>
                <p><strong>{t('status')}:</strong> {getStatusColor(selectedTask.status)} {getStatusText(selectedTask.status)}</p>
                <p><strong>{t('estimated_hours')}:</strong> {selectedTask.estimatedHours} {t('range_day')}</p>
                                  {selectedTask.actualHours && (
                    <p><strong>{t('actual_hours')}:</strong> {selectedTask.actualHours} {t('range_day')}</p>
                  )}
                  {selectedTask.notes && (
                    <p><strong>{t('notes_label')}:</strong> {selectedTask.notes}</p>
                  )}
              </div>

              <div className="task-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowUpdateForm(true)}
                >
                  🔄 {t('update_status')}
                </button>
              </div>

              {showUpdateForm && (
                <div className="update-form">
                  <h4>{t('update_status')}</h4>
                  <form onSubmit={handleStatusUpdate}>
                    <div className="form-group">
                                              <label>{t('new_status')}:</label>
                      <select
                        value={taskUpdate.status}
                        onChange={(e) => setTaskUpdate({
                          ...taskUpdate,
                          status: e.target.value
                        })}
                        required
                      >
                        <option value="">{t('select_status')}</option>
                        <option value="pending">{t('pending')}</option>
                        <option value="in_progress">{t('in_progress')}</option>
                        <option value="completed">{t('completed')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                                              <label>{t('actual_hours')} ({t('range_day')}):</label>
                      <input
                        type="number"
                        step="0.5"
                        value={taskUpdate.actualHours}
                        onChange={(e) => setTaskUpdate({
                          ...taskUpdate,
                          actualHours: parseFloat(e.target.value)
                        })}
                        placeholder={t('actual_hours')}
                      />
                    </div>
                    <div className="form-group">
                                              <label>{t('status_update_notes')}:</label>
                      <textarea
                        value={taskUpdate.notes}
                        onChange={(e) => setTaskUpdate({
                          ...taskUpdate,
                          notes: e.target.value
                        })}
                        placeholder={t('status_update_placeholder')}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-success">
                        💾 {t('save')}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setShowUpdateForm(false)}
                      >
                        ❌ {t('cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
