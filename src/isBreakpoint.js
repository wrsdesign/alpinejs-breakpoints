let getCurrentMediaQuery = () => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint')
    .trim()
    .replace(/['"]+/g, '')
}

let isBreakpoint = (breakpoint) => {
  if (!breakpoint) return false

  const pattern = new RegExp('\\+$|\\-$')
  const breakpointsList = window.AlpineBreakpointPluginBreakpointsList || [
    'unset',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl'
  ]
  const breakpointCurrent = getCurrentMediaQuery()
  const breakpointCurrentIndex = breakpointsList.indexOf(breakpointCurrent)
  const hasModifier = pattern.exec(breakpoint)
  const modifier = hasModifier ? hasModifier[0] : false
  const breakpointName = hasModifier ? breakpoint.slice(0, -1) : breakpoint
  const breakpointIndex = breakpointsList.indexOf(breakpointName)

  if (breakpointIndex < 0) return false

  if (
    (modifier === '+' && breakpointCurrentIndex >= breakpointIndex) ||
    (modifier === '-' && breakpointCurrentIndex <= breakpointIndex) ||
    (!modifier && breakpoint === breakpointCurrent)
  )
    return true

  return false
}

export { isBreakpoint as default, getCurrentMediaQuery }
