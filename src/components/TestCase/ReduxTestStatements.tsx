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
import '../SearchInput/SearchInput.scss';
import importOptionsSwitch from './importOptions';
import styles from './TestCase.module.scss';

const ReduxTestStatements = () => {
  /* destructing from the reducer */
  const [{ reduxStatements }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);
  const [{ filePathMap, theme }] = useContext<any>(GlobalContext);

  const { isReducerOn, isMiddleWareOn, isActionCreatorOn, isAsyncOn } = importOptionsSwitch(
    reduxStatements
  );
  let reducerImports = null;
  let mImports = null;
  let aCImports = null;
  let asyncImports = null;

  // different search imports are conditionally generated
  if (isActionCreatorOn) {
    aCImports = (
      // <div className='flex-container'>
      <div className='flex-container'>
        <div className={styles[`flex1${theme}`]}>
          <SearchInput
            // className={styles.flex2}
            label={'Import Action Types From'}
            type={'action-creator'}
            reactTestCase={null}
            updateTypesFilePath={updateTypesFilePath}
            updateActionsFilePath={null}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            action={null}
            filePathMap={filePathMap}
            fullWidth
          />
        </div>
        <div className={styles[`flex1${theme}`]}>
          <SearchInput
            label={'Import Actions From'}
            type={'action-creator'}
            reactTestCase={null}
            updateTypesFilePath={null}
            updateActionsFilePath={updateActionsFilePath}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            action={null}
            filePathMap={filePathMap}
            fullWidth
          />
        </div>
      </div>
    );
  }
  if (isAsyncOn) {
    if (!isActionCreatorOn) {
      asyncImports = (
        <div className='flex-container'>
          <div className={styles[`flex1${theme}`]}>
            <SearchInput
              label={'Import Action Types From'}
              type={'async'}
              reactTestCase={null}
              updateTypesFilePath={updateTypesFilePath}
              updateActionsFilePath={null}
              options={Object.keys(filePathMap)}
              dispatch={dispatchToReduxTestCase}
              action={null}
              filePathMap={filePathMap}
            />
          </div>
          <br></br>
          <div className={styles[`flex1${theme}`]}>
            <SearchInput
              label={'Import Action Types From'}
              type={'async'}
              reactTestCase={null}
              updateTypesFilePath={null}
              updateActionsFilePath={updateActionsFilePath}
              options={Object.keys(filePathMap)}
              dispatch={dispatchToReduxTestCase}
              action={null}
              filePathMap={filePathMap}
            />
          </div>
        </div>
      );
    }
  }
  if (isMiddleWareOn) {
    mImports = (
      <div className='flex-container'>
        <div className={styles[`flex1${theme}`]}>
          <SearchInput
            label={'Import Middleware From'}
            type={null}
            reactTestCase={null}
            updateTypesFilePath={null}
            updateActionsFilePath={updateMiddlewaresFilePath}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            action={null}
            filePathMap={filePathMap}
          />
        </div>  
      </div>
    );
  }
  if (isReducerOn) {
    reducerImports = (
      <div className='flex-container'>
        <div className={styles[`flex1${theme}`]}>
            <SearchInput
            label={'Import Reducer From'}
            type={null}
            reactTestCase={null}
            updateTypesFilePath={null}
            updateActionsFilePath={null}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            action={updateReducersFilePath}
            filePathMap={filePathMap}
          />
        </div>
        <div className={styles[`flex1${theme}`]}>
        {!isActionCreatorOn && !isAsyncOn ? (
          <SearchInput
            label={'Import Action Types From'}
            type={'reducer'}
            reactTestCase={null}
            updateTypesFilePath={updateTypesFilePath}
            updateActionsFilePath={null}
            options={Object.keys(filePathMap)}
            dispatch={dispatchToReduxTestCase}
            action={null}
            filePathMap={filePathMap}
          />
          ) : null}
        </div>
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
