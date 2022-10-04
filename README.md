# telegram-interface

An NPM package for interfacing with the Telegram Bot API
TypeScript Support Available

## !! Work in Progress

This is the very first npm library I've made and it's still in the early stages so not all methods on the Telegram Bot API are available. I've been re-using this codebase a lot so its about time I made it a package instead of copy-pasting what I need for every new project.

Full documentation coming soon.

# Usage

There are two main ways to use this library.

## Wrapper Class

```
import { Telegram } from 'telegram-interface'

var tele = new Telegram(bot_key)
tele.parse_mode = 'HTML' // 'HTML' is the default. Can also use 'MarkdownV2'.

tele.sendMessage(chat_id, msg)
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err))
```

## Functions

```
import { sendMessage, genInlineButtons } from 'telegram-interface'
var btns = genInlineButtons([['1st row']['2nd row']], [[callback1], [callback2]])


sendMessage(botkey, chatId, text)
  .then(...)
  .catch(...)
sendMessage(bot_key, chat_id, text, btns, {parse_mode: 'MarkdownV2'})
  .then(...)
  .catch(...)

```
