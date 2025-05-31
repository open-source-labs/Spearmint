/**
 * List of event types that are used in the AutoComplete component to help with the auto complete process
 * TODO: The functionality for autocompleting eventtypes is not currently in use. Check AutoComplete Component.
 */
interface EventType {
  name: string
}

export const jestEventTypesList: Array<EventType> = [
  // Clipboard Events
  {
    name: 'copy',
  },
  {
    name: 'cut',
  },
  {
    name: 'paste',
  },
  // Composition Events
  {
    name: 'compositionEnd',
  },
  {
    name: 'compositionStart',
  },
  {
    name: 'compositionUpdate',
  },
  // Keyboard Events
  {
    name: 'keyDown',
  },
  {
    name: 'keyPress',
  },
  {
    name: 'keyUp',
  },
  // Focus Events
  {
    name: 'focus',
  },
  {
    name: 'blur',
  },
  {
    name: 'focusIn',
  },
  {
    name: 'focusOut',
  },
  // Form Events
  {
    name: 'change',
  },
  {
    name: 'input',
  },
  {
    name: 'invalid',
  },
  {
    name: 'submit',
  },
  // Mouse Events
  {
    name: 'click',
  },
  {
    name: 'contextMenu',
  },
  {
    name: 'dblClick',
  },
  {
    name: 'drag',
  },
  {
    name: 'dragEnd',
  },
  {
    name: 'dragEnter',
  },
  {
    name: 'dragExit',
  },
  {
    name: 'dragLeave',
  },
  {
    name: 'dragOver',
  },
  {
    name: 'dragStart',
  },
  {
    name: 'mouseDown',
  },
  {
    name: 'mouseEnter',
  },
  {
    name: 'mouseLeave',
  },
  {
    name: 'mouseMove',
  },
  {
    name: 'mouseOut',
  },
  {
    name: 'mouseOver',
  },
  {
    name: 'mouseUp',
  },
  // Selection Events
  {
    name: 'select',
  },
  // Touch Events
  {
    name: 'touchCancel',
  },
  {
    name: 'touchEnd',
  },
  {
    name: 'touchMove',
  },
  {
    name: 'touchStart',
  },
  // UI Events
  {
    name: 'scroll',
  },
  // Wheel Events
  {
    name: 'wheel',
  },
  // Media Events
  {
    name: 'abort',
  },
  {
    name: 'canPlay',
  },
  {
    name: 'canPlayThrough',
  },
  {
    name: 'durationChange',
  },
  {
    name: 'emptied',
  },
  {
    name: 'encrypted',
  },
  {
    name: 'ended',
  },
  {
    name: 'loadedData',
  },
  {
    name: 'loadedMetadata',
  },
  {
    name: 'loadStart',
  },
  {
    name: 'pause',
  },
  {
    name: 'play',
  },
  {
    name: 'playing',
  },
  {
    name: 'progress',
  },
  {
    name: 'rateChange',
  },
  {
    name: 'seeked',
  },
  {
    name: 'seeking',
  },
  {
    name: 'stalled',
  },
  {
    name: 'suspend',
  },
  {
    name: 'timeUpdate',
  },
  {
    name: 'volumeChange',
  },
  {
    name: 'waiting',
  },
  // Image Events
  {
    name: 'load',
  },
  {
    name: 'error',
  },
  // Animation Events
  {
    name: 'animationStart',
  },
  {
    name: 'animationEnd',
  },
  {
    name: 'animationIteration',
  },
  // Transition Events
  {
    name: 'transitionEnd',
  },
];
