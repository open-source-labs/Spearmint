export const actionTypes = {
    UPDATE_EXPRESS_STATEMENTS_ORDER: 'UPDATE_EXPRESS_STATEMENTS_ORDER',
    UPDATE_EXPRESS_TEST_STATEMENT: 'UPDATE_EXPRESS_TEST_STATEMENT',

    TOGGLE_EXPRESS: 'TOGGLE_EXPRESS',

    CREATE_NEW_EXPRESS_TEST: 'CREATE_NEW_EXPRESS_TEST',
};


export const updateExpressStatementsOrder = draggableStatements => ({
    type: actionTypes.UPDATE_EXPRESS_STATEMENTS_ORDER,
    draggableStatements,
});

export const updateExpressTestStatement = TestStatement => ({
    type: actionTypes.UPDATE_EXPRESS_TEST_STATEMENT,
    TestStatement
})

export const toggleExpress = () => ({
    type: actionTypes.TOGGLE_EXPRESS,
});

export const createNewExpressTest = () => ({
    type: actionTypes.CREATE_NEW_EXPRESS_TEST,
});