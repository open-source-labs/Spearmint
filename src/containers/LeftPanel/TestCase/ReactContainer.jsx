import React from 'react';
import DescribeRenderer from '../../../components/DescribeRenderer/DescribeRenderer';
import styles from '../TestCase/ReactContainer.module.scss';

// State used for testing
const describeBlocks = [
  {
    describe: 'The is an example test',
    describeId: 0,
    itStatements: [
      {
        it: 'should do something #1',
        itId: 0,
        statements: [
          {
            id: 0,
            type: 'render',
            componentName: '',
            filePath: '',
            props: [],
            hasProp: false,
          },
        ],
      },
      {
        it: 'should do something #23',
        itId: 0,
        statements: [
          {
            id: 0,
            type: 'render',
            componentName: '',
            filePath: '',
            props: [],
            hasProp: false,
          },
        ],
      }
    ],
  },
  {
    describe: 'The is an example test #2',
    describeId: 0,
    itStatements: [
      {
        it: 'should do something #2',
        itId: 0,
        statements: [
          {
            id: 0,
            type: 'render',
            componentName: '',
            filePath: '',
            props: [],
            hasProp: false,
          },
        ],
      },
    ],
  },
];

const ReactContainer = () => {

  return (
    <div className={styles.ReactContainer}>
      <div className={styles.describeBlockContainer}>
        <DescribeRenderer describeBlocks={describeBlocks} />
      </div>
    </div>
  );
};

export default ReactContainer;
