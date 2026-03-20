import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sidebar } from "../../components/SideBar"
import AIChatTab from "../../components/tabs/AIChatTab"
import PDFTab from "../../components/tabs/PDFTab"
import SummaryTab from "../../components/tabs/SummaryTab"

export const DocumentPage = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: "📄 Content",  render: () => <PDFTab /> },
    { label: "✦ Summary",  render: () => <SummaryTab /> },
    { label: "💬 AI Chat", render: () => <AIChatTab /> },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#f0fdff] min-h-screen p-6">

        {/* Tab buttons */}
        <div className="flex gap-0 border-b-[1.5px] border-[#a5f3fc]">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 text-sm font-medium transition-all border-b-[2.5px] -mb-[1.5px]
                ${activeTab === idx
                  ? 'text-[#0891b2] border-[#0891b2]'
                  : 'text-[#0e7490] border-transparent hover:text-[#0891b2]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white border border-[#a5f3fc] border-t-0 rounded-b-2xl p-6">
          {tabs[activeTab].render()}
        </div>

      </div>
    </div>
  )
}