import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const token = localStorage.getItem('token')

  // no token at all
  if (!token) {
    return <Navigate to='/login' replace />
  }

  // check if token is expired
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]))
    const isExpired = decoded.exp * 1000 < Date.now()

    if (isExpired) {
      // clear expired token
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return <Navigate to='/login' replace />
    }
  } catch (err) {
    // invalid token — clear and redirect
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute