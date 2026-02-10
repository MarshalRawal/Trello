function createList(title:string){
    const listId = crypto.randomUUID();
    return{
        id:listId,
        title,
        cardIds:[],
        dateCreated:Date.now(),
    }
}
export default function addList(setAllData,title:string,allData){
    const activeBId = allData.activeBoardId;
    const list1 = createList(title);
    const updatedBoards = Object.fromEntries(Object.entries(allData.boards).map(([id,board]) => [id,id === activeBId?{...board,listIds:[...board.listIds,list1.id]}:board]));
    setAllData((prev)=>{
        return({
            ...prev,boards:updatedBoards,lists:{...prev.lists,[list1.id]:list1}
        })
    })
}