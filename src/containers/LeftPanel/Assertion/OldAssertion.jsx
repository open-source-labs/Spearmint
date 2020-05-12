/**
 * homepage assertion card
 * renders last assertion component
 */

import React from 'react';
import Assertion from './Assertion';
import { Draggable } from 'react-beautiful-dnd';

const OldAssertion = ({ assertion, index, dispatchToTestCase }) => {
  return (
    <Draggable draggableId={assertion.id.toString()} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Assertion assertion={assertion} dispatchToTestCase={dispatchToTestCase} />
        </div>
      )}
    </Draggable>
  );
};

export default OldAssertion;
