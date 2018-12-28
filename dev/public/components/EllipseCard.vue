<template lang="pug">
  .card.card--ellipse
    .container
      .row.row--title
        div
          div.icon--rect
          h1 Ellipse
        button(@click="$emit('getridofme')") Delete
      .row.row--input
        .input-field
          label(for="posX") Center X
          input(type="number" v-model="posX" id="posX" @change="$emit('hey')")
        .input-field
          label(for="posY") Center Y
          input(type="number" v-model="posY" id="posY" @change="$emit('hey')")
      .row.row--input
        .input-field
          label(for="height") Radius X
          input(type="number" v-model="height" id="height" @change="$emit('hey')")
        .input-field
          label(for="width") Radius Y
          input(type="number" v-model="width" id="width" @change="$emit('hey')")
      .row.row--input
        .input-field
          label(for="fill") Fill
          input(type="color" v-model="fill" id="fill" @change="$emit('hey')")
          input(type="text" v-model="fill" id="fill" @keyup="$emit('hey')")
      .row.row--input
        .input-field
          label(for="stroke") Stroke
          input(type="color" v-model="stroke" id="stroke" @change="$emit('hey')")
          input(type="text" v-model="stroke" id="stroke" @keyup="$emit('hey')")
      .row.row--input
        .input-field
          label(for="strokeWidth") Stroke Width
          input(type="number" v-model="strokeWidth" id="strokeWidth" @change="$emit('hey')")
</template>

<script>
export default {
  data: function () {
    return {
      posX: 2,
      posY: 2,
      height: 4,
      width: 4,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 0,
    }
  },
  computed: {
    elCode: function () {
      return `<ellipse cx="${this.posX}" cy="${this.posY}" ry="${this.width}" rx="${this.height}" fill="${this.fill}" stroke="${this.stroke}" stroke-width="${this.strokeWidth}"/>`
    }
  },
  created: function () {
    this.$emit('hey')
  },
  destroyed: function () {
    this.$emit('hey')
  }
}
</script>

