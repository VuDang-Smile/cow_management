import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(()=> (typeof window !== 'undefined' && localStorage.getItem('user_logged_in') === '1'))
  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem('user_logged_in') === '1')
  }, [location])
  useEffect(()=>{
    const onStorage = () => setIsLoggedIn(localStorage.getItem('user_logged_in') === '1')
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return (
    <div className="container">
      <Routes>
          <Route index element={isLoggedIn ? <Navigate to="adopt" replace/> : <Auth/>} />
          <Route path="login" element={<Auth/>} />
          <Route path="signup" element={<Auth/>} />
          <Route path="adopt" element={<Adopt/>} />
          <Route path="home" element={isLoggedIn ? <UserHome/> : <Navigate to="/user/login" replace/>} />
          <Route path="cow" element={<CowProfile/>} />
          <Route path="scan" element={<ScanQR/>} />
          <Route path="reports" element={<UserReports/>} />
          <Route path="notifications" element={<UserNotifications/>} />
          <Route path="tasks" element={<DailyTasks/>} />
          <Route path="rank" element={<Rank/>} />
          <Route path="profile" element={<UserProfile/>} />
      </Routes>
    </div>
  )
}


