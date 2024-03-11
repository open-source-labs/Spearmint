import React, { useContext } from 'react';
import styles from '../Action/Action.module.scss';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import ToolTip from '../../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/reducers/updatedMockDataReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactTestComponentAssertion } from '../../../utils/updatedReactTypes';
import { useRTFsContexts } from '../../../context/RTFsContextsProvider';
const questionIcon = require('../../../assets/images/help-circle.png');
// This is tracking the actions that you have in a specific test, following the flow of data will
// help you better understand exactly how this is working
type EventTypes =
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>;
type FieldTypes =
  | 'eventType'
  | 'eventValue'
  | 'queryVariant'
  | 'querySelector'
  | 'queryValue';
// Action box in middle panel (testCase.jsx)
const Action = React.memo(({ blockObjectsState }) => {
  const thisBlockObjectsState = blockObjectsState;
  const [{ mockData }] = useContext(MockDataContext);
  const [{ theme }] = useContext(GlobalContext);
  const { handleAddBlock, handleChange, handleDeleteBlock, rTFDispatch } =
    //useContext(RTFsContexts);
    useRTFsContexts();
  /*const handleChangeActionFields = (e: EventTypes, field: FieldTypes) => {
    let updatedAction = { ...statement };
    updatedAction[field] = e.target.value;
    rTFDispatch(updateAction(updatedAction));
  };*/
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
  //needsEventsValue should be iterated on to create a <select>option
  return (
    <div id={styles[`action${theme}`]}>
      <AiOutlineClose
        id={styles.close}
        onClick={() => {
          handleDeleteBlock(
            thisBlockObjectsState.parentsFilepath,
            thisBlockObjectsState.key
          );
        }}
      />
      <span className={styles.header}>Action</span>
      <div id={styles.eventTypeFlexBox}>
        <div id={styles.eventType}>
          <label htmlFor="eventType">Event Type</label>
          <input
            type="text"
            id="eventType"
            value={blockObjectsState.eventType}
            onChange={(e) =>
              handleChange(
                thisBlockObjectsState.filepath,
                'eventType',
                e.target.value
              )
            }
            placeholder="eg. click, change, keyPress"
          />
        </div>
        <div id={styles.eventTypeVal}>
          {needsEventValue(blockObjectsState.eventType) &&
          mockData.length > 0 ? (
            <div className={styles.eventValueMock}>
              <label htmlFor="eventValue">Value</label>
              <AutoCompleteMockData
                //This needs to be figured out. Didn't have time to look into making AutoCOmpleteMck Data work
                dispatchToTestCase={rTFDispatch}
                statementType="action"
                // id={styles2.autoCompleteMockData}
              />
            </div>
          ) : needsEventValue(blockObjectsState.eventType) ? (
            <span className={styles.eventValue}>
              <label htmlFor="eventValue">Value</label>
              <input
                type="text"
                id="eventValue"
                onChange={(e) =>
                  handleChange(
                    thisBlockObjectsState.filepath,
                    'eventValue',
                    e.target.value
                  )
                }
              />
            </span>
          ) : null}
        </div>
      </div>
      <div id={styles.queryFlexBox}>
        <div id={styles.querySelector}>
          <label htmlFor="queryVariant" className={styles.queryLabel}>
            Query Selector
          </label>
          <div id={styles.dropdownFlex}>
            <select
              id="queryVariant"
              value={blockObjectsState.queryVariant}
              onChange={(e) =>
                handleChange(
                  thisBlockObjectsState.filepath,
                  'queryVariant',
                  e.target.value
                )
              }
            >
              <option value="" />
              <option value="getBy">getBy</option>
              <option value="getAllBy">getAllBy</option>
              <option value="queryBy">queryBy</option>
              <option value="queryAllBy">queryAllBy</option>
              <option value="findBy">findBy</option>
              <option value="findAllBy">findAllBy</option>
            </select>
            <span id={styles.hastooltip} role="tooltip">
              <img src={questionIcon} alt="help" />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={blockObjectsState.queryVariant} />
              </span>
            </span>
            <select
              id="querySelector"
              value={blockObjectsState.querySelector}
              onChange={(e) =>
                handleChange(
                  thisBlockObjectsState.filepath,
                  'querySelector',
                  e.target.value
                )
              }
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
                <ToolTip toolTipType={blockObjectsState.querySelector} />
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
                  type="text"
                  id="queryValue"
                  placeholder="text, queryOptions, waitForOptions"
                  value={blockObjectsState.queryValue}
                  onChange={(e) =>
                    handleChange(
                      thisBlockObjectsState.filepath,
                      'queryValue',
                      e.target.value
                    )
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Action;