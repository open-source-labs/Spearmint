import React, { useContext } from 'react';
import PaintTiming from '../PuppeteerTestComponent/PaintTiming/PaintTiming';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';
import styles from './TestCase.module.scss';

const PuppeteerTestStatements = () => {
  const [{ puppeteerStatements }] = useContext(PuppeteerTestCaseContext);

  return (
    <>
      {puppeteerStatements.map((statement: PuppeteerStatements, i: number) => {
        switch (statement.type) {
          case 'paintTiming':
            return <PaintTiming id={styles.partTiming} key={statement.id} paintTiming={statement} index={i} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default PuppeteerTestStatements;
