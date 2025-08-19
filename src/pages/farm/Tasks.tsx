import Card from '../../components/Card'
import { tasks } from '../../mocks/data'
import { Task, TaskType } from '../../interfaces'
import { useI18n } from '../../i18n'
import { useMemo, useState } from 'react'

export default function Tasks(){
  const { lang, t } = useI18n()
  const locale = lang === 'JP' ? 'ja-JP' : 'vi-VN'
  const [filter, setFilter] = useState<'all'|'strategic'|'routine'>('all')
  const [list, setList] = useState<Task[]>(tasks)

  const filtered = useMemo(() => list.filter(t =>
    filter==='all' ? true : filter==='strategic' ? t.type===TaskType.Strategic : t.type===TaskType.Routine
  ), [list, filter])

  const addTask = () => {
    const title = prompt(t('task_name_question'))
    if(!title) return
    const newTask: Task = {
      id: `T${Math.random().toString(36).slice(2,7)}`,
      title,
      description: '',
      dueDate: new Date(),
      assignedTo: t('new_staff'),
      type: TaskType.Routine,
      isCompleted: false,
    }
    setList([newTask, ...list])
  }

  const toggle = (id: string) => setList(prev => prev.map(t => t.id===id? {...t, isCompleted: !t.isCompleted}: t))

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title={t('tasks_list')} rightSlot={
        <div className="row" style={{ gap: 8 }}>
          <select value={filter} onChange={e=> setFilter(e.target.value as any)}>
            <option value="all">{t('all')}</option>
            <option value="strategic">{t('task_type_strategic')}</option>
            <option value="routine">{t('task_type_routine')}</option>
          </select>
          <button className="btn success" onClick={addTask}>+ {t('add_task')}</button>
        </div>
      }>
        <table className="table">
          <thead>
            <tr>
              <th>{t('name')}</th>
              <th>{t('type')}</th>
              <th>{t('assignee')}</th>
              <th>{t('due')}</th>
              <th>{t('status')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tk => (
              <tr key={tk.id}>
                <td>{(tk as any).titleKey ? t((tk as any).titleKey) : tk.title}</td>
                <td>{tk.type}</td>
                <td>{tk.assignedTo}</td>
                <td>{new Date(tk.dueDate).toLocaleDateString(locale)}</td>
                <td>{tk.isCompleted? t('completed'): t('in_progress')}</td>
                <td><button className="btn" onClick={()=> toggle(tk.id)}>{tk.isCompleted? t('unmark_done'): t('mark_done')}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}


