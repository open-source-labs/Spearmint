import React from 'react';
import PaintTiming from '../PaintTiming/PaintTiming'
const PuppeteerTestStatements = function puppeteerTestStatements({ puppeteerStatements, dispatchToPuppeteerTestCase }) { 
    return puppeteerStatements.map((statement, i) => {
        switch (statement.type) {
          case 'puppeteerForm':
            return (
              <h1>FORM TESTING</h1>
            );
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
     });

};

export default PuppeteerTestStatements;