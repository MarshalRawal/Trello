import { useState } from "react";
import { useEffect } from "react";
import type { BoardState } from "../types/kanban";
export default function AddBoard({
  currentImage,
  displayImage,
  colorOrImage,
  setCurrentImage,
  setColorOrImage,
  allData,
  setAllData,
}) {
  const [allBoardState, setAllBoardState] = useState({
    allBoardColors: null,
    isBoards: false,
    displayBoardColors: [],
    borderColor: "",
    borderName: "",
  });
  useEffect(() => {
    async function getColors() {
      const jsonColorsData = await fetch(
        "https://raw.githubusercontent.com/yeun/open-color/master/open-color.json"
      );
      const actColorsData = await jsonColorsData.json();
      setAllBoardState((prev) => {
        return {
          ...prev,
          allBoardColors: actColorsData,
          displayBoardColors: Object.values(actColorsData).slice(2, 7),
        };
      });
    }
    getColors();
  }, []);
   const id = ()=>crypto.randomUUID();
  function addBoard(e){
    e.preventDefault();
      const boardId = id();
      setAllData((prev)=>{
        return({
          ...prev,boards:{...prev.boards,[boardId]:{
                id:boardId,
                type:(colorOrImage.key=="image"?"image":"color"),
                title:allBoardState.borderName,
                listIds:[],
                image:(colorOrImage.key=="image"?currentImage.download_url:currentImage),
                dateCreated:Date.now()
            }}
        })
      })
}
 useEffect(()=>{
  localStorage.setItem("allBoardValues",JSON.stringify(allData));
 },[allData]);
  return (
    <div className="flex relative w-1/4">
      <div
        onClick={() =>
          setAllBoardState((prev) => {
            return { ...prev, isBoards: true };
          })
        }
        className="flex flex-col bg-gray-700 justify-center items-center rounded-2xl w-full hover:bg-gray-600 cursor-pointer duration-200"
      >
        <p>Create A New Board</p>
      </div>
      {allBoardState.isBoards && (
        <div className=" flex flex-col items-center bg-gray-800 absolute left-full top-0 w-76 ml-1 rounded pb-3 pt-2">
          <div className="flex items-center justify-between w-full px-1">
            <div className=""></div>
            <p className="">Create Board</p>
            <button
              className="hover:bg-gray-600 cursor-pointer p-1"
              onClick={() =>
                setAllBoardState((prev) => {
                  return { ...prev, isBoards: false };
                })
              }
            >
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
          </div>

          {colorOrImage.key === "image" ? (
            <img
              src={currentImage.download_url}
              alt=""
              className="w-9/12 object-cover rounded-2xl  h-38 my-1.5"
            />
          ) : (
            <div
              className="w-9/12 rounded-2xl  h-38  my-1.5"
              style={{ backgroundColor: currentImage }}
            ></div>
          )}
          <p className="pb-1.5">Background</p>

          <div className="flex 
          
          gap-2 px-2">
            {displayImage.map((image) => {
              return (
                <div
                  key={image.id}
                  className="flex w-1/4 hover:bg-gray-700 cursor-pointer"
                >
                  <img
                    src={image.download_url}
                    alt="Image"
                    className=" rounded h-14 object-cover w-full"
                    onClick={() => {
                      setCurrentImage(image);
                      setColorOrImage({ ...colorOrImage, key: "image" });
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-6 w-full gap-1 px-2 py-1.5">
            {allBoardState.displayBoardColors.map((colors, index) => {
              console.log(colors);
              return (
                <div key={index} className="h-8">
                  <div
                    className="w-full h-full rounded cursor-pointer hover:scale-105 transition border-1 border-white"
                    style={{ backgroundColor: colors[5] }}
                    onClick={() => {
                      setCurrentImage(colors[5]);
                      setColorOrImage({ ...colorOrImage, key: "color" });
                    }}
                  ></div>
                </div>
              );
            })}
            <div className="h-8">
              <div className="w-full h-full bg-gray-600"></div>
            </div>
          </div>
          <form action="" className="w-full px-2 py-2">
            <label htmlFor="" className="">
              Board Title <br />
              <input
                type="text"
                className="w-full py-1 mt-1 rounded px-2"
                style={{
                  border: `1.2px solid ${
                    allBoardState.borderName == "" ? "red" : "white"
                  }`,
                }}
                value={allBoardState.borderName}
                onChange={(e) =>
                  setAllBoardState((prev) => {
                    return { ...prev, borderName: e.target.value };
                  })
                }
                required
              />
              {allBoardState.borderName == "" ? (
                <div>
                  <p>👋Board title is required</p>
                </div>
              ) : (
                <></>
              )}
            </label>
            <div className="">
              <p>Visibility</p>
              <select
                name=""
                id=""
                className="w-full px-0.5 py-1 mt-1 border-2 border-blue-400"
              >
                <option
                  value="WorkSpace"
                  className="bg-gray-800 text-white border border-white "
                >
                  WorkSpace
                </option>
                <option
                  value="Private"
                  className="bg-gray-800 text-white border border-white "
                >
                  Private
                </option>
                <option
                  value="Public"
                  className="bg-gray-800 text-white border border-white "
                >
                  Public
                </option>
              </select>
              <p className="mt-3">
                This Workspace has 7 boards remaining. Free Workspaces can only
                have 10 open boards. For unlimited boards, upgrade your
                Workspace.
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <button className="flex gap-1.5 py-1.5 hover:bg-gray-600 w-full justify-center my-0.5 cursor-pointer">
                <svg
                      width="24"
                      height="24"
                      role="presentation"
                      focusable="false"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V6H19V20H5V6H7V5ZM9 6H15V5H9V6ZM7 9C7 8.44772 7.44772 8 8 8H10C10.5523 8 11 8.44772 11 9V16C11 16.5523 10.5523 17 10 17H8C7.44772 17 7 16.5523 7 16V9ZM14 8C13.4477 8 13 8.44772 13 9V14C13 14.5523 13.4477 15 14 15H16C16.5523 15 17 14.5523 17 14V9C17 8.44772 16.5523 8 16 8H14Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M4 6C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20L4 6Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M20 20V6C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                Upgrade
              </button>
              {allBoardState.borderName == "" ? (
                <button disabled className="flex gap-1.5 py-1.5 bg-gray-600 w-full justify-center my-0.5 cursor-not-allowed">Create</button>
              ) : (
                <button  className="flex gap-1.5 py-1.5 hover:bg-gray-600 w-full justify-center my-0.5 cursor-pointer" onClick={(e)=>addBoard(e)}>Create</button>

              )}
              <button className="flex gap-1.5 py-1.5 hover:bg-gray-600 w-full justify-center my-0.5 cursor-pointer">Start with a Template</button>
            </div>
            <p className="text-sm">
              By using images from Unsplash, you agree to their license and
              Terms of Service
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
