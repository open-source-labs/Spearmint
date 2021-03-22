import React, { ChangeEvent, useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';

import {
  deleteItStatement,
} from '../../../context/actions/accTestCaseActions';

import CustomInput from '../CustomInput/CustomInput';

import styles from './ItRenderer.module.scss';
import { ItStatements } from '../../../utils/accTypes';

const ItRenderer = ({
  itStatements,
  describeId,
  handleChangeItStatementText,
}) => {

  const [, dispatchToAccTestCase] = useContext(AccTestCaseContext);

<<<<<<< HEAD
  // filter out ids not belonging to the correct describe block
  // ### do we need this?
  const filteredIds = itStatements.allIds.filter((id: string) => {
    return itStatements.byId[id].describeId === describeId;
  });


  const deleteItStatementHandleClick = (e: ChangeEvent) => {
=======
  const deleteItStatementHandleClick = (e) => {
>>>>>>> f2bf901cfb50109a256ae1c00d5c5934f303f371
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };

<<<<<<< HEAD
  return filteredIds.map((id: ItStatements, i: number) => (
    <div id={styles.ItRenderer} key={i}>

      <i
        onClick={deleteItStatementHandleClick}
        id={id}
        className={cn(styles.itClose, 'far fa-window-close')}
      ></i>

      <CustomInput
        key={`input-${id}-${i}`}
        id={id}
        label={'The element should...'}
        placeholder={'The tested element should...'}
        value={itStatements.byId[id].text}
        handleChange={handleChangeItStatementText}
        bold={null}
      />

      <hr />
 
    </div>
  ));
};

export default ItRenderer;
=======
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
>>>>>>> f2bf901cfb50109a256ae1c00d5c5934f303f371
