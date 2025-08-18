import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { } from 'react'
import { useI18n } from '../i18n'
import FarmApp from './farm/FarmApp'
import UserApp from './user/UserApp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLanding/>} />
      <Route path="/farm/*" element={<FarmApp />} />
      <Route path="/user/*" element={<UserApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function HomeLanding(){
  const { lang, setLang, t } = useI18n()

  return (
    <div className="container">
      <div className="grid" style={{ gap: 16, maxWidth: 520, margin:'40px auto' }}>
        <div className="card" style={{ textAlign:'center', background:'#f8fff8' }}>
          <div className="section-title" style={{ fontSize: 28 }}>MILK CHAIN</div>
          <div className="muted">{t('choose_entry')}</div>
        </div>
        <div className="row" style={{ gap: 8, justifyContent:'center' }}>
          <span className="muted">{t('language')}:</span>
          <button className={`btn ${lang==='VN'? '' : 'secondary'}`} onClick={()=> setLang('VN')}>VN</button>
          <button className={`btn ${lang==='JP'? '' : 'secondary'}`} onClick={()=> setLang('JP')}>JP</button>
        </div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 12 }}>
          <Link className="btn" to="/user/home">{t('entry_user')}</Link>
          <Link className="btn secondary" to="/farm">{t('entry_farm')}</Link>
        </div>
      </div>
    </div>
  )
}


