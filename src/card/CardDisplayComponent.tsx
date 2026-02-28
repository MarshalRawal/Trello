import React from 'react'
import { Link,useParams} from "react-router-dom";
import ShowCardDetail from './showCardDetail';
function CardDisplayComponent({ cardId, isCompleted, setIsCompleted, cardTitle,allData,setAllData,listId,listTitle}) {
  const {boardId} = useParams();
  return (
    <div className="flex gap-2 items-center group">
      {isCompleted.cards.includes(cardId) ? (
        /* --- UI FOR COMPLETED CARDS --- */
        <Link to={`/boards/${boardId}/cards/${cardId}`} className='w-full'>
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex items-center gap-2">
            
            {/* Button to unmark the card as completed (removes from list) */}
            <button
              className=" w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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

          <div className="flex items-start opacity-0 group-hover:opacity-100">
            
            {/* Button to delete the card */}
            <button className="w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              const currentList = Object.values((allData.lists)).find((list)=>list.id === listId);
              const filteredList = currentList.cardIds.filter((cl)=>cl !== cardId);
              setAllData((prev)=>{
                return(
                  {
                    ...prev,lists:{...prev.lists,[listId]:{...prev.lists[listId],cardIds:filteredList}}
                  }
                )
              })
              console.log(filteredList);
              // const currentList = Object.fromEntries(Object.entries(allData.lists).filter((list)=>list.id!==listId));
              // const filteredCard = currentList.filter((cl)=>cl.id !== cardId);
              // console.log(filteredCard);
              // setAllData((prev)=>{
              //   return(
              //     {
              //       ...prev,
              //       lists:{...prev.lists,}
              //     }
              //   )
              // })
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className= "w-5 h-5"
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
            <button className="w-6 h-6 flex items-center justify-center cursor-pointer">
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
        </Link>
      ) : (
        /* --- UI FOR INCOMPLETE CARDS --- */
        <Link to={`/boards/${boardId}/cards/${cardId}`} className='w-full'>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 mt-1">
            
            {/* Button to mark the card as completed (adds to list) */}
            <button
              className="opacity-0 group-hover:opacity-100 flex items-center w-6 h-6 justify-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
          <button className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
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
        </Link>
      )}
    </div>
  );
}

export default CardDisplayComponent;