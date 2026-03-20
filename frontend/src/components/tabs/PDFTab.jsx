import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { privateApi } from "../../utils/api"
import { notify } from "../../utils/toast"
const PDFTab = () => {
  const { id } = useParams()
  const [docUrl, setDocUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const res = await privateApi.get(`/document/${id}/pdf`)
        setDocUrl(res.data.data)
      } catch (err) {
        notify(500, 'Failed to load document')
      } finally {
        setLoading(false)
      }
    }
    fetchPDF()
  }, [id])

  if (loading) return <p className="text-sm text-[#0e7490]">Loading PDF...</p>

  if (!docUrl) return <p className="text-sm text-[#0e7490]">Document not found</p>

  return (
    <iframe
      src={docUrl}
      className="w-full h-screen rounded-lg border border-[#a5f3fc]"
      title="PDF Viewer"
    />
  )
}

export default PDFTab