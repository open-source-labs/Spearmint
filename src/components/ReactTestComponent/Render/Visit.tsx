import React, { useContext, useState } from 'react';
const { shell } = window.require('electron');
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { RenderProps, VisitProps } from '../../../utils/reactTestCase';

import {
  updateRenderUrl,
  deleteRenderUrl,
} from '../../../context/actions/frontendFrameworkTestCaseActions'; // ! grabbed action creator

import styles from './Visit.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';

const Visit = ({
  statement,
  statementId,
  describeId,
  itId,
}: RenderProps): JSX.Element => {
  const [{ theme }] = useContext(GlobalContext);
  const [{ statements }, dispatchToReactTestCase] =
    useContext(ReactTestCaseContext); // [describe, it, action ] blocks.. reactTestCaseReducer

  const [visitKey, setVisitKey] = useState(statement.visitKey || '');
  const [visitValue, setVisitValue] = useState(statement.visitValue || '');

  const [previewUrl, setPreviewUrl] = useState('');

  const handleTestVisit = () => {
    console.log('→ handleTestVisit() called');
    console.log('  visitKey:', visitKey);
    console.log('  visitValue:', visitValue);

    if (!visitKey.trim()) {
      alert('Please enter a Base URL first');
      return;
    }
    //  const combinedUrl= `baseUrl: ${visitKey || ''}, \n cy.visit('${visitValue}')`;
    // setPreviewUrl(combinedUrl);

    //window.open(fullUrl, '_blank');
    const fullUrl = `${visitKey}${visitValue.trim()}`;

    console.log('Opening external URL:', fullUrl);
    shell.openExternal(fullUrl);
  };

  const handleDeleteVisit = (e: React.MouseEvent): void => {
    e.stopPropagation();
    dispatchToReactTestCase(deleteRenderUrl(statementId, statement.id));
  };

  // handle update for both visit key and visit value
  // stepIndex: number, field: string, value: string
  // whenever user changes "Base URL" input
  const handleUpdateVisitKey = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newKey = e.target.value;
    setVisitKey(newKey); // passing value
    dispatchToReactTestCase(
      updateRenderUrl(statementId, visitId, newKey, visitValue || '')
    );
    console.log('Updated visit state:', statements.byId[statementId]?.visits);
    console.log('[Visit] Updating visitKey:', newKey);

    console.log('[Visit] Dispatching updateRenderUrl:', {
      statementId,
      id: visitId,
      visitKey,
      visitValue,
    });
  };

  // whenever user changes "Endpoint" input
  const handleUpdateVisitValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = e.target.value;
    setVisitValue(newValue);
    dispatchToReactTestCase(
      updateRenderUrl(statementId, visitId, visitKey || '', newValue)
    );
    console.log('Visit Updating visitValue:', newValue);
  };
  // combines base + endpoint into a previewed string
  // const fullUrl = `${statement.visitKey || ''}${statement.visitValue || ''}`;

  const visitId = `${statementId}-visit`; // simple, consistent
  return (
    <div id={styles[`RenderContainer${theme}`]}>
      {/*Header */}
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Cypress Visit{' '}
          <span id={styles.componentName}>{statements.componentName}</span>
        </span>

        {/*                Delete statement               */}
        <AiOutlineClose
          className={styles.deleteIcon}
          onClick={handleDeleteVisit}
        />
      </div>

      {/*                Description statement            */}
      <p className={styles.description}>
        Use this block to simulate a <code>cy.visit()</code> command to navigate
        your app at the start of a test.
      </p>

      {/*URL input  */}
      <div className={styles.urlRow}>
        <div className={styles.urlInputGroup}>
          <label htmlFor="visitBaseUrl">Base URL</label>
          <input
            id="visitBaseUrl"
            type="text"
            placeholder="e.g., http://localhost:3000"
            value={visitKey}
            onChange={handleUpdateVisitKey}
            className={!visitKey.trim() ? styles.invalid : ''}
          />
        </div>

        {/*             Endpoint input                  */}
        <div className={styles.urlInputGroup}>
          <label htmlFor="visitEndpoint">Endpoint</label>
          <input
            id="visitEndpoint"
            type="text"
            placeholder="e.g., /dashboard"
            value={visitValue}
            onChange={handleUpdateVisitValue}
            className={!visitValue.trim() ? styles.invalid : ''}
          />
        </div>
      </div>

      {/*             Test full url in browser button                   */}
      <div className={styles.testButtonWrapper}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleTestVisit}
          className={styles.testButton}
        >
          Test Visit
        </Button>
      </div>
    </div>
  );
};

// {/*optional preview full URL text */}
// {fullUrl  && (
//   <p className={styles.previewText}>
//     Visit preview: <code>cy.visit('{fullUrl}')</code>
//   </p>
// ) }

export default Visit;
