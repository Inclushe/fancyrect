<template lang="pug">
  .card.card--ellipse
    header.card--header
      .head
        img(src="../images/Ellipse.svg")
        h2 ELLIPSE
      .buttons
        img(src="../images/Delete Card.svg" @click="$emit('getridofme')")
    .container
      .row.row--input
        .input-field
          draggable-input(id="posX" v-model="posX" label="CENTER X") 
        .input-field
          draggable-input(id="posY" v-model="posY" label="CENTER Y") 
      .row.row--input
        .input-field
          draggable-input(id="height" v-model="height" label="RADIUS X") 
        .input-field
          draggable-input(id="width" v-model="width" label="RADIUS Y") 
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
import { Chrome } from 'vue-color'
import DraggableInput from './DraggableInput'

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
      return `<ellipse cx="${this.posX}" cy="${this.posY}" ry="${this.width}" rx="${this.height}" fill="${this.fill.hex}" stroke="${this.stroke.hex}" stroke-width="${this.strokeWidth}"/>`
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

