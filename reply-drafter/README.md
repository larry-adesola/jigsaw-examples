# Reply drafter

**How do I share an app that calls an AI service without putting my API key in the page?**

Paste a message you received and get a drafted reply. The page calls the Anthropic API through Jigsaw. Your key is saved in Jigsaw and never reaches the browser.

## Publish it

1. Connect Jigsaw to your AI agent: [jigsawapps.com/agents](https://jigsawapps.com/agents)
2. Open this folder and say "publish this to Jigsaw".
3. On the app's sharing page, add the people who may use it. Each draft is a call on your key, so add only people you trust with it.

## Save your key

The app answers "This app has no key for api.anthropic.com" until you do this. On the app's Keys page in Jigsaw, save your Anthropic API key with:

- **Host the key is for:** `api.anthropic.com`
- **How the service expects it:** A header with another name
- **Header or parameter name:** `x-api-key`
- **Only for addresses starting with:** `/v1/messages`

Anyone you share the app with can make calls through it, so set a daily limit on the same page.

## What it shows

- Calling an outside API without holding its key. The page posts the request to `/_jigsaw/fetch`, and Jigsaw adds the key and returns the service's answer.
- A call that is refused until the owner saves a key: the page shows Jigsaw's own message, which names the host to save it for.
- The model is one line at the top of `app.js`. Change it to any model your key can use.

An example app for [Jigsaw](https://jigsawapps.com). More in the [examples repository](https://github.com/larry-adesola/jigsaw-examples).
