import React from 'react';
import PaintTiming from '../PaintTiming/PaintTiming'
import { PuppeteerTestStatementsProps } from '../../utils/puppeteerTypes'

const PuppeteerTestStatements = ({ puppeteerStatements, dispatchToPuppeteerTestCase }: PuppeteerTestStatementsProps) => { 
    return (
      <>
        {
          puppeteerStatements.map((statement, i) => {
            switch (statement.type) {
              case 'paintTiming':
                return (
                  <PaintTiming
                    key={statement.id}
                    paintTiming={statement}
                    index={i}
                    dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}
                  />
                );
            default:
                return <></>;
            }
          })
        }
      </>
    )
};

export default PuppeteerTestStatements;