# Jigsaw examples

Small apps you can publish to Jigsaw (jigsawapps.com) by asking your AI agent.

Jigsaw hosts an app your agent built and lets you choose who can open it, like sharing a doc. Every app is private: the people you add by email sign in, and nobody else gets in. The app contains no login code.

## Publish one

1. Connect Jigsaw to your agent: [jigsawapps.com/agents](https://jigsawapps.com/agents)
2. Open an example's folder and say "publish this to Jigsaw".
3. On the app's sharing page, add people by email as viewers or editors.

## The examples

| App | The question it answers |
|---|---|
| [Shift rota](shift-rota/) | How do I put a rota online so only my four staff can open it? |
| [Stock count](stock-count/) | How do two of us keep one stock count without emailing a spreadsheet back and forth? |
| [Trip budget](trip-budget/) | How do I put a small app online that only I can open? |
| [Client intake](client-intake/) | How does my team log new clients in one place that only we can open? |
| [Reply drafter](reply-drafter/) | How do I share an app that calls an AI service without putting my API key in the page? |

Each one is a page app: an `index.html` and an `app.js`, with no build step, no server and no login code. Jigsaw signs each visitor in, stores the shared data and keeps secret keys out of the page. How that works is in the [guide for agents](https://jigsawapps.com/llms-full.txt).

## Licence

MIT. Copy any of these as a starting point.
