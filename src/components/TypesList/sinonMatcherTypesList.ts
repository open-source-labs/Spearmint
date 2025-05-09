/**
 * List of event types that are used in the AutoComplete component to help with the auto complete process
 * This list is imported in the AutoComplete functionality for assertion matcher autocomplete.
 */
interface MLCType {
    name: string
  }
  
  //!SINON MATCHERS
  export const sinonMatcherTypesList: Array<MLCType> = [
    {
      name: 'called', //sinon.assert.called (sinon)
    },
    {
      name: 'callCount',//spy.callCount (sinon)
    },
    {
      name: 'calledWith',//spy.calledWith (sinon)
    },
    {
      name: 'neverCalledWith',//spy.neverCalledWith (sinon)
    },
    {
      name: 'returned',//spy.returned (sinon)
    },
  ];
