import React from 'react';
import { useState } from 'react';
import { useParams,useOutletContext,useNavigate, Link} from 'react-router-dom'
function ShowCardDetail() {
  const {allData} = useOutletContext();
  const {boardId,cardId} = useParams();
  const card = allData.cards[cardId];
  return (
    <div className="flex fixed top-0 left-0">
      <button> <svg
    className="w-5 h-5 text-gray-400 hover:text-green-500 transition"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
  </svg></button>
      <p>{card.title}</p>
      <Link to={`/boards/${boardId}`}>
      <button>
        <svg width="20" height="20" viewBox="0 0 24 24">
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="white"
                  stroke-width="2"
                />
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="white"
                  stroke-width="2"
                />
              </svg>
      </button>
      </Link>
    </div>
  )
}

export default ShowCardDetail