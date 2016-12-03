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

// keys

document.addEventListener('DOMContentLoaded', () => {
  const kd = document.getElementById('key-details')
  document.getElementById('keyboard').addEventListener('mouseenter', ({ target }) => {
    if (target.tagName !== 'A') return false

    const dl = document.querySelector(`dl[data-key=${target.href.split('#')[1]}]`)
    if (!dl) return false

    kd.innerHTML = dl.innerHTML
  }, true)
})
