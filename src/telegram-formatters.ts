// -- Generators

import {
  TeleInlineKeyboard,
  TeleInlineKeyboardButton,
  TeleMessageEntities,
} from './@types/telegram-types'

/**
 * Generates the Telegram parameter for Inline Keyboard Markup
 * @param buttonArr array of rows containing an array of button labels (rows, cols)
 * @param callbackArr single array of callback data matching buttonArr (for each row, for each col)
 * @returns  Parameter Object for posting Inline (callback_query) Buttons
 */
export function genInlineButtons(
  buttonArr: Array<Array<string>>,
  callbackArr: Array<string> | Array<Array<string>>,
) {
  var result = []
  var counter = 0
  for (var i = 0; i < buttonArr.length; ++i) {
    var rowArr = []
    for (var buttonLabel of buttonArr[i]) {
      if (typeof callbackArr[0] != 'string') counter = 0
      rowArr.push({
        text: buttonLabel,
        callback_data:
          typeof callbackArr[0] == 'string'
            ? callbackArr[counter]
            : callbackArr[i][counter],
      } as TeleInlineKeyboardButton)
      counter += 1
    }
    result.push(rowArr)
  }
  return { inline_keyboard: result } as TeleInlineKeyboard
}

/**
 * Generates the Telegram parameter for Inline Keyboard Markup
 * @param buttonArr array of rows containing an array of button labels (rows, cols)
 * @param callbackArr single array of callback data matching buttonArr (for each row, for each col)
 * @param urlArr single array of url links matching buttonArr (for each row, for each col)
 * @returns Telegram Parameter Object for posting Inline Url Buttons
 */
export function genInlineUrlButtons(
  buttonArr: Array<Array<string>>,
  callbackArr: Array<string> | Array<Array<string>>,
  urlArr: Array<string> | Array<Array<string>>,
) {
  var result = []
  var counterCallback = 0
  var counterUrl = 0
  var isCallback1D = typeof callbackArr[0] == 'string'
  var isUrl1D = typeof urlArr[0] == 'string'
  for (var i = 0; i < buttonArr.length; ++i) {
    var rowArr = []
    for (var buttonLabel of buttonArr[i]) {
      if (!isCallback1D) counterCallback = 0
      if (!isUrl1D) counterUrl = 0
      rowArr.push({
        text: buttonLabel,
        callback_data: isCallback1D
          ? callbackArr[counterCallback]
          : callbackArr[i][counterCallback],
        url: isUrl1D
          ? callbackArr[counterCallback]
          : callbackArr[i][counterUrl],
      } as TeleInlineKeyboardButton)
      counterCallback += 1
      counterUrl += 1
    }
    result.push(rowArr)
  }
  return { inline_keyboard: result } as TeleInlineKeyboard
}

// -- Formating Functions

/**
 * Converts Telegram's formats of the text to include HTML formatting
 * Created when I was using javascript and didn't know the below enums
 * enum: mention/hashtag/bot_command/url/email/phone_number/bold/italic/underline/strikethrough/code/pre/text_link/text_mention
 * @param textMsg text containing html markup such as <b>
 * @param formatting formatting [{0: offsetFromStart, 1: length, 2: formatType}]
 */
export function convertToHTML(
  textMsg: string,
  formatting?: TeleMessageEntities[],
) {
  if (!formatting) return textMsg
  // Converts from array of objects to array of arrays
  var sortedFormatting = [] as any
  for (format of formatting) {
    sortedFormatting.push(Object.values(format))
  }
  // https://stackoverflow.com/questions/50415200/sort-an-array-of-arrays-in-javascript
  sortedFormatting.sort(function (a: any, b: any) {
    if (a[0] == b[0]) {
      return a[1] - b[1]
    }
    return a[0] - b[0]
  })
  var reference = []
  var delimeterFront = ''
  var delimeterEnd = ''
  for (var format of sortedFormatting) {
    // Decide the delimeter
    switch (format[2]) {
      case 'bold':
        delimeterFront = '<b>'
        delimeterEnd = '</b>'
        break
      case 'italic':
        delimeterFront = '<i>'
        delimeterEnd = '</i>'
        break
      case 'underline':
        delimeterFront = '<u>'
        delimeterEnd = '</u>'
        break
      case 'code':
        delimeterFront = '<code>'
        delimeterEnd = '</code>'
        break
      case 'strikethrough':
        delimeterFront = '<s>'
        delimeterEnd = '</s>'
        break
      case 'text_link':
        delimeterFront = '<a href="' + format[3] + '">'
        delimeterEnd = '</a>'
        break
      default:
        delimeterFront = ''
        delimeterEnd = ''
    }
    var start = format[0]
    var end = format[0] + format[1] // non-inclusive

    // Amend the indexes due to past edits
    var startCopy = start
    var endCopy = end
    for (var i = 0; i < reference.length; ++i) {
      var x = reference[i]
      if (start > x[0] || (start == x[0] && x[2] == 'tail')) {
        startCopy += x[1].length
      }
      if (end > x[0] || (end == x[0] && start == reference[i - 1][0])) {
        endCopy += x[1].length
      }
    }

    // Amend the texts
    var msgCopy = textMsg
    msgCopy = textMsg.slice(0, startCopy) + delimeterFront
    msgCopy += textMsg.slice(startCopy, endCopy) + delimeterEnd
    msgCopy += textMsg.slice(endCopy)
    textMsg = msgCopy

    // Track the new edits
    reference.push([start, delimeterFront, 'head'])
    reference.push([end, delimeterEnd, 'tail'])
  }
  return textMsg
}

// helper function that prevents html/css/script malice
export const cleanseString = function (string: string): string {
  return string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function embedMetadata(metadata: string | object, text: string) {
  const isStr = typeof metadata == 'string'
  text += `<a href="tg://metadata/${
    isStr ? metadata : JSON.stringify(metadata).split('"').join('`')
  }/end">\u200b</a>`
  return text
}

export function extractMetadata<T = Record<string, any>>(text: string, formatting: TeleMessageEntities[]): T | null {
  var htmlText = convertToHTML(text, formatting)
  var res = htmlText.split('tg://metadata/')[1]
  if (!res) return null
  res = res.split('/end')[0]
  res = res.split('`').join('"')
  let obj = JSON.parse(res.split('/end')[0])
  // Telegram replaces whitespace in links to %20
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value == 'string') {
      obj[key] = value.replace(/%20/g, ' ')
    } else if (typeof value == 'object') {
      if (Array.isArray(value))
        obj[key] = value.map((elem) =>
          typeof elem == 'string' ? elem.replace(/%20/g, ' ') : elem,
        )
    }
  })
  return obj as T
}
