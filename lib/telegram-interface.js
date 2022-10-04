"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerPreCheckoutQuery = exports.answerShippingQuery = exports.sendInvoice = exports.sendDocument = exports.updateMedia = exports.setMyCommands = exports.sendPhoto = exports.updateMessage = exports.updateCaption = exports.deleteMessage = exports.answerCallbackQuery = exports.sendMessage = exports.Telegram = exports.LOGGER = void 0;
const axios_1 = __importDefault(require("axios"));
const telegram_types_1 = require("./@types/telegram-types");
const telegram_formatters_1 = require("./telegram-formatters");
const TELE_API = 'https://api.telegram.org/bot';
exports.LOGGER = process.env.TELE_LOGGER != undefined
    ? process.env.TELE_LOGGER
    : 'ERRORS';
class Telegram {
    bot_key;
    parse_mode;
    constructor(bot_key, parse_mode = 'HTML') {
        this.bot_key = bot_key;
        this.parse_mode = parse_mode;
    }
    async sendMessage(chat_id, text, reply_markup) {
        return sendMessage(this.bot_key, chat_id, text, reply_markup, {
            parse_mode: this.parse_mode,
        });
    }
    async answerCallbackQuery(callback_query_id, text, show_alert) {
        return answerCallbackQuery(this.bot_key, callback_query_id, text, show_alert);
    }
    async deleteMessage(chat_id, message_id) {
        return deleteMessage(this.bot_key, chat_id, message_id);
    }
    async updateCaption(chat_id, message_id, caption, reply_markup = {}) {
        return updateCaption(this.bot_key, chat_id, message_id, caption, reply_markup, { parse_mode: this.parse_mode });
    }
    async updateMessage(chat_id, message_id, text, reply_markup = {}) {
        return updateMessage(this.bot_key, chat_id, message_id, text, reply_markup, { parse_mode: this.parse_mode });
    }
    async sendPhoto(chat_id, photo_file_id, caption, reply_markup = {}) {
        return sendPhoto(this.bot_key, chat_id, photo_file_id, caption, reply_markup, { parse_mode: this.parse_mode });
    }
    async setMyCommands(commands, scope, language_code) {
        return setMyCommands(this.bot_key, commands, scope, language_code);
    }
    async updateMedia(chat_id, message_id, caption, media_type, media_id, reply_markup = {}) {
        return updateMedia(this.bot_key, chat_id, message_id, caption, media_type, media_id, reply_markup, { parse_mode: this.parse_mode });
    }
    async sendDocument(chat_id, document_id, caption, reply_markup = {}) {
        return sendDocument(this.bot_key, chat_id, document_id, caption, reply_markup, { parse_mode: this.parse_mode });
    }
    async sendInvoice(provider_token, chat_id, invoice, payload, prices, photo_url, is_flexible = false, need_name = false, need_email = false, need_phone_number = false, need_shipping_address = false, send_phone_number_to_provider = false, send_email_to_provider = false, provider_data = '{}', reply_markup = {}, start_parameter = null) {
        return sendInvoice(this.bot_key, provider_token, chat_id, invoice, payload, prices, photo_url, is_flexible, need_name, need_email, need_phone_number, need_shipping_address, send_phone_number_to_provider, send_email_to_provider, provider_data, reply_markup, start_parameter);
    }
    async answerShippingQuery(shipping_query_id, ok, shipping_options, error_message) {
        return answerShippingQuery(this.bot_key, shipping_query_id, ok, shipping_options, error_message);
    }
    async answerPreCheckoutQuery(pre_checkout_query_id, ok, error_message = '') {
        return answerPreCheckoutQuery(this.bot_key, pre_checkout_query_id, ok, error_message);
    }
    genInlineButtons(buttonArr, callbackArr) {
        return (0, telegram_formatters_1.genInlineButtons)(buttonArr, callbackArr);
    }
    genInlineUrlButtons(buttonArr, callbackArr, urlArr) {
        return (0, telegram_formatters_1.genInlineUrlButtons)(buttonArr, callbackArr, urlArr);
    }
    convertToHTML(textMsg, formatting) {
        return (0, telegram_formatters_1.convertToHTML)(textMsg, formatting);
    }
    embedMetadata(metadata, text) {
        return (0, telegram_formatters_1.embedMetadata)(metadata, text);
    }
    extractMetadata(text) {
        return (0, telegram_formatters_1.extractMetadata)(text);
    }
}
exports.Telegram = Telegram;
async function sendMessage(bot_key, chat_id, text, reply_markup = {}, options) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/sendMessage`, {
            chat_id,
            text,
            parse_mode: !options ? 'HTML' : options.parse_mode,
            reply_markup,
        })
            .then((res) => {
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Message posted (id: ${res.data.result.message_id})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.sendMessage = sendMessage;
async function answerCallbackQuery(bot_key, callback_query_id, text, show_alert) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/answerCallbackQuery`, {
            callback_query_id,
            text,
            show_alert,
        })
            .then((res) => {
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Callback: ${callback_query_id}`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.answerCallbackQuery = answerCallbackQuery;
async function deleteMessage(bot_key, chat_id, message_id) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/deleteMessage`, {
            chat_id,
            message_id,
        })
            .then((res) => {
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Message Deleted [chat: ${chat_id}]: (msg_id: ${res.data.result.message_id})})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.deleteMessage = deleteMessage;
async function updateCaption(bot_key, chat_id, message_id, caption, reply_markup = {}, options) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/editMessageCaption`, {
            chat_id,
            message_id,
            caption,
            parse_mode: !options ? 'HTML' : options.parse_mode,
            reply_markup,
        })
            .then((res) => {
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Message Caption Updated (id: ${res.data.result.message_id})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.updateCaption = updateCaption;
async function updateMessage(bot_key, chat_id, message_id, text, reply_markup = {}, options) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/editMessageText`, {
            chat_id,
            message_id,
            text,
            parse_mode: !options ? 'HTML' : options.parse_mode,
            reply_markup,
        })
            .then((res) => {
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Message Updated (id: ${res.data.result.message_id})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.updateMessage = updateMessage;
async function sendPhoto(bot_key, chat_id, photo_file_id, caption, reply_markup = {}, options) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/sendPhoto`, {
            chat_id,
            photo: photo_file_id,
            caption,
            reply_markup: reply_markup,
            parse_mode: !options ? 'HTML' : options.parse_mode,
        })
            .then((res) => {
            const msgDetails = res.data.result;
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Photo posted (id: ${msgDetails.message_id})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.sendPhoto = sendPhoto;
async function setMyCommands(bot_key, commands, scope, language_code) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/setMyCommands`, {
            commands,
            scope,
            language_code,
        })
            .then((res) => {
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Commands Updated (id: ${res.data.result.message_id})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.setMyCommands = setMyCommands;
async function updateMedia(bot_key, chat_id, message_id, caption, media_type, media_id, reply_markup = {}, options) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/editMessageMedia`, {
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
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Message Media Updated (id: ${res.data.result.message_id})`);
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.updateMedia = updateMedia;
async function sendDocument(bot_key, chat_id, document_id, caption, reply_markup = {}, options) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/sendDocument`, {
            chat_id,
            document: document_id,
            caption,
            parse_mode: !options ? 'HTML' : options.parse_mode,
            reply_markup,
        })
            .then((res) => {
            const msgDetails = res.data.result;
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Document posted (id: ${msgDetails.message_id})`);
            resolve(msgDetails);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.sendDocument = sendDocument;
async function sendInvoice(bot_key, provider_token, chat_id, invoice, payload, prices, photo_url, is_flexible = false, need_name = false, need_email = false, need_phone_number = false, need_shipping_address = false, send_phone_number_to_provider = false, send_email_to_provider = false, provider_data = '{}', reply_markup = {}, start_parameter = null) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/sendInvoice`, {
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
            const msgDetails = res.data.result;
            if (exports.LOGGER == 'VERBOSE')
                console.log(`Invoice Sent (id: ${msgDetails.message_id})`);
            resolve(msgDetails);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.sendInvoice = sendInvoice;
async function answerShippingQuery(bot_key, shipping_query_id, ok, shipping_options, error_message) {
    return new Promise((resolve, reject) => {
        let params;
        if (ok) {
            params = {
                shipping_query_id,
                ok,
                shipping_options,
            };
        }
        else {
            params = {
                shipping_query_id,
                ok,
                error_message,
            };
        }
        axios_1.default
            .post(`${TELE_API}${bot_key}/answerShippingQuery`, params)
            .then((res) => {
            resolve(res.data);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.answerShippingQuery = answerShippingQuery;
async function answerPreCheckoutQuery(bot_key, pre_checkout_query_id, ok, error_message = '') {
    return new Promise((resolve, reject) => {
        axios_1.default
            .post(`${TELE_API}${bot_key}/answerPreCheckoutQuery`, {
            pre_checkout_query_id,
            ok,
            error_message,
        })
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            reject((0, telegram_types_1.convertError)(err));
        });
    });
}
exports.answerPreCheckoutQuery = answerPreCheckoutQuery;
//# sourceMappingURL=telegram-interface.js.map