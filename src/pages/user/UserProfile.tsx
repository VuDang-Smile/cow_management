import { samplePlayer } from '../../mocks/user'
import { useI18n } from '../../i18n'
import { useNavigate } from 'react-router-dom'

export default function UserProfile(){
  const { t, lang } = useI18n()
  const locale = lang === 'JP' ? 'ja-JP' : 'vi-VN'
  const u = samplePlayer
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('user_logged_in')
    navigate('/user')
  }
  return (
    <div className="grid" style={{ gap: 16, maxWidth: 720, margin:'0 auto' }}>
      <div className="card">
        <div className="section-title">{t('personal_info')}</div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          <div>{t('display_name_label')}: <b>{u.displayName}</b></div>
          <div>{t('location_label')}: <b>{u.location.country} / {u.location.region} / {u.location.city}</b></div>
          <div>{t('email')}: <b>{u.email}</b></div>
          <div>{t('language')}: <b>{u.preferences.language}</b></div>
        </div>
      </div>
      <div className="card">
        <div className="section-title">{t('foster_cow')}</div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          <div>{t('cow_profile')}: <b>{u.adoptedCowId}</b></div>
          <div>{t('farm_label')}: <b>{u.adoptedCowFarm?.name} – {u.adoptedCowFarm?.region}</b></div>
          <div>{t('start_date')}: <b>{u.adoptionStartDate?.toLocaleDateString(locale)}</b></div>
        </div>
      </div>
      <div className="card">
        <div className="section-title">{t('game_account')}</div>
        <div className="grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gap: 8 }}>
          <Stat label={t('level_label')} value={u.game.level} />
          <Stat label={t('care_points_label')} value={u.game.carePoints} />
          <Stat label={t('monthly_qr_label')} value={u.game.monthlyQRCodesScanned} />
          <div>
            <div className="muted">{t('badges_label')}</div>
            <div>{u.game.badges.join(', ')}</div>
          </div>
        </div>
      </div>
      <div className="row" style={{ justifyContent:'space-between' }}>
        <button className="btn secondary">{t('change_language')}</button>
        <button className="btn danger" onClick={handleLogout}>{t('logout')}</button>
      </div>
    </div>
  )
}

function Stat({ label, value }:{ label:string; value:number }){
  return (
    <div>
      <div className="muted">{label}</div>
      <div className="stat" style={{ fontSize: 18 }}>{value}</div>
    </div>
  )
}


