import { AxiosError } from 'axios';
export declare type TeleLogger = 'VERBOSE' | 'ERRORS';
export declare type TeleIdType = string | number;
export declare type ParseMode = 'MarkdownV2' | 'HTML';
export interface TelePostOptions {
    parse_mode: ParseMode;
}
export declare type TeleReplyMarkup = TeleInlineKeyboard | TeleReplyKeyboard;
export interface TeleResponse {
    ok: boolean;
    result: {
        message_id: number;
        from: TeleUser;
        chat: TeleChat;
        date: number;
        text: string;
        entities: [TeleMessageEntities];
    };
}
export interface TeleError {
    ok: boolean;
    error_code: number;
    description: string;
}
export interface TeleUpdate {
    update_id: number;
    message?: TeleMessage;
    chat_member?: TeleMemberUpdate;
    callback_query?: TeleCallbackQuery;
}
export interface TeleCallbackQuery {
    id: string;
    from: TeleUser;
    message?: TeleMessage;
    inline_message_id?: string;
    chat_instance: string;
    data?: string;
    game_short_name?: string;
}
export interface TeleMessage {
    message_id: number;
    from?: TeleUser;
    sender_chat?: TeleChat;
    date: number;
    chat: TeleChat;
    forward_from?: TeleUser;
    forward_from_chat?: TeleChat;
    forward_from_message_id?: number;
    forward_signature?: string;
    forward_sender_name?: string;
    forward_date?: number;
    reply_to_message: TeleMessage;
    via_bot?: TeleUser;
    edit_date?: number;
    media_group_id?: string;
    author_signature?: string;
    text?: string;
    reply_markup?: TeleInlineKeyboard;
    entities?: [TeleMessageEntities];
    new_chat_members?: [TeleUser];
    left_chat_member?: TeleUser;
    caption?: string;
    caption_entities?: [TeleMessageEntities];
    document?: TeleDocument;
    photo?: [TelePhotoSize];
    successful_payment?: TeleReceipt;
}
export interface TeleUser {
    id: number | string;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}
export interface GetMeTeleUser extends TeleUser {
    can_join_groups?: boolean;
    can_read_all_group_messages?: boolean;
    supports_inline_queries?: boolean;
}
export interface TeleChatMember extends TeleUserPermissions {
    user: TeleUser;
    status: string;
    custom_title?: string;
    is_anonymous?: boolean;
    is_member?: boolean;
    until_date?: number;
}
export interface TeleChat {
    id: number;
    type: string;
    title?: string;
    username?: string;
    first_name: string;
    last_name?: string;
}
export interface GetChatTeleChat extends TeleChat {
    bio?: string;
    description?: string;
    invite_link?: string;
    pinned_message?: TeleMessage;
    slow_mode_delay?: number;
    message_auto_delete_time?: number;
    sticker_set_name?: string;
    can_set_sticker_set?: boolean;
    linked_chat_id?: number;
}
export interface TeleMemberUpdate {
    chat: TeleChat;
    from: TeleUser;
    date: number;
    old_chat_member: TeleChatMember;
    new_chat_member: TeleChatMember;
    invite_link?: ChatInviteLink;
}
export interface TeleUserPermissions {
    can_be_edited?: boolean;
    can_manage_chat?: boolean;
    can_post_messages?: boolean;
    can_edit_messages?: boolean;
    can_delete_messages?: boolean;
    can_manage_voice_chats?: boolean;
    can_restrict_members?: boolean;
    can_promote_members?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_pin_messages?: boolean;
    can_send_messages?: boolean;
    can_send_media_messages?: boolean;
    can_send_polls?: boolean;
    can_send_other_messages?: boolean;
    can_add_web_page_previews?: boolean;
}
export interface ChatInviteLink {
    invite_link: string;
    creator: TeleUser;
    is_primary: boolean;
    is_revoked: boolean;
    expire_date?: number;
    member_limit?: number;
}
export interface TeleInlineKeyboard {
    inline_keyboard: [[TeleInlineKeyboardButton]];
}
export interface TeleInlineKeyboardButton {
    text: string;
    callback_data?: string;
    url?: string;
    switch_inline_query?: string;
    switch_inline_query_current_chat?: string;
    pay: boolean;
}
export interface TeleReplyKeyboard {
    keyboard: Array<Array<TeleKeyboardButton>>;
    resize_keyboard?: boolean;
    one_time_keyboard?: boolean;
    selective?: boolean;
}
export interface TeleKeyboardButton {
    text: string;
    request_contact?: boolean;
    request_location?: boolean;
}
export interface TeleMessageEntities {
    type: string;
    offset: number;
    length: number;
    url?: string;
    user?: TeleUser;
    language?: string;
}
export interface TeleDocument {
    file_id: string;
    file_unique_id: string;
    thumb?: TelePhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
export interface TeleBotCommand {
    command: string;
    description: string;
}
export interface TeleBotCommandScope {
    type: TeleBotCommandScopeType;
    chat_id?: TeleIdType;
    user_id?: number;
}
export interface TelePhotoSize {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    file_size?: number;
}
export interface TeleInvoice {
    title: string;
    description: string;
    start_parameter: string;
    currency: string;
    total_amount: number;
}
export interface TelePrice {
    label: string;
    amount: number;
}
export interface TeleShippingOption {
    id: string;
    title: string;
    prices: TelePrice[];
}
export interface TeleShippingAddress {
    country_code: string;
    state: string;
    city: string;
    street_line1: string;
    street_line2: string;
    post_code: string;
}
export interface TeleOrderInfo {
    name?: string;
    phone_number?: string;
    email?: string;
    address?: TeleShippingAddress;
}
export interface TeleShippingQuery {
    id: string;
    from: TeleUser;
    invoice_payload: string;
    shipping_addresss: TeleShippingAddress;
}
export interface TelePreCheckoutQuery {
    id: string;
    from: TeleUser;
    currency: string;
    total_amount: number;
    invoice_payload: string;
    shipping_option_id?: string;
    order_info?: TeleOrderInfo;
}
export interface TeleReceipt {
    currency: string;
    total_amount: number;
    invoice_payload: string;
    shipping_option_id?: string;
    order_info?: TeleOrderInfo;
    telegram_payment_charge_id: string;
    provider_payment_charge_id: string;
}
export declare type TeleBotCommandScopeType = 'default' | 'all_private_chats' | 'all_group_chats' | 'all_chat_administrators' | 'chat' | 'chat_administrators' | 'chat_member';
export declare const ERROR_CODES: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
};
export declare function convertError(err: AxiosError<TeleError>): TeleError;
