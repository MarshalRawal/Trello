import type { BoardState,Card,List,Board} from "./types/kanban";
import boardBg from "./assets/image.png";
import { useState } from "react";
import addList from "./lists/addlists";
import Boards from "./boards/rboard";
import Home from "./homepage";
let initialValues:BoardState = {
        boards:{"1":
            {
                id:"1",
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
let templateValues:BoardState = {
        boards:{"1":
            {
                id:"1",
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
export default function App(){
   const [allData,setAllData] = useState(initialValues);
   return(
    <>
    <Home BoardSt={allData}></Home>
    {/* <Boards allData={allData} setAllData={setAllData}></Boards> */}
    </>
   )
}