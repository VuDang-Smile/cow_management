
import { useI18n } from '../i18n'

type Props = {
  value: number // 0..1 proportion where <0.33 green, <0.66 yellow, else red
  label?: string
}

export default function Gauge({ value, label }: Props) {
  const { t } = useI18n()
  const clamped = Math.max(0, Math.min(1, value))
  const angle = -90 + clamped * 180
  const color = clamped < 0.33 ? '#16a34a' : clamped < 0.66 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <svg width="240" height="140" viewBox="0 0 240 140">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M20,120 A100,100 0 0,1 220,120" fill="none" stroke="url(#g)" strokeWidth="18" />
        <line x1="120" y1="120" x2="120" y2="30" stroke={color} strokeWidth="3" transform={`rotate(${angle} 120 120)`} />
      </svg>
      {label && <div className="muted" style={{ marginTop: -8 }}>{label}</div>}
      <div className="row" style={{ gap: 20 }}>
        <div className="badge green">{t('balanced')}</div>
        <div className="badge yellow">{t('shortage')}</div>
        <div className="badge red">{t('surplus')}</div>
      </div>
    </div>
  )
}


