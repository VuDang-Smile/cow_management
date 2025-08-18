import { NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Reports from './Reports'
import Cows from './Cows'
import Tasks from './Tasks'
import Inventory from './Inventory'
import Orders from './Orders'
import Settings from './Settings'
import Notifications from './Notifications'

export default function FarmApp() {
  return (
    <div>
      <div className="appbar">
        <div className="nav">
          <div className="brand">🐄 FarmManage Pro</div>
          <NavLink to="/farm" end className={({isActive})=> isActive? 'active':''}>Dashboard</NavLink>
          <NavLink to="/farm/reports">Reports</NavLink>
          <NavLink to="/farm/cows">Cows</NavLink>
          <NavLink to="/farm/tasks">Task Management</NavLink>
          <NavLink to="/farm/inventory">Inventory</NavLink>
          <NavLink to="/farm/orders">Orders</NavLink>
          <NavLink to="/farm/settings" className="right">Settings</NavLink>
          <NavLink to="/farm/notifications">Notifications</NavLink>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="reports" element={<Reports/>} />
          <Route path="cows" element={<Cows/>} />
          <Route path="tasks" element={<Tasks/>} />
          <Route path="inventory" element={<Inventory/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="notifications" element={<Notifications/>} />
        </Routes>
      </div>
    </div>
  )
}


