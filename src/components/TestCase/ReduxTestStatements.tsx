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
  updateMiddlewaresFilePath,
  updateTypesFilePath,
  updateActionsFilePath,
} from '../../context/actions/reduxTestCaseActions';
import styles from '../ReduxTestComponent/Reducer/Reducer.module.scss';

const ReduxTestStatements = () => {
  /* destructing from the reducer */
  const [{ reduxStatements }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);
  const [{ filePathMap }] = useContext<any>(GlobalContext);
  let reducerCount = 0;
  let middlewareCount = 0;
  let actionCreatorCount = 0;
  let asyncCount = 0;
  let reducerImports = null;
  let mImports = null;
  let aCImports = null;
  let asyncImports = null;
  reduxStatements.forEach((statement: ReduxStatements, i: number) => {
    if (statement.type === 'reducer') {
      reducerCount++;
    }
    if (statement.type === 'middleware') {
      middlewareCount++;
    }
    if (statement.type === 'action-creator') {
      actionCreatorCount++;
    }
    if (statement.type === 'async') {
      asyncCount++;
    }
  });
  // this generates the import drop down inputs
  const generateSearchInput = (
    typesPath: any,
    actionPath: any,
    action: any,
    type: string | null,
    label: string
  ) => {
    return (
      <div id={styles.reducerName}>
        <label htmlFor='typesFile'>{label}</label>
        <SearchInput
          type={type}
          reactTestCase={null}
          updateTypesFilePath={typesPath}
          updateActionsFilePath={actionPath}
          options={Object.keys(filePathMap)}
          dispatch={dispatchToReduxTestCase}
          action={action}
          filePathMap={filePathMap}
        />
      </div>
    );
  };
  // different search imports are conditionally generated
  if (actionCreatorCount) {
    const actionImport = generateSearchInput(
      updateTypesFilePath,
      null,
      null,
      'action-creator',
      'Import Action Types from'
    );
    const asyncImport = generateSearchInput(
      null,
      updateActionsFilePath,
      null,
      'action-creator',
      'Import Action Creators From'
    );
    aCImports = (
      <div id={styles.reducerNameFlexBox}>
        {actionImport}
        {asyncImport}
      </div>
    );
  }
  if (asyncCount) {
    if (!actionCreatorCount) {
      const actionImport = generateSearchInput(
        updateTypesFilePath,
        null,
        null,
        'async',
        'Import Action Types from'
      );
      const asyncImport = generateSearchInput(
        null,
        updateActionsFilePath,
        null,
        'async',
        'Import Action Creators From'
      );
      asyncImports = (
        <div id={styles.reducerNameFlexBox}>
          {actionImport}
          {asyncImport}
        </div>
      );
    }
  }
  if (middlewareCount) {
    const middlewareImport = generateSearchInput(
      null,
      null,
      updateMiddlewaresFilePath,
      null,
      'Import Middleware from'
    );
    mImports = <div id={styles.reducerNameFlexBox}>{middlewareImport}</div>;
  }
  if (reducerCount) {
    const reducerImport = generateSearchInput(
      null,
      null,
      updateReducersFilePath,
      null,
      'Import Reducer from'
    );
    let actionImport = null;
    if (!actionCreatorCount && !asyncCount) {
      actionImport = generateSearchInput(
        updateTypesFilePath,
        null,
        null,
        'reducer',
        'Import Action Types from'
      );
    }
    reducerImports = (
      <div id={styles.reducerNameFlexBox}>
        {reducerImport}
        {actionImport}
      </div>
    );
  }
  // the conditionally generated imports are rendered along with
  // the conditionally rendered test blocks
  return (
    <>
      {asyncImports}
      {aCImports}
      {reducerImports}
      {mImports}
      {reduxStatements.map((statement: ReduxStatements, i: number) => {
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
