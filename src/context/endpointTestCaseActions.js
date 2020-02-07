export const actionTypes = {
    UPDATE_ENDPOINT_STATEMENTS_ORDER: 'UPDATE_ENDPOINT_STATEMENTS_ORDER',
    UPDATE_ENDPOINT_TEST_STATEMENT: 'UPDATE_ENDPOINT_TEST_STATEMENT',

    TOGGLE_ENDPOINT: 'TOGGLE_ENDPOINT',

    CREATE_NEW_ENDPOINT_TEST: 'CREATE_NEW_ENDPOINT_TEST',
};


export const updateEndpointStatementsOrder = draggableStatements => ({
    type: actionTypes.UPDATE_ENDPOINT_STATEMENTS_ORDER,
    draggableStatements,
});

export const updateEndpointTestStatement = TestStatement => ({
    type: actionTypes.UPDATE_ENDPOINT_TEST_STATEMENT,
    TestStatement
})

export const toggleEndpoint = () => ({
    type: actionTypes.TOGGLE_ENDPOINT,
});

export const createNewEndpointTest = () => ({
    type: actionTypes.CREATE_NEW_ENDPOINT_TEST,
});