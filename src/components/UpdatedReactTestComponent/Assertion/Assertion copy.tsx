import React, { useContext } from 'react';
import styles from './Assertion.module.scss';
import {
  deleteAssertion,
  updateAssertion,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import ToolTip from '../../ToolTip/ToolTip';
import ToolTipMatcher from '../../ToolTip/ToolTipMatcher';
import AutoComplete from '../../AutoComplete/AutoComplete';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactTestComponentAssertion } from '../../../utils/reactTestCase';

const questionIcon = require('../../../assets/images/help-circle.png');

// This is tracking the assertions that you have in a certain test, following the flow of data will help
// you better understand how exactly this is working

type EventTypes =
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>;

type FieldTypes =
  | 'queryVariant'
  | 'querySelector'
  | 'queryValue'
  | 'matcherValue';

const Assertion = ({
  statement,
  describeId,
  itId,
  statementId,
}: ReactTestComponentAssertion): JSX.Element => {
  const [{ statements }, rTFDispatch] = useContext(RTFsContexts);
  const [{ theme }] = useContext(GlobalContext);

  const handleChangeAssertionFields = (e: EventTypes, field: FieldTypes) => {
    let updatedAssertion = { ...statement };
    updatedAssertion[field] = e.target.value;
    rTFDispatch(updateAssertion(updatedAssertion));
  };

  const handleIsNot = () => {
    let updatedAssertion = { ...statement };
    updatedAssertion.isNot = !updatedAssertion.isNot;
    rTFDispatch(updateAssertion(updatedAssertion));
  };

  const handleClickDelete = () => {
    rTFDispatch(deleteAssertion(statementId));
  };

  const needsMatcherValue = (matcherType: string) => {
    const matchersWithValues = [
      'toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'toHaveAttribute', //takes in a string Ex: 'type'
      'toHaveClass', //takes in a string Ex: 'btn-link'
      'toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'toHaveStyle', //takes in a sting value Ex: 'display: none'
      'toHaveTextContent', //takes in a string value Ex: 'Content'
      'toBe', //
      'toHaveBeenCalledTimes',
      'toHaveBeenCalledWith',
      'toHaveBeenLastCalledWith',
      'toHaveBeenNthCalledWith',
      'toHaveReturnedTimes',
      'toHaveReturnedWith',
      'toHaveLastReturnedWith',
      'toHaveNthReturnedWith',
      'toHaveLength',
      'toHaveProperty',
      'toBeCloseTo',
      'not.toBeCloseTo',
      'toBeGreaterThan',
      'toBeGreaterThanOrEqual',
      'toBeLessThan',
      'toBeLessThanOrEqual',
      'toBeInstanceOf',
      'toContain',
      'toContainEqual',
      'toEqual',
      'toMatch',
      'toMatchObject',
      'toMatchSnapshot',
      'toMatchInLineSnapshot',
      'toStrictEqual',
      'toThrow',
      'toThrowErrorMatchingSnapshot',
      'toThrowErrorMatchingInLineSnapshot',
      'not.toBeInstanceOf',
      'not.toContain',
      'not.toEqual',
      'not.toContainEqual',
      'not.toMatch',
      'not.toMatchObject',
      'not.toMatchSnapshot',
      'not.toMatchInLineSnapshot',
      'not.toStrictEqual',
      'not.toThrow',
      'not.toThrowErrorMatchingSnapshot',
      'not.toThrowErrorMatchingInLineSnapshot',
      'not.toBeLessThan',
      'not.toBeLessThanOrEqual',
      'not.toBeGreaterThanOrEqual',
      'not.toBeGreaterThan',
      'not.toHaveProperty',
      'not.toHaveLength',
      'not.toHaveNthReturnedWith',
      'not.toHaveReturnedWith',
      'not.toBe', //
      'not.toHaveBeenCalledTimes',
      'not.toHaveBeenCalledWith',
      'not.toHaveBeenLastCalledWith',
      'not.toHaveBeenNthCalledWith',
      'not.toHaveReturnedTimes',
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
    <section id={styles[`assertion${theme}`]} data-testid="assertionCard">
      <AiOutlineClose id={styles.close} onClick={handleClickDelete} />
      <div className={styles.actionHeader}>
        <span className={styles.header}>
          Assertion{' '}
          <span id={styles.componentName}>{statements.componentName}</span>
        </span>
      </div>
      <div id={styles.queryFlexBox}>
        <div id={styles.querySelector}>
          <label htmlFor="queryVariant" className={styles.queryLabel}>
            Query Selector
          </label>
          <div id={styles.dropdownFlex}>
            <select
              id="queryVariant"
              value={statement.queryVariant}
              onChange={(e) => handleChangeAssertionFields(e, 'queryVariant')}
            >
              <option value="" />
              <option value="find">find</option>
              <option value="findComponent">findComponent</option>
              <option value="findAll">findAll</option>
              <option value="findBy">findBy</option>
              <option value="findAllBy">findAllBy</option>
              <option value="get">get</option>
              <option value="getBy">getBy</option>
              <option value="getAllBy">getAllBy</option>
              <option value="getComponent">getComponent</option>
              <option value="queryBy">queryBy</option>
              <option value="queryAllBy">queryAllBy</option>
            </select>
            <span id={styles.hastooltip} role="tooltip">
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span>
            <select
              id="querySelector"
              value={statement.querySelector}
              onChange={(e) => handleChangeAssertionFields(e, 'querySelector')}
            >
              <option value="" />
              <option value="LabelText">LabelText</option>
              <option value="PlaceholderText">PlaceholderText</option>
              <option value="Text">Text</option>
              <option value="AltText">AltText</option>
              <option value="Title">Title</option>
              <option value="DisplayValue">DisplayValue</option>
              <option value="Role">Role</option>
              <option value="TestId">TestId</option>
              {/* TextMatch Precision & Normalization will be added */}
            </select>
            <span id={styles.hastooltip} role="tooltip">
              <img src={questionIcon} alt="help" />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.querySelector} />
              </span>
            </span>
          </div>
        </div>
        <div id={styles.query}>
          <label htmlFor="queryValue" className={styles.queryLabel}>
            Query
          </label>
          {/* <AutoCompleteMockData
            statement={statement}
            dispatchToTestCase={rTFDispatch}
            statementType='assertion'
          /> */}
          <input
            type="text"
            id="queryValue"
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
                <label htmlFor="matcher">Matcher</label>
              </div>
              <div>
                Not?
                <input
                  type="checkbox"
                  checked={statement.isNot}
                  onChange={() => handleIsNot()}
                />
              </div>
            </div>
            <div id={styles.autoTool}>
              <AutoComplete
                statement={statement}
                statementType="assertion"
                dispatchToTestCase={rTFDispatch}
                id={styles.matcherAuto}
              />

              <span id={styles.hastooltip} role="tooltip">
                <img src={questionIcon} alt="help" />
                <span id={styles.tooltip}>
                  <ToolTipMatcher toolTipType={statement.matcherType} />
                </span>
              </span>
            </div>
          </div>
          {needsMatcherValue(statement.matcherType) && (
            <div>
              <span id={styles.matcherVal}>
                <input
                  type="text"
                  id={styles.matcherInput}
                  onChange={(e) =>
                    handleChangeAssertionFields(e, 'matcherValue')
                  }
                  placeholder="Value"
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
