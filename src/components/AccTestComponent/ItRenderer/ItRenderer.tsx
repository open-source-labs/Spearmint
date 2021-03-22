import React, { ChangeEvent, useContext } from 'react';
import cn from 'classnames';

import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';

// test case statements are for action, assertion, and render options
// import AccTestStatements from '../../TestCase/AccTestStatements';

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

  // filter out ids not belonging to the correct describe block
  // ### do we need this?
  const filteredIds = itStatements.allIds.filter((id: string) => {
    return itStatements.byId[id].describeId === describeId;
  });


  const deleteItStatementHandleClick = (e: ChangeEvent) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };

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