interface statements {
  type: string;
}
export default function importOptionsSwitch(statements: statements[]) {
  let isReducerOn = false;
  let isMiddleWareOn = false;
  let isActionCreatorOn = false;
  let isAsyncOn = false;
  let isHooksOn = false;

  statements.forEach(({ type }) => {
    switch (type) {
      case 'reducer':
        isReducerOn = true;
        break;
      case 'middleware':
        isMiddleWareOn = true;
        break;
      case 'action-creator':
        isActionCreatorOn = true;
        break;
      case 'async':
        isAsyncOn = true;
        break;
      case 'hook-updates':
        isHooksOn = true;
        break;
      default:
        break;
    }
  });
  return {
    isReducerOn,
    isMiddleWareOn,
    isActionCreatorOn,
    isAsyncOn,
    isHooksOn,
  };
}
