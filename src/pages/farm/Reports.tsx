import Card from '../../components/Card'
import { reportDailyMilk, reportSupplyDemand, employeePerformance } from '../../mocks/data'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Bar, BarChart } from 'recharts'

export default function Reports(){
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Báo cáo sản lượng sữa (14 ngày)">
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

      <Card title="Báo cáo Tối ưu hóa Cung - Cầu">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={reportSupplyDemand}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="supply" name="Dự báo Cung" stroke="#0ea5e9" />
            <Line type="monotone" dataKey="actual" name="Sản lượng Thực tế" stroke="#16a34a" />
            <Line type="monotone" dataKey="demand" name="Nhu cầu phân bổ" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
        <div className="muted" style={{ marginTop: 8 }}>
          Các khoảng cách giữa các đường biểu thị chi phí cơ hội hoặc lãng phí.
        </div>
      </Card>

      <Card title="Hiệu quả công việc của nhân viên (số nhiệm vụ hoàn thành)">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={employeePerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" name="Nhiệm vụ" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}


