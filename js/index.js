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

const relatedKeys = [
  ['h', 'j', 'k', 'l'],
  ['H', 'L', 'M'],
  ['m', "'", '`'],
  ['b', 'e', 'w'],
  ['B', 'E', 'W'],
  ['t', 'f', 'T', 'F', ';', ','],
]

document.addEventListener('DOMContentLoaded', () => {
  const kd = document.getElementById('key-details')
  const links = [...document.querySelectorAll('#keyboard a')]

  for (let kbd of document.querySelectorAll('dl kbd')) {
    kbd.dataset.key = kbd.textContent
  }

  document.getElementById('keyboard').addEventListener('mouseenter', ({ target }) => {
    if (target.tagName !== 'A') return false

    // clean
    links.forEach(l => l.classList.remove('related'))

    const key = target.textContent.trim()
    const set = relatedKeys.find(set => set.includes(key))
    if (set) {
      links.forEach(l => {
        if (set.includes(l.textContent.trim())) l.classList.add('related')
      })
    }

    const dl = document.querySelector(`dl[data-key=${target.href.split('#')[1]}]`)
    if (!dl) return false

    kd.innerHTML = dl.innerHTML

    const kbd = kd.querySelector(`kbd[data-key="${key}"]`)
    if (kbd) kbd.style.backgroundColor = 'gold'
  }, true)
})

// nav between sections

document.addEventListener('DOMContentLoaded', () => {
  const h2s = [...document.querySelectorAll('h2')]
  h2s.forEach(h2 => {
    const span = document.createElement('span')
    span.textContent = h2.textContent
    h2.innerHTML = ''
    h2.appendChild(span)

    const a = document.createElement('a')
    a.textContent = 'top ↑'
    a.href = "#body-top"
    h2.appendChild(a)
  })
})
