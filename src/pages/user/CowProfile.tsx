import { cows } from '../../mocks/farm'
import { activityStats, feedingStats, milkStats } from '../../mocks/user'
import { useI18n } from '../../i18n'

export default function CowProfile(){
  const { t } = useI18n()
  const cow = cows[0]
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="section-title">{t('identity')}</div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          <div>Mã số: <b>{cow.id}</b></div>
          <div>Giống: <b>{cow.breed}</b></div>
          <div>Ngày sinh: <b>{new Date(cow.birthDate).toLocaleDateString('vi-VN')}</b></div>
          <div>{t('origin')}: <b>ABC Farm</b></div>
        </div>
      </div>
      <div className="card">
        <div className="section-title">{t('health_rt')}</div>
        <div className="grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gap: 12 }}>
          <Metric label={t('temperature')} value="38.5 °C" color="#16a34a" />
          <Metric label={t('heart_rate')} value="65 bpm" color="#16a34a" />
          <Metric label={t('sign')} value="OK" color="#16a34a" />
          <Metric label={t('overall')} value={cow.healthStatus} color="#16a34a" />
        </div>
      </div>
      <div className="card">
        <div className="section-title">{t('milk')}</div>
        <div className="muted">{t('productivity_14d').includes('14') ? '' : ''}<b>{milkStats.todayLiters}</b> L</div>
      </div>
      <div className="card">
        <div className="section-title">{t('feeding_rt')}</div>
        <div className="muted">{t('meals_today')}: <b>{feedingStats.mealsToday}</b> · {t('consumption')}: <b>{feedingStats.consumptionPercent}%</b></div>
      </div>
      <div className="card">
        <div className="section-title">{t('last_activity')}</div>
        <div className="muted">Steps: <b>{activityStats.steps.toLocaleString()}</b> · Stand/Lie: <b>{activityStats.standHours}h/{activityStats.lieHours}h</b></div>
      </div>
      <div className="card">
        <div className="section-title">{t('vaccine_history')}</div>
        <ul>
          <li>FMD – 01/03/2024</li>
          <li>Brucellosis – 01/09/2024</li>
        </ul>
      </div>
    </div>
  )
}

function Metric({ label, value, color }:{ label:string; value:string; color:string }){
  return (
    <div className="card" style={{ background:'#f8fafc' }}>
      <div className="muted">{label}</div>
      <div style={{ color, fontWeight:700 }}>{value}</div>
    </div>
  )
}


