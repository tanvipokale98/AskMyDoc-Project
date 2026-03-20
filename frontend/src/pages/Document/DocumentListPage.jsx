import { useEffect, useState } from 'react'    
import { notify } from '../../utils/toast'
import { privateApi } from '../../utils/api'
import { Sidebar } from '../../components/SideBar'
import { DocCard } from '../../components/DocCard'

const DocumentListPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadDoc = async () => {
    try {
      setLoading(true)
      const doc = await privateApi.get('/documents/info')
      setData(doc.data.data)  
      console.log(doc);           
    } catch (err) {
      const status  = err.response?.data?.statusCode || 500
      const message = err.response?.data?.message || 'Failed to load'
      notify(status, message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDoc()
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#f0fdff] min-h-screen p-8">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f2d3d]">My Documents</h1>
          <p className="text-sm text-[#0e7490] mt-1">All your uploaded documents</p>
        </div>

        {loading && (
          <p className="text-sm text-[#0e7490]">Loading documents...</p>
        )}

        {!loading && data.length === 0 && (
          <p className="text-center text-sm text-[#0e7490] py-16">
            No documents uploaded yet
          </p>
        )}

        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(ele => (
              <DocCard
                key={ele._id}              
                id={ele._id}
                title={ele.title}
                createdAt={ele.createdAt}
                size={ele.size}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default DocumentListPage