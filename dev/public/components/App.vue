<template lang="pug">

  main.container
    .content
      .title
        img(src="../images/logo.svg" height="64" width="64")
        h1 Fancy Rect
      .stages
        .svg-stage(v-html="svgCode") {{ svgCode }}
        .background-stage(:style="style")
      .download
        a(:href="`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(this.svgCode)}`" download="pattern.svg") Download Pattern (SVG)
    .options
      .buttons
        button(@click="insert('RectCard')") Create New Rect
        button(@click="insert('EllipseCard')") Create New Ellipse
        button(@click="insert('LineCard')") Create New Line
        button(@click="insert('PolygonCard')") Create New Polygon
      .cards
        div
          .card.card--stage
            .container
              .row
                div.icon--stage
                h1 Stage
              .row.row--input
                .input-field
                  draggable-input(id="height" v-model="height" label="Height")
                .input-field
                  draggable-input(id="width" v-model="width" label="Weight")
              .row.row--input
                .input-field
                  draggable-input(id="stageHeight" v-model="stageHeight" label="Stage Height")
                .input-field
                  draggable-input(id="stageWidth" v-model="stageWidth" label="Stage Width")
              .row.row--input
                .input-field
                  label(for="backgroundColor") Background Color
                  div.color-toggle(@click="backgroundColorDialog = !backgroundColorDialog" v-bind:style="{background: this.backgroundColor.hex}") {{ backgroundColorDialog ? 'Hide' : 'Edit'}}
                  chrome-picker(v-show="backgroundColorDialog" v-model="backgroundColor" disable-alpha=true)
        div(v-for="(card, index) in cards" :key="card.index")
          component(:is="card.type" @hey="update" @getridofme="getrid(index)")
</template>

<script>
import { Chrome } from 'vue-color'
import RectCard from './RectCard'
import EllipseCard from './EllipseCard'
import LineCard from './LineCard'
import PolygonCard from './PolygonCard'
import DraggableInput from './DraggableInput'

export default {
  data: function () {
    return {
      height: 32,
      width: 32,
      backgroundColor: {hex: '#4834FF'},
      stageHeight: 256,
      stageWidth: 256,
      cards: [],
      childElements: '',
      id: 0,
      style: {
        'background': '#4834FF',
        'height': '256px',
        'width': '256px'
      },
      svgBackground: '',
      timeout: null,
      backgroundColorDialog: false
    }
  },
  computed: {
    svgCode: function () {
      this.updateBackground()
      return `<svg height="${this.height}" width="${this.width}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" id="svg">
      <rect height="100%" width="100%" fill="${this.backgroundColor.hex}"></rect>
      ${this.childElements}</svg>`
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
    },
    updateBackground: function () {
      window.clearTimeout(this.timeout)
      this.timeout = window.setTimeout(() => {
        let image = new Image()
        image.addEventListener('load', () => {
          this.style.height = this.stageHeight + 'px'
          this.style.width = this.stageWidth + 'px'
          this.style.background = `url('${image.src}')`
        })
        image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(this.svgCode)}`
      }, 1000/16)
    }
  },
  watch: {
    stageHeight: function () {
      this.updateBackground()
    },
    stageWidth: function () {
      this.updateBackground()
    }
  },
  components: {
    RectCard,
    EllipseCard,
    LineCard,
    PolygonCard,
    'chrome-picker': Chrome,
    DraggableInput
  }
}
</script>

<style lang="stylus">
  main.container
    height: 100%
    width: 100%
    padding-top: 2em
    display: flex
    justify-content: space-around
  .content
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column
    .title
      height: 3rem
      img
        vertical-align: middle
        margin-right: 0.5em
      h1
        display: inline-block
        vertical-align: middle
        margin: 0
        padding: 0
        font: bold 2em/1.5 "Chakra Petch", sans-serif
        color: #4834ff
    .stages
      display: flex
      align-items: center
      flex-direction: column
    .download
      height: 3rem
  .options
    .cards
      max-height: 95%
      overflow-y: auto
  input.vc-input__input, .vc-input__label
    font-family: 'Iosevka', monospace !important
  .card
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
      min-height: 32px
      .input-field
        padding-right: 1em
        .color-toggle
          display: inline-block
          padding: 0em 1em
          border: 1px solid black
          border-radius: 0.5em
          font-size: 1.5em
          font-weight: bold
          text-stroke: 1px black
          -webkit-text-stroke: 1px black
          cursor: pointer
          color: white
        label
          vertical-align: middle
        input
          font: inherit
          max-height: 2em
          max-width: 4rem
</style>

