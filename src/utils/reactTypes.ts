export interface ReactStatements {
  id: number;
  type: string;
  [key: string]: any;
}

//**! REACT TEST TYPES */ 
export interface ReactTestCaseTypes {
  modalOpen: boolean;
  describeId: number;
  itId: number;
  statementId: number;
  propId: number;
  visitId: number;
  describeBlocks: DescribeBlocks;
  itStatements: ItStatements;
  statements: Statements;
}

export interface DescribeBlocks {
  byId: DescribeById;
  allIds: Array<string>;
  children?: Object;    //! reactTestCaseReducer had type error missing children property in reactTestCaseState DescribeBlocks
} 
export interface DescribeById {
  [key: string]: {
    id: string;
    text: string;
  };
}







export interface ItStatements {
  byId: ItById;
  allIds: allIdsType;
}

export interface Statements {
  byId: StatementsById;
  allIds: Array<string>;
  componentPath: string;
  componentName: string;
}



export interface ItById {
  [key: string]: {
    id: string;
    describeId: string;
    text: string;
  };
}

type allIdsType = {
  [key: string]: Array<string>;
};

export interface StatementsById {
  [key: string]: {
    id: string;
    itId: string;
    describeId: string;
    type: string;
    props: Array<Prop>; // example: <Login username="testUser" />
    visits: Array<Visit>  //! added
  };
}
 

//**! REACT TEST BLOCKS */ 

export interface Action {
  type: string;
  id?: string;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<ReactStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: object;

}

export interface Assertion {
  id: number;
  expectedResponse: string;
  value: string;
  matcher: string;
  not: boolean;
}




export interface ReactTestComponentAssertion {
  describeId: string;
  itId: string;
  statementId: string;
  statement: {
    id: string;
    itId: string;
    describeId: string;
    type: string;
    eventType: string;
    eventValue: string;
    queryVariant: string;
    querySelector: string;
    queryValue: string;
    isNot: boolean;
    matcherType: string;
    matcherValue: string;
    suggestions: [];
  };
}

export interface UpdateAssertionProps {
  id?: string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  isNot?: boolean;
  matcherType?: string;
  matcherValue?: string;
  suggestions?: any[] | number | void;
}
export interface UpdateActionProps {
  id?: string;
  eventType?: string;
  eventValue?: string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  suggestions?: any[] | number | void;
}
export interface Prop {
  id: string;
  statementId: string;
  propKey: string;
  propValue: string;
}
//! ADDED
export interface Visit {
  id: string;
  statementId: string;
  visitKey: string;
  visitValue: string;
}

export interface PropProps {
  statementId: string;
  propId: string;
  propKey: string;
  propValue: string;
  dispatchToTestCase: Function;
  theme: string;
}

export interface VisitProps {
  statementId: string;
  visitId: string;
  visitKey: string;
  visitValue: string;
  dispatchToTestCase: Function;
  theme: string;
}

export interface RenderStatement {
  id: string;
  itId: string;
  describeId: string;
  type: string;
  props: Prop[];
  visits?: Visit[]; //! ADDED to store condintional visit input value
}

export interface RenderProps {
  statement: RenderStatement;
  statementId: string;
  describeId: string;
  itId: string;
}

export interface RenderVisit {
  statement: RenderStatement;
  statementId: string;
  describeId: string;
  itId: string;
}


export interface AutoCompleteStatement {
  eventType?: string;
  matcherType?: string;
  isNot?: boolean;
  suggestions?: number | any[] | void;
}

export interface AutoCompleteProps {
  statement: AutoCompleteStatement;
  statementType: string;
  dispatchToTestCase: Function;
  type: string;
  testFramework?: 'jest' | 'cypress' | 'mocha';
}

export interface AutoCompleteMockDataStatement {
  eventValue?: string;
  queryValue?: string;
}

export interface AutoCompleteMockDataProps {
  statement: AutoCompleteMockDataStatement;
  statementType: string;
  dispatchToTestCase: Function;
  propType: string;
  renderId: string;
  propId: string;
  propKey: string;
  propValue: string;
}

// Type interface for reactTestCaseReducer action type
export interface ReactReducerAction {
  type: string;
  id: number | string;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<ReactStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: object;
  describeId: string;
  reorderedDescribe: Array<string>;
  itId: string;
  reorderedIt: Array<string>;
  statementId: string;
  eventType: string;
  eventValue?: string;
  queryVariant: string;
  querySelector: string;
  queryValue: string;
  suggestions: Array<string>;
  isNot: boolean;
  matcherType: string;
  matcherValue: string;
  componentName: string;
  filePath: string;

  propKey: string;
  propValue: string;

  subType?: 'visit'| ''; //! ADDED
  visitId?: string;
  visitKey?: string;
  visitValue?: string;
}
