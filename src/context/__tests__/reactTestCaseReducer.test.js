import { reactTestCaseReducer, reactTestCaseState } from '../reducers/reactTestCaseReducer';
import actionTypes from '../actions/reactTestCaseActions';
import ItRenderer from '../../components/ItRenderer/ItRenderer';

describe('React Test Case Reducer', () => {
  it('should return the initial state', () => {
    expect(reactTestCaseReducer([], undefined).toEqual(reactTestCaseState));
  });
});
