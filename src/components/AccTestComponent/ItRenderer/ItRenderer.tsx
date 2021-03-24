import React, { useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';

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

  const deleteItStatementHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };

  const deleteItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.target.id;
      dispatchToAccTestCase(deleteItStatement(describeId, itId));
    }
  }

  return itStatements.allIds[describeId].map((id, i) => (
    <Draggable
      draggableId={id}
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
            tabIndex={0}
            onKeyPress={deleteItStatementOnKeyUp}
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
