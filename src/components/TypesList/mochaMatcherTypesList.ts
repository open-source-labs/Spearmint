/**
 * List of event types that are used in the AutoComplete component to help with the auto complete process
 * This list is imported in the AutoComplete functionality for assertion matcher autocomplete.
 */
interface MLCType {
    name: string
  }
  
  export const mochaMatcherTypesList: Array<MLCType> = [
    {
      name: 'to.have.text', //(using chai-dom)
    },
    {
      name: 'to.exist', //to.exist //(cd)
    },
    {
      name: 'to.have.html', //to.have.html //(cd)
    },
    {
      name: 'to.contain', //to.contain  //(cd)
    },
    {
      name: 'to.have.attribute', //to.have.attribute //(cd)
    },
    {
      name: 'to.have.class', //to.have.class
    },
    {
      name: 'to.have.style', //to.have.style
    },
    {
      name: 'to.match',//to.match
    },
    // {
    //   name: 'toBeEnabled',//to.match
    // },
    {
      name: 'to.be.empty',//to.be.empty
    },
    {
      name: 'to.be.visible',//to.be.visible
    },
    {
      name: 'to.have.focus',//to.have.focus
    },
    {
      name: 'to.be',//done
    },
    {
      name: 'called', //sinon.assert.called (sinon)
    },
    {
      name: 'callCount',//spy.callCount (sinon)
    },
    {
      name: 'calledWith',//spy.calledWith (sinon)
    },
    // {
    //   name: 'toHaveBeenLastCalledWith',//
    // },
    {
      name: 'neverCalledWith',//spy.neverCalledWith (sinon)
    },
    {
      name: 'returned',//spy.returned (sinon)
    },
    // {
    //   name: 'toHaveReturnedTimes',
    // },
    // {
    //   name: 'toHaveReturnedWith',
    // },
    // {
    //   name: 'toHaveLastReturnedWith',
    // },
    // {
    //   name: 'toHaveNthReturnedWith',
    // },
    {
      name: 'to.have.lengthOf',//to.have.lengthOf
    },
    {
      name: 'to.have.property',//to.have.property
    },
    {
      name: 'to.be.closeTo',//to.be.closeTo
    },
    {
      name: 'not.to.be.undefined',//not.to.be.undefined
    },
    {
      name: 'no.to.be.ok',//no.to.be.ok
    },
    {
      name: 'to.be.above',//to.be.above
    },
    {
      name: 'to.be.at.least',//to.be.at.least
    },
    {
      name: 'to.be.at.most',//to.be.at.most
    },
    {
      name: 'to.be.below',//to.be.below
    },
    {
      name: 'to.be.instanceOf',//to.be.instanceOf
    },
    {
      name: 'to.be.null',//to.be.null
    },
    {
      name: 'to.be.ok',//to.be.ok
    },
    {
      name: 'to.be.undefined',//to.be.undefined
    },
    {
      name: 'to.be.nan',//to.be.nan
    },
    {
      name: 'to.include',//to.include
    },
    {
      name: 'toContainEqual',//to.include.equal
    },
    {
      name: 'to.equal',//to.equal
    },
    {
      name: 'to.match',
    },
    // {
    //   name: 'to.matchObject',
    // },
    // {
    //   name: 'toMatchSnapshot',
    // },
    // {
    //   name: 'toMatchInLineSnapshot',
    // },
    // {
    //   name: 'toStrictEqual',
    // },
    {
      name: 'to.throw',
    },
    // {
    //   name: 'toThrowErrorMatchingSnapshot',
    // },
    // {
    //   name: 'toThrowErrorMatchingInLineSnapshot',
    // },
  ];
  