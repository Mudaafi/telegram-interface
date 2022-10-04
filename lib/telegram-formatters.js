"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMetadata = exports.embedMetadata = exports.cleanseString = exports.convertToHTML = exports.genInlineUrlButtons = exports.genInlineButtons = void 0;
function genInlineButtons(buttonArr, callbackArr) {
    var result = [];
    var counter = 0;
    for (var i = 0; i < buttonArr.length; ++i) {
        var rowArr = [];
        for (var buttonLabel of buttonArr[i]) {
            if (typeof callbackArr[0] != 'string')
                counter = 0;
            rowArr.push({
                text: buttonLabel,
                callback_data: typeof callbackArr[0] == 'string'
                    ? callbackArr[counter]
                    : callbackArr[i][counter],
            });
            counter += 1;
        }
        result.push(rowArr);
    }
    return { inline_keyboard: result };
}
exports.genInlineButtons = genInlineButtons;
function genInlineUrlButtons(buttonArr, callbackArr, urlArr) {
    var result = [];
    var counterCallback = 0;
    var counterUrl = 0;
    var isCallback1D = typeof callbackArr[0] == 'string';
    var isUrl1D = typeof urlArr[0] == 'string';
    for (var i = 0; i < buttonArr.length; ++i) {
        var rowArr = [];
        for (var buttonLabel of buttonArr[i]) {
            if (!isCallback1D)
                counterCallback = 0;
            if (!isUrl1D)
                counterUrl = 0;
            rowArr.push({
                text: buttonLabel,
                callback_data: isCallback1D
                    ? callbackArr[counterCallback]
                    : callbackArr[i][counterCallback],
                url: isUrl1D
                    ? callbackArr[counterCallback]
                    : callbackArr[i][counterUrl],
            });
            counterCallback += 1;
            counterUrl += 1;
        }
        result.push(rowArr);
    }
    return { inline_keyboard: result };
}
exports.genInlineUrlButtons = genInlineUrlButtons;
function convertToHTML(textMsg, formatting) {
    if (!formatting)
        return textMsg;
    var sortedFormatting = [];
    for (format of formatting) {
        sortedFormatting.push(Object.values(format));
    }
    sortedFormatting.sort(function (a, b) {
        if (a[0] == b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    var reference = [];
    var delimeterFront = '';
    var delimeterEnd = '';
    for (var format of sortedFormatting) {
        switch (format[2]) {
            case 'bold':
                delimeterFront = '<b>';
                delimeterEnd = '</b>';
                break;
            case 'italic':
                delimeterFront = '<i>';
                delimeterEnd = '</i>';
                break;
            case 'underline':
                delimeterFront = '<u>';
                delimeterEnd = '</u>';
                break;
            case 'code':
                delimeterFront = '<code>';
                delimeterEnd = '</code>';
                break;
            case 'strikethrough':
                delimeterFront = '<s>';
                delimeterEnd = '</s>';
                break;
            case 'text_link':
                delimeterFront = '<a href="' + format[3] + '">';
                delimeterEnd = '</a>';
                break;
            default:
                delimeterFront = '';
                delimeterEnd = '';
        }
        var start = format[0];
        var end = format[0] + format[1];
        var startCopy = start;
        var endCopy = end;
        for (var i = 0; i < reference.length; ++i) {
            var x = reference[i];
            if (start > x[0] || (start == x[0] && x[2] == 'tail')) {
                startCopy += x[1].length;
            }
            if (end > x[0] || (end == x[0] && start == reference[i - 1][0])) {
                endCopy += x[1].length;
            }
        }
        var msgCopy = textMsg;
        msgCopy = textMsg.slice(0, startCopy) + delimeterFront;
        msgCopy += textMsg.slice(startCopy, endCopy) + delimeterEnd;
        msgCopy += textMsg.slice(endCopy);
        textMsg = msgCopy;
        reference.push([start, delimeterFront, 'head']);
        reference.push([end, delimeterEnd, 'tail']);
    }
    return textMsg;
}
exports.convertToHTML = convertToHTML;
const cleanseString = function (string) {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
exports.cleanseString = cleanseString;
function embedMetadata(metadata, text) {
    const isStr = typeof metadata == 'string';
    text += `<a href="tg://metadata/${isStr ? metadata : JSON.stringify(metadata).split('"').join('`')}/end">\u200b</a>`;
    return text;
}
exports.embedMetadata = embedMetadata;
function extractMetadata(text) {
    var htmlText = convertToHTML(text);
    var res = htmlText.split('tg://metadata/')[1];
    if (!res)
        return null;
    res = res.split('/end')[0];
    res = res.split('`').join('"');
    let obj = JSON.parse(res.split('/end')[0]);
    Object.keys(obj).forEach((key) => {
        let value = obj[key];
        if (typeof value == 'string') {
            obj[key] = value.replace(/%20/g, ' ');
        }
        else if (typeof value == 'object') {
            if (Array.isArray(value))
                obj[key] = value.map((elem) => typeof elem == 'string' ? elem.replace(/%20/g, ' ') : elem);
        }
    });
    return obj;
}
exports.extractMetadata = extractMetadata;
//# sourceMappingURL=telegram-formatters.js.map