import { farmRanks } from '../../mocks/user'
import Card from '../../components/Card'
import { useI18n } from '../../i18n'

export default function Rank(){
  const { t } = useI18n()
  return (
    <Card title={t('farm_rank')}>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Trang trại</th>
            <th>Tỉnh</th>
            <th>Sản lượng (L/ngày)</th>
            <th>Điểm sức khỏe</th>
            <th>Tỉ lệ hoàn thành</th>
          </tr>
        </thead>
        <tbody>
          {farmRanks.map(r=> (
            <tr key={r.rank}>
              <td>{r.rank}</td>
              <td>{r.farmName}</td>
              <td>{r.region}</td>
              <td>{r.totalMilkYield.toLocaleString()}</td>
              <td>{r.avgHealthScore}%</td>
              <td>{r.taskCompletionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}


