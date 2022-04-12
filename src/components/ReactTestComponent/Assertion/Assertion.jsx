/**
 * functionlity to add and update assertions
 * same layout as action.jsx
 *  - but for only the last assertion card?
 */
import React, { useContext } from 'react';
import styles from './Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/actions/reactTestCaseActions';
import ToolTip from '../../ToolTip/ToolTip';
import ToolTipMatcher from '../../ToolTip/ToolTipMatcher';
import AutoComplete from '../../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

const Assertion = ({ statement, describeId, itId, statementId }) => {
  const [, dispatchToReactCase] = useContext(ReactTestCaseContext);
  const [{theme}] = useContext(GlobalContext)

  const handleChangeAssertionFields = (e, field) => {
    let updatedAssertion = { ...statement };
    field === 'isNot'
      ? (updatedAssertion[field] = !updatedAssertion.isNot)
      : (updatedAssertion[field] = e.target.value);
    dispatchToReactTestCase(updateAssertion(updatedAssertion));
  };

  const handleClickDelete = (e) => {
    dispatchToReactTestCase(deleteAssertion(statementId));
  };

  const needsMatcherValue = (matcherType) => {
    const matchersWithValues = [
      'toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'toHaveAttribute', //takes in a string Ex: 'type'
      'toHaveClass', //takes in a string Ex: 'btn-link'
      'toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'toHaveStyle', //takes in a sting value Ex: 'display: none'
      'toHaveTextContent', //takes in a string value Ex: 'Content'
      'not.toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'not.toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'not.toHaveAttribute', //takes in a string Ex: 'type'
      'not.toHaveClass', //takes in a string Ex: 'btn-link'
      'not.toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'not.toHaveStyle', //takes in a sting value Ex: 'display: none'
      'not.toHaveTextContent', //takes in a string value Ex: 'Content'
    ];
    return matchersWithValues.includes(matcherType);
  };

  return (
    <section id={styles[`assertion${theme}`]} data-testid='assertionCard'>
      <AiOutlineClose id={styles.close} alt='close' onClick={handleClickDelete} />
      <div id={styles.assertionHeader}>
        <h3>Assertion</h3>
      </div>
      <div id={styles.queryFlexBox}>
        <div id={styles.querySelector}>
          <label htmlFor='queryVariant' className={styles.queryLabel}>
            Query Selector
          </label>
          <div id={styles.dropdownFlex}>
            <select
              id='queryVariant'
              value={statement.queryVariant}
              onChange={(e) => handleChangeAssertionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='find'>find</option>
              <option value='findComponent'>findComponent</option>
              <option value='findAll'>findAll</option>
              <option value='findBy'>findBy</option>
              <option value='findAllBy'>findAllBy</option>
              <option value='get'>get</option>
              <option value='getBy'>getBy</option>
              <option value='getAllBy'>getAllBy</option>
              <option value='getComponent'>getComponent</option>
              <option value='queryBy'>queryBy</option>
              <option value='queryAllBy'>queryAllBy</option>
            </select>
            {/* <span id={styles.hastooltip} role='tooltip'>
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span> */}
            <select
              id='querySelector'
              value={statement.querySelector}
              onChange={(e) => handleChangeAssertionFields(e, 'querySelector')}
            >
              <option value='' />
              <option value='LabelText'>LabelText</option>
              <option value='PlaceholderText'>PlaceholderText</option>
              <option value='Text'>Text</option>
              <option value='AltText'>AltText</option>
              <option value='Title'>Title</option>
              <option value='DisplayValue'>DisplayValue</option>
              <option value='Role'>Role</option>
              <option value='TestId'>TestId</option>
              {/* TextMatch Precision & Normalization will be added */}
            </select>
            {/* <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.querySelector} />
              </span>
            </span> */}
          </div>
        </div>
        <div id={styles.query}>
          <label htmlFor='queryValue' className={styles.queryLabel}>
            Query
          </label>
          {/* <AutoCompleteMockData
            statement={statement}
            dispatchToTestCase={dispatchToReactTestCase}
            statementType='assertion'
          /> */}
          <input
            type='text'
            id='queryValue'
            value={statement.queryValue}
            onChange={(e) => handleChangeAssertionFields(e, 'queryValue')}
          />
        </div>
      </div>
      <div>
        <div id={styles.matcherFlexBox}>
          <div id={styles.matcherLeft}>
            <div id={styles.matcherLabelFlexBox}>
              <div>
                <label htmlFor='matcher'>Matcher</label>
              </div>
              <div>
                Not?
                <input
                  type='checkbox'
                  checked={statement.isNot}
                  onChange={(e) => handleChangeAssertionFields(e, 'isNot')}
                />
              </div>
            </div>
            <div id={styles.autoTool}>
              <AutoComplete
                statement={statement}
                statementType='assertion'
                dispatchToTestCase={dispatchToReactTestCase}
                id={styles.matcherAuto}
              />

              {/* <span id={styles.hastooltip} role='tooltip'>
                <img src={questionIcon} alt='help' />
                <span id={styles.tooltip}>
                  <ToolTipMatcher toolTipType={statement.matcherType} />
                </span>
              </span> */}
            </div>
          </div>
          {needsMatcherValue(statement.matcherType) && (
            <div>
              <span id={styles.matcherVal}>
                <input
                  type='text'
                  id={styles.matcherInput}
                  onChange={(e) => handleChangeAssertionFields(e, 'matcherValue')}
                  placeholder='Value'
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Assertion;
