<template lang="pug">
  .card.card--rect
    header.card--header
      .head
        img(src="../images/Rect.svg")
        h2 RECT
      .buttons
        img(src="../images/Delete Card.svg" @click="$emit('getridofme')")
    .container
      .row.row--input
        .input-field
          draggable-input(id="posX" v-model="posX" label="POS X")
        .input-field
          draggable-input(id="posY" v-model="posY" label="POS Y")
      .row.row--input
        .input-field
          draggable-input(id="height" v-model="height" label="HEIGHT")
        .input-field
          draggable-input(id="width" v-model="width" label="WIDTH")
      .row.row--input
        .input-field
          .draggable-input
            label(for="fill") FILL AND STROKE
            div.color-toggle(@click="fillDialog = !fillDialog; strokeDialog = false" v-bind:style="{background: this.fill.hex}")
            div.color-toggle(@click="strokeDialog = !strokeDialog; fillDialog = false" v-bind:style="{background: this.stroke.hex}")
            draggable-input(id="strokeWidth" v-model="strokeWidth" label="STROKE WIDTH")
          chrome-picker(v-show="fillDialog" v-model="fill" @input="$emit('hey')" disable-alpha=true)
          chrome-picker(v-show="strokeDialog" v-model="stroke" @input="$emit('hey')" disable-alpha=true)
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

