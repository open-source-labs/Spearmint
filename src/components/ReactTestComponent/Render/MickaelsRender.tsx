/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import styles from './Render.module.scss';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer'; // updates state

import { deleteRender, addProp, deleteProp } from '../../../context/actions/frontendFrameworkTestCaseActions';
import { updateRenderUrl, deleteRenderUrl } from '../../../context/actions/frontendFrameworkTestCaseActions'; // ! grabbed action creator


import Prop from './Prop';
import Visit from './Visit';

import { Button } from '@mui/material';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';

import { RenderProps } from '../../../utils/reactTypes';
import { RenderVisit } from '../../../utils/reactTypes'

// this is the file that shows what component you are rendering in your test

const Render = ({ statement, statementId, describeId, itId }: RenderProps | RenderVisit): JSX.Element => {
  const [{ statements }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [{theme, testFramework }] = useContext(GlobalContext)


 // console.log("=== ACTIVE RENDER: ReactTestComponent");

  console.log("testFramework:", testFramework)

  const Cypress = testFramework === 'cypress';
  const Mocha = testFramework === 'mocha';

if (Cypress) {
  console.log("using Cypress!")
} else if (Mocha) {
  console.log("using Mocha!")
} else {
  console.log("Using Jest!")
}

  const handleClickAddProp = (): void => {
    dispatchToReactTestCase(addProp(statementId));
  };

  const handleClickDeleteProp = (): void => {
    dispatchToReactTestCase(deleteProp(statementId));
  };



  const handleClickDeleteRender = (): void => {
    dispatchToReactTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles[`RenderContainer${theme}`]}>

      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Rendering <span id={styles.componentName}>{statements.componentName}</span>
        </span>

        { !Cypress && (
          <Button onClick={handleClickAddProp} variant='outlined'>
          Add Props
        </Button>
        )}
        
        <AiOutlineClose id={styles.close} aria-label='close' onClick={handleClickDeleteRender} />
      </div>

      {Cypress ? (
        <div className={'visitWrapper'}>
          <label htmlFor='visitUrl'> cy.visit() URL </label>

          <input>
          id='visitUrl'
          type='text'
          placeholder='eg. http://localhost:3000'
          value={statement.visitUrl || ''}
          onChange={(e) => dispatchToReactTestCase(updateRenderUrl(statementId, e.target.value))}
          </input>

      ) : (
      <div className={'props'}>
        {statement.props.length > 0 && (
          <div>
            <div id={styles.renderProp}>
              <label htmlFor='prop-key'> Prop key </label>
              <label htmlFor='prop-value' > Prop value </label>
            </div>
            <hr />
            {statement.props.map((prop, i) => {
              return (
                <Prop
                  statementId={statementId}
                  key={`prop-${prop.id}-${i}`}
                  propId={prop.id}
                  propKey={prop.propKey}
                  propValue={prop.propValue}
                  dispatchToTestCase={dispatchToReactTestCase}
                  theme={theme}
                />
              );
            })}
          </div>
        )}
      </div>        
      )} 



    </div>
  );
};

export default Render;
