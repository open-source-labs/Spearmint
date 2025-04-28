
/* ----- Shape of Cypress React test State ------ */
//OBID -> ordered by ID
export interface CypressReactTestCaseTypes {
modalOpen: boolean; // not sure
describeId: number, // Describe block counter for unique id's
itId: number, // it statments unique id's inside describe block
statementId: number, // new teststatment ID
describeBlock: { // all discribe blocks in cypress test, OBID
    byId: Record<string, { id: string; text: string}> // describeB1, cy.get('submit')
    allIds: Record<string, string[]>
};

itStatements: {// actions/assertions/renders inside each it, OBID
    byId: Record<string, {id: string; describeId: string; text: string}>
    allIds: Record<string, string[]>   
}

statment: {
    byId: Record<
    string, 
    { 
        id: string; 
        itId: string; 
        describeId: string; 
        // Actions and Assertion statement use selectors, event types, event values, matchers
        type: 'action' | 'assertion' | 'render'; // Render statements use props (example: <Login username="testUser" />)
        props?: Array<{propKey: string; propValue: string}>; // only for render to keep track of user inputs to 'render' test file
        eventType?: string; // only for 'action'
        eventValue?: string; // only for 'action'
        querySelector?: string; // for both 'action' and 'assertion'
        queryValue: string; 

    }>
}


}



