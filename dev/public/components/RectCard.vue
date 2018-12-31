<template lang="pug">
  .card.card--rect
    .container
      .row.row--title
        div
          div.icon--rect
          h1 Rect
        button(@click="$emit('getridofme')") Delete
      .row.row--input
        .input-field
          label(for="posX") X
          input(type="number" v-model="posX" id="posX" @change="$emit('hey')")
        .input-field
          label(for="posY") Y
          input(type="number" v-model="posY" id="posY" @change="$emit('hey')")
      .row.row--input
        .input-field
          label(for="height") Height
          input(type="number" v-model="height" id="height" @change="$emit('hey')")
        .input-field
          label(for="width") Width
          input(type="number" v-model="width" id="width" @change="$emit('hey')")
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
          label(for="strokeWidth") Stroke Width
          input(type="number" v-model="strokeWidth" id="strokeWidth" @change="$emit('hey')")
</template>

<script>
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
      return `<rect x="${this.posX}" y="${this.posY}" width="${this.width}" height="${this.height}" fill="${this.fill.hex}" stroke="${this.stroke}" stroke-width="${this.strokeWidth}"/>`
    }
  },
  created: function () {
    this.$emit('hey')
  },
  destroyed: function () {
    this.$emit('hey')
  },
  components: {
    'chrome-picker': Chrome
  }
}
</script>

