import React, { useContext } from 'react';
import styles from './Deno.module.scss';
import stylez from '../ReactTestComponent/Assertion/Assertion.module.scss';
import { DenoTestCaseContext } from '../../context/reducers/denoTestCaseReducer';
import { deleteAssertion, updateAssertion } from '../../context/actions/denoTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import denoMatchers from './DenoMatchers';
import { Assertion, EventTarget } from '../../utils/denoTypes';

interface DenoProps {
  assertion: Assertion;
  index: number;
  id: number;
}

const EndpointAssertion = ({ assertion, index, id }: DenoProps) => {
  const [, dispatchToDenoTestCase] = useContext<any>(DenoTestCaseContext);
  const [, dispatchToGlobal] = useContext<any>(GlobalContext);
  const [ {theme} ] = useContext<any>(GlobalContext);
  const questionIcon = require('../../assets/images/help-circle.png');
  const closeIcon = require('../../assets/images/close.png');
  const jestURL: string = 'https://cmorten.github.io/superoak/';

  const handleClickDeleteAssertion = () => {
    dispatchToDenoTestCase(deleteAssertion(index, id));
  };

  const handleChangeUpdateAssertion = ({ target }: EventTarget, field: string) => {
    const updatedAssertion =
      field === 'not'
        ? { ...assertion, [field]: !assertion[field] }
        : { ...assertion, [field]: target.value };
    dispatchToDenoTestCase(updateAssertion(index, id, updatedAssertion));
  };

  const handleClickTooltip = () => {
    dispatchToGlobal(openBrowserDocs(jestURL));
  };

  return (
    <div id={styles.groupFlexboxAssertion}>
      <div id={styles.dropdownWrapper}>
        <div id={styles.endMatcherLabel}>
          <div>
            <label htmlFor='matcher'>Matcher</label>
          </div>
        </div>
        <div id={styles.dropdownFlex}>
          <select
            id='method'
            value={assertion.matcher}
            onChange={(e) => handleChangeUpdateAssertion(e, 'matcher')}
          >
            {denoMatchers.map((matcher) => (
              <option value={matcher}>{matcher}</option>
            ))}
          </select>{' '}
          <span id={stylez.hastooltip} role='tooltip'>
            <img src={questionIcon} alt='help' onClick={handleClickTooltip} />
            <span id={stylez.tooltip}>Click me to find out more about SuperOak </span>
          </span>
        </div>
      </div>
      <div id={styles.labelInput}>
        <label htmlFor='value'>Expected Value</label>
        <div id={styles.inputFlexBox}>
          <input
            type='text'
            name='value'
            placeholder='eg. 200'
            value={assertion.value}
            onChange={(e) => handleChangeUpdateAssertion(e, 'value')}
          />
        </div>
      </div>
      <img
        src={closeIcon}
        style={{ position: 'relative', top: '-15px' }}
        alt='close'
        onClick={handleClickDeleteAssertion}
      />
    </div>
  );
};

export default EndpointAssertion;
