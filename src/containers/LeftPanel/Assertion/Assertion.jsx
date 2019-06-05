import React from 'react';
import LastAssertion from './LastAssertion';
import { Draggable } from 'react-beautiful-dnd';

const Assertion = ({ assertion, index, dispatchToTestCase }) => {
  return (
    <Draggable draggableId={assertion.id.toString()} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <LastAssertion assertion={assertion} dispatchToTestCase={dispatchToTestCase} />
        </div>
      )}
    </Draggable>
  );
};

export default Assertion;
