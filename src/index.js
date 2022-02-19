import isBreakpoint, { getCurrentMediaQuery } from './isBreakpoint'

export default (Alpine) => {
  const data = Alpine.reactive({ currentMediaQuery: getCurrentMediaQuery() })
  let update

  const onResize = () => {
    clearTimeout(update)

    update = setTimeout(() => {
      const comingMediaQuery = getCurrentMediaQuery()
      if (comingMediaQuery !== data.currentMediaQuery) {
        data.currentMediaQuery = comingMediaQuery
      }
    }, 150)
  }

  window.addEventListener('resize', onResize, false)

  Alpine.magic('isBreakpoint', (el) => (breakpoint) => {
    return isBreakpoint(breakpoint)
  })

  Alpine.directive(
    'breakpoint',
    (
      el,
      { value, modifiers, expression },
      { evaluateLater, effect, cleanup }
    ) => {
      const evaluate = evaluateLater(expression)

      effect(() => {
        if (data.currentMediaQuery) evaluate()
      })

      cleanup(() => {
        window.removeEventListener('resize', onResize)
      })
    }
  )
}
