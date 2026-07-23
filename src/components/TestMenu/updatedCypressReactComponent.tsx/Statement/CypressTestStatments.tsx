// import React from 'react';
// import { CypressReactTestCaseTypes } from '../../../../../utils/cypressReactTypes';
// import Action from './Action'; // todo
// import Assertion from './Assertion'; // todo
// import Render from './Render'; // todo

// interface Props {
//   statements: CypressReactTestCaseTypes['statements'];
//   itId: string;
//   describeId: string;
// }

// const CypressTestStatements: React.FC<Props> = ({ statements, itId, describeId }) => {
//   const filteredStatements = statements.allIds.filter(
//     (id) =>
//       statements.byId[id].itId === itId &&
//       statements.byId[id].describeId === describeId
//   );

//   return (
//     <>
//       {filteredStatements.map((id, i) => {
//         const statement = statements.byId[id];
//         switch (statement.type) {
//           case 'action':
//             return (
//               <Action
//                 key={`action-${id}-${i}`}
//                 statementId={id}
//                 describeId={describeId}
//                 itId={itId}
//                 statement={statement}
//               />
//             );
//           case 'assertion':
//             return (
//               <Assertion
//                 key={`assertion-${id}-${i}`}
//                 statementId={id}
//                 describeId={describeId}
//                 itId={itId}
//                 statement={statement}
//               />
//             );
//           case 'render':
//             return (
//               <Render
//                 key={`render-${id}-${i}`}
//                 statementId={id}
//                 describeId={describeId}
//                 itId={itId}
//                 statement={statement}
//               />
//             );
//           default:
//             return null;
//         }
//       })}
//     </>
//   );
// };

// export default CypressTestStatements;
