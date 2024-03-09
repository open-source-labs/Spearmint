import React, { useContext } from 'react';
import styles from './Middleware.module.scss';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import { deleteMiddleware, updateMiddleware } from '../../../context/actions/reduxTestCaseActions';
import { ReduxMiddleware } from '../../../utils/reduxTypes';

const closeIcon = require('../../../assets/images/close.png');

const Middleware = (props: ReduxMiddleware) => {
  const { middleware, index } = props;
  const [, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  const handleChangeMiddlewareFields = (e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>), 
  field: ('queryValue' | 'queryVariant' | 'querySelector' | 'queryType')) => {
    let updatedMiddleware = { ...middleware };
    updatedMiddleware[field] = e.target.value;
    dispatchToReduxTestCase(updateMiddleware(updatedMiddleware));
  };

  const handleClickDeleteMiddleware = (e: React.MouseEvent) => {
    dispatchToReduxTestCase(deleteMiddleware(middleware.id));
  };

  return (
        <div
          id={styles.middleware}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteMiddleware}
          />

          <div id={styles.middlewareHeader}>
            <h3>Middleware</h3>
          </div>

          {/* <div id={styles.eventTypeFlexBox}>
            <div id={styles.middlewareBox}>
              <label htmlFor='typesFile'>Import Middleware From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                action={updateMiddlewaresFilePath}
                filePathMap={filePathMap}
              />
            </div>
          </div> */}

          <div>
            <div id={styles.dropdownFlex}>
              <div id={styles.middlewareDrop}>
                <label htmlFor='queryValue'>Query Value</label>
                <select
                  id='queryValue'
                  value={middleware.queryValue}
                  onChange={(e) => handleChangeMiddlewareFields(e, 'queryValue')}
                >
                  {' '}
                  <option value='' />
                  <option value='passes_non_functional_arguments'>
                    passes_non_functional_arguments
                  </option>
                  <option value='calls_the_function'>calls_the_function</option>
                  <option value='passes_functional_arguments'>passes_functional_arguments</option>
                </select>
              </div>

              <div id={styles.middlewareDrop}>
                <label htmlFor='queryVariant'>Query Variant</label>
                <select
                  id='queryVariant'
                  value={middleware.queryVariant}
                  onChange={(e) => handleChangeMiddlewareFields(e, 'queryVariant')}
                >
                  <option value='' />
                  <option value='toBe'>toBe</option>
                  <option value='toBeCalled'>toBeCalled</option>
                  <option value='toHaveBeenCalled'>toHaveBeenCalled</option>
                  <option value='toHaveBeenCalledWith'>toHaveBeenCalledWith</option>
                  <option value='toHaveBeenLastCalledWith'>toHaveBeenLastCalledWith</option>
                </select>
              </div>

              <div id={styles.middlewareDrop}>
                <label htmlFor='querySelector'>Query Selector</label>
                <select
                  id='querySelector'
                  value={middleware.querySelector}
                  onChange={(e) => handleChangeMiddlewareFields(e, 'querySelector')}
                >
                  <option value='' />
                  <option value='next'>next</option>
                  <option value='function'>function</option>
                  <option value='store.Dispatch'>store.Dispatch</option>
                  <option value='store.GetState'>store.GetState</option>
                </select>
              </div>
            </div>

            <div id={styles.middlewareBox}>
              <label htmlFor='queryType'>Middleware Function</label>
              <input
                id='queryType'
                value={middleware.queryType}
                placeholder='e.g. thunk'
                onChange={(e) => handleChangeMiddlewareFields(e, 'queryType')}
              ></input>
            </div>
          </div>
        </div>
  );
};

export default Middleware;
