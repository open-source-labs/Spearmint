import React, { useContext } from 'react';
import styles from '../Middleware/Middleware.module.scss';
import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { deleteMiddleware, updateMiddleware, updateMiddlewaresFilePath } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import AutoComplete from '../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/mockDataReducer';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');


/* declare component for the card and its functionality */
const Middleware = ({ middleware, index, dispatchToTestCase }) => { /* destructuring from testStatements */
    /**
     * invoke context here ?
     * make new the context in the reducer *** ?
     */
    // const [{ mockData }, _] = useContext(MockDataContext);
     
    const [{ filePathMap }, _] = useContext(GlobalContext);
     /**
     * create handler function to dispatch action with user input to reducer
     * create handler function for udates to my middleware
     */
    const handleChangeMiddlewareFields = (e, field) => { /* function for the "changes" in the action card */
        let updatedMiddleware = { ...middleware };
        updatedMiddleware[field] = e.target.value;
        dispatchToTestCase(updateMiddleware(updatedMiddleware));
     };

    const handleClickDeleteMiddleware = e => {
        dispatchToTestCase(deleteMiddleware(middleware.id))
    }
 
    /**
     * create conditional rendering for events with values ??
     * the auto suggestions
     */
    const needsEventValue = eventType => {
        const eventsWithValues = [
          'passing non-function arguements',
        ];
        return eventsWithValues.includes(eventType);
      };

    const handleChangeMiddlewaresFileName = e => {
        const middlewaresFileName = e.target.value;
        const filePath = filePathMap[middlewaresFileName] || '';
        dispatchToTestCase(updateMiddlewaresFilePath(middlewaresFileName, filePath));
    };

     return (
         <Draggable draggableId={middleware.id.toString()} index={index}>
             {provided => ( 
                 <div  
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                 id={styles.middleware}
                 >
                     {/* the "X" to delete the card */}
                    <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteMiddleware} />   
                    
                    {/* the drag icon in the corner */}
                    <div id={styles.middlewareHeader}>
                        <img src={dragIcon} alt='drag' />   
                        <h3>Middleware</h3>
                    </div>

                    {/* the categories inside the actual box */}
                    <div id={styles.eventTypeFlexBox}>
                         <div>
                             <label htmlFor='typesFile'>Types File Name</label>
                             <input
                                 type='text'
                                 id={styles.renderInputBox}
                                 value={middleware.middlewaresFile}
                                 onChange={handleChangeMiddlewaresFileName}
                             />
                         </div>
                        {/* <div id={styles.eventType}>
                            <label htmlFor='eventType'> Middleware Type</label>

                            
                            <AutoComplete
                                statement={middleware}
                                statementType='middleware'
                                dispatchToTestCase={dispatchToTestCase}
                                id={styles.autoComplete}
                            />
                        </div> */}

                        
                           {/* add mock data stuff here *** */} 
                        {/* <div id={styles.eventTypeVal}>
                            {needsEventValue(middleware.eventType) && mockData.length > 0 ? (
                                <div className={styles.eventValue}>
                                <label htmlFor='eventValue'> Value </label>
                                <AutoCompleteMockData
                                    statement={middleware}
                                    dispatchToTestCase={dispatchToTestCase}
                                    statementType='middleware'
                                    id={styles2.autoCompleteMockData}
                                />
                                </div>
                            ) : null}
                        </div> */}
                    </div>

                    <div id={styles.queryFlexBox}>
                        <div id={styles.querySelector}>
                            {/* <input
                            id='queryFunction'
                            onChange={e => handleChangeMiddlewareFields(e, 'queryFunction')}
                            ></input> */}

                            <label htmlFor='queryVariant' className={styles.queryLabel}>
                                Query Selector
                            </label>
                            <div id={styles.dropdownFlex}>
                                
                                {/* my added drop down (to replace the query input) */}
                                <select
                                id='queryValue'
                                onChange={e => handleChangeMiddlewareFields(e, 'queryValue')}
                                >
                                    {/* add options here *** */}
                                    <option value='' />
                                    <option value='passes_non_functional_arguments'>passes_non_functional_arguments</option>
                                    <option value='calls_the_function'>calls_the_function</option>
                                    <option value='passes_functional_arguments'>passes_functional_arguments</option>
                                </select>
                                <span id={styles.hastooltip} role='tooltip'>
                                    <img src={questionIcon} alt='help' />
                                    <span id={styles.tooltip}>
                                        <ToolTip toolTipType={middleware.queryVariant} />
                                    </span>
                                </span>


                                {/* first drop down */}
                                <select
                                id='queryVariant'
                                onChange={e => handleChangeMiddlewareFields(e, 'queryVariant')}
                                >
                                    {/* add more options here *** */}
                                    <option value='' />
                                    <option value='toBeCalled'>toBeCalled</option>
                                    <option value='toHaveBeenCalled'>toHaveBeenCalled</option>
                                    <option value='toHaveBeenCalledWith'>toHaveBeenCalledWith</option>
                                    <option value='toHaveBeenLastCalledWith'>toHaveBeenLastCalledWith</option>
                                </select>
                                <span id={styles.hastooltip} role='tooltip'>
                                    <img src={questionIcon} alt='help' />
                                    <span id={styles.tooltip}>
                                        <ToolTip toolTipType={middleware.queryVariant} />
                                    </span>
                                </span>

                                {/* second drop down */}
                                <select
                                id='querySelector'
                                onChange={e => handleChangeMiddlewareFields(e, 'querySelector')}
                                >
                                    {/* add more options here *** */}
                                    <option value='' />
                                    <option value='next'>next</option>
                                    <option value='function'>function</option>
                                    <option value='store.Dispatch'>store.Dispatch</option>
                                    <option value='store.GetState'>store.GetState</option>
                                </select>
                                <span id={styles.hastooltip} role='tooltip'>
                                    <img src={questionIcon} alt='help' />
                                    <span id={styles.tooltip}>
                                        <ToolTip toolTipType={middleware.querySelector} />
                                    </span>
                                </span>

                                {/* my added drop down */}
                                <input 
                                id='queryType'
                                onChange={e => handleChangeMiddlewareFields(e, 'queryType')}
                                >
                                </input>
                                {/* <select
                                id='queryType'
                                onChange={e => handleChangeMiddlewareFields(e, 'queryType')}
                                >
                                     add options here
                                    <option value='' />
                                    <option value='Thunk'>Thunk</option>
                                    <option value='Logging'>Logging</option>
                                    <option value='etc'>etc</option>
                                    <option value='other'>other</option>
                                </select> */}
                                <span id={styles.hastooltip} role='tooltip'>
                                    <img src={questionIcon} alt='help' />
                                    <span id={styles.tooltip}>
                                        <ToolTip toolTipType={middleware.querySelector} />
                                    </span>
                                </span>
                                
                            </div>
                        </div>

                        <div id={styles.query}>
                            {/* query input box */}
                             {/* <label htmlFor='queryValue' className={styles.queryLabel}>
                             Query
                            </label> 

                             <input
                            type='text'
                            id='queryValue'
                            onChange={e => handleChangeMiddlewareFields(e, 'queryValue')}
                            />  */}
                        </div>

                    </div>
                </div>
             )}
         </Draggable>
     );
};


export default Middleware;