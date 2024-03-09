export interface GraphQLStatements {
  id: number;
  type: string;
  [key: string]: any;
}

export interface GraphQLTestCaseState {
  modalOpen: boolean;
  serverFilePath: string;
  serverFileName: string;
  // graphQLStatements: GraphQLObj[];
  graphQLStatements: any;
  dbFilePath: string;
  dbFileName: string;
  addDB: boolean | string;
}

export interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<GraphQLStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: object;
}

type GraphQLKeyValues = number | string | boolean | Assertion[] | Header[];

interface forGraphQL {
  [index: string]: GraphQLKeyValues;
}

export interface GraphQLObj extends forGraphQL {
  id: number;
  type: string;
  testName: string;
  method: string;
  route: string;
  assertions: Assertion[];
  headers: Header[];
  post: boolean;
  postData: string;
}

export interface Assertion {
  id: number;
  expectedResponse: string;
  value: string;
  matcher: string;
  not: boolean;
}

export interface Header {
  id: number;
  headerName: string;
  headerValue: string;
}

export type EventTarget = {
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
};
export interface GraphQLTestMenuProps {
  dispatchToGraphQLTestCase: (action: object) => void;
}
export interface GraphQLTestStatementsProps extends GraphQLTestMenuProps {
  graphQLStatements: Array<GraphQLStatements>;
}
