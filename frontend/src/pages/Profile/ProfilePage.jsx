import { useEffect, useState } from 'react'
import { notify } from '../../utils/toast'
import { privateApi } from '../../utils/api'
import { Sidebar } from '../../components/SideBar'

const ProfilePage = () => {
  const [data, setData] = useState({})            
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')    

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true)
        const result = await privateApi.get('/auth/user/details')
        setData(result.data.data)
      } catch (err) {
        notify(400, "Unable to fetch user profile. Try again")
      } finally {
        setLoading(false)                        
      }
    }
    fetchInfo()
  }, [])                                        

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!password.trim()) return notify(400, "Please enter a password")
    try {
      const result = await privateApi.post('/auth/user/resetpassword', { password })
      notify(result.data.statusCode, result.data.message)  
      setPassword('')                             
    } catch (err) {
      notify(err.response?.data?.statusCode || 500, err.response?.data?.message || "Unable to change password")
    }
  }

  const initials = data?.username?.[0]?.toUpperCase() ?? 'U'
  const joinedDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '—'

  if (loading) return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-[#f0fdff]">
        <p className="text-sm text-[#0e7490]">Loading profile...</p>
      </div>
    </div>
  )

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#f0fdff] min-h-screen p-8">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f2d3d]">Profile</h1>
          <p className="text-sm text-[#0e7490] mt-1">Manage your account</p>
        </div>

        <div className="grid grid-cols-[260px_1fr] gap-5 items-start">

          {/* LEFT — user card */}
          <div className="bg-white border border-[#a5f3fc] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-[#0f2d3d] flex items-center justify-center text-3xl font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="font-bold text-[#0f2d3d] text-lg">
                {data?.username ?? '—'}
              </p>
              <p className="text-sm text-[#0e7490]">{data?.email ?? '—'}</p>
              <p className="text-xs text-slate-400 mt-1">
                Member since {joinedDate}
              </p>
            </div>
            <div className="w-full h-px bg-[#e0f7fa]" />
            {/* status badge */}
            <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
              Active
            </span>
          </div>

          {/* RIGHT — sections */}
          <div className="flex flex-col gap-5">

            {/* Account Info */}
            <div className="bg-white border border-[#a5f3fc] rounded-2xl p-5">
              <h2 className="font-bold text-[#0f2d3d] text-sm mb-4 pb-3 border-b border-[#e0f7fa]">
                Account Information
              </h2>
              {[
                ['Username', data?.username],
                ['Email',    data?.email],
                ['Joined',   joinedDate],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-[#f0fdff] last:border-none">
                  <span className="text-xs font-medium text-[#0e7490]">{label}</span>
                  <span className="text-sm font-medium text-[#0f4c5c]">{value ?? '—'}</span>
                </div>
              ))}
            </div>

            {/* Change Password */}
            <div className="bg-white border border-[#a5f3fc] rounded-2xl p-5">
              <h2 className="font-bold text-[#0f2d3d] text-sm mb-4 pb-3 border-b border-[#e0f7fa]">
                Change Password
              </h2>
              <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#0e7490] uppercase tracking-wide">
                    New Password
                  </label>
                  <input
                    type="password"                 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="px-4 py-2.5 border border-[#a5f3fc] bg-[#f0fdff] rounded-lg text-sm text-[#0f4c5c] outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-fit px-5 py-2.5 bg-[#0891b2] hover:bg-[#0e7490] text-white text-sm font-medium rounded-lg transition"
                >
                  Update Password
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage