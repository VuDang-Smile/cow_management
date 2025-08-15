import Card from '../components/Card'
import Gauge from '../components/Gauge'
import { getDashboardMetrics } from '../mocks/data'

export default function Dashboard(){
  const metrics = getDashboardMetrics()
  const topHealth = Object.entries(metrics.healthSummary)
    .sort((a,b)=> b[1]-a[1])[0]

  const proportion = metrics.supplyDemand.farmSupplyForecast / Math.max(1, metrics.supplyDemand.allocatedDemandForecast)
  const gaugeValue = proportion < 1 ? 0.5 - (1 - proportion) * 0.5 : 0.5 + (proportion - 1) * 0.5

  return (
    <div className="grid col-3">
      <div className="grid" style={{ gap: 16 }}>
        <Card title="Tình hình Nội tại">
          <div className="grid" style={{ gap: 12 }}>
            <div className="card" style={{ background: '#f8fbff' }}>
              <div className="muted">Tổng số bò</div>
              <div className="stat">{metrics.totalCows}</div>
            </div>
            <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 12 }}>
              <div className="card">
                <div className="muted">Tình trạng chiếm đa số</div>
                <div className="stat" style={{ fontSize: 18 }}>{topHealth?.[0]}</div>
                <div className="muted">Số lượng: {topHealth?.[1]}</div>
              </div>
              <div className="card">
                <div className="muted">Sản lượng sữa hôm nay</div>
                <div className="stat">{metrics.todayMilkProduction.toLocaleString()} lít</div>
                <div className="badge green">+{metrics.milkChangePercentage}% so với hôm qua</div>
              </div>
            </div>
            <div className="card">
              <div className="muted">Tồn kho</div>
              <div className="row" style={{ gap: 16 }}>
                <div className="badge green">Sẵn có: {metrics.inventorySummary.availableCount}</div>
                <div className="badge yellow">Sắp hết: {metrics.inventorySummary.lowStockCount}</div>
                <div className="badge red">Hết hàng: {metrics.inventorySummary.outOfStockCount}</div>
                <div className="right muted">Tổng giá trị: {metrics.inventorySummary.totalValue.toLocaleString()}đ</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Phân tích Cung-Cầu Thị trường (7 ngày tới)">
        <Gauge value={gaugeValue} label={`Dự báo Cung: ${metrics.supplyDemand.farmSupplyForecast.toLocaleString()} lít · Dự báo Cầu: ${metrics.supplyDemand.allocatedDemandForecast.toLocaleString()} lít`} />
        <div style={{ height: 12 }} />
        <Card title="Gợi ý từ Hệ thống Phân tích">
          <div className="grid" style={{ gap: 8 }}>
            {metrics.recommendations.map((r, idx)=> (
              <div key={idx} className="row" style={{ justifyContent:'space-between' }}>
                <div>
                  <span className={`badge ${r.type.includes('Cảnh báo') ? 'red' : r.type.includes('Cơ hội') ? 'yellow':'green'}`}>{r.type}</span>
                  <span style={{ marginLeft: 8 }}>{r.description}</span>
                </div>
                {r.actionLink && <a className="btn secondary" href={r.actionLink}>Xem</a>}
              </div>
            ))}
          </div>
        </Card>
      </Card>

      <Card title="Cảnh báo & Nhiệm vụ Ưu tiên">
        <Card title="Cảnh báo Thông minh">
          <div className="grid" style={{ gap: 8 }}>
            {metrics.alerts.map((a, i)=> (
              <div key={i} className="card" style={{ background: '#fff7f7' }}>
                <div className="row"><div className="badge red">Cảnh báo</div><div style={{ marginLeft: 8 }}>{a.description}</div></div>
                <div className="muted">{a.predictedImpact}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ height: 12 }} />
        <Card title="Nhiệm vụ Ưu tiên Hôm nay" rightSlot={<button className="btn success">+ Thêm nhiệm vụ</button>}>
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Người phụ trách</th>
                <th>Loại</th>
                <th>Hạn</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {metrics.priorityTasks.slice(0,5).map(t => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.assignedTo}</td>
                  <td>
                    <span className={`badge ${t.type==='Nhiệm vụ Chiến lược' ? 'yellow':'green'}`}>{t.type}</span>
                  </td>
                  <td>{new Date(t.dueDate).toLocaleDateString('vi-VN')}</td>
                  <td>{t.isCompleted ? 'Hoàn thành' : 'Đang thực hiện'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Card>
    </div>
  )
}


