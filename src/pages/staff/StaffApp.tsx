import { NavLink, Route, Routes } from 'react-router-dom'
import { useI18n } from '../../i18n'
import Dashboard from './Dashboard'
import Cows from './Cows'
import Tasks from './Tasks'
import Inventory from './Inventory'
import Orders from './Orders'
import Notifications from './Notifications'

export default function StaffApp() {
  const { t } = useI18n()
  return (
    <div>
      <div className="appbar">
        <div className="nav">
          <div className="brand">👨‍💼 {t('staff_portal')}</div>
          <NavLink to="/staff" end className={({isActive})=> isActive? 'active':''}>{t('nav_home')}</NavLink>
          <NavLink to="/staff/cows">{t('nav_cows')}</NavLink>
          <NavLink to="/staff/tasks">{t('nav_task_management')}</NavLink>
          <NavLink to="/staff/inventory">{t('nav_inventory')}</NavLink>
          <NavLink to="/staff/orders">{t('nav_orders')}</NavLink>
          <NavLink to="/staff/notifications">{t('nav_notifications')}</NavLink>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="cows" element={<Cows/>} />
          <Route path="tasks" element={<Tasks/>} />
          <Route path="inventory" element={<Inventory/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="notifications" element={<Notifications/>} />
        </Routes>
      </div>
    </div>
  )
}
