import { Navigate, Route, Routes } from 'react-router-dom'
import FarmApp from './farm/FarmApp'
import UserApp from './user/UserApp'

export default function App() {
  return (
    <Routes>
      <Route path="/farm/*" element={<FarmApp />} />
      <Route path="/user/*" element={<UserApp />} />
      <Route path="*" element={<Navigate to="/farm" replace />} />
    </Routes>
  )
}


