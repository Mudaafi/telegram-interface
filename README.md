# telegram-interface

An NPM package for interfacing with the Telegram Bot API
TypeScript Support Available

## !! Work in Progress

This is the very first npm library I've made and it's still in the early stages so not all methods on the Telegram Bot API are available. I've been re-using this codebase a lot so its about time I made it a package instead of copy-pasting what I need for every new project.

Full documentation coming soon.

# Usage

There are two main ways to use this library: 1) Via the Wrapper Class or 2) Via the Functions

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

# Notes for myself

Yes, I know this is a public-facing repo.

## Workflow

Edits can be done normally and committed locally normally. If you're intending to publish to npm, don't push to remote just yet.

Also, I'm not quite sure why I committed the lib folder but it is what it is. I'll prob take it out in the future.

To publish to NPM, you have to have a clean git working directory. Do not build first. The following commands should do it.

Mark the current git HEAD as a new version. `patch` is used here for small changes, `minor` for new features/functonality, `major` for overhauls
`npm version patch -m <COMMIT_MESSAGE>`

Login to NPM
`npm login`

Publish to NPM
`npm publish`

Push new commits to GitHub
`git push`

## Todos

- [ ] Why is the lib folder on GitHub? Take it out.
- [ ] Workflow should be branch -> commits -> PR -> Merge -> Pull master to version and npm publish and push back to master
- [ ] Why pull master when you can just github actions to publish to npm?
