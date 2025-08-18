import { samplePlayer } from '../../mocks/user'
import { useI18n } from '../../i18n'

export default function UserProfile(){
  const { t } = useI18n()
  const u = samplePlayer
  return (
    <div className="grid" style={{ gap: 16, maxWidth: 720, margin:'0 auto' }}>
      <div className="card">
        <div className="section-title">{t('personal_info')}</div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          <div>Tên hiển thị: <b>{u.displayName}</b></div>
          <div>Địa điểm: <b>{u.location.country} / {u.location.region} / {u.location.city}</b></div>
          <div>Email: <b>{u.email}</b></div>
          <div>Ngôn ngữ: <b>{u.preferences.language}</b></div>
        </div>
      </div>
      <div className="card">
        <div className="section-title">{t('foster_cow')}</div>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          <div>Tên bò: <b>{u.adoptedCowId}</b></div>
          <div>Trang trại: <b>{u.adoptedCowFarm?.name} – {u.adoptedCowFarm?.region}</b></div>
          <div>Bắt đầu: <b>{u.adoptionStartDate?.toLocaleDateString('vi-VN')}</b></div>
        </div>
      </div>
      <div className="card">
        <div className="section-title">{t('game_account')}</div>
        <div className="grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gap: 8 }}>
          <Stat label="Cấp độ" value={u.game.level} />
          <Stat label="Điểm chăm sóc" value={u.game.carePoints} />
          <Stat label="QR tháng" value={u.game.monthlyQRCodesScanned} />
          <div>
            <div className="muted">Huy hiệu</div>
            <div>{u.game.badges.join(', ')}</div>
          </div>
        </div>
      </div>
      <div className="row" style={{ justifyContent:'space-between' }}>
        <button className="btn secondary">{t('change_language')}</button>
        <button className="btn danger">{t('logout')}</button>
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


