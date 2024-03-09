import React, { createContext, useContext, useReducer } from 'react';
import styles from './TestCase.module.scss';
import { updateRenderComponent } from '../../context/actions/updatedFrontendFrameworkTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { createMockData } from '../../context/actions/mockDataActions';
import UpdatedReactTestMenu from '../TestMenu/UpdatedReactTestMenu';
import MockData from '../UpdatedReactTestComponent/MockData/MockData';
import { Button } from '@mui/material';
import { RTFsContexts } from '../../context/RTFsContextsProvider';
import DescribeBlock from '../UpdatedReactTestComponent/DescribeBlock/DescribeBlock';

const UpdatedReactTestCase = ({
  filterFileType,
}: {
  filterFileType: Function;
}) => {
  const { reactTestFileState, rTFDispatch, handleAddBlock } =
    useContext(RTFsContexts);
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const reactTestFileStateChildren = Object.values(
    reactTestFileState.children
  ).map((childObject) => (
    <DescribeBlock blockObjectsState={childObject} key={childObject.filepath} />
  ));

  return (
    <>
      <div id={styles[`ReactTestCase${theme}`]}>
        <h2 id={styles[`testName${theme}`]}>React Testing</h2>
        <UpdatedReactTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              dispatch={rTFDispatch}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={filterFileType(Object.keys(filePathMap), [
                'js',
                'jsx',
                'ts',
                'tsx',
              ])}
              label="Search Component"
            />
          </div>
          <Button variant="outlined" onClick={handleAddMockData} size="medium">
            Add Mock Data
          </Button>
        </div>

        {mockData
          ? mockData.length > 0 && (
              <section id={styles.mockDataHeader}>
                {mockData.map((data) => {
                  return (
                    <MockData
                      key={data.id}
                      mockDatumId={data.id}
                      dispatchToMockData={dispatchToMockData}
                      fieldKeys={data.fieldKeys}
                    />
                  );
                })}
              </section>
            )
          : null}
        <div id={styles.describeContainer}>
          <div /*droppableId='droppableReactDescribe'*/ type="describe">
            {reactTestFileStateChildren}
          </div>
        </div>
        <div id={styles.addDescribeButton}>
          <Button
            data-testid="addDescribeButton"
            onClick={(e) => handleAddBlock(e, 'describe', '')}
            variant="outlined"
          >
            Add Describe Block
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdatedReactTestCase;
