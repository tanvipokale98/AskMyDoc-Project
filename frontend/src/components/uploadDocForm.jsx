import { useState } from 'react'
import { privateApi } from '../../utils/api'
import { notify } from '../../utils/notify'

export const DocForm = () => {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)   
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) return notify(400, 'Please select a file')
    if (!title) return notify(400, 'Please enter a title')

    // must use FormData to send file + text together
    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)          // append actual file object

    setLoading(true)
    try {
      const res = await privateApi.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  //required for file uploads
        }
      })
      notify(res.data.statusCode, res.data.message)
      setTitle('')
      setFile(null)

    } catch (err) {
      const status = err.response?.data?.statusCode || 500
      const message = err.response?.data?.message || 'Upload failed'
      notify(status, message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="absolute z-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#a5f3fc]">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#0e7490] uppercase tracking-wide">
            Title
          </label>
          <input
            type="text"
            name="title"
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
            name="file"
            accept=".pdf"         // ✅ restrict to supported types
            onChange={(e) => setFile(e.target.files[0])}  // ✅ store file object
            required
            className="px-4 py-2.5 rounded-lg border border-[#a5f3fc] bg-[#f0fdff] text-[#0f4c5c] text-sm"
          />
          {/* show selected file name */}
          {file && (
            <p className="text-xs text-[#0e7490]">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#0891b2] hover:bg-[#0e7490] text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

      </form>
    </div>
  )
}