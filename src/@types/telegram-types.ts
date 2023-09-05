import { AxiosError } from 'axios'

// -- Configuration Types
export type TeleLogger = 'VERBOSE' | 'ERRORS'
export type TeleIdType = string | number
export type ParseMode = 'MarkdownV2' | 'HTML'
export interface TelePostOptions {
  parse_mode: ParseMode
}
export type TeleReplyMarkup = TeleInlineKeyboard | TeleReplyKeyboard

// -- From Telegram API
export interface TeleResponse {
  ok: boolean
  result: {
    message_id: number
    from: TeleUser
    chat: TeleChat
    date: number // Unix Time
    text: string
    entities: TeleMessageEntities[]
  }
}

export interface TeleError {
  ok: boolean
  error_code: number
  description: string
}

export interface TeleUpdate {
  update_id: number
  message?: TeleMessage
  chat_member?: TeleMemberUpdate
  callback_query?: TeleCallbackQuery
  // Below are not yet used and so not implemented
  /*
  edited_message?: TeleMessage
  channel_post?: TeleMessage
  edited_channel_post?: TeleMessage
  inline_query?: TeleInlineQuery
  chosen_inlline_result?: TeleChosenInlineResult
  poll?: TelePoll
  poll_answer?: TelePollAnswer
  my_chat_member?: TeleSelfMembershipUpdate
  */
}

// -- Objects
export interface TeleCallbackQuery {
  id: string
  from: TeleUser
  message?: TeleMessage
  inline_message_id?: string
  chat_instance: string
  data?: string
  game_short_name?: string
}

export interface TeleMessage {
  message_id: number
  from?: TeleUser // Empty for channels
  sender_chat?: TeleChat // For channels
  date: number // Unix time
  chat: TeleChat
  forward_from?: TeleUser
  forward_from_chat?: TeleChat
  forward_from_message_id?: number
  forward_signature?: string
  forward_sender_name?: string
  forward_date?: number // Unix time
  reply_to_message?: TeleMessage
  via_bot?: TeleUser
  edit_date?: number
  media_group_id?: string
  author_signature?: string
  text?: string
  reply_markup?: TeleInlineKeyboard
  entities?: TeleMessageEntities[]
  new_chat_members?: TeleUser[]
  left_chat_member?: TeleUser
  caption?: string
  caption_entities?: TeleMessageEntities[]
  document?: TeleDocument
  photo?: TelePhotoSize[]
  successful_payment?: TeleReceipt

  // Below are not yet used and so not implemented
  /*
  animation: TeleAnimation
  audio?: TeleAudio
  sticker?: TeleSticker
  video?: TeleVideo
  video_note?: TeleVideoNote
  voice?: TeleVoice
  contact?: TeleContact
  dice?: TeleDice
  game?: TeleGame
  poll?: TelePoll
  venue?: TeleVenue
  location?: TeleLocation
  new_chat_title?: string
  new_chat_photo?: PhotoSize[]
  delete_chat_photo?: boolean
  group_chat_created?: boolean
  supergroup_chat_created?: boolean
  channel_chat_created?: boolean
  */
}

export interface TeleUser {
  id: number | string
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
}

export interface GetMeTeleUser extends TeleUser {
  can_join_groups?: boolean
  can_read_all_group_messages?: boolean
  supports_inline_queries?: boolean
}

export interface TeleChatMember extends TeleUserPermissions {
  user: TeleUser
  status: string // enum: creator, administrator, member, restricted, left, kicked
  custom_title?: string // owner/admin only
  is_anonymous?: boolean
  is_member?: boolean // Restricted only
  until_date?: number // Unix time
}

export interface TeleChat {
  id: number
  type: string // enum: private/group/supergroup/channel
  title?: string
  username?: string
  first_name: string
  last_name?: string
}

export interface GetChatTeleChat extends TeleChat {
  // photo: TeleChatPhoto
  bio?: string
  description?: string
  invite_link?: string
  pinned_message?: TeleMessage
  // permissions: TeleChatPermissions
  slow_mode_delay?: number
  message_auto_delete_time?: number
  sticker_set_name?: string
  can_set_sticker_set?: boolean
  linked_chat_id?: number
  // location: TeleChatLocation
}

export interface TeleMemberUpdate {
  chat: TeleChat
  from: TeleUser // Performer of the change
  date: number // Unix time
  old_chat_member: TeleChatMember // Old member info
  new_chat_member: TeleChatMember // New member info
  invite_link?: ChatInviteLink
}

export interface TeleUserPermissions {
  can_be_edited?: boolean // edit admin privileges
  can_manage_chat?: boolean
  can_post_messages?: boolean // channel only
  can_edit_messages?: boolean // channel only
  can_delete_messages?: boolean
  can_manage_voice_chats?: boolean
  can_restrict_members?: boolean
  can_promote_members?: boolean
  can_change_info?: boolean
  can_invite_users?: boolean
  can_pin_messages?: boolean
  can_send_messages?: boolean
  can_send_media_messages?: boolean
  can_send_polls?: boolean
  can_send_other_messages?: boolean
  can_add_web_page_previews?: boolean
}

export interface ChatInviteLink {
  invite_link: string
  creator: TeleUser
  is_primary: boolean
  is_revoked: boolean
  expire_date?: number
  member_limit?: number
}

export interface TeleInlineKeyboard {
  inline_keyboard: TeleInlineKeyboardButton[][]
}

export interface TeleInlineKeyboardButton {
  text: string
  callback_data?: string
  url?: string
  //login_url?: LoginUrl
  switch_inline_query?: string
  switch_inline_query_current_chat?: string
  // callback_game?: CallbackGame
  pay?: boolean
}

export interface TeleReplyKeyboard {
  keyboard: Array<Array<TeleKeyboardButton>>
  resize_keyboard?: boolean
  one_time_keyboard?: boolean
  selective?: boolean
}

export interface TeleKeyboardButton {
  text: string
  request_contact?: boolean
  request_location?: boolean
  // request_poll?: TeleKeyboardButtonPoll
}

export interface TeleMessageEntities {
  type: string // enum: mention/hashtag/bot_command/url/email/phone_number/bold/italic/underline/strikethrough/code/pre/text_link/text_mention
  offset: number // Offset in UTF-16 code units to the start of the entity
  length: number // Length of the entity in UTF-16 code units
  url?: string // Optional. For “text_link” only, url that will be opened after user taps on the text
  user?: TeleUser // Optional. For “text_mention” only, the mentioned user
  language?: string // Optional. For “pre” only, the programming language of the entity text
}

export interface TeleDocument {
  file_id: string
  file_unique_id: string
  thumb?: TelePhotoSize
  file_name?: string
  mime_type?: string
  file_size?: number
}

export interface TeleBotCommand {
  command: string
  description: string
}

export interface TeleBotCommandScope {
  type: TeleBotCommandScopeType
  chat_id?: TeleIdType
  user_id?: number
}

export interface TelePhotoSize {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  file_size?: number
}

export interface TeleInvoice {
  title: string
  description: string
  start_parameter: string
  currency: string
  total_amount: number
}

export interface TelePrice {
  label: string
  amount: number // in cents
}

export interface TeleShippingOption {
  id: string
  title: string
  prices: TelePrice[]
}

export interface TeleShippingAddress {
  country_code: string
  state: string
  city: string
  street_line1: string
  street_line2: string
  post_code: string
}

export interface TeleOrderInfo {
  name?: string
  phone_number?: string
  email?: string
  address?: TeleShippingAddress
}

export interface TeleShippingQuery {
  id: string
  from: TeleUser
  invoice_payload: string
  shipping_addresss: TeleShippingAddress
}

export interface TelePreCheckoutQuery {
  id: string
  from: TeleUser
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string
  order_info?: TeleOrderInfo
}

// Alias of successful_payment
export interface TeleReceipt {
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string
  order_info?: TeleOrderInfo
  telegram_payment_charge_id: string
  provider_payment_charge_id: string
}

export type TeleBotCommandScopeType =
  | 'default'
  | 'all_private_chats'
  | 'all_group_chats'
  | 'all_chat_administrators'
  | 'chat'
  | 'chat_administrators'
  | 'chat_member'

export const ERROR_CODES = {
  0: 'default',
  1: 'Missing Bot Key',
  2: 'Message (to delete) not found',
  3: 'Message (to edit) not found',
  4: 'Message cannot be edited',
  5: 'Missing chat_id',
  6: 'Message to be updated is exactly the same',
  7: 'User has blocked/deleted the bot or has not activated the bot',
}

// --- Error parsing function
export function convertError(err: AxiosError<TeleError>): TeleError {
  if (!err.response || !err.response.data)
    return {
      ok: false,
      error_code: 0,
      description: 'No error desc.',
    }

  switch (err.response.data.description) {
    case 'Not Found':
      return { ok: false, error_code: 1, description: ERROR_CODES[1] }

    case 'Bad Request:mesage to delete not found':
      return { ok: false, error_code: 2, description: ERROR_CODES[2] }

    case 'Bad Request: message to edit not found':
      return { ok: false, error_code: 3, description: ERROR_CODES[3] }

    case "Bad Request: message can't be edited":
      return { ok: false, error_code: 4, description: ERROR_CODES[4] }

    case 'Bad Request: chat_id is empty':
      return { ok: false, error_code: 5, description: ERROR_CODES[5] }

    case 'Bad Request: message is not modified: specified new ' +
      'message content and reply markup are exactly the same ' +
      'as a current content and reply markup of the message':
      return { ok: false, error_code: 6, description: ERROR_CODES[6] }

    case 'Forbidden: bot was blocked by the user':
      return { ok: false, error_code: 7, description: ERROR_CODES[7] }

    default:
      return {
        ok: false,
        error_code: 0,
        description: `Error ${err.response.data.error_code}: ${err.response.data.description}`,
      }
  }
}
