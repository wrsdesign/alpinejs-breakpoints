import getCurrentMediaQuery from './getCurrentMediaQuery'

const isBreakpoint = (modifiers, value) => {
  const breakpointList = window.AlpineBreakpointPluginBreakpoints || [
    'unset',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl'
  ]
  const breakpointCurrent = getCurrentMediaQuery()
  const breakpointCurrentIndex = breakpointList.indexOf(breakpointCurrent)
  const breakpointIndex = breakpointList.indexOf(value)

  if (breakpointIndex < 0) {
    console.warn(
      `Unrecognized breakpoint. Supported breakpoints are: ${breakpointList.join(
        ', '
      )}`
    )
    return false
  }

  return (
    (modifiers.includes('above') &&
      breakpointCurrentIndex >= breakpointIndex) ||
    (modifiers.includes('below') &&
      breakpointCurrentIndex <= breakpointIndex) ||
    (!modifiers.length && value === breakpointCurrent)
  )
}

export default isBreakpoint
