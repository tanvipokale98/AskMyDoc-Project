import { NavLink, useNavigate } from 'react-router-dom'
import { MdDashboard, MdAccountCircle } from "react-icons/md"
import { RiChatUploadFill } from "react-icons/ri"
import { FaHistory } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"

export const Sidebar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const navItems = [
    { label: "Dashboard",    path: "/dashboard",   icon: <MdDashboard size={18} /> },
    { label: "Upload & Chat", path: "/uploadChat",  icon: <RiChatUploadFill size={18} /> },
    { label: "History",      path: "/docHistory",  icon: <FaHistory size={16} /> },
    { label: "Profile",      path: "/profile",     icon: <MdAccountCircle size={18} /> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="h-dvh w-56 bg-[#0f2d3d] flex flex-col flex-shrink-0">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e4a5e]">
        <p className="text-[#e0f7fa] text-base font-semibold tracking-wide">
          AskYourDoc AI
        </p>
        <p className="text-[#4a8fa8] text-xs mt-1">AI Document Assistant</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2.5 py-3 flex flex-col gap-0.5">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150
              ${isActive
                ? 'bg-[#164e63] text-[#22d3ee] font-medium'
                : 'text-[#7fb9cc] hover:bg-[#155e75] hover:text-[#cffafe]'
              }`
            }
          >
            <span className="text-[17px] flex items-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-2.5 py-3 border-t border-[#1e4a5e]">

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-[#f87171] hover:bg-[#1e4a5e] transition-all duration-150"
        >
          <IoLogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  )
}