import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { GlobalContext } from '../context/reducers/globalReducer';

const CssTextFieldLight = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black', //theme === 'light' ? '#fff' : 'black',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8f54a0',
      },
      '& label.Mui-focused': {
        color: '#8f54a0',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8f54a0',
      },
    },
  },
})(TextField);

const CssTextFieldDark = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff', //theme === 'light' ? '#fff' : 'black',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8f54a0',
      },
      '& label.Mui-focused': {
        color: '#8f54a0',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8f54a0',
      },
    },
  },
})(TextField);


const InputTextField = (props) => {
  const [{ theme }] = useContext(GlobalContext);
  
  if (theme === 'light'){
    return <CssTextFieldLight {...props}/>
  } else{
    return <CssTextFieldDark {...props}/>
  }
  
  
}

export default InputTextField;
