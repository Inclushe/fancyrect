<template lang="pug">
  //- .container
  .row
    .col.stages
      .svg-stage(v-html="svgCode") {{ svgCode }}
      .background-stage(v-bind:style="{ background: `url('${svgBackground}')`, height: stageHeight + 'px', width: stageWidth + 'px' }")
    .col
      .buttons
        button(@click="insert('RectCard')") Create New Rect
      .cards
        div
          .card.card--stage
            .container
              .row
                div.icon--stage
                h1 Stage
              .row.row--input
                .input-field
                  label(for="height") Height
                  input(type="number" v-model="height" id="height")
                .input-field
                  label(for="width") Width
                  input(type="number" v-model="width" id="width")
              .row.row--input
                .input-field
                  label(for="stageHeight") Stage Height
                  input(type="number" v-model="stageHeight" id="stageHeight")
                .input-field
                  label(for="stageWidth") Stage Width
                  input(type="number" v-model="stageWidth" id="stageWidth")
              .row.row--input
                .input-field
                  label(for="backgroundColor") Background Color
                  input(type="color" v-model="backgroundColor" id="backgroundColor")
        div(v-for="(card, index) in cards" :key="card.index")
          component(:is="card.type" @hey="update" @getridofme="getrid(index)")
</template>

<script>
import RectCard from './RectCard'

export default {
  data: function () {
    return {
      height: 16,
      width: 16,
      backgroundColor: '#4834FF',
      stageHeight: 256,
      stageWidth: 256,
      cards: [],
      childElements: '',
      id: 0
    }
  },
  computed: {
    svgCode: function () {
      return `<svg height="${this.height}" width="${this.width}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg">
      <rect height="100%" width="100%" fill="${this.backgroundColor}"></rect>
      ${this.childElements}</svg>`
    },
    svgBackground: function () {
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(this.svgCode)}`
    }
  },
  methods: {
    insert: function (element) {
      this.cards.push({index: this.id++, type: element})
    },
    update: function () {
      this.childElements = this.$children.reduce((str, child) => {return str + child.elCode}, '')
    },
    getrid: function (index) {
      // console.log(index)
      this.cards
        .splice(index, 1)
        .map((view, index) => view.index = index)
    }
  },
  components: {
    RectCard
  },
  mounted() {
    for (let v in this._data) {
      if (localStorage[v]) {
        if (v == 'cards') {
          this.cards = JSON.parse(localStorage.cards)
        } else {
          this[v] = localStorage[v]
        }
      }
    }
  },
  watch: {
    height: function (newVal) {localStorage.height = newVal},
    width: function (newVal) {localStorage.width = newVal},
    backgroundColor: function (newVal) {localStorage.backgroundColor = newVal},
    stageHeight: function (newVal) {localStorage.stageHeight = newVal},
    stageWidth: function (newVal) {localStorage.stageWidth = newVal},
    cards: function (newVal) {localStorage.cards = JSON.stringify(newVal)},
    childElements: function (newVal) {localStorage.childElements = newVal},
    id: function (newVal) {localStorage.id = newVal}
  }
}
</script>

<style lang="stylus">
  .stages
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: column
  .card
    font: 1em/1.5 'Iosevka', monospace
    background: white
    border: 2px solid black
    border-radius: 0.5em
    margin: 0.5em
    padding: 0.5em 1em
    .row--title
      display: flex
      justify-content: space-between
    h1
      text-align: left
      margin: 0
      padding: 0
    .row--input
      min-height: 50px
      .input-field
        padding-right: 1em
        label
          vertical-align: middle
        input
          font: inherit
          max-height: 2em
          max-width: 5em
</style>

