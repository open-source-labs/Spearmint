// import React, {useContext} from 'react';
// import { GlobalContext } from '../../../context/reducers/globalReducer';
// import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
// import { RenderProps } from '../../../utils/reactTypes';


// import { updateRenderUrl, deleteRenderUrl } from '../../../context/actions/frontendFrameworkTestCaseActions'; // ! grabbed action creator

// import styles from './Prop.module.scss'; //! using props flexbox


// const minusIcon = require('../../../assets/images/minus-box-outline.png');

// const Visit = ({ statement, statementId, describeId, itId }: RenderProps): JSX.Element => {
// const [{theme}] = useContext(GlobalContext)
// const [{ statements, }, dispatchToReactTestCase] = useContext(ReactTestCaseContext); // [describe, it, action ] blocks.. reactTestCaseReducer


//   const handleDeleteVisit = (e: React.MouseEvent): void => { 
//     e.stopPropagation();
//     dispatchToTestCase(deleteRenderUrl(statementId, visitId));
//   };

//   // handle update for both visit key and visit value
//   const handleUpdateVisit = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     e.stopPropagation();
//     dispatchToTestCase(updateRenderUrl(statementId, visitId, e.target.value, visitValue, visitKey));
//   };

//     const handleClickAddVisit = (): void => {
//       dispatchToReactTestCase(addVisit(statementId));
//     };



//         //   {Cypress && (
//         //   <>
//         //     {' '}
//         //     {/* allows AiOutlineClose and Button to bundle into a single element */}
//         //     <Button onClick={handleClickAddVisit} variant="outlined">
//         //       Add Visit
//         //     </Button>
//         //     <AiOutlineClose
//         //       id={styles.close}
//         //       aria-label="close"
//         //       onClick={handleClickDeleteRender}
//         //     />
//         //   </>
//         // )}


//  {/* Conditional rendering for Cypress visit inputs */}
//         {/* Renders List of Visit components */}
//         //         {Cypress ? (
//         //   <div className={'visitWrapper'}>
//         //     {statement.visits && statement.visits.length > 0 && (
//         //       <div>
//         //         <div id={styles.renderProp}>
//         //           <label htmlFor="visit-key">URL Key</label>
//         //           <label htmlFor="visit-value">URL Value</label>
//         //         </div>
//         //         <hr />
//         //         {statement.visits.map((visit, i) => (
//         //           <Visit
//         //             statementId={statementId}
//         //             key={`visit-${visit.id}-${i}`}
//         //             visitId={visit.id}
//         //             visitKey={visit.visitKey}
//         //             visitValue={visit.visitValue}
//         //             dispatchToTestCase={dispatchToReactTestCase}
//         //             theme={theme}
//         //           />
//         //         ))}
//         //       </div>
//         //     )}
//         //   </div>
//         // )

//   return (
//     <div id={styles[`renderPropsFlexBox${theme}`]}>
//       <input type='text' id='visitUrl' value={visitKey} onChange={handleChangeUpdateVisitKey}
//       placeholder='Enter a KEY for URL.'
//       />
//       <input type='text'id='visitValue'value={visitValue} onChange={handleChangeUpdateVisitValue} 
//       placeholder='Enter a URL.'
//       />
    
//       <img src={minusIcon} alt='delete' onClick={handleClickDeleteVisit} />
//     </div>
//   );
// };

// export default Visit;
