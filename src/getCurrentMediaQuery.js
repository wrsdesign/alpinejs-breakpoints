const getCurrentMediaQuery = () => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint')
    .trim()
    .replace(/['"]+/g, '')
}

export default getCurrentMediaQuery
