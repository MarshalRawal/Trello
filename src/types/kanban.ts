export type ID = string;
export interface Card{
  id:ID,
  title:string,
  description?:string,
  dateCreated:number,
  label?:string,
}
export interface List{
  id:ID,
  title:string,
  cardIds: ID[],
  dateCreated:number,
}
export interface Board{
  id:ID,
  title:string,
  listIds:ID [],
  image:string,
  dateCreated:number,
}
export interface BoardState{
  boards:Record<ID, Board>,
  lists:Record<ID, List>,
  cards:Record<ID,Card>,
  activeBoardId:ID|null,
}
