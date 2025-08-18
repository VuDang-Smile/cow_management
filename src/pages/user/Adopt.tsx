import { adoptableCows } from '../../mocks/user'
import { useI18n } from '../../i18n'

export default function Adopt(){
  const { t } = useI18n()
  return (
    <div className="grid" style={{ gap: 16, maxWidth: 720, margin: '0 auto' }}>
      <div className="card" style={{ background: '#f0fdf4', textAlign: 'center' }}>
        <div className="section-title" style={{ fontSize: 28 }}>{t('welcome_user')}</div>
        <div className="section-title" style={{ fontSize: 22 }}>{t('adopt_title')}</div>
      </div>
      <div className="card">
        <div className="row" style={{ justifyContent:'space-between' }}>
          <div className="section-title">{t('available_cows')}</div>
          <a className="muted" href="#">{t('see_all')}</a>
        </div>
        <div className="grid" style={{ gap: 10 }}>
          {adoptableCows.slice(0,8).map(c=> (
            <div key={c.id} className="row" style={{ alignItems:'center', justifyContent:'space-between', border:'1px solid var(--border)', borderRadius:12, padding:'10px 12px' }}>
              <div className="row" style={{ gap: 12, alignItems:'center' }}>
                <div className="badge green">{c.name}</div>
                <div>{c.weightKg}kg</div>
                <div className="muted">from {c.farmName}, {c.location}</div>
              </div>
              <button className="btn secondary">{t('select')}</button>
            </div>
          ))}
        </div>
        <div style={{ height: 12 }} />
        <button className="btn" style={{ width:'100%' }}>{t('adopt')}</button>
      </div>
    </div>
  )
}


