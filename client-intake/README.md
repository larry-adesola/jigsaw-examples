# Client intake

**How does my team log new clients in one place that only we can open?**

A short form for each new client: their name, how to reach them and what they need. The newest client is at the top. Everyone you add can read the list; editors can add to it.

## Publish it

1. Connect Jigsaw to your AI agent: [jigsawapps.com/agents](https://jigsawapps.com/agents)
2. Open this folder and say "publish this to Jigsaw".
3. On the app's sharing page, add your team by email. Make the people who take enquiries editors, and anyone who only reads the list a viewer.

## What it shows

- A form whose entries are stored by Jigsaw's data API at `/_jigsaw/data/clients`.
- Who added each entry and when: Jigsaw records `createdBy` and `createdAt` on every record.
- Everyone with access can read every entry. Roles decide who can change data, not who can see it, so this is for a team's shared list and not for a form strangers fill in.

An example app for [Jigsaw](https://jigsawapps.com). More in the [examples repository](https://github.com/larry-adesola/jigsaw-examples).
