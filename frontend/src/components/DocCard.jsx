import { IoDocumentText } from "react-icons/io5"
import { useNavigate } from "react-router-dom"   

export const DocCard = ({ id, title, size, createdAt }) => {
  const navigate = useNavigate()                  

  const handleClick = (id) => {
    navigate(`/document/${id}`)                   
  }

  return (                                       
    <button
      onClick={() => handleClick(id)}             
      className="w-full text-left bg-white border border-[#a5f3fc] rounded-xl p-4 hover:border-[#22d3ee] hover:bg-[#f0fdff] transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#f0fdff] border border-[#a5f3fc] flex items-center justify-center flex-shrink-0">
          <IoDocumentText className="text-[#0891b2] text-xl" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#0f4c5c]">{title}</p>
          <p className="text-xs text-[#0e7490] mt-1">{(size / 1024 / 1024).toFixed(2)} MB</p>
          <p className="text-xs text-[#0e7490] mt-0.5">
            Uploaded at {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </button>
  )
}