import { useState } from 'react'
import { useI18n } from '../../i18n'

export default function ScanQR(){
  const { t } = useI18n()
  const [result, setResult] = useState<string>('')
  return (
    <div className="grid" style={{ gap: 16, maxWidth: 560, margin:'0 auto' }}>
      <div className="card" style={{ textAlign:'center' }}>
        <div className="section-title">{t('scan_qr_title')}</div>
        <div className="muted">{t('scan_mock_hint')}</div>
        <input placeholder={t('paste_qr')} />
        <button className="btn" onClick={()=> setResult('+10 points!')}>{t('scan')}</button>
        {result && <div className="badge green" style={{ marginTop: 8 }}>{result}</div>}
      </div>
    </div>
  )
}


