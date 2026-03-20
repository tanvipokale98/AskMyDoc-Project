import { useEffect, useState, useRef } from 'react'   // ✅ useRef added
import { privateApi } from '../../utils/api'
import { useParams } from 'react-router-dom'
import { notify } from '../../utils/toast'

const AIChatTab = () => {
  const { id } = useParams()
  const [history, setHistory] = useState([])
  const [userQuery, setUserQuery] = useState('')      
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(true)
  const bottomRef = useRef(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const u=user.username.charAt(0)
  const handleClick = async () => {
    if (userQuery.trim() === '') return

    const userMessage = { role: 'user', message: userQuery }
    setHistory(prev => [...prev, userMessage])          
    setUserQuery('')
    setLoading(true)
    
    try {
      const result = await privateApi.post(`/document/${id}/chat`, { userQuery })
       const smry = result.data.data.response
  .replace(/\*/g, '')        
  .replace(/#{1,6}\s/g, '')  
  .replace(/`/g, '')         
  .replace(/\*\*/g, '')      
  .trim()
      setHistory(prev => [...prev, {                   
        role: 'assistant',
        message: smry
      }])
    } catch (err) {
      notify(500, "Unable to get response")
      setHistory(prev => prev.slice(0, -1))            
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setHistoryLoading(true)                         
        const result = await privateApi.get(`/document/${id}/chat/history`)
        setHistory(result.data.data.history)
      } catch (err) {
        notify(500, "Error fetching history")
      } finally {
        setHistoryLoading(false)                       
      }
    }
    fetchHistory()                                      
  }, [id])

  return (
  <div className="flex flex-col h-[520px] bg-white border border-[#a5f3fc] rounded-2xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#e0f7fa] flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-green-400"></div>
      <span className="text-sm font-medium text-[#0f2d3d]">AI Chat</span>
      {/* <span className="text-xs text-[#0e7490] ml-auto"></span> */}
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">

      {/* History loading */}
      {historyLoading && (
        <p className="text-xs text-[#0e7490] text-center py-4">Loading history...</p>
      )}

      {/* Empty state */}
      {!historyLoading && history.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <p className="text-3xl mb-3">💬</p>
          <p className="text-sm font-medium text-[#0f2d3d] mb-1">Ask me anything</p>
          <p className="text-xs text-[#0e7490]">I've read this document and can answer your questions</p>
        </div>
      )}

      {/* Messages list */}
      {history.map((msg, i) => (
        <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0
            ${msg.role === 'user' ? 'bg-[#0f2d3d] text-white' : 'bg-[#e0f7fa] text-[#0891b2]'}`}
          >
            {msg.role === 'user' ? u : 'AI'}
          </div>
          <div className={`max-w-[76%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl
            ${msg.role === 'user'
              ? 'bg-[#0891b2] text-white rounded-tr-sm'
              : 'bg-[#f0fdff] border border-[#a5f3fc] text-[#0f4c5c] rounded-tl-sm'
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {loading && (
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-[#e0f7fa] text-[#0891b2] flex items-center justify-center text-xs font-semibold">AI</div>
          <div className="bg-[#f0fdff] border border-[#a5f3fc] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
            {[0, 150, 300].map((delay, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-bounce"
                style={{ animationDelay: `${delay}ms` }} />
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>

    {/* Suggested questions — only show when no history */}
    {!historyLoading && history.length === 0 && (
      <div className="flex gap-2 flex-wrap px-5 py-2 border-t border-[#e0f7fa]">
        {['What is the main topic?', 'Key findings?', 'Summarize in 3 points'].map(q => (
          <button
            key={q}
            onClick={() => { setUserQuery(q); handleClick() }}
            className="px-3 py-1.5 bg-[#f0fdff] border border-[#a5f3fc] rounded-full text-xs text-[#0891b2] hover:bg-[#e0f7fa] transition"
          >
            {q}
          </button>
        ))}
      </div>
    )}

    {/* Input */}
    <div className="flex gap-2 px-5 py-3.5 border-t border-[#e0f7fa] flex-shrink-0">
      <input
        value={userQuery}
        onChange={e => setUserQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !loading && handleClick()}
        placeholder="Ask something about this document..."
        disabled={loading}
        className="flex-1 px-4 py-2.5 border border-[#a5f3fc] bg-[#f0fdff] text-[#0f4c5c] text-sm rounded-xl outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b220] transition disabled:opacity-50 placeholder:text-[#94bfca]"
      />
      <button
        onClick={handleClick}
        disabled={loading || !userQuery.trim()}
        className="w-10 h-10 rounded-xl bg-[#0891b2] hover:bg-[#0e7490] text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
      >
        ➤
      </button>
    </div>

  </div>
)
}

export default AIChatTab