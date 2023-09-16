/**
 * ?
 */

import React from 'react';
import styles from './Prop.module.scss';
import {
  deleteProp,
  updateProp,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import { PropProps } from '../../../utils/reactTypes';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';

const minusIcon = require('../../../assets/images/minus-box-outline.png');

// This is the file that tracks what props you are passing into a specific test

const Prop = ({ blockObjectsState }): JSX.Element => {
  const { handleAddBlock, handleChange, handleDeleteBlock } =
    useContext(RTFsContexts);
  const [{ theme }] = useContext(GlobalContext);

  const handleClickDeleteProp = (e: React.MouseEvent): void => {
    e.stopPropagation();
    dispatchToTestCase(deleteProp(statementId, propId));
  };

  const handleChangeUpdatePropKey = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.stopPropagation();
    dispatchToTestCase(
      updateProp(statementId, propId, e.target.value, propValue)
    );
  };

  const handleChangeUpdatePropValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.stopPropagation();
    dispatchToTestCase(
      updateProp(statementId, propId, propKey, e.target.value)
    );
  };

  return (
    <div id={styles[`renderPropsFlexBox${theme}`]}>
      <input
        type="text"
        id="propKey"
        value={thisBlockObjectsState.propKey}
        onChange={(e) => {
          handleChange(e, 'propKey', thisBlockObjectsState.filepath);
        }}
      />
      <input
        type="text"
        id="propValue"
        value={thisBlockObjectsState.propValue}
        onChange={(e) => {
          handleChange(e, 'propValue', thisBlockObjectsState.filepath);
        }}
        placeholder="Enter or select a value."
      />
      {/* <AutoCompleteMockData
        id='propValue'
        propType='prop'
        renderId={statementId}
        propId={propId}
        propKey={propKey}
        propValue={propValue}
        dispatchToTestCase={dispatchToTestCase}
      /> */}
      <img
        src={minusIcon}
        alt="delete"
        onClick={(e) => {
          handleDeleteBlock(
            thisBlockObjectsState.parentsFilepath,
            thisBlockObjectsState.key
          );
        }}
      />
    </div>
  );
};

export default Prop;
