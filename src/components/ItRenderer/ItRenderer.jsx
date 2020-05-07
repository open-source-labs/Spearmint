import React from 'react';
import CustomInput from '../CustomInput/CustomInput'

const ItRenderer = ({itStatements}) => (
  itStatements.map((statement, i) => (
    <CustomInput
    key={`it-${i}`}
    label={'The component should...'}
    placeholder={'Button component renders correctly...'}
    value={statement.it}
  />
  ))
)

export default ItRenderer;