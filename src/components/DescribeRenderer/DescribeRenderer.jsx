import React from 'react';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';

const DescribeRenderer = ({ describeBlocks }) => {

  const inputStyles = {
    fontSize: '4rem'
  }

  return describeBlocks.map((block, i) => (
    <div className={styles.describeBlock}>
      <label htmlFor='describe-label'>Describe This Set of Tests</label>
      <input
        key={`describe=${i}`}
        id={i}
        styles={inputStyles}
        name='describe-label'
        type='text'
        placeholder={'The component has basic functionality'}
        defaultValue={block.describe || ''}
      />
      <ItRenderer key={`it-block-${i}`}itStatements={block.itStatements} />
    </div>
  ));
};

export default DescribeRenderer;
