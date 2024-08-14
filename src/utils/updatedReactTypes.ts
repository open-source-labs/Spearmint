export interface ReactStatements {
  id: number;
  type: string;
  [key: string]: any;
}
export interface UpdatedReactTestFileState {
  modalOpen: boolean;
  filepath: string;
  children: {} | { [key: string]: DescribeObject };
}
export interface DescribeObject {
  key: string;
  filepath: string;
  parentsFilepath: string;
  objectType: string;
  comment: string;
  text: string;
  children:
    | {}
    | {
        [key: string]: DescribeObject | TestObject | SetupTeardownObject;
      };
}

export interface SetupTeardownObject {
  key: string;
  filepath: string;
  parentsFilepath: string;
  objectType: string;
  children: {
    beforeAll: {} | { [key: string]: any };
    beforeEach: {} | { [key: string]: any };
    afterAll: {} | { [key: string]: any };
    afterEach: {} | { [key: string]: any };
  };
}

export interface TestObject {
  key: string;
  filepath: string;
  parentsFilepath: string;
  objectType: string;
  comment: string;
  text: string;
  children: {} | {};
}

type allIdsType = {
  [key: string]: Array<string>;
};

export interface ActionObject {
  key: string;
  filepath: string;
  parentsFilepath: string;
  objectType: string;
  statementType: string;
  comment: string;
  eventType: string;
  eventValue: null | string;
  queryVariant: string;
  querySelector: string;
  queryValue: string;
  suggestions: string[];
}

/*export interface Assertion {
  id: number;
  expectedResponse: string;
  value: string;
  matcher: string;
  not: boolean;
}*/
export interface Assertion {
  key: string;
  filepath: string;
  parentsFilepath: string;
  objectType: string;
  statementType: string;
  comment: string;
  queryVariant: string;
  querySelector: string;
  queryValue: string;
  isNot: boolean;
  matcherType: string;
  matcherValue: string;
  suggestions: string[];
}

export interface Statements {
  byId: StatementsById;
  allIds: Array<string>;
  componentPath: string;
  componentName: string;
}

export interface StatementsById {
  [key: string]: {
    id: string;
    itId: string;
    describeId: string;
    type: string;
    props: Array<Prop>;
  };
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

export interface UpdateActionProps {
  id?: string;
  eventType?: string;
  eventValue?: string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  suggestions?: any[] | number | void;
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

export interface Prop {
  id: string;
  statementId: string;
  propKey: string;
  propValue: string;
}

export interface PropProps {
  statementId: string;
  propId: string;
  propKey: string;
  propValue: string;
  dispatchToTestCase: Function;
  theme: string;
}

export interface RenderStatement {
  id: string;
  itId: string;
  describeId: string;
  type: string;
  props: Prop[];
}

export interface RenderProps {
  statement: RenderStatement;
  statementId: string;
  describeId: string;
  itId: string;
}

export interface DescribeById {
  [key: string]: {
    filePath: string;
    id: string;
    text: string;
  };
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
}
