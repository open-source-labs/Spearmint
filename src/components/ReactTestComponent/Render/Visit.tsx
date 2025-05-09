import React from 'react';
 import styles from './Prop.module.scss'; //! using props flexbox

import { updateRenderUrl, deleteRenderUrl } from '../../../context/actions/frontendFrameworkTestCaseActions'; // ! grabbed action creator

 import { VisitProps } from '../../../utils/reactTypes';

const minusIcon = require('../../../assets/images/minus-box-outline.png');

const Visit = ({ statementId, visitId, visitKey, visitValue, dispatchToTestCase, theme }: VisitProps): JSX.Element => {
  const handleClickDeleteVisit = (e: React.MouseEvent): void => { 
    e.stopPropagation();
    dispatchToTestCase(deleteRenderUrl(statementId, visitId));
  };

  const handleChangeUpdateVisitKey = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderUrl(statementId, visitId, e.target.value, visitValue));
  };

  const handleChangeUpdateVisitValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderUrl(statementId, visitId, visitKey, e.target.value));
  };

  return (
    <div id={styles[`renderPropsFlexBox${theme}`]}>
      <input type='text' id='visitUrl' value={visitKey} onChange={handleChangeUpdateVisitKey}
      placeholder='Enter a KEY for URL.'
      />
      <input type='text'id='visitValue'value={visitValue} onChange={handleChangeUpdateVisitValue} 
      placeholder='Enter a URL.'
      />
    
      <img src={minusIcon} alt='delete' onClick={handleClickDeleteVisit} />
    </div>
  );
};

export default Visit;
