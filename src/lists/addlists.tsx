function createList(title:string){
    const listId = crypto.randomUUID();
    return{
        id:listId,
        title,
        cardIds:[],
        dateCreated:Date.now(),
    }
}
export default function addList(setAllData,title:string){
    const list1 = createList(title);
    setAllData((previous)=>{
        const boardId = previous.activeBoardId;
        return({
            ...previous,
            boards:{...previous.boards,
                [boardId]:{...previous.boards[boardId],listIds:[...previous.boards[boardId].listIds,list1.id]}
            },
            lists:{...previous.lists, [list1.id]:
                    list1}
        })
    })
}