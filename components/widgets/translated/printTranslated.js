const MAX_HEIGHT = 14
const MARGIN_X = 8
const MARGIN_Y = 4
const LINE_MARGIN = 8
const FONT_FAMILY = '微软雅黑'
const DEFAULT_COLOR = '#333'

export default (container, canvas, translated) => {
  printTranslatedLrc(translated, MARGIN_X, MARGIN_Y, LINE_MARGIN)

  function notNeedTranslation(translatedLine) {
    return translatedLine.every((piece) => piece.tokens.every((token) => token.dst.length === 0))
  }

  function measureLine(context, translatedLine, marginX) {
    let x = 0

    translatedLine.forEach((piece) => {
      piece.tokens.forEach((token) => {
        let dstToken = token.dst
        let srcToken = token.src
        let dstWidth = context.measureText(dstToken).width
        let srcWidth = context.measureText(srcToken).width
        let maxWidth = Math.max(dstWidth, srcWidth)
        if (dstToken.length > 0) maxWidth += marginX
        x += maxWidth
      })
    })

    return x
  }

  function getLongestLine(context, translatedLrc, marginX) {
    let maxLength = 0
    let longestLine

    translatedLrc.forEach((translatedLine) => {
      let length = measureLine(context, translatedLine, marginX)

      if (length > maxLength) {
        maxLength = length
        longestLine = translatedLine
      }
    })

    return longestLine
  }

  function calMaxFontHeight(context, translatedLrc, marginX, maxHeight, maxLength) {
    let longestLine = getLongestLine(context, translatedLrc, marginX)
    if (!longestLine) return 

    let l = 1
    let r = maxHeight
    let height = 0
    let h, length

    context.font = MAX_HEIGHT + "px serif"

    while (l <= r) {
      h = Math.floor((l + r) / 2)
      context.font = `${h}px ${FONT_FAMILY}`
      length = measureLine(context, longestLine, marginX)

      if (length > maxLength) {
        r = h - 1
      } else {
        height = h
        l = h + 1
      }
    }
    return height
  }

  function printTranslatedLrc(translatedLrc, marginX, marginY, lineMargin) {
    let context = canvas.getContext('2d')

    canvas.width = $(container).width()
    let height = calMaxFontHeight(context, translatedLrc, marginX, MAX_HEIGHT, canvas.width)
    let lineHeight = height + marginY
    let canvasHeight = (lineHeight * 2 + lineMargin) * translatedLrc.length

    translatedLrc.forEach((translatedLine) => {
      if (notNeedTranslation(translatedLine)) canvasHeight -= lineHeight
    })

    canvas.width = $(container).width()
    canvas.height = canvasHeight

    let ratio = 2
    let oldWidth = canvas.width
    let oldHeight = canvas.height
    canvas.width = oldWidth * ratio
    canvas.height = oldHeight * ratio
    canvas.style.width = oldWidth + 'px'
    canvas.style.height = oldHeight + 'px'
    context.scale(ratio, ratio)

    context.textBaseline = 'bottom'
    context.font = `${height}px ${FONT_FAMILY}`
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)

    let x = 0
    let y = 0

    translatedLrc.forEach((translatedLine) => {
      x = 0

      if (notNeedTranslation(translatedLine)) {
        translatedLine.forEach((piece) => {
          piece.tokens.forEach((token) => {
            let srcToken = token.src
            let srcWidth = context.measureText(srcToken).width

            context.fillStyle = piece.color || DEFAULT_COLOR
            context.fillText(srcToken, x, y + lineHeight)
            x += srcWidth
          })
        })
        y += lineHeight
      } else {
        translatedLine.forEach((piece) => {
          piece.tokens.forEach((token) => {
            let dstToken = token.dst
            let srcToken = token.src
            let dstWidth = context.measureText(dstToken).width
            let srcWidth = context.measureText(srcToken).width
            let maxWidth = Math.max(dstWidth, srcWidth)
            let dstOffset, srcOffset

            if (dstToken.length > 0) maxWidth += marginX

            dstOffset = (maxWidth - dstWidth) / 2
            srcOffset = (maxWidth - srcWidth) / 2
            context.fillStyle = piece.color || DEFAULT_COLOR
            context.fillText(dstToken, x + dstOffset, y + lineHeight)
            context.fillText(srcToken, x + srcOffset, y + lineHeight * 2)
            x += maxWidth
          })
        })
        y += lineHeight * 2
      }

      y += lineMargin
    })
  }
}