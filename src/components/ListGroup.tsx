import React from "react";
import { Fragment } from "react";
const ListGroup = () => {
  const list =['hyk','korea','japan']
  
  return (
    <Fragment>
      <ul className="list-group">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul>
    </Fragment>
  );
};

export default ListGroup;
