<template lang="pug">
  .card.card--polygon
    header.card--header
      .head
        img(src="../images/Polygon.svg")
        h2 POLYGON
      .buttons
        img(src="../images/Delete Card.svg" @click="$emit('getridofme')")
    .container
      .row.row--points
        h3 POINTS
        a(@click="addPoint")
          .button
            span.add-text ADD POINT
            img(src="../images/Add Icon.svg").add-icon
      .row.row--input(v-for="(point, index) in points" :key="point")
        .input-field
          draggable-input(id="point[0]" v-model="point[0]" label="POS X")
        .input-field
          draggable-input(id="point[1]" v-model="point[1]" label="POS Y")
        img(src="../images/Delete Black.svg" @click="removePoint(index)")
      .row.row--input
        .input-field
          .draggable-input
            label(for="fill") FILL AND STROKE
            div.color-toggle(@click="fillDialog = !fillDialog; strokeDialog = false" v-bind:style="{background: this.fill.hex}")
            div.color-toggle(@click="strokeDialog = !strokeDialog; fillDialog = false" v-bind:style="{background: this.stroke.hex}")
            draggable-input(id="strokeWidth" v-model="strokeWidth" label="STROKE WIDTH")
          chrome-picker(v-show="fillDialog" v-model="fill" @input="$emit('hey')" disable-alpha=true)
          chrome-picker(v-show="strokeDialog" v-model="stroke" @input="$emit('hey')" disable-alpha=true)
      .row.row--input
        .input-field
          .draggable-input
            label(for="strokeLineCap") STROKE CAP
            select(v-model="strokeLineCap" id="strokeLineCap" @change="$emit('hey')")
              option round
              option square
              option butt
</template>

<script>
import { Chrome } from 'vue-color'
import DraggableInput from './DraggableInput'

export default {
  data: function () {
    return {
      points: [[2, 2], [2, 14], [14, 14]],
      fill: {hex: '#ffffff'},
      fillDialog: false,
      stroke: {hex: '#000000'},
      strokeDialog: false,
      strokeWidth: 2,
      strokeLineCap: 'round'
    }
  },
  computed: {
    elCode: function () {
      return `<polygon points="${this.points.reduce((str, value) => {return str + value[0] + ',' + value[1] + ' '}, '')}" fill="${this.fill.hex}" stroke="${this.stroke.hex}" stroke-width="${this.strokeWidth}" stroke-linecap="${this.strokeLineCap}"/>`
    }
  },
  methods: {
    addPoint: function () {
      this.points.push([14, 2])
      this.$emit('hey')
    },
    removePoint: function (index) {
      this.$delete(this.points, index)
      this.$emit('hey')
    }
  },
  created: function () {
    this.$emit('hey')
  },
  destroyed: function () {
    this.$emit('hey')
  },
  watch: {
    points: function () {
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

