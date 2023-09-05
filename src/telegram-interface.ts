import axios from 'axios'
import type {
  TeleResponse,
  TeleInlineKeyboard,
  TeleMessageEntities,
  TeleBotCommand,
  TeleBotCommandScope,
  ParseMode,
  TelePostOptions,
  TeleReplyMarkup,
  TeleIdType,
  TeleLogger,
  TeleInvoice,
  TelePrice,
  TeleShippingOption,
} from './@types/telegram-types'
import { convertError } from './@types/telegram-types'
import {
  genInlineButtons,
  genInlineUrlButtons,
  convertToHTML,
  embedMetadata,
  extractMetadata,
} from './telegram-formatters'

const TELE_API = 'https://api.telegram.org/bot'
export let LOGGER =
  process.env.TELE_LOGGER != undefined
    ? (process.env.TELE_LOGGER as TeleLogger)
    : 'ERRORS'

// Class-based Interface
export class Telegram {
  constructor(public bot_key: string, public parse_mode: ParseMode = 'HTML') {}

  async sendMessage(chat_id: TeleIdType, text: string): Promise<TeleResponse>
  async sendMessage(
    chat_id: TeleIdType,
    text: string,
    reply_markup?: TeleReplyMarkup,
  ) {
    return sendMessage(this.bot_key, chat_id, text, reply_markup, {
      parse_mode: this.parse_mode,
    })
  }

  async answerCallbackQuery(
    callback_query_id: string,
    text: string,
    show_alert: boolean,
  ) {
    return answerCallbackQuery(
      this.bot_key,
      callback_query_id,
      text,
      show_alert,
    )
  }

  async deleteMessage(chat_id: number, message_id: number) {
    return deleteMessage(this.bot_key, chat_id, message_id)
  }

  async updateCaption(
    chat_id: TeleIdType,
    message_id: number,
    caption: string,
    reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  ) {
    return updateCaption(
      this.bot_key,
      chat_id,
      message_id,
      caption,
      reply_markup,
      { parse_mode: this.parse_mode },
    )
  }

  async updateMessage(
    chat_id: number,
    message_id: number,
    text: string,
    reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  ) {
    return updateMessage(
      this.bot_key,
      chat_id,
      message_id,
      text,
      reply_markup,
      { parse_mode: this.parse_mode },
    )
  }

  async sendPhoto(
    chat_id: TeleIdType,
    photo_file_id: string,
    caption: string,
    reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  ) {
    return sendPhoto(
      this.bot_key,
      chat_id,
      photo_file_id,
      caption,
      reply_markup,
      { parse_mode: this.parse_mode },
    )
  }

  async setMyCommands(
    commands: Array<TeleBotCommand>,
    scope: TeleBotCommandScope,
    language_code?: string,
  ) {
    return setMyCommands(this.bot_key, commands, scope, language_code)
  }

  async updateMedia(
    chat_id: TeleIdType,
    message_id: number,
    caption: string,
    media_type: string,
    media_id: string,
    reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  ) {
    return updateMedia(
      this.bot_key,
      chat_id,
      message_id,
      caption,
      media_type,
      media_id,
      reply_markup,
      { parse_mode: this.parse_mode },
    )
  }

  async sendDocument(
    chat_id: TeleIdType,
    document_id: string,
    caption: string,
    reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  ) {
    return sendDocument(
      this.bot_key,
      chat_id,
      document_id,
      caption,
      reply_markup,
      { parse_mode: this.parse_mode },
    )
  }

  async sendInvoice(
    provider_token: string,
    chat_id: number | string,
    invoice: TeleInvoice,
    payload: string,
    prices: TelePrice[],
    photo_url: string,
    is_flexible: boolean = false,
    need_name: boolean = false,
    need_email: boolean = false,
    need_phone_number: boolean = false,
    need_shipping_address: boolean = false,
    send_phone_number_to_provider: boolean = false,
    send_email_to_provider: boolean = false,
    provider_data: string = '{}',
    reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
    start_parameter: string | null = null,
  ) {
    return sendInvoice(
      this.bot_key,
      provider_token,
      chat_id,
      invoice,
      payload,
      prices,
      photo_url,
      is_flexible,
      need_name,
      need_email,
      need_phone_number,
      need_shipping_address,
      send_phone_number_to_provider,
      send_email_to_provider,
      provider_data,
      reply_markup,
      start_parameter,
    )
  }

  async answerShippingQuery(
    shipping_query_id: string,
    ok: boolean,
    shipping_options?: TeleShippingOption[],
    error_message?: string,
  ) {
    return answerShippingQuery(
      this.bot_key,
      shipping_query_id,
      ok,
      shipping_options,
      error_message,
    )
  }

  async answerPreCheckoutQuery(
    pre_checkout_query_id: string,
    ok: boolean,
    error_message: string = '',
  ) {
    return answerPreCheckoutQuery(
      this.bot_key,
      pre_checkout_query_id,
      ok,
      error_message,
    )
  }

  // Class Wrapper Functions for completion

  genInlineButtons(
    buttonArr: Array<Array<string>>,
    callbackArr: Array<string> | Array<Array<string>>,
  ) {
    return genInlineButtons(buttonArr, callbackArr)
  }

  genInlineUrlButtons(
    buttonArr: Array<Array<string>>,
    callbackArr: Array<string> | Array<Array<string>>,
    urlArr: Array<string> | Array<Array<string>>,
  ) {
    return genInlineUrlButtons(buttonArr, callbackArr, urlArr)
  }

  convertToHTML(textMsg: string, formatting?: TeleMessageEntities[]) {
    return convertToHTML(textMsg, formatting)
  }

  embedMetadata(metadata: string | object, text: string) {
    return embedMetadata(metadata, text)
  }

  extractMetadata<T = Record<string, any>>(text: string, formatting: TeleMessageEntities[]) {
    return extractMetadata<T>(text, formatting)
  }
}

// Function-based Interface

/**
 * Sends a message via the bot
 * @param bot_key
 * @param chat_id
 * @param text
 * @param reply_markup
 * @param options Options for parse mode
 */
export async function sendMessage(
  bot_key: string,
  chat_id: number | string,
  text: string,
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  options?: TelePostOptions,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/sendMessage`, {
        chat_id,
        text,
        parse_mode: !options ? 'HTML' : options.parse_mode,
        reply_to_message_id: options?.reply_to_message_id,
        allow_sending_without_reply: !!options?.reply_to_message_id ? null : true,
        reply_markup,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE')
          console.log(`Message posted (id: ${res.data.result.message_id})`)
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Sends a http response back to the Bot to acknowledge a CallbackQuery
 * Required for better UX
 * @param bot_key string
 * @param callback_query_id string referencing a callback_query
 * @param text string to be shown to user as notification/alert
 * @param show_alert boolean
 */
export async function answerCallbackQuery(
  bot_key: string,
  callback_query_id: string,
  text: string,
  show_alert: boolean,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/answerCallbackQuery`, {
        callback_query_id,
        text,
        show_alert,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE') console.log(`Callback: ${callback_query_id}`)
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Deletes a message
 * Bot must be an admin in a group (see other reqs: https://core.telegram.org/bots/api#deletemessage)
 * @param bot_key string
 * @param chat_id integer
 * @param message_id integer
 */
export async function deleteMessage(
  bot_key: string,
  chat_id: number,
  message_id: number,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/deleteMessage`, {
        chat_id,
        message_id,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE')
          console.log(
            `Message Deleted [chat: ${chat_id}]: (msg_id: ${res.data.result.message_id})})`,
          )
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Updates a message's Caption
 * @param bot_key string
 * @param chat_id integer | string
 * @param msg_id integer
 * @param caption string (parsed via html)
 * @param reply_markup Telegram Object
 * @param options Options for parse mode
 */
export async function updateCaption(
  bot_key: string,
  chat_id: TeleIdType,
  message_id: number,
  caption: string,
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  options?: TelePostOptions,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/editMessageCaption`, {
        chat_id,
        message_id,
        caption,
        parse_mode: !options ? 'HTML' : options.parse_mode,
        reply_markup,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE')
          console.log(
            `Message Caption Updated (id: ${res.data.result.message_id})`,
          )
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Updates a message
 * @param bot_key string
 * @param chat_id integer
 * @param message_id integer
 * @param text string
 * @param reply_markup Telegram Object
 * @param options Options for parse mode
 */
export async function updateMessage(
  bot_key: string,
  chat_id: number,
  message_id: number,
  text: string,
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  options?: TelePostOptions,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/editMessageText`, {
        chat_id,
        message_id,
        text,
        parse_mode: !options ? 'HTML' : options.parse_mode,
        reply_markup,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE')
          console.log(`Message Updated (id: ${res.data.result.message_id})`)
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Sends a photo via the bot
 * @param bot_key string
 * @param chat_id integer | string
 * @param photo_file_id file_id of image on Telegram Server or alternatively string url of photo (not guaranteed to work)
 * @param caption string
 * @param reply_markup buttons
 * @param options Options for parse mode
 */
export async function sendPhoto(
  bot_key: string,
  chat_id: TeleIdType,
  photo_file_id: string,
  caption: string,
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  options?: TelePostOptions,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/sendPhoto`, {
        chat_id,
        photo: photo_file_id,
        caption,
        reply_markup: reply_markup,
        parse_mode: !options ? 'HTML' : options.parse_mode,
      })
      .then((res) => {
        const msgDetails = res.data.result
        if (LOGGER == 'VERBOSE')
          console.log(`Photo posted (id: ${msgDetails.message_id})`)
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

export async function setMyCommands(
  bot_key: string,
  commands: Array<TeleBotCommand>,
  scope: TeleBotCommandScope,
  language_code?: string,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/setMyCommands`, {
        commands,
        scope,
        language_code,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE')
          console.log(`Commands Updated (id: ${res.data.result.message_id})`)
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

export async function updateMedia(
  bot_key: string,
  chat_id: TeleIdType,
  message_id: number,
  caption: string,
  media_type: string,
  media_id: string,
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  options?: TelePostOptions,
) {
  return new Promise<TeleResponse>((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/editMessageMedia`, {
        chat_id,
        message_id,
        media: {
          type: media_type,
          media: media_id,
          caption,
          parse_mode: !options ? 'HTML' : options.parse_mode,
        },
        reply_markup,
      })
      .then((res) => {
        if (LOGGER == 'VERBOSE')
          console.log(
            `Message Media Updated (id: ${res.data.result.message_id})`,
          )
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Sends a document via the bot
 * @param bot_key string
 * @param chat_id integer | string
 * @param document_id file_id of document on Telegram Server or alternatively url of a gif, pdf or zip file
 * @param caption string
 * @param reply_markup buttons
 * @param options Options for parse mode
 */
export async function sendDocument(
  bot_key: string,
  chat_id: TeleIdType,
  document_id: string,
  caption: string,
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  options?: TelePostOptions,
) {
  return new Promise((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/sendDocument`, {
        chat_id,
        document: document_id,
        caption,
        parse_mode: !options ? 'HTML' : options.parse_mode,
        reply_markup,
      })
      .then((res) => {
        const msgDetails = res.data.result
        if (LOGGER == 'VERBOSE')
          console.log(`Document posted (id: ${msgDetails.message_id})`)
        resolve(msgDetails)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Sends invoices via the Bot to begin payments process
 * @param bot_key Telegram Bot Key generated by BotFather !secret
 * @param provider_token Payment Provider Token generated by BotFather !secret
 * @param chat_id string of chat to send the invoice to
 * @param invoice TeleInvoice containing basic information required for payments
 * @param payload string used to uniquely identify invoices server-side (u decide)
 * @param prices TelePrice[] Price breakdown of components relating to the payment
 * @param provider_data string JSON-serialized for what the payment provider needs
 * @param photo_url strong url of the photo people see on the invoice
 * @param need_name boolean to request name from user
 * @param need_email boolean to request email from user
 * @param need_phone_number boolean to request phone_number from user
 * @param need_shipping_address boolean to request shipping_address from user
 * @param send_phone_number_to_provider boolean to send phone_number to payment provider
 * @param send_email_to_provider boolean to email to payment provider
 * @param is_flexible boolean true if final price depends on shipping
 * @param reply_markup If empty, on 'Pay <Total Price>' will be shown. Else, first button must be a pay button
 * @param start_parameter string unique deep linking parameter (i dont really get this)
 * @returns TeleMessage that was sent to the user
 */
export async function sendInvoice(
  bot_key: string,
  provider_token: string,
  chat_id: number | string,
  invoice: TeleInvoice,
  payload: string,
  prices: TelePrice[],
  photo_url: string,
  is_flexible: boolean = false,
  need_name: boolean = false,
  need_email: boolean = false,
  need_phone_number: boolean = false,
  need_shipping_address: boolean = false,
  send_phone_number_to_provider: boolean = false,
  send_email_to_provider: boolean = false,
  provider_data: string = '{}',
  reply_markup: TeleReplyMarkup = {} as TeleInlineKeyboard,
  start_parameter: string | null = null,
) {
  return new Promise((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/sendInvoice`, {
        chat_id: chat_id,
        title: invoice.title,
        description: invoice.description,
        payload,
        provider_token,
        start_parameter,
        currency: invoice.currency,
        prices,
        provider_data,
        photo_url,
        need_name,
        need_phone_number,
        need_email,
        need_shipping_address,
        send_phone_number_to_provider,
        send_email_to_provider,
        is_flexible,
        reply_markup,
      })
      .then((res) => {
        const msgDetails = res.data.result
        if (LOGGER == 'VERBOSE')
          console.log(`Invoice Sent (id: ${msgDetails.message_id})`)
        resolve(msgDetails)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Shipping Query will be sent if invoice requests shipping_address and is_flexible = true
 * @param bot_key Telegram Bot Key generated by BotFather !secret
 * @param shipping_query_id Unique identifier of the shipping_query
 * @param ok boolean to tell user if the query goes through or not
 * @param shipping_options TeleShippingOption[] if ok, shows array of shipping options
 * @param error_message string if not ok, shows error message
 * @returns True is success
 */
export async function answerShippingQuery(
  bot_key: string,
  shipping_query_id: string,
  ok: boolean,
  shipping_options?: TeleShippingOption[],
  error_message?: string,
) {
  return new Promise((resolve, reject) => {
    let params
    if (ok) {
      params = {
        shipping_query_id,
        ok,
        shipping_options,
      }
    } else {
      params = {
        shipping_query_id,
        ok,
        error_message,
      }
    }

    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/answerShippingQuery`, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}

/**
 * Upon payment confirmation by user, telegram will send a pre_checkout_query update. Reply using this.
 * @param bot_key Telegram Bot Key generated by BotFather !secret
 * @param pre_checkout_query_id string unique identifier
 * @param ok boolean
 * @param error_message string to be shown to the user
 */
export async function answerPreCheckoutQuery(
  bot_key: string,
  pre_checkout_query_id: string,
  ok: boolean,
  error_message: string = '',
) {
  return new Promise((resolve, reject) => {
    axios
      .post<TeleResponse>(`${TELE_API}${bot_key}/answerPreCheckoutQuery`, {
        pre_checkout_query_id,
        ok,
        error_message,
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}
