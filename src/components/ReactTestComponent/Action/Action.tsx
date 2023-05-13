import React, { useContext } from 'react';
import styles from '../Action/Action.module.scss';
import { deleteAction, updateAction } from '../../../context/actions/frontendFrameworkTestCaseActions';
import AutoComplete from '../../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import ToolTip from '../../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/reducers/mockDataReducer';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactTestComponentAssertion } from '../../../utils/reactTypes';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

// This is tracking the actions that you have in a specific test, following the flow of data will
// help you better understand exactly how this is working

type EventTypes = (React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>)

type FieldTypes = (
  'eventType'
  | 'eventValue'
  | 'queryVariant'
  | 'querySelector'
  | 'queryValue'
)

// Action box in middle panel (testCase.jsx)
const Action = ({ statement, statementId, describeId, itId }: ReactTestComponentAssertion): JSX.Element => {
  const [{ mockData }] = useContext(MockDataContext);
  const [{ statements }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [{theme}] = useContext(GlobalContext)

  const handleChangeActionFields = (e: EventTypes, field: FieldTypes) => {
    let updatedAction = { ...statement };
    updatedAction[field] = e.target.value;
    dispatchToReactTestCase(updateAction(updatedAction));
  };

  const handleClickDeleteAction = () => {
    dispatchToReactTestCase(deleteAction(statement.id));
  };
  //conditional rendering for events with values
  const needsEventValue = (eventType: string) => {
    const eventsWithValues = [
      'keyDown',
      'keyPress',
      'keyUp',
      'change',
      'input',
      'invalid',
      'submit',
    ];
    return eventsWithValues.includes(eventType);
  };

  return (
    <div id={styles[`action${theme}`]}>
      <AiOutlineClose id={styles.close} onClick={handleClickDeleteAction} />
        <span className={styles.header}>
          Action <span id={styles.componentName}>{statements.componentName}</span>
        </span>
      <div id={styles.eventTypeFlexBox}>
        <div id={styles.eventType}>
          <label htmlFor='eventType'>Event Type</label>
          <input
            type='text'
            id='eventType'
            value={statement.eventType}
            onChange={(e) => handleChangeActionFields(e, 'eventType')}
            placeholder='eg. click, change, keyPress'
          />
        </div>
        <div id={styles.eventTypeVal}>
          {needsEventValue(statement.eventType) && mockData.length > 0 ? (
            <div className={styles.eventValueMock}>
              <label htmlFor='eventValue'>Value</label>
              <AutoCompleteMockData
                statement={statement}
                dispatchToTestCase={dispatchToReactTestCase}
                statementType='action'
                // id={styles2.autoCompleteMockData}
              />
            </div>
          ) : needsEventValue(statement.eventType) ? (
            <span className={styles.eventValue}>
              <label htmlFor='eventValue'>Value</label>
              <input
                type='text'
                id='eventValue'
                onChange={(e) => handleChangeActionFields(e, 'eventValue')}
              />
            </span>
          ) : null}
        </div>
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
              onChange={(e) => handleChangeActionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='getBy'>getBy</option>
              <option value='getAllBy'>getAllBy</option>
              <option value='queryBy'>queryBy</option>
              <option value='queryAllBy'>queryAllBy</option>
              <option value='findBy'>findBy</option>
              <option value='findAllBy'>findAllBy</option>
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span>

            <select
              id='querySelector'
              value={statement.querySelector}
              onChange={(e) => handleChangeActionFields(e, 'querySelector')}
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
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.querySelector} />
              </span>
            </span>
            <div id={styles.query}>
              <span>
              {/* <label htmlFor='queryValue' className={styles.queryLabel}>
                Query
              </label> */}
              </span>
              <span>
              <input
                type='text'
                id='queryValue'
                placeholder='text, queryOptions, waitForOptions'
                value={statement.queryValue}
                onChange={(e) => handleChangeActionFields(e, 'queryValue')}
              />
              </span>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Action;
