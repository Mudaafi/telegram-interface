"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertError = exports.ERROR_CODES = void 0;
exports.ERROR_CODES = {
    0: 'default',
    1: 'Missing Bot Key',
    2: 'Message (to delete) not found',
    3: 'Message (to edit) not found',
    4: 'Message cannot be edited',
    5: 'Missing chat_id',
    6: 'Message to be updated is exactly the same',
    7: 'User has blocked/deleted the bot or has not activated the bot',
};
function convertError(err) {
    if (!err.response || !err.response.data)
        return {
            ok: false,
            error_code: 0,
            description: 'No error desc.',
        };
    switch (err.response.data.description) {
        case 'Not Found':
            return { ok: false, error_code: 1, description: exports.ERROR_CODES[1] };
        case 'Bad Request:mesage to delete not found':
            return { ok: false, error_code: 2, description: exports.ERROR_CODES[2] };
        case 'Bad Request: message to edit not found':
            return { ok: false, error_code: 3, description: exports.ERROR_CODES[3] };
        case "Bad Request: message can't be edited":
            return { ok: false, error_code: 4, description: exports.ERROR_CODES[4] };
        case 'Bad Request: chat_id is empty':
            return { ok: false, error_code: 5, description: exports.ERROR_CODES[5] };
        case 'Bad Request: message is not modified: specified new ' +
            'message content and reply markup are exactly the same ' +
            'as a current content and reply markup of the message':
            return { ok: false, error_code: 6, description: exports.ERROR_CODES[6] };
        case 'Forbidden: bot was blocked by the user':
            return { ok: false, error_code: 7, description: exports.ERROR_CODES[7] };
        default:
            return { ok: false, error_code: 0, description: exports.ERROR_CODES[0] };
    }
}
exports.convertError = convertError;
//# sourceMappingURL=telegram-types.js.map