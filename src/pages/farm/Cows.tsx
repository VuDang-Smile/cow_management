import Card from '../../components/Card'
import { cows } from '../../mocks/data'
import { CowHealthStatus } from '../../interfaces'
import { useMemo, useState } from 'react'

export default function Cows(){
  const [health, setHealth] = useState<string>('')
  const [breed, setBreed] = useState<string>('')
  const [query, setQuery] = useState<string>('')

  const breeds = useMemo(()=> Array.from(new Set(cows.map(c=> c.breed))), [])
  const filtered = cows.filter(c =>
    (!health || c.healthStatus === health) &&
    (!breed || c.breed === breed) &&
    (!query || c.id.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Bộ lọc" rightSlot={
        <div className="row" style={{ gap: 8 }}>
          <input placeholder="Tìm theo mã" value={query} onChange={e=> setQuery(e.target.value)} />
          <select value={health} onChange={e=> setHealth(e.target.value)}>
            <option value="">Tất cả tình trạng</option>
            {Object.values(CowHealthStatus).map(s=> <option value={s} key={s}>{s}</option>)}
          </select>
          <select value={breed} onChange={e=> setBreed(e.target.value)}>
            <option value="">Tất cả giống</option>
            {breeds.map(b=> <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      }>
        <div className="grid" style={{ gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
          {filtered.map(c=> (
            <div key={c.id} className="card">
              <div className="row" style={{ justifyContent:'space-between' }}>
                <div className="section-title">{c.id}</div>
                <div className="badge green">{c.breed}</div>
              </div>
              <div className="muted">Ngày sinh: {new Date(c.birthDate).toLocaleDateString('vi-VN')}</div>
              <div className="muted">Tình trạng: {c.healthStatus}</div>
              <div className="muted">Dự kiến 24h tới: <b>{c.predictedMilkNext24h} lít</b></div>
              <div className="muted">Tiềm năng 7 ngày: <b>{c.predictedMilkNext7Days} lít</b></div>
              <div className="muted">Yếu tố: {c.influencingFactors.join(', ')}</div>
              <div className="actions" style={{ marginTop: 8 }}>
                <button className="btn secondary">+ Ghi nhật ký</button>
                <button className="btn danger">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}


