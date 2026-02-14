import React from 'react'

function completeComponent({setIsActiveCard,setIsCompleted,isCompleted,cardId}) {
     setIsActiveCard(cardId);
                            if (!isCompleted.cards.includes(cardId)) {
                              setIsCompleted((prev) => {
                                return {
                                  cards: [...prev.cards, cardId],
                                };
                              });
                            } else {
                              const newCardIds = isCompleted.cards.filter(
                                (cd) => cd !== cardId
                              );
                              setIsCompleted(() => {
                                return {
                                  cards: newCardIds,
                                };
                              });
                            }
}

export default completeComponent