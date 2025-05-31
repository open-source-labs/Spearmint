/**
 * List of event types that are used in the AutoComplete component to help with the auto complete process
 * TODO: The functionality for autocompleting eventtypes is not currently in use. Check AutoComplete Component.
 */
interface EventType {
    name: string
  }
  
  export const cypressSelectorTypesList: Array<EventType> = [

    { name: 'get', description: 'A selector used to filter matching CSS DOM elements.' },
    { name: 'contains', description: 'To find this element by its contents.' },
    { name: 'find', description: 'A selector used to filter matching DOM elements.' },
    { name: 'filter', description: 'narrow down results from previous query.' },
    { name: 'eq', description: 'select element at a specific index.' },
    { name: 'first', description: 'get the first element from matched set.' },
    { name: 'last', description: 'get the last element from matched set.' },
    { name: 'parent', description: 'navigate DOM hierarchy.' },
    { name: 'children', description: 'navigate DOM hierarchy.' },
    { name: 'closest', description: 'navigate DOM hierarchy.' },
    { name: 'within', description: 'scope DOM commands to a portion of the page.' },
  ];
  // add later
  /*
    { name: 'eq', description: 'select element at a specific index.' },
    { name: 'first', description: 'get the first element from matched set.' },
    { name: 'last', description: 'get the last element from matched set.' },
    { name: 'parent', description: 'navigate DOM hierarchy.' },
    { name: 'children', description: 'navigate DOM hierarchy.' },
    { name: 'closest', description: 'navigate DOM hierarchy.' },
    { name: 'within', description: 'scope DOM commands to a portion of the page.' },
  */
  