import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useToggleModal from '../components/TestMenu/testMenuHooks';

afterEach(cleanup);
test('hooks should render', () => {
  const { result } = renderHook(() => useToggleModal('redux'));
  expect(result.current.title).toBe('redux');
  expect(result.current.isModalOpen).toBe(false);
  expect(typeof result.current.openModal).toBe('function');
});

test('openModal should work', () => {
  const { result } = renderHook(() => useToggleModal('redux'));

  act(() => {
    result.current.openModal();
  });
  expect(result.current.title).toBe('New Test');
  expect(result.current.isModalOpen).toBe(true);
});

test('openScriptModal should work', () => {
  const { result } = renderHook(() => useToggleModal('redux'));

  act(() => {
    result.current.openScriptModal();
  });
  expect(result.current.title).toBe('redux');
  expect(result.current.isModalOpen).toBe(true);
});

test('closeModal should work', () => {
  const { result } = renderHook(() => useToggleModal('redux'));

  act(() => {
    result.current.closeModal();
  });
  expect(result.current.title).toBe('redux');
  expect(result.current.isModalOpen).toBe(false);
});
