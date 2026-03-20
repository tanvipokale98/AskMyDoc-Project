import { useState } from 'react'
import { privateApi } from '../utils/api'
import { notify } from '../utils/toast'

export const DocForm = ({ onClose, onSuccess }) => {  
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file)  return notify(400, 'Please select a file')
    if (!title) return notify(400, 'Please enter a title')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)

    setLoading(true)
    try {
      const res = await privateApi.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      notify(res.data.statusCode, res.data.message)
      onSuccess()                               

    } catch (err) {
      const status  = err.response?.data?.statusCode || 500
      const message = err.response?.data?.message || 'Upload failed'
      notify(status, message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#a5f3fc] p-8 shadow-lg">

        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#0f2d3d]">Upload Document</h2>
          <button
            onClick={onClose}                    
            className="text-[#0e7490] hover:text-[#0f2d3d] text-xl font-light"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#0e7490] uppercase tracking-wide">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              required
              className="px-4 py-2.5 rounded-lg border border-[#a5f3fc] bg-[#f0fdff] text-[#0f4c5c] text-sm outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#0e7490] uppercase tracking-wide">
              Upload File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="px-4 py-2.5 rounded-lg border border-[#a5f3fc] bg-[#f0fdff] text-[#0f4c5c] text-sm"
            />
            {file && (
              <p className="text-xs text-[#0e7490]">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}                 
              className="flex-1 py-2.5 border border-[#a5f3fc] text-[#0e7490] text-sm rounded-lg hover:bg-[#f0fdff] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-[#0891b2] hover:bg-[#0e7490] text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}