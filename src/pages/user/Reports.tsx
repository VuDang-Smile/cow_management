import Card from '../../components/Card'
import { reportDailyMilk } from '../../mocks/farm'
import { useI18n } from '../../i18n'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function UserReports(){
  const { t } = useI18n()
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title={t('health_report')}>
        <div className="grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gap: 12 }}>
          <Stat label={t('avg_temp')} value="38.5 °C" />
          <Stat label={t('avg_hr')} value="65 bpm" />
          <Stat label={t('activity')} value="OK" />
          <Stat label={t('alerts')} value="0" />
        </div>
      </Card>

      <Card title={t('productivity_14d')}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={reportDailyMilk}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

function Stat({ label, value }:{ label:string; value:string }){
  return (
    <div className="card">
      <div className="muted">{label}</div>
      <div className="stat" style={{ fontSize: 18 }}>{value}</div>
    </div>
  )
}


