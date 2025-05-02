/**
 * List of event types that are used in the AutoComplete component to help with the auto complete process
 * This list is imported in the AutoComplete functionality for assertion matcher autocomplete.
 */
interface MatcherType {
  name: string
}

// components/TypesList/cypressMatcherTypesList.ts

export interface MatcherType {
    name: string;
    description?: string;
  }
  
  export const cypressMatcherTypesList: Array<MatcherType> = [
    { name: 'should.have.text', description: 'Checks element has exact text' },
    { name: 'should.have.value', description: 'Checks input has value' },
    { name: 'should.contain', description: 'Checks element contains text' },
    { name: 'should.have.attr', description: 'Checks attribute exists or has value' },
    { name: 'should.have.class', description: 'Checks class name exists on element' },
    { name: 'should.have.css', description: 'Checks element has CSS property' },
    { name: 'should.have.length', description: 'Checks number of matched elements' },
    { name: 'should.include', description: 'Checks value is included in set' },
    { name: 'should.eq', description: 'Checks values are strictly equal' },
    { name: 'should.be.disabled', description: 'Checks element is disabled' },
    { name: 'should.be.visible', description: 'Checks element is visible' },
    { name: 'should.not.be.visible', description: 'Checks element is hidden' },
    { name: 'should.not.exist', description: 'Checks element does not exist' },
    { name: 'should.not.have.value', description: 'Checks input does not have value' },
  ];
  