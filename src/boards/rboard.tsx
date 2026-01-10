import { useState } from "react";
import addList from "../lists/addlists";
import type { BoardState } from "../types/kanban";
export default function Boards({ allData,setAllData}) {
    const [value,setValue] = useState();
    const [isTrue,setIsTrue] = useState(false); 
    const [listName,setListName] = useState();
  return (
    <div className="w-full min-h-screen overflow-x-auto overflow-y-hidden" style={{backgroundImage:`url(${allData.boards["1"].image})`}}>
    <div className="flex gap-5 ml-5 pt-15">
      {Object.values(allData.lists).map((list)=>{
          return(<div className="bg-gray-800 px-3 w-72 flex  shrink-0 flex-col">
        <p>{list.title}</p>
        <button className="flex  items-center hover:bg-gray-700 cursor-pointer transition-all duration-500 pl-1.5 pr-32 py-1 my-1">
          <svg
          className="inline mr-2"
            width="15.5"
            height="15.5"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
              fill="currentColor"
            ></path>
          </svg>
          Add a card
        </button>
      </div>)
        })}
        {!isTrue && <button onClick={()=>setIsTrue(true)}>Add Another List</button>}
        {isTrue && <div className="flex flex-col bg-gray-600">
        <input type="text" placeholder="Enter your list name" value={listName} onChange={(e)=>setListName(e.target.value)}/>
        <div className="flex gap-3">
      <button onClick={()=>addList(setAllData,String(listName))}>Add List</button>
      <button onClick={()=>setIsTrue(false)}>Cancel</button>
      </div>
      </div>}
    </div>
    </div>
  );
}
