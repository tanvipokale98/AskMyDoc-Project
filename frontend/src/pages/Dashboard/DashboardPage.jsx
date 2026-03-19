import { useState, useEffect } from 'react'   // ✅ useEffect added
import { Link } from 'react-router-dom'
import { Sidebar } from '../../components/SideBar'
import { notify } from '../../utils/toast'
import { privateApi } from '../../utils/api'

const DashboardPage = () => {
  const [data, setData] = useState({
    totalDoc: 0,
    summarize: 0,
    storage: 0,
    recent: []
  })
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const resp = await privateApi.get('/dashboard/info')
      setData({
        totalDoc:  resp.data.data.totalDoc,
        summarize: resp.data.data.summarize,
        storage:   ((resp.data.data.storage) / (1024 * 1024)).toFixed(2), // ✅ fixed
        recent:    resp.data.data.recent
      })
    } catch (err) {
      const status  = err.response?.data?.statusCode || 500
      const message = err.response?.data?.message || 'Failed to load'
      notify(status, message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-[#f0fdff]">
        <p className="text-[#0e7490] text-sm">Loading dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#f0fdff] min-h-screen p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f2d3d]">Dashboard</h1>
          <p className="text-sm text-[#0e7490] mt-1">
            Overview of your documents
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#a5f3fc] rounded-xl p-5">
            <p className="text-xs text-[#0e7490] uppercase tracking-widest mb-2">
              Total Documents
            </p>
            <p className="text-4xl font-bold text-[#0f2d3d]">{data.totalDoc}</p>
          </div>

          <div className="bg-white border border-[#a5f3fc] rounded-xl p-5">
            <p className="text-xs text-[#0e7490] uppercase tracking-widest mb-2">
              Summarized
            </p>
            <p className="text-4xl font-bold text-[#0f2d3d]">{data.summarize}</p>
          </div>

          <div className="bg-white border border-[#a5f3fc] rounded-xl p-5">
            <p className="text-xs text-[#0e7490] uppercase tracking-widest mb-2">
              Storage Used
            </p>
            <p className="text-4xl font-bold text-[#0f2d3d]">
              {data.storage}
              <span className="text-base font-normal text-[#0e7490] ml-1">MB</span>
            </p>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white border border-[#a5f3fc] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[#0f2d3d] uppercase tracking-wide">
              Recent Documents
            </h2>
            <Link
              to="/docHistory"
              className="text-xs text-[#0891b2] hover:underline"
            >
              View all →
            </Link>
          </div>

          {data.recent.length === 0 ? (
            <p className="text-sm text-[#0e7490] text-center py-6">
              No documents uploaded yet
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-[#e0f7fa]">
              {data.recent.map(ele => (
                <div
                  key={ele._id}                  // ✅ key not id
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0fdff] border border-[#a5f3fc] flex items-center justify-center text-sm flex-shrink-0">
                      📄
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0f4c5c]">
                        {ele.title}
                      </p>
                      <p className="text-xs text-[#0e7490]">
                        {ele.originalName}
                      </p>
                      <p className="text-xs text-[#0e7490]">
                        {new Date(ele.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                      ${ele.status === 'summarized' ? 'bg-green-100 text-green-700' :
                        ele.status === 'processing' ? 'bg-cyan-100 text-cyan-700' :
                        ele.status === 'failed'     ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'}`
                    }>
                      {ele.status}
                    </span>
                    <Link
                      to={`/document/${ele._id}`}
                      className="text-xs text-[#0891b2] hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default DashboardPage