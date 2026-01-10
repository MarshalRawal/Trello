import { useEffect, useState } from "react";
import AddBoard from "./boards/addboard";
export default function Home({ BoardSt }) {
  const [displayImage,setDisplayImage] = useState([]);
  const [colorOrImage,setColorOrImage] = useState({key:"image"});
  const [currentImage,setCurrentImage] = useState({});
  
  useEffect(()=>{
    async function getData(){
      const jsonData = await fetch("https://picsum.photos/v2/list?page=2&limit=20");
      const actualData  = await jsonData.json();
      setDisplayImage(actualData.slice(0,4));
      setCurrentImage(actualData[0]);
    }
  getData();
  },[]);
  return (
    <>
      <div className="body-bg">
        <div className="flex justify-center">
          <div className="search-bar">
            <svg
              className="absolute left-2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="side-bar">
          <p className="py-1">Boards</p>
          <p className="py-1">Templates</p>
          <p className="py-1">Home</p>
        </div>
        <div className="main-bg">
        <div className="flex items-center mt-6 mb-5">
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
              d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z"
              fill="currentColor"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z"
              fill="currentColor"
            ></path>
          </svg>
          <p>Your Boards</p>
          </div>
          <div className="boards-layout">
            {Object.values(BoardSt.boards).map((board) => {
              return (
                  <div className="boards" key={board.id}>
                    <img src={board.image} alt="" className="rounded-2xl" />
                    <p>{board.title}</p>
                  </div>              
              );
            })}
            <AddBoard displayImage={displayImage} currentImage={currentImage} setCurrentImage={setCurrentImage} colorOrImage={colorOrImage} setColorOrImage={setColorOrImage}></AddBoard>
             
          </div>
        </div>
      </div>
    </>
  );
}
