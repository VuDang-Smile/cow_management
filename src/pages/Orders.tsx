import Card from '../components/Card'
import { orders } from '../mocks/data'
import { OrderStatus } from '../interfaces'

export default function Orders(){
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Danh sách đơn hàng" rightSlot={<button className="btn success">+ Tạo đơn hàng</button>}>
        <div className="grid" style={{ gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
          {orders.map(o=> (
            <div className="card" key={o.id}>
              <div className="row" style={{ justifyContent:'space-between' }}>
                <div className="section-title">{o.id}</div>
                <div className={`badge ${o.status===OrderStatus.Completed? 'green': o.status===OrderStatus.Cancelled? 'red':'yellow'}`}>{o.status}</div>
              </div>
              <div className="muted">Khách hàng: {o.customerName}</div>
              <div className="muted">Sản phẩm: {o.products.map(p=> `${p.name} x${p.quantity}${p.unit}`).join(', ')}</div>
              <div className="muted">Giao ngày: {new Date(o.deliveryDate).toLocaleDateString('vi-VN')}</div>
              <div className="actions" style={{ marginTop: 8 }}>
                <button className="btn secondary">Xem chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}



