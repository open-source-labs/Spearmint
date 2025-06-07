// import React, { useContext } from 'react';
// import { GlobalContext } from '../../../context/reducers/globalReducer';
// import { TextField, MenuItem } from '@mui/material';

// interface AssertionProps {
//   matcherType: string;
//   onMatcherChange: (value: string) => void;
// }

// const AssertionMatchers: React.FC<AssertionProps> = ({ matcherType, onMatcherChange }) => {
//   const [{ testFramework }] = useContext(GlobalContext);

//   const jestMatchers = [];

//   const cypressMatchers = [
//     'be.visible',
//     'have.text',
//     'have.length',
//     'exist',
//     'not.exist',
//     'contain.text',
//   ];

//   const mochaMatchers = [];

//   const matcherOptions = testFramework === 'cypress'? cypressMatchers
//       : testFramework === 'mocha'? mochaMatchers
//       : jestMatchers;



//   return (
//     <TextField
//       select
//       label="Matcher"
//       value={matcherType}
//       onChange={(e) => onMatcherChange(e.target.value)}
//     >
//       {matcherOptions.map((matcher) => (
//         <MenuItem key={matcher} value={matcher}>
//           {matcher}
//         </MenuItem>
//       ))}
//     </TextField>
//   );
// };

// export default AssertionMatchers;
