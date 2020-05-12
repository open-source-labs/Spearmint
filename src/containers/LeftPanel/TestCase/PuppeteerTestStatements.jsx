import React from 'react';

const PuppeteerTestStatements = function puppeteerTestStatements({ puppeteerStatements, dispatchToPuppeteerTestCase }) { 
    return puppeteerStatements.map((statement, i) => {
        switch (statement.type) {
          case 'form':
            return (
              <h1>FORM TESTING</h1>
            );
        default:
            return <></>;
        }
     });

};

export default PuppeteerTestStatements;