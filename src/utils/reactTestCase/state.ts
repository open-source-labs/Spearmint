import {Assertion, Prop, Visit} from "./ui";
import { CypressCommandStep } from "./cypress";
import { AnyMatcherType } from "./matchers";


// Top level state fro React test

//**! REACT TEST TYPES */ 
export interface ReactTestCaseTypes {
  modalOpen: boolean;
  describeId: number;
  itId: number;
  statementId: number;
// ids for props
  propId: number;
  visitId: number;
   stepId: number; 

  describeBlocks: DescribeBlocks;
  itStatements: ItStatements;
  statements: Statements;
}

export interface ReactStatements {
  id: number;
  type: string;
  [key: string]: unknown;
}

export interface ReactReducerAction {
  type: string;
  id: number | string;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: ReactStatements[];
  index?: number;
  text?: string;
  assertion?: Assertion; 
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: Record<string, unknown>;

  // 
  describeId: string;
  reorderedDescribe: string [];
  itId: string;
  reorderedIt: string [];

  //
  statementId: string;
  eventType: string;
  eventValue?: string;
  queryVariant: string;
  querySelector: string;
  queryValue: string;
  suggestions: string [];
  isNot: boolean;
  matcherType: AnyMatcherType;
  matcherValue: string;
  componentName: string;
  filePath: string;
//
  propKey: string;
  propValue: string;
//
  visitId?: string;
  visitKey?: string;
  visitValue?: string;
  commandChain?: CypressCommandStep[]; // array of objects
  actionId?: string;
  stepId?: string;
  step?: CypressCommandStep; // an object in the commandChain
  field?: string;
  value?: string;
//
  selectorMethod?: string;
  selectorValue?:string;
}



export interface DescribeById {
  [key: string]: { id: string; text: string;};
}

export interface DescribeBlocks {
  byId: DescribeById;
  allIds: string [];
    // previous type object was loose, changed for better signal of an arbitrary map
  children?: Record<string, unknown>;

} 


export interface ItById {
  [key: string]: { id: string; describeId: string;text: string; };
}

export type AllIdsType = Record<string, string[]>;


export interface ItStatements {
  byId: ItById;
  allIds: AllIdsType;
}

export interface StatementsById {
  [key: string]: {
    id: string;
    itId: string;
    describeId: string;
    type: string;
    props: Prop []; // example: <Login username="testUser" />
    visits: Visit [];
    commandChain: CypressCommandStep [];
  };
}


export interface Statements {
  byId: StatementsById;
  allIds: string[];
  componentPath: string;
  componentName: string;
}


