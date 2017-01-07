/* global yarrow */

// helpers
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

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

const keyboard = {
  ctrl: false
}

const relatedKeys = [
  ['h', 'j', 'k', 'l'],
  ['H', 'L', 'M'],
  ['m', "'", '`'],
  ['b', 'e', 'w'],
  ['B', 'E', 'W'],
  ['t', 'f', 'T', 'F', ';', ','],
  ['a', 'c', 'i', 'o', 's', 'A', 'C', 'I', 'O', 'S'],
  ['c', 'd', 'x', 'C', 'D', 'X'],
  ['p', 'y', 'P', 'Y', '"'],
  ['q', '@']
]

const relatedKeysCtrl = [
  ['b', 'u', 'y'],
  ['d', 'e', 'f'],
  ['a', 'x'],
  ['i', 'o'],
  ['j', 'n', 'p'],
  ['q', 'v']
]

function toggleKeyboardCtrl (force) {
  keyboard.ctrl = force === true || force === false
    ? force : !keyboard.ctrl
  $('#keyboard').classList.toggle('ctrl', keyboard.ctrl)
}

document.addEventListener('DOMContentLoaded', () => {
  // selectors and more hints in page
  const kd = $('#key-details')
  const links = [...$$('#keyboard a')]
  const keys = [].concat(...$$('.letter > *'), ...$$('.symbol > *'), ...$$('.number > *'))
  for (let kbd of $$('dl kbd')) {
    kbd.dataset.key = kbd.textContent
  }

  // fill key-details with right info / colors
  $('#keyboard').addEventListener('mouseenter', ({ target }) => {
    if (target.tagName !== 'A') return false

    // clean
    links.forEach(l => l.classList.remove('related'))

    const key = target.textContent.trim()
    const set = (keyboard.ctrl ? relatedKeysCtrl : relatedKeys).find(set => set.includes(key))
    if (set) {
      links.forEach(l => {
        if (set.includes(l.textContent.trim())) l.classList.add('related')
      })
    }

    const dl = $(`dl[data-key=${target.href.split('#')[1]}]`)
    if (!dl) return false

    kd.innerHTML = dl.innerHTML

    const dataKey = keyboard.ctrl ? `CTRL-${key.toLowerCase()}` : key
    const kbd = kd.querySelector(`kbd[data-key="${dataKey}"]`)
    if (kbd) kbd.style.backgroundColor = 'gold'
  }, true)

  // ctrl keys toggling
  for (let ctrl of $$('#keyboard .ctrl')) {
    ctrl.addEventListener('click', toggleKeyboardCtrl)
  }

  $('.keyboard-filters select').addEventListener('change', ({ target }) => {
    toggleKeyboardCtrl(target.value.startsWith('ctrl'))
    keys.forEach(key => {
      key.style.visibility = target.value === 'all' || key.classList.contains(target.value)
        ? 'visible'
        : 'hidden'
    })
  })
})

// nav between sections

document.addEventListener('DOMContentLoaded', () => {
  const h2s = [...$$('h2')]
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
