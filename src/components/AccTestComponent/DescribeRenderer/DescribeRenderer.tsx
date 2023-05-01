import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItRenderer from '../ItRenderer/ItRenderer';
import StandardTagFilter from '../StandardTagFilter/StandardTagFilter';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItStatement } from '../../../context/actions/accTestCaseActions';
import { AiOutlineClose } from 'react-icons/ai';

/**
 * Renders the DescribeRenderer react component that allows 
 * the users to create decribe test cases for Accessibility
 * @param { props } dispatcher
 * @param { props } describeBlocks
 * @param { props } itStatements
 * @param { props } updateDescribeText
 * @param { props } updateItStatementText
 * @param { props } updateDescribeStandardTag
 * @param { props } updateItCatTag
 * @param { props } type
 * @param { props } theme
 * @returns { JSX.Element } Returns the DescribeRenderer component
 */
const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  updateDescribeText,
  updateItStatementText,
  updateDescribeStandardTag,
  updateItCatTag,
  type,
  theme
}) => {
  /**
   * Function that on click, deletes a DescribeBlock test case
   * @param { e } e - event 
   * @returns { void } Returns void
   */
  const deleteDescribeBlockHandleClick = (e: ChangeEvent) => {
    e.stopPropagation();
    const describeId = e.currentTarget.id;
    dispatcher(deleteDescribeBlock(describeId));
  };
  /**
   * Function that on click, adds a statement to the describe block in the Accessibility test type
   * @param { e } e - event 
   * @returns { void } Returns void
  */
  const addItStatementHandleClick = (e: ChangeEvent) => {
    const describeId = e.target.id;
    dispatcher(addItStatement(describeId));
  };

  /**
   * Deletes the describe block in Accessibility test type when the charCode 13 (ENTER) is pressed.
   * 
   * NOTE: This functionality doesn't seem to be working at the moment.
   * @param { e } e - event 
   * @returns { void } Returns void
   */
  const deleteDescribeBlockOnKeyUp = (e: ChangeEvent) => {
    if (e.charCode === 13) {
      const describeId = e.target.id;
      dispatcher(deleteDescribeBlock(describeId));
    }
  };

  return describeBlocks.allIds.map((id: string, i: number) => (
    <div
      key={`describeBlock-${id}`}
      index={i}
      type="describe"
    >
          <div id={styles.describeBlock} key={i}>
            <label htmlFor="describe-label" className={styles.describeLabel}>
              Describe Block
            </label>

            <StandardTagFilter
              dispatch={dispatcher}
              tagAction={updateDescribeStandardTag}
              textAction={updateDescribeText}
              describeId={id}
              standardTag={describeBlocks.byId[id].standardTag}
              key={`StandardTagFilter-${id}-${i}`}
            />

            {i > 0 && <AiOutlineClose
              tabIndex={0}
              onKeyPress={deleteDescribeBlockOnKeyUp}
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            />}

            <p className={styles.describeStatement}>{describeBlocks.byId[id].text}</p>
            <div className={styles.separator} />

              
                  <ItRenderer
                    type={type}
                    key={`it-${id}-${i}`}
                    itStatements={itStatements}
                    describeId={id}
                    updateItStatementText={updateItStatementText}
                    updateItCatTag={updateItCatTag}
                  />

            <div className={styles.buttonContainer}>
              <div>
                <button className={styles.addIt} id={id} onClick={addItStatementHandleClick}>
                  Add It Statement
                </button>
              </div>
            </div>
          </div>
        </div>
  ));
};

export default DescribeRenderer;
