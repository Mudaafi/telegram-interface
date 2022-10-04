import { TeleInlineKeyboard, TeleMessageEntities } from './@types/telegram-types';
export declare function genInlineButtons(buttonArr: Array<Array<string>>, callbackArr: Array<string> | Array<Array<string>>): TeleInlineKeyboard;
export declare function genInlineUrlButtons(buttonArr: Array<Array<string>>, callbackArr: Array<string> | Array<Array<string>>, urlArr: Array<string> | Array<Array<string>>): TeleInlineKeyboard;
export declare function convertToHTML(textMsg: string, formatting?: [TeleMessageEntities]): string;
export declare const cleanseString: (string: string) => string;
export declare function embedMetadata(metadata: string | object, text: string): string;
export declare function extractMetadata(text: string): string | object | null;
