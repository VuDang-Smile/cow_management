import Card from '../components/Card'
import { inventoryItems } from '../mocks/data'

export default function Inventory(){
  const low = inventoryItems.filter(i=> i.status==='Sắp hết')
  const out = inventoryItems.filter(i=> i.status==='Hết hàng')
  const ok = inventoryItems.filter(i=> i.status==='Đủ hàng')

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gap: 12 }}>
        <Card title="Tổng giá trị tồn kho"><div className="stat">{inventoryItems.reduce((s,i)=> s+i.value,0).toLocaleString()} đ</div></Card>
        <Card title="Sắp hết"><div className="stat">{low.length}</div></Card>
        <Card title="Đã hết"><div className="stat">{out.length}</div></Card>
        <Card title="Sẵn có"><div className="stat">{ok.length}</div></Card>
      </div>

      <Card title="Cảnh báo Ưu tiên">
        {low.map(i=> (
          <div key={i.id} className="row" style={{ marginBottom: 8 }}>
            <div className="badge yellow">Cảnh báo</div>
            <div style={{ marginLeft: 8 }}>&quot;{i.name}&quot; chỉ còn đủ dùng trong 3 ngày!</div>
          </div>
        ))}
      </Card>

      <Card title="Tất cả Vật tư">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Đơn vị</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(i=> (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.category}</td>
                <td>{i.quantity}</td>
                <td>{i.unit}</td>
                <td>
                  <span className={`badge ${i.status==='Đủ hàng'?'green': i.status==='Sắp hết'?'yellow':'red'}`}>{i.status}</span>
                </td>
                <td className="actions">
                  <button className="btn secondary">Xem chi tiết</button>
                  <button className="btn">Nhập kho</button>
                  <button className="btn warn">Xuất/Điều chỉnh</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}



