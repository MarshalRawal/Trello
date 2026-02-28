import type { BoardState,Card,List,Board} from "./types/kanban";
import boardBg from "./assets/image.png";
import { useEffect, useState } from "react";
import addList from "./lists/addlists";
import Boards from "./boards/rboard";
import { Routes,Route } from "react-router-dom";
import Home from "./homepage";
import ShowCardDetail from "./card/showCardDetail";
const templateValues:BoardState = {
        boards:{"1":
            {
                id:"1",
                type:"image",
                title:"mm",
                listIds:["1","2","3"],
                image:"/image.png",
                dateCreated:Date.now()
            }
        },
        lists:{"1":
            {id:"1",
            title:"To Do",
            cardIds:[],
            dateCreated:Date.now()
            },
            "2":
            {id:"2",
            title:"Doing",
            cardIds:[],
            dateCreated:Date.now()
            }
            ,
            "3":
            {id:"3",
            title:"Done",
            cardIds:[],
            dateCreated:Date.now()
            }
        },
        cards:{
        },
        activeBoardId:"1"
    }
const newIds = ()=>crypto.randomUUID();
const boardId = newIds();
const listId1 = newIds();
const listId2 = newIds();
const listId3 = newIds();
const cardId1 = newIds();
export default function App(){
const initialValues:BoardState = {
        boards:{[boardId]:
            {
                id:boardId,
                title:"mm",
                type:"image",
                listIds:[listId1,listId2,listId3],
                image:boardBg,
                dateCreated:Date.now()
            }
        },
        lists:{[listId1]:
            {id:listId1,
            title:"To Do",
            cardIds:[],
            dateCreated:Date.now()
            },
            [listId2]:
            {id:listId2,
            title:"Doing",
            cardIds:[],
            dateCreated:Date.now()
            }
            ,
            [listId3]:
            {id:listId3,
            title:"Done",
            cardIds:[cardId1],
            dateCreated:Date.now()
            }
        },
        cards:{
            [cardId1]:{
                id:cardId1,
                  title:"Done Coding",
                  dateCreated:Date.now(),
                  label:"Important",
            }
        },
        activeBoardId:boardId
    }
   const [allData,setAllData] = useState<BoardState>(()=>{
    const savedData = localStorage.getItem("allBoardValues")
    return(savedData?JSON.parse(savedData):initialValues);
   });
   useEffect(()=>{
 localStorage.setItem("allBoardValues",JSON.stringify(allData));
},[allData]);

   return(
    <>
    <Routes>
        <Route path="/" element={<Home allData={allData} setAllData={setAllData}></Home>}>
        </Route>
        <Route path="/boards/:boardId" element={ <Boards allData={allData} setAllData={setAllData}></Boards>}>
        <Route path="cards/:cardId" element={<ShowCardDetail />}></Route>
        </Route>
    </Routes>
    {/* <Boards allData={allData} setAllData={setAllData}></Boards> */}
    </>
   )
}