import React, { useContext } from 'react';
import styles from '../Middleware/Middleware.module.scss';
//import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';

import { deleteMiddleware, updateMiddleware } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
// import AutoComplete from '../AutoComplete/AutoComplete';
// import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
//import { MockDataContext } from '../../../context/mockDataReducer';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');


/* declare component for the card and its functionality */
const Middleware = ({ middleware, index, dispatchToTestCase }) => { /* destructuring from testStatements */
    /**
     * invoke context here ?
     * make the context in the reducer ***
     */
 
     
 
     /**
     *  create handler function to dispatch action with user input to reducer
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
                        <div id={styles.eventType}>
                            <label htmlFor='eventType'> Middleware Type</label>

                            {/* add auto complete *** */}
                        </div>

                        
                           {/* add mock data stuff here? *** */} 
    
                    </div>
                    <div id={styles.queryFlexBox}>
                        <div id={styles.querySelector}>
                            <label htmlFor='queryVariant' className={styles.queryLabel}>
                                Query Selector
                            </label>
                            <div id={styles.dropdownFlex}>
                                {/* first drop down */}
                                <select
                                id='queryVariant'
                                onChange={e => handleChangeMiddlewareFields(e, 'queryVariant')}
                                >
                                    {/* add more options here *** */}
                                    <option value='' />
                                    <option value='getBy'>getBy</option>
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
                                    <option value='LabelText'>LabelText</option>
                                </select>
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
                            <label htmlFor='queryValue' className={styles.queryLabel}>
                             Query
                            </label>

                            <input
                            type='text'
                            id='queryValue'
                            onChange={e => handleChangeMiddlewareFields(e, 'queryValue')}
                            />
                        </div>

                    </div>
                </div>
             )}
         </Draggable>
     );
};


export default Middleware;