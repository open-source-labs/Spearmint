import React, { ChangeEvent, useContext } from 'react';
import cn from 'classnames';
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
    const itId = e.currentTarget.id;
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
      const itId = e.currentTarget.id;
      dispatchToAccTestCase(deleteItStatement(describeId, itId));
    }
  }

  return itStatements.allIds[describeId].map((id: string, i: number) => {
    console.log('ID: ', id);
    console.log('ID IN ITSTATEMENTS: ', itStatements.byId[id]);
    return (

        <div
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
    )
  });
};

export default ItRenderer;
