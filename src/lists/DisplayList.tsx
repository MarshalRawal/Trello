import React from "react";

function DisplayList({ isEditing, listId ,setIsEditing,listTitle,setAllData,listDetailsId,setListDetails,setIsActiveList,deleteList,allData}) {
  return (
    <div className="flex justify-between items-center relative">
      {isEditing !== listId ? (
        <p
          className="leading-none w-full cursor-pointer"
          onClick={() => setIsEditing(listId)}
        >
          {listTitle}
        </p>
      ) : (
        <input
          autoFocus
          onBlur={() => setIsEditing("")}
          value={listTitle}
          onChange={(e) =>
            setAllData((adata) => {
              return {
                ...adata,
                lists: {
                  ...adata.lists,
                  [listId]: {
                    ...adata.lists[listId],
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
            return { ...ld, id: listId };
          })
        }
      >
        <span className="text-3xl leading-none">…</span>
      </button>
      {listDetailsId === listId && (
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
                setIsActiveList(listId);
              }}
            >
              Add Card
            </button>
            <button>Archieve All Cards</button>
            <button
              onClick={() => {
                setIsEditing(listId);
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
                  listId: listId,
                });
              }}
            >
              Archieve List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayList;
