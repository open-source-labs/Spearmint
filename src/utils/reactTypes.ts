export interface ReactStatements {
    id: number,
    type: string,
    [key: string]: any,
  }
  export interface ReactTestCaseTypes {
    modalOpen: boolean,
    describeId: number,
    itId: number,
    statementId: number,
    propId: number,
    describeBlocks: DescribeBlocks,
    itStatements: ItStatements,
    statements: Statements,
  }
  export interface DescribeBlocks {
    byId: DescribeById,
    allIds: Array<string>,
  }

  export interface ItById {
      [key: string]: {
        id: string,
        describeId: string,
        text: string,
      }
  }

  export interface ItStatements {
    byId: ItById,
    allIds: allIdsType,
  }
  type allIdsType = {
    [key: string]: Array<string>,
  }
  
  export interface Action {
    type: string,
    id?: number,
    serverFileName?: string,
    serverFilePath?: string,
    draggableStatements?: Array<ReactStatements>,
    index?: number,
    text?: string,
    assertion?: Assertion,
    db?: string | boolean,
    dbFilePath?: string,
    dbFileName?: string,
    testState?: object,
  }
  
  export interface Assertion {
    id: number,
    expectedResponse: string,
    value: string,
    matcher: string,
    not: boolean,
  }
  
  export interface Statements {
    byId: StatementsById,
    allIds: Array<string>,
    componentPath: string,
    componentName: string,
  }

  export interface StatementsById {
    [key: string]: {
      id: string;
      itId: string;
      describeId: string;
      type: string;
      props: Array<Prop>;
    }
  }

  export interface ReactTestComponentAssertion {
    describeId: string,
      itId: string,
      statementId: string,
      statement: {
        id: string,
        itId: string,
        describeId: string,
        type: string,
        eventType: string,
        eventValue: string,
        queryVariant: string,
        querySelector: string,
        queryValue: string,
        isNot: boolean,
        matcherType: string,
        matcherValue: string,
        suggestions: [],
      },
  }

  export interface UpdateActionProps {
    id: string,
    eventType?: string,
    eventValue?: string,
    queryVariant?: string,
    querySelector?: string,
    queryValue?: string,
    suggestions?: string[]
  }

  export interface UpdateAssertionProps {
    id: string,
    queryVariant?: string,
    querySelector?: string,
    queryValue?: string,
    isNot?: boolean,
    matcherType?: string,
    matcherValue?: string,
    suggestions?: string[],
  }

  export interface Prop {
    id: string,
    statementId: string,
    propKey: string,
    propValue: string
  }

  export interface PropProps {
    statementId: string,
    propId: string,
    propKey: string,
    propValue: string,
    dispatchToTestCase: Function,
    theme: string
  }

  export interface RenderStatement {
    id: string,
    itId: string,
    describeId: string,
    type: string,
    props: Prop[]
  }

  export interface RenderProps {
    statement: RenderStatement,
    statementId: string,
    describeId: string,
    itId: string
   }

  export interface DescribeById {
    [key: string]: {
      id: string,
      text: string
    }
  }

/* Types for reactTestCaseReducer (also using ReactTestCaseTypes and Action interfaces) */

export interface DeletionIdProp {

}

export interface ObjectProp {
  allIds: {
    [key: string]: Array<string>
  };
  byId: ItById
}

export interface Lookup {

}