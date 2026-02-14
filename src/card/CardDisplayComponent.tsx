import React from 'react'

function CardDisplayComponent({ cardId, isCompleted, setIsCompleted, cardTitle }) {
  return (
    <div className="flex gap-2 items-center group">
      {isCompleted.cards.includes(cardId) ? (
        /* --- UI FOR COMPLETED CARDS --- */
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex items-center gap-2">
            
            {/* Button to unmark the card as completed (removes from list) */}
            <button
              className=" w-6 h-6 flex items-center justify-center "
              onClick={() => {
                setIsCompleted((prev) => {
                  return {
                    cards: prev.cards.filter((pr) => pr !== cardId),
                  };
                });
              }}
            >
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-6" />
              </svg>
            </button>

            <span className="text-green-500">{cardTitle}</span>
          </div>

          <div className="flex items-start opacity-0 group-hover:opacity-100 mt-1">
            
            {/* Button to delete the card */}
            <button className="w-6 h-6 flex items-center justify-center "
            onClick={}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </button>

            {/* Button to edit the card title or details */}
            <button className="w-6 h-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* --- UI FOR INCOMPLETE CARDS --- */
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex items-center gap-2">
            
            {/* Button to mark the card as completed (adds to list) */}
            <button
              className="opacity-0 group-hover:opacity-100 flex items-center w-6 h-6 justify-center"
              onClick={() => {
                setIsCompleted((prev) => {
                  return {
                    cards: [...prev.cards, cardId],
                  };
                });
              }}
            >
              <svg
                className=" w-5 h-5 text-gray-400 hover:text-green-500 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
              </svg>
            </button>

            <span>{cardTitle}</span>
          </div>

          {/* Button to edit the card title or details */}
          <button className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default CardDisplayComponent;