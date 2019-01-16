<template lang="pug">
  .draggable-input
    label(:for="id" @mousedown="drag") {{ label }}
    input(type="number" v-model="v" :id="id" @change="$emit('hey')" @mousedown="drag")
</template>

<script>
export default {
  props: ['value', 'id', 'label'],
  data: function () {
    return {
      v: 0,
      dragging: false
    }
  },
  watch: {
    v(val) {
      this.$emit('input', val)
    }
  },
  created: function () {
    this.v = parseInt(this.value)
  },
  methods: {
    drag: function (e) {
      // console.log(e)
      let oldValue = this.v
      let oldX = e.clientX
      this.dragging = true
      document.body.classList.add('dragging')
      const changeValue = (e) => {
        if (this.dragging) {
          e.preventDefault()
          this.v = oldValue - parseInt((oldX - e.clientX)/8)
          // console.log(e)
        }
      }
      const stopDragging = (e) => {
        // console.log(e)
        this.dragging = false
        document.removeEventListener('mousemove', changeValue)
        document.removeEventListener('mouseup', stopDragging)
        document.removeEventListener('mouseleave', stopDragging)
        document.body.classList.remove('dragging')
      }
      // Only add if dragging is true
      document.addEventListener('mousemove', changeValue)
      document.addEventListener('mouseup', stopDragging)
      document.addEventListener('mouseleave', stopDragging)
    }
  }
}
</script>

<style lang="stylus">
.draggable-input
  -moz-user-select: none
  -webkit-user-select: none
  -ms-user-select: none
  user-select: none
  label
    cursor: w-resize
.dragging
  cursor: w-resize !important
</style>
