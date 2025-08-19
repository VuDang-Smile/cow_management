import Card from '../../components/Card'
import { reportDailyMilk, reportSupplyDemand, employeePerformance, reportMilkWeekly, reportMilkMonthly, reportSupplyDemandWeekly, reportSupplyDemandMonthly } from '../../mocks/farm'
import { useI18n } from '../../i18n'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Bar, BarChart } from 'recharts'
import { useMemo, useState } from 'react'

export default function Reports(){
  const { t } = useI18n()
  const [range, setRange] = useState<'week' | 'month' | 'day'>('week')

  const milkData = useMemo(() => {
    if(range === 'day') return reportDailyMilk.slice(-14)
    if(range === 'week') return reportMilkWeekly
    return reportMilkMonthly
  }, [range])

  const supplyDemandData = useMemo(() => {
    if(range === 'day') return reportSupplyDemand.slice(-14)
    if(range === 'week') return reportSupplyDemandWeekly
    return reportSupplyDemandMonthly
  }, [range])

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <div className="actions">
          <button className={`pill ${range === 'day' ? 'active' : ''}`} onClick={() => setRange('day')}>Ngày</button>
          <button className={`pill ${range === 'week' ? 'active' : ''}`} onClick={() => setRange('week')}>Tuần</button>
          <button className={`pill ${range === 'month' ? 'active' : ''}`} onClick={() => setRange('month')}>Tháng</button>
        </div>
      </div>
      <Card title={t('farm_report_milk_14d')}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={milkData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title={t('farm_report_supply_demand')}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={supplyDemandData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="supply" name={t('forecast_supply')} stroke="#0ea5e9" />
            <Line type="monotone" dataKey="actual" name={t('actual_production')} stroke="#16a34a" />
            <Line type="monotone" dataKey="demand" name={t('allocated_demand')} stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
        <div className="muted" style={{ marginTop: 8 }}>{t('farm_report_gap_hint')}</div>
      </Card>

      <Card title={t('farm_report_employee_performance')}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={employeePerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" name={t('tasks')} fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}


