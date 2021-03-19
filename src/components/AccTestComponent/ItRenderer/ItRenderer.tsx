import React, { useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';

// test case statements are for action, assertion, and render options
// import AccTestStatements from '../../TestCase/AccTestStatements';

import {
  deleteItStatement,
} from '../../../context/actions/accTestCaseActions';

import CustomInput from '../CustomInput/CustomInput';

import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  handleChangeItStatementText,
}) => {

  const [, dispatchToAccTestCase] = useContext(AccTestCaseContext);

  // filter out ids not belonging to the correct describe block
  // ### do we need this?
  const filteredIds = itStatements.allIds.filter((id) => {
    return itStatements.byId[id].describeId === describeId;
  });

  const deleteItStatementHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };

  return filteredIds.map((id, i) => (
    <Draggable
      draggableId={describeId + id}
      index={i}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.ItRenderer}
          key={i}
        >

          <i
            onClick={deleteItStatementHandleClick}
            id={id}
            className={cn(styles.itClose, 'far fa-window-close')}
          />

          <CustomInput
            key={`input-${id}-${i}`}
            id={id}
            label={'The element should...'}
            placeholder={'The tested element should...'}
            value={itStatements.byId[id].text}
            handleChange={handleChangeItStatementText}
          />
          <hr />

        </div>
      )}
    </Draggable>
  ));
};

export default ItRenderer;


// ## stretch use?
// <ReactTestStatements
//   key={`statement-${id}-${i}`}
//   statements={statements}
//   itId={id}
//   describeId={describeId}
// /> 