import React, { useState } from "react";
import Prop from "./Render/Prop";
import { deleteRender, updateRender, addRenderProp } from "./testCaseActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Render = ({ id, dispatchTestCase, props }) => {
  const [componentName, setComponentName] = useState("");
  const [toggleProps, setToggleProps] = useState(false);

  const handleClickDelete = e => {
    dispatchTestCase(deleteRender(id));
  };

  const handleUpdateComponentName = e => {
    setComponentName(e.target.value);
    dispatchTestCase(updateRender(id, e.target.value));
  };

  const handleToggleProps = id => {
    dispatchTestCase(addRenderProp(id));
  };

  const propsJSX = props.map(prop => {
    return (
      <Prop
        key={id}
        renderId={id}
        propId={prop.id}
        propKey={prop.propKey}
        propValue={prop.propValue}
      />
    );
  });

  return (
    <section>
      <h3>Render</h3>
      <FontAwesomeIcon
        id="delete-action"
        icon="times"
        onClick={handleClickDelete}
      />
      <div>
        <label htmlFor="render-input-box">Component Name</label>
        <input
          type="text"
          id="render-input-box"
          value={componentName}
          onChange={handleUpdateComponentName}
        />
      </div>
      <div>
        <label htmlFor="render-checkbox">Props</label>
        <input
          type="checkbox"
          id="render-checkbox"
          disabled={propsJSX.length}
          onClick={handleToggleProps}
        />
      </div>
    </section>
  );
};

export default Render;
