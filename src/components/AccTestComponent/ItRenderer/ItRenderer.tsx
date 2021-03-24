import React, { ChangeEvent, useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';
import CatTagFilter from '../CatTagFilter/CatTagFilter';

import {
  deleteItStatement,
} from '../../../context/actions/accTestCaseActions';

import CustomInput from '../CustomInput/CustomInput';

import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  itStatements,
  describeId,
  updateItStatementText,
  updateItCatTag,
}) => {

  const [, dispatchToAccTestCase] = useContext(AccTestCaseContext);

  const deleteItStatementHandleClick = (e: ChangeEvent) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };

  return itStatements.allIds[describeId].map((id: string, i:number) => (
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



            < CatTagFilter
              dispatch={dispatchToAccTestCase}
              tagAction={updateItCatTag}
              textAction={updateItStatementText}
              describeId={describeId}
              itId={id}
              catTag={itStatements.byId[id].catTag}
            />

          <i
            onClick={deleteItStatementHandleClick}
            id={id}
            className={cn(styles.itClose, 'far fa-window-close')}
          />

          {/* <CustomInput
            key={`input-${id}-${i}`}
            id={id}
            label={'The element should...'}
            placeholder={'The tested element should...'}
            value={itStatements.byId[id].text}
            handleChange={handleChangeItStatementText}
          /> */}

          <p class={styles.itStatement}>{itStatements.byId[id].text}</p>
          <hr />

        </div>
      )}
    </Draggable>
  ));
};

export default ItRenderer;
