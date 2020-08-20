import React, { useContext } from 'react';
import Middleware from '../ReduxTestComponent/Middleware/Middleware';
import ActionCreator from '../ReduxTestComponent/ActionCreator/ActionCreator';
import Async from '../ReduxTestComponent/Thunk/Thunk';
import Reducer from '../ReduxTestComponent/Reducer/Reducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { ReduxStatements } from '../../utils/reduxTypes';
import SearchInput from '../SearchInput/SearchInput';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  updateReducersFilePath,
  updateTypesFilePath,
} from '../../context/actions/reduxTestCaseActions';
import styles from '../ReduxTestComponent/Reducer/Reducer.module.scss';

const ReduxTestStatements = () => {
  /* destructing from the reducer */
  const [{ reduxStatements }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);
  const [{ filePathMap }] = useContext<any>(GlobalContext);
  let reducerCount = 0;
  let reducerid = null;
  reduxStatements.forEach((statement: ReduxStatements, i: number) => {
    if (statement.type === 'reducer') {
      reducerCount++;
      reducerid = statement.id;
    }
  });
  let reducerImports = null;
  if (reducerCount) {
    reducerImports = (
      <div id={styles.reducerNameFlexBox}>
        <div id={styles.reducerName}>
          <label htmlFor='typesFile'>Import Reducer From</label>
          <SearchInput
            id={null}
            reactTestCase={null}
            updateTypesFilePath={null}
            updateActionsFilePath={null}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            action={updateReducersFilePath}
            filePathMap={filePathMap}
          />
        </div>
        <div id={styles.reducerName}>
          <label htmlFor='typesFile'>Import Action Types From</label>
          <SearchInput
            action={null}
            updateActionsFilePath={null}
            reactTestCase={null}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            filePathMap={filePathMap}
            updateTypesFilePath={updateTypesFilePath}
            id={reducerid}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {reducerImports}
      {reduxStatements.map((statement: ReduxStatements, i: number) => {
        // if (statement.type === 'reducer') reducerBool = true;
        switch (statement.type) {
          case 'middleware':
            return <Middleware key={statement.id} middleware={statement} index={i} />;
          case 'action-creator':
            return <ActionCreator key={statement.id} actionCreator={statement} index={i} />;
          case 'async':
            return <Async key={statement.id} async={statement} index={i} />;
          case 'reducer':
            return <Reducer key={statement.id} reducer={statement} index={i} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default ReduxTestStatements;
