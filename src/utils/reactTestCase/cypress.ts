
export type SelectorType = 
'get'| 'find'|'contains'| 'within'|
'parent'| 'children'| 'filter'| 'eq'| 
'getByTestId'| 'getByRole';
 
export type ActionType =
'click'|'dblclick'|'rightclick'|'type'|
'clear'|'check'| 'uncheck'| 'select'| 
'scrollIntoView'| 'trigger'| 'focus'|
'blur'|'invoke';


// One step in a Cypress command chain,
// { selectorType: "get", selectorValue: "#name", actionType: "type", actionValue: "Alice" }
export interface CypressCommandStep {
  id?: string;  // unique id
  selectorType: SelectorType; 
  selectorValue: string;  // "#submitBtn"
  actionType?: ActionType; 
  actionValue?: string;  // "/Welcome/i", "hello@example.com"
}

// If you need to store an entire “action statement” of Cypress
export interface CypressTestActionStatement {
  id: string;
  commandChain: CypressCommandStep[];
}
