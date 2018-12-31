<template lang="pug">
  .card.card--rect
    .container
      .row.row--title
        div
          div.icon--line
          h1 Line
        button(@click="addPoint") Add Point
        button(@click="$emit('getridofme')") Delete
      .row.row--input(v-for="(point, index) in points" :key="index")
        label(for="point[0]") X
        input(type="number" v-model="point[0]" id="point[0]" @change="$emit('hey')")
        label(for="point[1]") Y
        input(type="number" v-model="point[1]" id="point[1]" @change="$emit('hey')")
        button(@click="removePoint(index)") Remove
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
          label(for="strokeLineCap") Line Cap
          select(v-model="strokeLineCap" id="strokeLineCap" @change="$emit('hey')")
            option round
            option square
            option butt
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  data: function () {
    return {
      points: [[2, 2], [14, 14]],
      fill: {hex: '#ffffff'},
      fillDialog: false,
      stroke: {hex: '#000000'},
      strokeDialog: false,
      strokeWidth: 4,
      strokeLineCap: 'round'
    }
  },
  computed: {
    elCode: function () {
      return `<polyline points="${this.points.reduce((str, value) => {return str + value[0] + ',' + value[1] + ' '}, '')}" fill="${this.fill.hex}" stroke="${this.stroke.hex}" stroke-width="${this.strokeWidth}" stroke-linecap="${this.strokeLineCap}"/>`
    }
  },
  methods: {
    addPoint: function () {
      this.points.push([14, 2])
      this.$emit('hey')
    },
    removePoint: function (index) {
      this.points.splice(index, 1)
      this.$emit('hey')
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

