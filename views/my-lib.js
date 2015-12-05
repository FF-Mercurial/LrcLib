$.prototype.preventParentScroll = () => {
  return $(this).on('wheel', (e) => {
    var delta = e.originalEvent.deltaY
    this.scrollTop += delta
    e.preventDefault()
    e.stopPropagation()
  })
}

Vue.config.debug = true