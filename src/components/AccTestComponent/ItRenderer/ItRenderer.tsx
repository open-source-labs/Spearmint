import React, { ChangeEvent, useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';
import CatTagFilter from '../CatTagFilter/CatTagFilter';
import { AiOutlineClose } from 'react-icons/ai';

import {
  deleteItStatement,
} from '../../../context/actions/accTestCaseActions';

import styles from './ItRenderer.module.scss';
/**
 * Renders the ItRenderer react compoonent that allows
 * the users to create it statements for Accessibility
 * @returns { JSX.Element } Returns the DescribeRenderer component
 */
const ItRenderer = ({
  itStatements,
  describeId,
  updateItStatementText,
  updateItCatTag,
}) => {

  const [, dispatchToAccTestCase] = useContext(AccTestCaseContext);

  /**
   * Function that on click, deletes a It statement 
   * @param { e } e - event 
   * @returns { void } Returns void
   */
  const deleteItStatementHandleClick = (e: ChangeEvent) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };
/**
   * Deletes the statement block in Accessibility test type when the charCode 13 (ENTER) is pressed.
   * 
   * NOTE: This functionality doesn't seem to be working at the moment.
   * @param { e } e - event 
   * @returns { void } Returns void
   */

  const deleteItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.target.id;
      dispatchToAccTestCase(deleteItStatement(describeId, itId));
    }
  }

  return itStatements.allIds[describeId].map((id: string, i: number) => (
    <Draggable
      draggableId={id}
      index={i}
      key={`itRenderer-${id}`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.ItRenderer}
          key={i}
        >

          <CatTagFilter
            dispatch={dispatchToAccTestCase}
            tagAction={updateItCatTag}
            textAction={updateItStatementText}
            itId={id}
            catTag={itStatements.byId[id].catTag}
          />

          <AiOutlineClose
            tabIndex={0}
            onKeyPress={deleteItStatementOnKeyUp}
            onClick={deleteItStatementHandleClick}
            id={id}
            className={cn(styles.itClose, 'far fa-window-close')}
          />

          <p className={styles.itStatement}>{itStatements.byId[id].text}</p>
          <hr />

        </div>
      )}
    </Draggable>
  ));
};

export default ItRenderer;
