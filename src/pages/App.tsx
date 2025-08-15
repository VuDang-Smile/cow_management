import { NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Reports from './Reports'
import Cows from './Cows'
import Tasks from './Tasks'
import Inventory from './Inventory'
import Orders from './Orders'
import Settings from './Settings'
import Notifications from './Notifications'

export default function App() {
  return (
    <div>
      <div className="appbar">
        <div className="nav">
          <div className="brand">🐄 FarmManage Pro</div>
          <NavLink to="/" end className={({isActive})=> isActive? 'active':''}>Dashboard</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/cows">Cows</NavLink>
          <NavLink to="/tasks">Task Management</NavLink>
          <NavLink to="/inventory">Inventory</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/settings" className="right">Settings</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/cows" element={<Cows/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/notifications" element={<Notifications/>} />
        </Routes>
      </div>
    </div>
  )
}


