import React from 'react'

function ShowCardDetail({listTitle,cardTitle}) {
  return (
    <div className="flex">
      <button> <svg
    className="w-5 h-5 text-gray-400 hover:text-green-500 transition"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
  </svg></button>
      <p>{cardTitle}</p>
    </div>
  )
}

export default ShowCardDetail