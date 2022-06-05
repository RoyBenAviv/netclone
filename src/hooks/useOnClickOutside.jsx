import { useEffect } from "react";

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      const targetEl = ref.current
      if (targetEl) {
        const clickedX = event.clientX
        const clickedY = event.clientY
        const rect = targetEl.getBoundingClientRect()
        const targetElTop = rect.top
        const targetElBottom = rect.top + rect.height
        const targetElLeft = rect.left
        const targetElRight = rect.left + rect.width

        if (
          // check X Coordinate
          targetElLeft < clickedX &&
          clickedX < targetElRight &&
          // check Y Coordinate
          targetElTop < clickedY &&
          clickedY < targetElBottom
        ) {
          return
        }

        // trigger event when the clickedX,Y is outside of the targetEl
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside;