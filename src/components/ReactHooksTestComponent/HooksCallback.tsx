import React, { useContext } from 'react';
import styles from '../EndpointTestComponent/Endpoint.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { deleteCallbackFunc, updateCallbackFunc } from '../../context/actions/hooksTestCaseActions';
import { HooksCallbackProps } from '../../utils/hooksTypes';

const closeIcon = require('../../assets/images/close.png');

const HooksCallback = ({ callbackFunc, index, id }: HooksCallbackProps): JSX.Element => {
  const [, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);

  const handleClickDeleteCallbackFunc = (): void => {
    dispatchToHooksTestCase(deleteCallbackFunc(index, id));
  };

  const handleChangeUpdateCallbackFunc = (e: React.ChangeEvent<HTMLInputElement>, field: 'callbackFunc'): void => {
    const updatedCallbackFunc = { ...callbackFunc, [field]: e.target.value };
    dispatchToHooksTestCase(updateCallbackFunc(index, id, updatedCallbackFunc));
  };

  return (
    <>
      <div id={styles.labelInput}>
        <label htmlFor='callbackFunc'>Callback Function</label>
        <div id={styles.inputFlexBox}>
          <input
            type='text'
            list='responseProperties'
            value={callbackFunc.callbackFunc}
            placeholder='e.g. openModal'
            onChange={(e) => handleChangeUpdateCallbackFunc(e, 'callbackFunc')}
          />
        </div>
      </div>

      <img
        src={closeIcon}
        style={{ position: 'relative', top: '-15px' }}
        alt='close'
        onClick={handleClickDeleteCallbackFunc}
      />
    </>
  );
};

export default HooksCallback;
