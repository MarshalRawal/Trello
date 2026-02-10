import React from 'react'
function makeNewCard(title:string){
    const cardId = crypto.randomUUID();
    return({
       id:cardId,
        title:title,
        description:"",
        dateCreated:Date.now(),
        label:"",
    })
};
export default function addcard(listId,setAllData,cardText) {
const newCard = makeNewCard(cardText);
setAllData((prev)=>{
    return({
        ...prev,
        lists:{...prev.lists,[listId]:{...prev.lists[listId],cardIds:[...prev.lists[listId].cardIds,newCard.id]}},
        cards:{...prev.cards,[newCard.id]:newCard}
    })
})
}
