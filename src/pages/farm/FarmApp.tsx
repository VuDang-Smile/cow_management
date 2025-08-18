import { NavLink, Route, Routes } from 'react-router-dom'
import { useI18n } from '../../i18n'
import Dashboard from './Dashboard'
import Reports from './Reports'
import Cows from './Cows'
import Tasks from './Tasks'
import Inventory from './Inventory'
import Orders from './Orders'
import Settings from './Settings'
import Notifications from './Notifications'

export default function FarmApp() {
  const { t } = useI18n()
  return (
    <div>
      <div className="appbar">
        <div className="nav">
          <div className="brand">🐄 FarmManage Pro</div>
          <NavLink to="/farm" end className={({isActive})=> isActive? 'active':''}>{t('nav_dashboard')}</NavLink>
          <NavLink to="/farm/reports">{t('nav_reports')}</NavLink>
          <NavLink to="/farm/cows">{t('nav_cows')}</NavLink>
          <NavLink to="/farm/tasks">{t('nav_tasks')}</NavLink>
          <NavLink to="/farm/inventory">{t('nav_inventory')}</NavLink>
          <NavLink to="/farm/orders">{t('nav_orders')}</NavLink>
          <NavLink to="/farm/settings" className="right">{t('nav_settings')}</NavLink>
          <NavLink to="/farm/notifications">{t('nav_notifications')}</NavLink>
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


