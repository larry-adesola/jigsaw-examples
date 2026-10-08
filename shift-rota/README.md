# Shift rota

**How do I put a rota online so only my four staff can open it?**

A list of who is working on which day. Everyone you add sees the same rota. Editors add and remove shifts; viewers only read it.

## Publish it

1. Connect Jigsaw to your AI agent: [jigsawapps.com/agents](https://jigsawapps.com/agents)
2. Open this folder and say "publish this to Jigsaw".
3. On the app's sharing page, add your staff by email as viewers or editors.

## What it shows

- A shared list, kept by Jigsaw's data API at `/_jigsaw/data/shifts`. The page has no database and no server.
- Roles. Jigsaw refuses a viewer's changes, and the page hides the form from viewers.
- No login code. Jigsaw signs each person in before the page loads, and `/_jigsaw/me` tells the page who they are.

An example app for [Jigsaw](https://jigsawapps.com). More in the [examples repository](https://github.com/larry-adesola/jigsaw-examples).
