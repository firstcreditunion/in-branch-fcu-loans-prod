import { varTranEnter, varTranExit } from './transition'

// ----------------------------------------------------------------------

export const varBounce = (props) => {
  const durationIn = props?.durationIn
  const durationOut = props?.durationOut
  const easeIn = props?.easeIn
  const easeOut = props?.easeOut
  const inY = props?.inY
  const delay = props.delay ? props.delay : 0

  return {
    // IN
    in: {
      initial: {},
      animate: {
        scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
        opacity: [0, 1, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        scale: [0.9, 1.1, 0.3],
        opacity: [1, 1, 0],
      },
    },
    inUp: {
      initial: {},
      animate: {
        y: [720, -24, 12, -1, 0],
        scaleY: [4, 0.9, 0.95, 0.985, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: { ...varTranEnter({ durationIn, easeIn, delay }) },
      },
      exit: {
        y: [12, -24, 720],
        scaleY: [0.985, 0.9, 3],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut, delay }),
      },
    },
    inDown: {
      initial: {},
      animate: {
        delay: 1.0,
        y: [inY ? -inY : -720, 24, -12, 4, 0],
        scaleY: [1, 0.9, 0.95, 0.985, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: {
        y: [-12, 24, inY ? -inY : -720],
        scaleY: [0.985, 0.9, 1],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut, delay }),
      },
    },
    inLeft: {
      initial: {},
      animate: {
        x: [-720, 24, -12, 4, 0],
        scaleX: [3, 1, 0.98, 0.995, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: {
        x: [0, 24, -720],
        scaleX: [1, 0.9, 2],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut, delay }),
      },
    },
    inRight: {
      initial: {},
      animate: {
        x: [720, -24, 12, -4, 0],
        scaleX: [3, 1, 0.98, 0.995, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: {
        x: [0, -24, 720],
        scaleX: [1, 0.9, 2],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut, delay }),
      },
    },

    // OUT
    out: {
      animate: { scale: [0.9, 1.1, 0.3], opacity: [1, 1, 0] },
    },
    outUp: {
      animate: { y: [-12, 24, inY ? -inY : -720], scaleY: [0.985, 0.9, 3], opacity: [1, 1, 0] },
    },
    outDown: {
      animate: { y: [12, -24, 720], scaleY: [0.985, 0.9, 3], opacity: [1, 1, 0] },
    },
    outLeft: {
      animate: { x: [0, 24, -720], scaleX: [1, 0.9, 2], opacity: [1, 1, 0] },
    },
    outRight: {
      animate: { x: [0, -24, 720], scaleX: [1, 0.9, 2], opacity: [1, 1, 0] },
    },
  }
}
