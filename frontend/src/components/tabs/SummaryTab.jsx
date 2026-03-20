import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { privateApi } from '../../utils/api'
import { notify } from '../../utils/toast'

const SummaryTab = () => {
  const { id } = useParams()
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async (regenerate) => {
    try {
      setLoading(true)
      const result = await privateApi.get(`/document/${id}/summarize?regenerate=${regenerate}`)
      const smry = result.data.data.summary
  .replace(/\*/g, '')        
  .replace(/#{1,6}\s/g, '')  
  .replace(/`/g, '')         
  .replace(/\*\*/g, '')      
  .trim()
      setSummary(smry)
      if (!result.data.data.summary || result.data.data.summary.trim() === '') {
  notify(500, "Unable to generate. Try again")
}
    } catch (err) {
      notify(500, "Unable to generate. Try again")
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    handleClick(false);

  },[])
  // parse summary into points — splits by newline or numbered list
  const summaryPoints = summary
    ? summary.split('\n').filter(line => line.trim() !== '')
    : []

  // EMPTY STATE
  if (!summary && !loading) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#f0fdff] border border-[#a5f3fc] flex items-center justify-center text-2xl mb-4">
        ✦
      </div>
      <p className="font-semibold text-[#0f2d3d] text-base mb-1">No summary yet</p>
      <p className="text-sm text-[#0e7490] mb-5">
        Generate an AI summary of this document in seconds
      </p>
      <button
        onClick={() => handleClick(false)}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#0891b2] hover:bg-[#0e7490] text-white text-sm font-medium rounded-lg transition-all"
      >
        ✦ Generate Summary
      </button>
    </div>
  )

  // LOADING STATE
  if (loading) return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#e0f7fa]">
        <div className="h-4 w-24 bg-[#e0f7fa] rounded"></div>
        <div className="h-4 w-16 bg-[#e0f7fa] rounded-full"></div>
      </div>
      {[100, 80, 100, 55, 90, 75].map((w, i) => (
        <div
          key={i}
          className="h-3 bg-[#e0f7fa] rounded mb-3"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  )

  // LOADED STATE
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#e0f7fa]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-[#0f2d3d]">AI Summary</span>
          <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            Generated
          </span>
        </div>
        <span className="text-xs text-[#0e7490]">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Summary points */}
      <div className="flex flex-col mb-5">
        {summaryPoints.map((point, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-2.5 border-b border-[#f0fdff] last:border-none"
          >
            <div className="w-6 h-6 rounded-md bg-[#f0fdff] border border-[#a5f3fc] flex items-center justify-center text-xs font-semibold text-[#0891b2] flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-sm text-[#0f4c5c] leading-relaxed">
              {point.replace(/^\d+\.\s*/, '').replace(/^[-•]\s*/, '')}
            </p>
          </div>
        ))}
      </div>

      {/* Regenerate button */}
      <button
        onClick={() => handleClick(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#f0fdff] hover:bg-[#e0f7fa] text-[#0891b2] border border-[#a5f3fc] text-sm font-medium rounded-lg transition-all"
      >
        ↺ Regenerate
      </button>
    </div>
  )
}

export default SummaryTab