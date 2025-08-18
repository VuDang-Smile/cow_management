import { adoptableCows } from '../../mocks/user'
import { useI18n } from '../../i18n'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Adopt(){
  const { t } = useI18n()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const onAdopt = () => {
    if(!selectedId) return
    // mock: lưu bò được chọn rồi vào home
    localStorage.setItem('adopted_cow_id', selectedId)
    navigate('/user/home')
  }
  return (
    <div className="adopt-page">
      <div className="adopt-panel">
        <div className="adopt-hero">
          <div className="brand">MILK CHAIN</div>
          <div className="welcome">{t('welcome_user')}</div>
          <div className="subtitle">{t('adopt_title')}</div>
        </div>
        <div className="adopt-card">
          <div className="row" style={{ justifyContent:'space-between', marginBottom:8 }}>
            <div className="section-title">{t('available_cows')}</div>
            <a className="muted" href="#">{t('see_all')}</a>
          </div>
          <div className="adopt-list">
            {adoptableCows.slice(0,8).map(c=> (
              <button
                key={c.id}
                className="adopt-item"
                onClick={()=> setSelectedId(c.id)}
                aria-pressed={selectedId===c.id}
                style={{ outline:selectedId===c.id? '3px solid #16a34a' : 'none' }}
              >
                <div className="left">
                  <div className="avatar">🐮</div>
                  <div className="meta">
                    <div className="name">{c.name}, {c.weightKg}kg</div>
                    <div className="desc">from {c.farmName}, {c.location}</div>
                  </div>
                </div>
                <div className="arrow">›</div>
              </button>
            ))}
          </div>
          <button className="btn block adopt-btn" disabled={!selectedId} onClick={onAdopt}>{t('adopt')}</button>
        </div>
      </div>
    </div>
  )
}


