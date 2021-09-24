import Breakpoint from '../src/index'

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(Breakpoint)
})
