import React from "react";

function Looper(total) {
  let items = [];
  if (total < 10) {
    for (let i = 0; i < total; i++) {
      items.push(i+1);
    }
  } else {
    items = [1,2,3,"...",total-2, total-1, total];
  }
  return items;
}

export const Pagination = props => {
  return (
    <ul className="pagination">
      {Looper(props.totalPages).map(i =>  <li key={i} onClick={() => props.toPage(i)} >{i}</li>)}
    </ul>
  );
};
