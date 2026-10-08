# Stock count

**How do two of us keep one stock count without emailing a spreadsheet back and forth?**

A list of items, each with a count and a plus and a minus button. Everyone you add sees the same numbers, and the page looks for changes every few seconds.

## Publish it

1. Connect Jigsaw to your AI agent: [jigsawapps.com/agents](https://jigsawapps.com/agents)
2. Open this folder and say "publish this to Jigsaw".
3. On the app's sharing page, add the people who count by email as editors, and anyone who only needs to look as a viewer.

## What it shows

- Changing a record. `PUT /_jigsaw/data/items/<id>` replaces the whole record, so the page sends the name back with the new count.
- Several people on the same data. The page asks again every five seconds, so one person sees the other's changes.
- Roles. Viewers see the counts without the buttons, and Jigsaw refuses their changes whatever the page does.

An example app for [Jigsaw](https://jigsawapps.com). More in the [examples repository](https://github.com/larry-adesola/jigsaw-examples).
