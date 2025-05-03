
/* ----- Shape of Cypress React test State ------ */
//OBID -> ordered by ID
export interface CypressReactTestCaseTypes {
modalOpen: boolean; // not sure
describeId: number, // Describe block counter for unique id's
itId: number, // it statments unique id's inside describe block
statementId: number, // new teststatment ID
propId: number;
describeBlock: { // all discribe blocks in cypress test, OBID
    byId: Record<string, { id: string; text: string}> // describeB1, cy.get('submit')
    allIds: string[]
};

itStatements: {// actions/assertions/renders inside each it, OBID
    byId: Record<string, {id: string; describeId: string; text: string}>
    allIds: Record<string, string[]>   
}

statements: {
    byId: Record<
    string, 
    { 
        id: string; 
        itId: string; 
        describeId: string; 
        // Actions -> doing something (click, type, submit)
        // Assertion -> checking something (expect and element to exist, expect text to match)
        // Render -> mounting component 
        type: 'action' | 'assertion' | 'render'; // Render statements use props (example: <Login username="testUser" />)
        props?: Array<{propKey: string; propValue: string}>; // only for render to keep track of user inputs to 'render' test file
        eventType?: string; // only for 'action'
        eventValue?: string; // only for 'action'
        querySelector?: string; // for both 'action' and 'assertion'
        queryValue?: string;  // initial state has no value
        matcherType?: string;
        matcherValue?: string;
    }>;
    allIds: Array<string>;
    componentPath: string;
    componentName: string;
}
}

export interface ReactStatements {
    id: number;
    type: string;
    [key: string]: any;
  }
  
  
export interface Assertion {
    id: number;
    expectedResponse: string;
    value: string;
    matcher: string;
    not: boolean;
  }
  
// reused reactTestCaseReducer interface
// Type interface for reactTestCaseReducer action type
export interface ReactReducerAction {
  type?: string;
  id?: number | string;
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
  describeId?: string;
  reorderedDescribe?: Array<string>;
  itId?: string;
  reorderedIt?: Array<string>;
  statementId?: string;
  eventType?: string;
  eventValue?: string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  suggestions?: Array<string>;
  isNot?: boolean;
  matcherType?: string;
  matcherValue?: string;
  componentName?: string;
  filePath?: string;
  propKey?: string;
  propValue?: string;
}
