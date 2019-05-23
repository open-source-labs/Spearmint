import React from "react";
// import { deleteAction } from "./testCaseReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Action = ({ dispatchTestCase }) => {
  // const handleClickDelete = e => {
  //   e.stopPropagation();
  //   dispatch(deleteAction());
  // };

  return (
    <>
      <h3>Action</h3>
      <FontAwesomeIcon id="delete-action" icon="times" />
      <label htmlFor="action-name">Event Type</label>
      <input type="text" id="action-name" />
    </>
  );
};

export default Action;
