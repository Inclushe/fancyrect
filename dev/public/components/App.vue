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
        div
          <img src="../images/Download Icon.svg"/>
          a(:href="`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(this.svgCode)}`" download="pattern.svg") Download Pattern
        div
          img(src="../images/Inclushe Logo.svg")
          span Made by <a href="https://inclushe.com">Inclushe</a>
        div <a href="https://github.com/xiaokaike/vue-color">vue-color</a> made by xiaokaike
    .options
      .buttons
        a(@click="insert('RectCard')")
          .add-button 
            div.icon-div
              img(src="../images/Rect.svg").shape-icon
              img(src="../images/Add Icon.svg").add-icon
            span.add-text ADD RECT
        a(@click="insert('EllipseCard')")
          .add-button 
            div.icon-div
              img(src="../images/Ellipse.svg").shape-icon
              img(src="../images/Add Icon.svg").add-icon
            span.add-text ADD ELLIPSE
        a(@click="insert('LineCard')")
          .add-button 
            div.icon-div
              img(src="../images/Line.svg").shape-icon
              img(src="../images/Add Icon.svg").add-icon
            span.add-text ADD LINE
        a(@click="insert('PolygonCard')")
          .add-button
            div.icon-div
              img(src="../images/Polygon.svg").shape-icon
              img(src="../images/Add Icon.svg").add-icon
            span.add-text ADD POLYGON
      .cards
        div
          .card.card--stage
            header.card--header
              .head
                h2 STAGE
              .buttons
            .container
              .row.row--input
                .input-field
                  draggable-input(id="height" v-model="height" label="HEIGHT")
                .input-field
                  draggable-input(id="width" v-model="width" label="WIDTH")
              .row.row--input
                .input-field
                  draggable-input(id="stageHeight" v-model="stageHeight" label="STAGE HEIGHT")
                .input-field
                  draggable-input(id="stageWidth" v-model="stageWidth" label="STAGE WIDTH")
              .row.row--input
                .input-field
                  .draggable-input
                    label(for="backgroundColor").long-label BACKGROUND
                    .color-toggle(@click="backgroundColorDialog = !backgroundColorDialog" v-bind:style="{background: this.backgroundColor.hex}")
                    span.faded Click to change colors.
                  chrome-picker(v-show="backgroundColorDialog" v-model="backgroundColor" disable-alpha=true)
              .row--input
                p.faded Drag on inputs to change their values.
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
      this.childElements = this.$children.reduce((str, child) => {
        return (child.elCode !== undefined ? str + child.elCode : str)
      }, '')
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
    // moveup: function (index) {
    //   console.log("moveup: ", index)
    //   if ((index) - 1 >= 0) {
    //     // Change index first or give up
    //     console.log('uh', this.cards[index].index)
    //     let movingCard = this.cards[index]
    //     this.cards[index] = this.cards[index - 1]
    //     this.cards[index - 1] = movingCard

    //     let tempIndex = this.cards[index].index
    //     this.cards[index].index = this.cards[index - 1].index
    //     this.cards[index - 1].index = tempIndex
    //   }
    // },
    // movedown: function (index) {
    //   console.log("movedown: ", index)
    //   if ((index) + 1 < this.cards.length) {
    //     console.log('uh', this.cards[index].index)
    //     let movingCard = this.cards[index]
    //     this.cards[index] = this.cards[index + 1]
    //     this.cards[index + 1] = movingCard

    //     let tempIndex = this.cards[index].index
    //     this.cards[index].index = this.cards[index + 1].index
    //     this.cards[index + 1].index = tempIndex
    //   }
    // }
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
    max-width: 64em
    margin: 0 auto
    padding-top: 2em
    display: flex
    justify-content: space-around
  .faded
    margin: 0
    padding: 0
    color: #7D7A99
  .content
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column
    .title
      height: 3rem
      img
        vertical-align: middle
        margin-right: 1.5em
      h1
        display: inline-block
        vertical-align: middle
        margin: 0
        padding: 0
        font: 300 3em/1.5 "Roboto Condensed", sans-serif
        color: #4834ff
    .stages
      display: flex
      align-items: center
      flex-direction: column
    .download
      height: 10rem
      color: #7D7A99
      text-align: center
      div
        padding-bottom: 0.5em
      img
        vertical-align: middle
        margin-right: 0.5em
  .options
    .buttons
      display: flex
      justify-content: space-between
      div.add-button
        height: 2em
        width: 5em
        padding: 0.5em
        background: linear-gradient(180deg, #130E40 0%, #1E1766 100%)
        border-radius: 0.25em
        cursor: pointer
        .icon-div
          display: flex
          justify-content: space-between
        img
          display: block
          margin: 0
          padding: 0
        span.add-text
          margin-top: 0.5rem
          display: block
          font-weight: bold
          line-height: 11px
          font-size: 12px
          letter-spacing: 0.05em
          color: white
        &:hover
          background: lighten(#1E1766, 25%)
        &:active
          background: lighten(#1E1766, 75%)
    .cards
      max-height: 95%
      padding: 0 1em
      overflow-y: auto
  input.vc-input__input, .vc-input__label
    font-family: 'Iosevka Web', monospace !important
  .card
    background: white
    width: 27em
    border-radius: 0.25em
    margin-top: 1em
    header.card--header
      background: #1E1766
      height: 2em
      padding: 0 1em
      border-radius: 0.25em 0.25em 0 0
      display: flex
      justify-content: space-between
      .head
        display: inherit
        h2
          margin: 0
          padding: 0
          font-size: 1em
          font-weight: bold
          letter-spacing: 0.05em
          line-height: 2em
          color: white
          text-align: left
        img
          margin-right: 0.5em
      .buttons
        img
          margin-left: 0.5em
          cursor: pointer
    .container
      padding: 0 1em 1em
    .row--points
      margin-top: 1em
      display: flex
      justify-content: space-between
      flex-direction: row
      h3
        margin: 0
        padding: 0
        font-size: 1em
        font-weight: bold
        letter-spacing: 0.05em
        line-height: 2em
        color: black
        text-align: left
      .button
        display: flex
        justify-content: space-between
        height: 2em
        background: linear-gradient(180deg, #130E40 0%, #1E1766 100%)
        border-radius: 4px
        cursor: pointer
        padding: 0 1em
        img
          display: block
          margin: 0
          padding: 0
        span.add-text
          display: block
          font-weight: bold
          line-height: 2rem
          font-size: 12px
          margin-right: 1em
          letter-spacing: 0.05em
          color: white
    .row--input
      margin-top: 1em
      display: flex
      justify-content: flex-start
      flex-direction: row
      .delete-line
        cursor: pointer
      .input-field
        .draggable-input
          display: flex
          justify-content: flex-start
          flex-direction: row
          align-items: center
          margin-right: 2em
          .color-toggle
            display: inline-block
            height: 2em
            width: 2em
            border: 4px solid #130E40
            cursor: pointer
            box-sizing: border-box
            margin-right: 1.5em
            border-radius: 0.25em
          label
            // vertical-align: middle
            // height: 2em
            width: 4em
            line-height: 0.875em
            margin-right: 0.5em
          label.long-label
            width: 6em
          input, select
            box-sizing: border-box
            font: 1em 'Iosevka Web', monospace
            height: 2em
            width: 5em
            padding-left: 0.5em
            border: 2px solid #1E1766
            border-radius: 0.25em
            background: #e
</style>

