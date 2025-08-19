import Card from '../../components/Card'
import { cows } from '../../mocks/farm'
import { CowHealthStatus } from '../../interfaces'
import { useMemo, useState } from 'react'
import { useI18n } from '../../i18n'

export default function Cows(){
  const { t, lang } = useI18n()
  const [health, setHealth] = useState<string>('')
  const [breed, setBreed] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [analyzingIds, setAnalyzingIds] = useState<Record<string, boolean>>({})
  const locale = lang === 'JP' ? 'ja-JP' : 'vi-VN'

  const breeds = useMemo(()=> Array.from(new Set(cows.map(c=> c.breed))), [])
  const filtered = cows.filter(c =>
    (!health || c.healthStatus === health) &&
    (!breed || c.breed === breed) &&
    (!query || c.id.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title={t('filters')} rightSlot={
        <div className="row" style={{ gap: 8 }}>
          <input placeholder={t('search_by_id')} value={query} onChange={e=> setQuery(e.target.value)} />
          <select value={health} onChange={e=> setHealth(e.target.value)}>
            <option value="">{t('all_health')}</option>
            {Object.values(CowHealthStatus).map(s=> <option value={s} key={s}>{s}</option>)}
          </select>
          <select value={breed} onChange={e=> setBreed(e.target.value)}>
            <option value="">{t('all_breeds')}</option>
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
              <div className="muted">{t('dob')}: {new Date(c.birthDate).toLocaleDateString(locale)}</div>
              <div className="muted">{t('status')}: {c.healthStatus}</div>
              <div className="card" style={{ background:'#f9fffb', marginTop:8 }}>
                <div className="row" style={{ justifyContent:'space-between', marginBottom:4 }}>
                  <div className="section-title">{t('ai_yield_analysis')}</div>
                  <div className="right">
                    {analyzingIds[c.id] ? (
                      <div className="row">
                        <div className="spinner" />
                        <div className="muted">{t('ai_analyzing')}</div>
                      </div>
                    ) : (
                      <button
                        className="btn success"
                        onClick={() => {
                          setAnalyzingIds(prev => ({ ...prev, [c.id]: true }))
                          setTimeout(() => {
                            setAnalyzingIds(prev => ({ ...prev, [c.id]: false }))
                          }, 1500)
                        }}
                      >
                        {t('ai_analyze')}
                      </button>
                    )}
                  </div>
                </div>
                <div className="muted">{t('pred_24h')}: <b>{c.predictedMilkNext24h} L</b></div>
                <div className="muted">{t('potential_7d')}: <b>{c.predictedMilkNext7Days} L</b></div>
                <div className="muted">{t('factors')}: {c.influencingFactors.map(f=> t(f)).join(', ')}</div>
              </div>
              <div className="actions" style={{ marginTop: 8 }}>
                <button className="btn secondary">+ {t('add_log')}</button>
                <button className="btn danger">{t('delete')}</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}


