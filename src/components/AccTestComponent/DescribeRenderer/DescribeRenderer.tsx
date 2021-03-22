<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
// import React object and destructure useRef and useEffect hooks 
import React, { useRef, useEffect, ChangeEvent } from 'react';

// import It component
=======
import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
>>>>>>> f2bf901cfb50109a256ae1c00d5c5934f303f371
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItStatement } from '../../../context/actions/accTestCaseActions';

<<<<<<< HEAD
// import from accTypes - ### add after html structure is created? 
import { AccTestCaseState, DescribeBlocks } from '../../../utils/accTypes';

import cn from 'classnames';
// require in icons
const closeIcon = require('../../../assets/images/close.png');
// const dragIcon = require('../../assets/images/drag-vertical.png');
// const minusIcon = require('../../assets/images/minus-box-outline.png');


=======
>>>>>>> f2bf901cfb50109a256ae1c00d5c5934f303f371
const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  handleChangeDescribeText,
  handleChangeItStatementText,
  type,
}): AccTestCaseState => {
  const testDescription = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    testDescription.current.focus();
  }, []);

  const deleteDescribeBlockHandleClick = (e: ChangeEvent) => {
    e.stopPropagation();
    const describeId = e.target.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const addItStatementHandleClick = (e: ChangeEvent) => {
    const describeId = e.target.id;
    dispatcher(addItStatement(describeId));
  };

<<<<<<< HEAD
  return draggableStatements.map((id: DescribeBlocks, i: number) => {
    return (
      <>
      <div id={styles.describeBlock} key={i}>
        <label htmlFor='describe-label' className={styles.describeLabel}>
          Describe Block
        </label>

        <i
          onClick={deleteDescribeBlockHandleClick}
          id={id}
          className={cn('far fa-window-close', styles.describeClose)}
        ></i>

        <input
          ref={testDescription}
          id={id}
          className={styles.describeInput}
          name='describe-label'
          type='text'
          placeholder={'Component has basic accessibility'}
          value={describeBlocks.byId[id].text || ''}
          onChange={handleChangeDescribeText}
        />

        <div className={styles.separator}></div>
        <ItRenderer
          type={type}
          key={`it-${id}-${i}`}
          itStatements={itStatements}
          statements={statements}
          describeId={id}
          handleChangeItStatementText={handleChangeItStatementText}
        />

        {/* Implement Button For Stretch */}
        <div className={styles.buttonContainer}>
          <button className={styles.addIt} id={id} onClick={addItStatementHandleClick}>
            +It Statement
          </button>
        </div>

      </div>
      </>
    );
  });
=======
  return describeBlocks.allIds.map((id, i) => (
    <Draggable
      key={id}
      draggableId={id}
      index={i}
      type="describe"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div id={styles.describeBlock} key={i}>
            <label htmlFor="describe-label" className={styles.describeLabel}>
              Describe Block
            </label>

            <i
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            />

            <input
              ref={testDescription}
              id={id}
              className={styles.describeInput}
              name="describe-label"
              type="text"
              placeholder="Component has basic accessibility"
              value={describeBlocks.byId[id].text || ''}
              onChange={handleChangeDescribeText}
            />

            <div className={styles.separator} />

            <Droppable
              droppableId={"droppableAccIt" + id}
              type={id}
            >
              {(innerProvided) => (
                <div
                  ref={innerProvided.innerRef}
                  {...innerProvided.droppableProps}
                >
                  <ItRenderer
                    type={type}
                    key={`it-${id}-${i}`}
                    itStatements={itStatements}
                    describeId={id}
                    handleChangeItStatementText={handleChangeItStatementText}
                  />
                  {innerProvided.placeholder}
                </div>
              )}
            </Droppable>

            <div className={styles.buttonContainer}>
              <button className={styles.addIt} id={id} onClick={addItStatementHandleClick}>
                +It Statement
              </button>
            </div>

          </div>
        </div>
      )}
    </Draggable>
  ));
>>>>>>> f2bf901cfb50109a256ae1c00d5c5934f303f371
};

export default DescribeRenderer;
