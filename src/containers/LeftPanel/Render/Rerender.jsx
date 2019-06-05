import React from 'react';
import FirstRender from './FirstRender';
import { Draggable } from 'react-beautiful-dnd';

const Rerender = ({ id, index, props, dispatchToTestCase }) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <FirstRender key={id} id={id} props={props} dispatchToTestCase={dispatchToTestCase} />
        </div>
      )}
    </Draggable>
  );
};

export default Rerender;
