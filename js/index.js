/* global yarrow */

// arrows

const arrowStyles = {
  'stroke': 'gold',
  'stroke-width': 3
}
const textStyles = {
  'fill': 'gold',
  'font-weight': 'bold'
}
const ya = new yarrow.Yarrow()
const arrows = []
const anchors = ['top', 'right', 'bottom', 'left']
const s = anchors.reduce((acc, a) => {
  acc[a[0]] = ({ source }) => source[a]
  return acc
}, {})
const t = anchors.reduce((acc, a) => {
  acc[a[0]] = ({ target }) => target[a]
  return acc
}, {})
document.addEventListener('DOMContentLoaded', () => {
  arrows.forEach(arrow =>
    ya.arrow(Object.assign({ arrowStyles, textStyles }, arrow)).render())
})

