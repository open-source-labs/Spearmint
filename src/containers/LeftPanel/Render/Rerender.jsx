/**
 * the actual card you fill out
 */

import React from 'react';
import Render from './Render';
import { Draggable } from 'react-beautiful-dnd';

const Rerender = ({ render, index }) => {
  return (
    <Draggable draggableId={render.toString()} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Render key={render.id} render={render} />
        </div>
      )}
    </Draggable>
  );
};

export default Rerender;
