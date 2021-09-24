import isBreakpoint from './isBreakpoint'
import getCurrentMediaQuery from './getCurrentMediaQuery'

export default (Alpine) => {
  Alpine.directive(
    'breakpoint',
    (el, { value, modifiers, expression }, { evaluateLater, cleanup }) => {
      let evaluate = evaluateLater(expression)

      const checkBreakpoint = () => {
        if (isBreakpoint(modifiers, value)) evaluate()
      }

      document.addEventListener('breakpoint:changed', checkBreakpoint)
      checkBreakpoint()

      cleanup(() => {
        document.removeEventListener('breakpoint:changed', checkBreakpoint)
      })
    }
  )
}
;(() => {
  let currentMediaQuery = getCurrentMediaQuery()
  let rafid

  const handleResize = () => {
    if (rafid) window.cancelAnimationFrame(rafid)

    rafid = window.requestAnimationFrame(() => {
      const comingMediaQuery = getCurrentMediaQuery()

      if (comingMediaQuery !== currentMediaQuery) {
        document.dispatchEvent(new CustomEvent('breakpoint:changed'))
        currentMediaQuery = comingMediaQuery
      }
    })
  }

  window.addEventListener('resize', handleResize)
})()
