import { NavLink, Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Adopt from './Adopt'
import UserHome from './Home'
import CowProfile from './CowProfile'
import ScanQR from './ScanQR'
import UserReports from './Reports'
import UserNotifications from './Notifications'
import DailyTasks from './DailyTasks'
import Rank from './Rank'
import UserProfile from './UserProfile'

export default function UserApp() {
  return (
    <div>
      <div className="appbar">
        <div className="nav">
          <div className="brand">👤 User Portal</div>
          <NavLink to="/user" end className={({isActive})=> isActive? 'active':''}>Home</NavLink>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route index element={<UserHome/>} />
          <Route path="login" element={<Auth/>} />
          <Route path="signup" element={<Auth/>} />
          <Route path="adopt" element={<Adopt/>} />
          <Route path="home" element={<UserHome/>} />
          <Route path="cow" element={<CowProfile/>} />
          <Route path="scan" element={<ScanQR/>} />
          <Route path="reports" element={<UserReports/>} />
          <Route path="notifications" element={<UserNotifications/>} />
          <Route path="tasks" element={<DailyTasks/>} />
          <Route path="rank" element={<Rank/>} />
          <Route path="profile" element={<UserProfile/>} />
        </Routes>
      </div>
    </div>
  )
}


