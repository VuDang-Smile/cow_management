import { NavLink, Route, Routes } from 'react-router-dom'

function UserHome() {
  return (
    <div>
      <h2>Welcome to User Portal</h2>
      <p>This is a placeholder for user-specific pages.</p>
    </div>
  )
}

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
        </Routes>
      </div>
    </div>
  )
}


