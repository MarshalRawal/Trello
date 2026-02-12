import React from 'react'

function deleteList({allData,setAllData,listId}) {

    const newList = Object.fromEntries(Object.entries(allData.lists).filter(([id]) => id !== listId))
    setAllData((data)=>{
        return({...data,lists:newList})
    })
}

export default deleteList