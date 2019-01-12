import Vue from 'vue'
import DraggableInput from '../components/DraggableInput'

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

const app = new Vue({
  el: '#app',
  data: {
    height: 1234
  },
  components: {
    DraggableInput
  }
})

// const numberInput = {
//   el: document.querySelector('#numberInput label'),
//   input: document.querySelector('#height'),
//   dragging: false,
//   value: 0,
//   oldValue: 0,
//   mouseX: 0
// }

// // Only add if dragging is true
// document.body.addEventListener('mousemove', (e) => {
//   if (numberInput.dragging) {
//     e.preventDefault()
//     numberInput.value = numberInput.input.value = numberInput.oldValue - parseInt((numberInput.mouseX - e.screenX)/8)
//     console.log(e)
//   }
// })

// numberInput.el.addEventListener('mousedown', (e) => {
//   numberInput.oldValue = numberInput.value
//   numberInput.mouseX = e.screenX
//   numberInput.dragging = true
// })

// document.body.addEventListener('mouseup', (e) => {
//   console.log(e)
//   numberInput.dragging = false
// })

// document.body.addEventListener('mouseleave', (e) => {
//   console.log(e)
//   numberInput.dragging = false
// })