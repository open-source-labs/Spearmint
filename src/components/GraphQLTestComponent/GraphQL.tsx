import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './GraphQL.module.scss';
import style from '../ReactTestComponent/Render/Render.module.scss';
import styled from '../ReactTestComponent/Render/Prop.module.scss';
import GraphQLAssertion from './GraphQLAssertion';
import { Assertion, GraphQLObj, Header, Action, EventTarget } from '../../utils/graphQLTypes';

import {
  deleteGraphQL,
  updateGraphQL,
  addHeader,
  deleteHeader,
  togglePost,
  updatePost,
  addAssertion,
} from '../../context/actions/graphQLTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
const closeIcon = require('../../assets/images/close.png');
const dragIcon = require('../../assets/images/drag-vertical.png');
const minusIcon = require('../../assets/images/minus-box-outline.png');

interface GraphQLProps {
  graphQL: GraphQLObj;
  index: number;
  dispatchToGraphQLTestCase: (action: Action) => void;
}

const GraphQL = ({ graphQL, index, dispatchToGraphQLTestCase }: GraphQLProps) => {
  const [ {theme} ] = useContext<any>(GlobalContext)
  const handleChangeGraphQLFields = ({ target }: EventTarget, field: string) => {
    let updatedGraphQL = { ...graphQL};

    field === 'headerName' || field === 'headerValue'
      ? (updatedGraphQL.headers[Number(target.id)][field] = target.value)
      : (updatedGraphQL[field] = target.value);
    dispatchToGraphQLTestCase(updateGraphQL(updatedGraphQL));

    if (target.value === 'query') dispatchToGraphQLTestCase(togglePost(index));
    else if (target.type === 'select-one' && graphQL.post)
      dispatchToGraphQLTestCase(togglePost(index));

    if (target.value === 'mutation') dispatchToGraphQLTestCase(togglePost(index));
    else if (target.type === 'select-one' && graphQL.post)
      dispatchToGraphQLTestCase(togglePost(index));

    if (target.value === 'subscription') dispatchToGraphQLTestCase(togglePost(index));
    else if (target.type === 'select-one' && graphQL.post)
      dispatchToGraphQLTestCase(togglePost(index));
  };

  const handleClickDeleteGraphQL = () => {
    // delete endpoint returns action object {type: 'DELETE_ENDPOINT, id: endpoint.id}
    dispatchToGraphQLTestCase(deleteGraphQL(graphQL.id));
  };

  const handleClickAddHeader = () => {
    dispatchToGraphQLTestCase(addHeader(index));
  };

  const handleClickDeleteHeader = (i: number) => {
    dispatchToGraphQLTestCase(deleteHeader(index, i));
  };

  const updatePostData = ({ target }: EventTarget) => {
    dispatchToGraphQLTestCase(updatePost(target.value, index));
    target.style.height = 'inherit';
    target.style.height = `${Math.max(Math.min(target.scrollHeight, 200), 102)}px`;
  };

  const addAssertionHandleClick = () => {
    dispatchToGraphQLTestCase(addAssertion(index));
  };



  return (
    <div style={{ maxWidth: '650px' }}>
      <Draggable draggableId={graphQL.id.toString()} index={index}>
        {(provided) => (
          
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={styles[`graphQLmodal${theme}`]}
          >
            <p>
              {typeof provided}
            </p> 
            <img
              src={closeIcon}
              id={styles.close}
              alt='close'
              onClick={handleClickDeleteGraphQL}
            />
            <div id={styles.header}>
              <img src={dragIcon} alt='drag' />
              <h3>GraphQL</h3>
            </div>
            <div id={styles.groupFlexbox}>
              <div id={styles.serverInput} style={{ width: '100%' }}>
                <label htmlFor='test-statement'>Test</label>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'spaceBetween',
                  }}
                >
                  <div id={styles.labelInputTest}>
                    <input
                      
                      type='text'
                      id={styles.testStatement}
                      value={graphQL.testName}
                      onChange={(e) => handleChangeGraphQLFields(e, 'testName')}
                    />
                  </div>{' '}
                  <button
                    id={styles.assertionButton}
                    style={{ marginTop: '9px' }}
                    onClick={handleClickAddHeader}
                  >
                    <i className='fas fa-plus'></i> Add Header
                  </button>
                </div>
              </div>
            </div>
            <div id={styles.groupFlexbox}>
              <div id={styles.dropdownWrapper}>
                <label htmlFor='method'>Query, Subscription, or Mutation</label>
                <div id={styles.dropdownFlex}>
                  <select
                    id='method'
                    value={graphQL.method}
                    onChange={(e) => handleChangeGraphQLFields(e, 'method')}
                  >
                    <option value='' />
                    <option value='query'>Query</option>
                    <option value='mutation'>Mutation</option>
                    <option value='subscription'>Subscription</option>
                  </select>
                </div>
              </div>

              <div id={styles.alignRight}>
                <label htmlFor='route'>Route</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    name='route'
                    value={graphQL.route}
                    placeholder='eg. /route'
                    onChange={(e) => handleChangeGraphQLFields(e, 'route')}
                  />
                </div>
              </div>
            </div>{' '}
            {graphQL.assertions.map((assertion: Assertion, i: number) => {
              return <GraphQLAssertion assertion={assertion} index={index} id={i} />;
            })}{' '}
            {graphQL.post && (
              <div id={style.RenderContainer} style={{ margin: '10px 0 0 0' }}>
                <label htmlFor='Header' id={styles.labelInputPost}>
                  Data To Send
                </label>
                <textarea
                  value={graphQL.postData}
                  onChange={(e) => updatePostData(e)}
                  style={{
                    display: 'block',
                    width: '90%',
                    overflow: 'scroll',
                    border: '1px solid rgb(205, 205, 205)',
                    margin: '10px auto',
                    height: '100px',
                    resize: 'none',
                    overflowX: 'hidden',
                    padding: '10px',
                  }}
                  placeholder={'Insert query string here... {  }'}
                />
              </div>
            )}
            {graphQL.headers.length > 0 && (
              <div id={styles[`addheadermodal${theme}`]} style={{ margin: '10px 0 0 0' }}>
                <div className={'props'}>
                  <div>
                    <div id={style.renderProp} style={{ width: '56.5%', paddingBottom: '3px' }}>
                      <label htmlFor='Header' id={style.headerLabel}>
                        Header
                      </label>
                      <label htmlFor='Value' id={style.headerLabel}>
                        Value
                      </label>
                    </div>
                    <hr />
                    {graphQL.headers.map((header: Header, i) => {
                      return (
                        <div id={styled.renderPropsFlexBox}>
                          <input
                            type='text'
                            id={i.toString()}
                            onChange={(e) => handleChangeGraphQLFields(e, 'headerName')}
                            value={header.headerName}
                          />
                          <input
                            type='text'
                            id={i.toString()}
                            onChange={(e) => handleChangeGraphQLFields(e, 'headerValue')}
                            value={header.headerValue}
                          />
                          <img
                            src={minusIcon}
                            alt='delete'
                            onClick={() => handleClickDeleteHeader(i)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}{' '}
            <div className={styles.buttonsContainer}>
              <button
                // id={id}
                onClick={addAssertionHandleClick}
                id={styles.assertionButton}
              >
                <i className='fas fa-plus'></i>
                Assertion
              </button>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default GraphQL;
