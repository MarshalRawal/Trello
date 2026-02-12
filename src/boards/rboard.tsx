import { useEffect, useState } from "react";
import addList from "../lists/addlists";
import addcard from "../card/addcard";
import deleteList from "../lists/deleteList";
import ShowCardDisplay from "../card/showCardDetail";
import type { BoardState } from "../types/kanban";
export default function Boards({ allData, setAllData }) {
  const [listDetails, setListDetails] = useState({ id: "" });
  const [isCompleted,setIsCompleted] = useState({cards:[]});
  const [isTrue, setIsTrue] = useState(false);
  const [isActiveCard, setIsActiveCard] = useState(null);
  const [isActiveList, setIsActiveList] = useState(null);
  const [cardText, setCardText] = useState("");
  const [listName, setListName] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const currentBoard = Object.values(allData.boards).find(
    (board) => board.id === allData.activeBoardId
  );
  const ListIds = currentBoard.listIds;
  return Object.values(allData.boards).map((board) => {
    return (
      board.id === allData.activeBoardId && (
        <div
          className="flex gap-5 pl-5 pt-15 min-h-screen w-full items-start overflow-x-auto overflow-y-hidden"
          key={board.id}
          style={{
            backgroundImage: `url(${board.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {Object.values(allData.lists)
            .filter((list) => ListIds.includes(list.id))
            .map((list) => {
              return (
                <div
                  className="bg-gray-800 px-3 w-72 flex   shrink-0 flex-col"
                  key={list.id}
                >
                  <div className="flex justify-between items-center relative">
                    {isEditing !== list.id ? (
                      <p
                        className="leading-none w-full cursor-pointer"
                        onClick={() => setIsEditing(list.id)}
                      >
                        {list.title}
                      </p>
                    ) : (
                      <input
                        autoFocus
                        onBlur={() => setIsEditing("")}
                        value={list.title}
                        onChange={(e) =>
                          setAllData((adata) => {
                            return {
                              ...adata,
                              lists: {
                                ...adata.lists,
                                [list.id]: {
                                  ...adata.lists[list.id],
                                  title: e.target.value,
                                },
                              },
                            };
                          })
                        }
                        className="w-full"
                      ></input>
                    )}
                    <button
                      className="flex items-center justify-center cursor-pointer relative"
                      onClick={() =>
                        setListDetails((ld) => {
                          return { ...ld, id: list.id };
                        })
                      }
                    >
                      <span className="text-3xl leading-none">…</span>
                    </button>
                    {listDetails.id === list.id && (
                      <div className="absolute top-10 right-[-11.5rem]  bg-amber-400 w-52  pt-2 pb-3 pr-2">
                        <div className="flex items-center justify-between">
                          <p></p>
                          <p>List Actions</p>
                          <button
                            className="cursor-pointer flex"
                            onClick={() =>
                              setListDetails((ld) => {
                                return { ...ld, id: "" };
                              })
                            }
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div className="flex flex-col items-start pl-2">
                          <button
                            onClick={() => {
                              setListDetails({ id: "" });
                              setIsActiveList(list.id);
                            }}
                          >
                            Add Card
                          </button>
                          <button>Archieve All Cards</button>
                          <button
                            onClick={() => {
                              setIsEditing(list.id);
                              setListDetails({ id: "" });
                              // set
                            }}
                            className="cursor-pointer"
                          >
                            Edit List
                          </button>
                          <button
                            onClick={() => {
                              deleteList({
                                allData,
                                setAllData,
                                listId: list.id,
                              });
                            }}
                          >
                            Archieve List
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {Object.values(allData.cards)
                    .filter((card) => list.cardIds.includes(card.id))
                    .map((card) => {
                      return (
                        <div className="flex gap-2 items-center group" key={card.id}
                        onClick={() => {
                           setIsActiveCard(card.id);
                          if(!isCompleted.cards.includes(card.id)){      
                              setIsCompleted((prev)=>{
                                return({
                                  cards:[...prev.cards,card.id]
                                })
                              });
                            }
                            else{
                              const newCardIds = isCompleted.cards.filter((cd) => cd !== card.id);
                            setIsCompleted(()=>{
                              return({
                                cards:newCardIds
                              })
                            })
                            }}}>
                          {isCompleted.cards.includes(card.id)?
                          <div className="flex items-center gap-2">
                           <button className=" w-6 h-6 flex items-center justify-center"
                          >
                            <svg
                              className="w-5 h-5 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              {/* Circle */}
                              <circle cx="12" cy="12" r="9" />

                              {/* Tick */}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 12l3 3 5-6"
                              />
                            </svg>
                          </button>
                          <span className="text-green-500">
                            {card.title}
                            </span>
                            </div>
                          :
                          <div className="flex items-center gap-2">
                           <button className="opacity-0 group-hover:opacity-100 flex items-center w-6 h-6 justify-center">
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
                          <span>
                            {card.title}
                            </span>
                            <button className="w-6 h-6 flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Pencil -->
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
  </svg>
</button>

                          </div>
                         }
                            {/* {isActiveCard === card.id && (
                              <ShowCardDisplay
                                cardTitle={card.title}
                                listTitle={list.title}
                              ></ShowCardDisplay>
                            )} */}
                        </div>
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
          ;
          {!isTrue && (
            <button onClick={() => setIsTrue(true)}>Add Another List</button>
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
    );
  });
}
