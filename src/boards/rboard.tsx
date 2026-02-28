import { useEffect, useState } from "react";
import addList from "../lists/addlists";
import addcard from "../card/addcard";
import completeComponent from "../card/toggleComplete";
import deleteList from "../lists/deleteList";
import ShowCardDisplay from "../card/showCardDetail";
import type { BoardState } from "../types/kanban";
import DisplayList from "../lists/DisplayList";
import CardDisplayComponent from "../card/CardDisplayComponent";
import { Outlet,Link } from "react-router-dom";

export default function Boards({ allData, setAllData }) {
  const [listDetails, setListDetails] = useState({ id: "" });
  const [isCompleted, setIsCompleted] = useState(()=>{
      const saved = JSON.parse(localStorage.getItem("completed"))
      return(saved?saved:{cards:[]});
  })
  const [isTrue, setIsTrue] = useState(false);
  const [isActiveCard, setIsActiveCard] = useState(null);
  const [isActiveList, setIsActiveList] = useState(null);
  const [cardText, setCardText] = useState("");
  const [listName, setListName] = useState("");
  const [isEditing, setIsEditing] = useState("");
  useEffect(()=>{
  localStorage.setItem("completed",JSON.stringify(isCompleted));
},[isCompleted]);
  const currentBoard = Object.values(allData.boards).find(
    (board) => board.id === allData.activeBoardId
  );
  const ListIds = currentBoard.listIds;
  return (
    <div className="">
    {Object.values(allData.boards).map((board) => {
    return ( 
      board.id === allData.activeBoardId && (
        <div
          className="flex gap-5 pl-5 pt-15 min-h-screen w-full items-start overflow-x-auto overflow-y-hidden"
          key={board.id}
          style={{
            background:board.type === "image"?`url(${board.image})`:board.image,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {Object.values(allData.lists)
            .filter((list) => ListIds.includes(list.id))
            .map((list) => {
              const listDisplayProps = { isEditing, listId:list.id,setIsEditing,listTitle:list.title,setAllData,listDetailsId:listDetails.id,setListDetails,setIsActiveList,deleteList,allData};
              return (
                <div
                  className="bg-gray-800 px-3 w-72 flex   shrink-0 flex-col"
                  key={list.id}
                >
                 
                 <DisplayList {...listDisplayProps} />
                  {Object.values(allData.cards)
                    .filter((card) => list.cardIds.includes(card.id))
                    .map((card) => {
                      const cardDisplayProps = {cardId:card.id,isCompleted,setIsCompleted,cardTitle:card.title,allData,setAllData,listId:list.id,listTitle:list.title};
                      return (
                            <CardDisplayComponent {...cardDisplayProps} />   
                            
                      );
                    })}
                  {isActiveList !== list.id && (
                    <button
                      className="flex  items-center hover:bg-gray-700 cursor-pointer transition-all duration-500 pl-1.5 pr-32 py-1 my-1"
                      onClick={() => {
                        setIsActiveList(list.id);
                      }}
                    >
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
                  )}

                  {isActiveList === list.id && ( 
                    <div className="flex flex-col gap-2">
                      <input
                        placeholder="Enter a Title or paste a Link"
                        value={cardText}
                        onChange={(e) => setCardText(e.target.value)}
                      ></input>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addcard(list.id, setAllData, cardText)}
                        >
                          Add Task
                        </button>
                        <button onClick={() => setIsActiveList("")}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          {!isTrue && (
            <button onClick={() => setIsTrue(true)} className="cursor-pointer pr-16 pl-5  pb-1.5 pt-1.5 border-2 rounded-2xl text-black">Add Another List</button>
          )}
          {isTrue && (
            <div className="flex flex-col bg-gray-600">
              <input
                type="text"
                placeholder="Enter your list name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => addList(setAllData, String(listName), allData)}
                >
                  Add List
                </button>
                <button onClick={() => setIsTrue(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
    )
)})}
<Outlet context={{allData}}></Outlet>
  </div>);
}
