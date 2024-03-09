import React, { useContext } from 'react';
import GraphQL from '../GraphQLTestComponent/GraphQL';
import { GraphQLTestCaseContext } from '../../context/reducers/graphQLTestCaseReducer';
import {  GraphQLObj } from '../../utils/graphQLTypes';

const GraphQLTestStatements = () => {
  const [{ graphQLStatements }, dispatch] = useContext(GraphQLTestCaseContext);

  return (
    <>
      {graphQLStatements.map((statement:  GraphQLObj, i: number) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          case 'graphQL':
            return (
              <GraphQL
                key={statement.id}
                graphQL={statement}
                index={i}
                dispatchToGraphQLTestCase={dispatch}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default GraphQLTestStatements;
