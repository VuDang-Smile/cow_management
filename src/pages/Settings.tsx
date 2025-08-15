import Card from '../components/Card'
import { users } from '../mocks/data'

export default function Settings(){
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Cài đặt Trang trại">
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 12 }}>
          <div className="card">
            <div className="muted">Tên</div>
            <input defaultValue="Trang trại Hạnh Phúc" />
            <div className="muted">Địa chỉ</div>
            <input defaultValue="Đức Hòa, Long An" />
            <div className="muted">Giấy phép hoạt động</div>
            <input defaultValue="GP-123456" />
            <div className="muted">Ngôn ngữ</div>
            <select defaultValue="vi">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
            <div className="actions" style={{ marginTop: 8 }}>
              <button className="btn success">Lưu</button>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Quản lý tài khoản" rightSlot={<button className="btn success">+ Thêm tài khoản</button>}>
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u=> (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                <td>{u.status}</td>
                <td className="actions">
                  <button className="btn secondary">Sửa</button>
                  <button className="btn danger">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}



