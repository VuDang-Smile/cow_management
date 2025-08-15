import Card from '../components/Card'
import { tasks } from '../mocks/data'
import { Task, TaskType } from '../interfaces'
import { useMemo, useState } from 'react'

export default function Tasks(){
  const [filter, setFilter] = useState<'all'|'strategic'|'routine'>('all')
  const [list, setList] = useState<Task[]>(tasks)

  const filtered = useMemo(() => list.filter(t =>
    filter==='all' ? true : filter==='strategic' ? t.type===TaskType.Strategic : t.type===TaskType.Routine
  ), [list, filter])

  const addTask = () => {
    const title = prompt('Tên nhiệm vụ?')
    if(!title) return
    const newTask: Task = {
      id: `T${Math.random().toString(36).slice(2,7)}`,
      title,
      description: '',
      dueDate: new Date(),
      assignedTo: 'Nhân viên mới',
      type: TaskType.Routine,
      isCompleted: false,
    }
    setList([newTask, ...list])
  }

  const toggle = (id: string) => setList(prev => prev.map(t => t.id===id? {...t, isCompleted: !t.isCompleted}: t))

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Danh sách nhiệm vụ" rightSlot={
        <div className="row" style={{ gap: 8 }}>
          <select value={filter} onChange={e=> setFilter(e.target.value as any)}>
            <option value="all">Tất cả</option>
            <option value="strategic">Nhiệm vụ Chiến lược</option>
            <option value="routine">Nhiệm vụ định kỳ</option>
          </select>
          <button className="btn success" onClick={addTask}>+ Thêm nhiệm vụ</button>
        </div>
      }>
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Loại</th>
              <th>Người phụ trách</th>
              <th>Hạn</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.type}</td>
                <td>{t.assignedTo}</td>
                <td>{new Date(t.dueDate).toLocaleDateString('vi-VN')}</td>
                <td>{t.isCompleted? 'Hoàn thành':'Đang thực hiện'}</td>
                <td><button className="btn" onClick={()=> toggle(t.id)}>{t.isCompleted? 'Bỏ hoàn thành':'Đánh dấu xong'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}



