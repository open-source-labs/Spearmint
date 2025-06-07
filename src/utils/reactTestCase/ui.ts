import {ReactStatements} from "./state";
import { CypressCommandStep,} from "./cypress";
import { AnyMatcherType } from "./matchers";



// This single ui.ts file hold Anything a React component (form field, card, autocomplete, render block) needs to consume 
// “component prop” types or “dispatch payload” types

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
  commandChain?: CypressCommandStep[];
}

export interface Assertion {
  id: number;
  expectedResponse: string;
  value: string;
  matcher: string;
  not: boolean;
}

export interface UpdateAssertionProps {
  id?: string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  isNot?: boolean;
  matcherType?: AnyMatcherType;
  matcherValue?: string;
  suggestions?: any[] | number | void;
  selectorMethod?: string;
  selectorValue?:string;
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

// for actions
    eventType: string;
    eventValue: string;
    queryVariant: string;
    querySelector: string;
    queryValue: string;


    isNot: boolean;
    matcherType: AnyMatcherType;
    matcherValue: string;
    suggestions: [];
    commandChain?: CypressCommandStep[]; // this is in actions idk why its in an assertion type
    visitValue?: string | '';
    visitKey?: string | '';
// for assertions 
    selectorMethod: string;    // e.g. "get" | "contains" | ""
    selectorValue: string;     // e.g. "#submitBtn" or regex
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

export interface Visit {
  id: string;
  statementId: string;
  visitKey: string;
  visitValue: string;
}

export interface VisitProps {
  statementId: string;
  visitId: string;
  visitKey: string;
  visitValue: string;
  theme: string;
}

export interface RenderStatement {
  id: string;
  itId: string;
  describeId: string;
  type: string;
  props: Prop[];
 // visits?: Visit[]; //! ADDED to store condintional visit input value
 visitKey?: string
  visitValue?: string;
 // statementId: string;
}

export interface RenderProps {
  // jest props
  statement: RenderStatement;
  statementId: string;
  describeId: string;
  itId: string;

// visit props 
  visitId?: string| '' ;
  visitKey?: string | '';
  visitValue?: string | '';

  theme?: string;
  
}

export interface RenderVisit {
  statement: RenderStatement;
  statementId: string;
  describeId: string;
  itId: string;
}

export interface AutoCompleteStatement {
  eventType?: string;
  matcherType?: AnyMatcherType;
  isNot?: boolean;
  suggestions?: number | any[] | void;
    fieldType?: string | '';
}

export interface AutoCompleteProps {
  statement: AutoCompleteStatement;
  statementType: string;
  dispatchToTestCase: Function;
  type: string;
  fieldType?: string | '';
  testFramework?: 'jest' | 'cypress' | 'mocha'| 'sinon';
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