<template lang="pug">
  .card.card--rect
    .container
      .row.row--title
        div
          div.icon--rect
          h1 Rect
        button(@click="$emit('moveup')") Up
        button(@click="$emit('movedown')") Down
        button(@click="$emit('getridofme')") Delete
      .row.row--input
        .input-field
          draggable-input(id="posX" v-model="posX" label="X")
        .input-field
          draggable-input(id="posY" v-model="posY" label="Y")
      .row.row--input
        .input-field
          draggable-input(id="height" v-model="height" label="Height")
        .input-field
          draggable-input(id="width" v-model="width" label="Width")
      .row.row--input
        .input-field
          label(for="fill") Fill
          div.color-toggle(@click="fillDialog = !fillDialog" v-bind:style="{background: this.fill.hex}") {{ fillDialog ? 'Hide' : 'Edit'}}
          chrome-picker(v-show="fillDialog" v-model="fill" @input="$emit('hey')" disable-alpha=true)
          label(for="stroke") Stroke
          div.color-toggle(@click="strokeDialog = !strokeDialog" v-bind:style="{background: this.stroke.hex}") {{ strokeDialog ? 'Hide' : 'Edit'}}
          chrome-picker(v-show="strokeDialog" v-model="stroke" @input="$emit('hey')" disable-alpha=true)
      .row.row--input
        .input-field
          draggable-input(id="strokeWidth" v-model="strokeWidth" label="Stroke Width")
</template>

<script>
import DraggableInput from './DraggableInput'
import { Chrome } from 'vue-color'

export default {
  data: function () {
    return {
      posX: 2,
      posY: 2,
      height: 4,
      width: 4,
      fill: {hex: '#ffffff'},
      fillDialog: false,
      stroke: {hex: '#000000'},
      strokeDialog: false,
      strokeWidth: 0,
    }
  },
  computed: {
    elCode: function () {
      return `<rect x="${this.posX}" y="${this.posY}" width="${this.width}" height="${this.height}" fill="${this.fill.hex}" stroke="${this.stroke.hex}" stroke-width="${this.strokeWidth}"/>`
    }
  },
  created: function () {
    this.$emit('hey')
  },
  destroyed: function () {
    this.$emit('hey')
  },
  watch: {
    posX: function () {
      this.$emit('hey')
    },
    posY: function () {
      this.$emit('hey')
    },
    height: function () {
      this.$emit('hey')
    },
    width: function () {
      this.$emit('hey')
    },
    strokeWidth: function () {
      this.$emit('hey')
    }
  },
  components: {
    'chrome-picker': Chrome,
    DraggableInput
  }
}
</script>

