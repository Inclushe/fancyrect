if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

const svg = document.querySelector('svg#svg')
const bg = document.querySelector('#svgBackground')
bg.setAttribute('style', `background: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.outerHTML)}')`)
console.log(svg.innerHTML)
