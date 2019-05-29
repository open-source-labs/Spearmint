import React from "react";
import {
  addRenderProp,
  deleteRenderProp,
  updateRenderProp
} from "../../../../../context/testCaseActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RenderProp = ({ dispatchTestCase, renderId, propId, propKey, propValue }) => {
  const handleClickAdd = () => {
    dispatchTestCase(addRenderProp());
  };

  const handleClickDelete = e => {
    e.stopPropagation();
    dispatchTestCase(deleteRenderProp(renderId, propId));
  };

  const handleChangeUpdatePropKey = e => {
    e.stopPropagation();
    dispatchTestCase(
      updateRenderProp(renderId, propId, e.target.value, propValue)
    );
  };

  const handleChangeUpdatePropValue = e => {
    e.stopPropagation();
    dispatchTestCase(
      updateRenderProp(renderId, propId, propKey, e.target.value)
    );
  };

  return (
    <div>
      <h4>Props</h4>
      <FontAwesomeIcon
        id="delete-action"
        icon="plus"
        onClick={handleClickAdd}
      />
      <p>key</p>
      <p>value</p>
      <FontAwesomeIcon
        id="delete-action"
        icon="minus"
        onClick={handleClickDelete}
      />
      <input type="text" id="propKey" onChange={handleChangeUpdatePropKey} />
      <input
        type="text"
        id="propValue"
        onChange={handleChangeUpdatePropValue}
      />
    </div>
  );
};

export default RenderProp;
