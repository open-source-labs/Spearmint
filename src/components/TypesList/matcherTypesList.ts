/**
 * List of event types that are used in the AutoComplete component to help with the auto complete process
 * This list is imported in the AutoComplete functionality for assertion matcher autocomplete.
 */
interface MatcherType {
  name: string
}

// used for assertion auto complete of matchers

export const matcherTypesList: Array<MatcherType> = [
  {
    name: 'toHaveTextContent',
  },
  {
    name: 'toBeInTheDocument',
  },
  {
    name: 'toContainHTML',
  },
  {
    name: 'toContainElement',
  },
  {
    name: 'toHaveAttribute',
  },
  {
    name: 'toHaveClass',
  },
  {
    name: 'toHaveStyle',
  },
  {
    name: 'toBeDisabled',
  },
  {
    name: 'toBeEnabled',
  },
  {
    name: 'toBeEmpty',
  },
  {
    name: 'toBeInvalid',
  },
  {
    name: 'toBeRequired',
  },
  {
    name: 'toBeValid',
  },
  {
    name: 'toBeVisible',
  },
  {
    name: 'toHaveFocus',
  },
  {
    name: 'toHaveFormValues',
  },
  {
    name: 'toBe',
  },
  {
    name: 'toHaveBeenCalled',
  },
  {
    name: 'toHaveBeenCalledTimes',
  },
  {
    name: 'toHaveBeenCalledWith',
  },
  {
    name: 'toHaveBeenLastCalledWith',
  },
  {
    name: 'toHaveNthCalledWith',
  },
  {
    name: 'toHaveReturned',
  },
  {
    name: 'toHaveReturnedTimes',
  },
  {
    name: 'toHaveReturnedWith',
  },
  {
    name: 'toHaveLastReturnedWith',
  },
  {
    name: 'toHaveNthReturnedWith',
  },
  {
    name: 'toHaveLength',
  },
  {
    name: 'toHaveProperty',
  },
  {
    name: 'toBeCloseTo',
  },
  {
    name: 'toBeDefined',
  },
  {
    name: 'toBeFalsy',
  },
  {
    name: 'toBeGreaterThan',
  },
  {
    name: 'toBeGreaterThanOrEqual',
  },
  {
    name: 'toBeLessThanOrEqual',
  },
  {
    name: 'toBeLessThan',
  },
  {
    name: 'toBeInstanceOf',
  },
  {
    name: 'toBeNull',
  },
  {
    name: 'toBeTruthy',
  },
  {
    name: 'toBeUndefined',
  },
  {
    name: 'toBeNaN',
  },
  {
    name: 'toContain',
  },
  {
    name: 'toContainEqual',
  },
  {
    name: 'toEqual',
  },
  {
    name: 'toMatch',
  },
  {
    name: 'toMatchObject',
  },
  {
    name: 'toMatchSnapshot',
  },
  {
    name: 'toMatchInLineSnapshot',
  },
  {
    name: 'toStrictEqual',
  },
  {
    name: 'toThrow',
  },
  {
    name: 'toThrowErrorMatchingSnapshot',
  },
  {
    name: 'toThrowErrorMatchingInLineSnapshot',
  },
];
