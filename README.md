# moxfield-tools

tools for downloading, saving, and exporting decks from moxfield

## Getting Started

1. Ensure `node` version >= 18 is installed
2. From this folder:
3. Run `npm install`
4. Run `npm run build`
5. Copy the `.env.template` file in this folder to a new file: `.env`
6. Set the value of the `MOXFIELD_ACCESS_TOKEN` with the method below:

a). While logged into moxfield, refresh with Chrome DevTools open and filter the `Network` tab for `refresh`. One row should appear.

b) Click the `refresh` row & right-click the `access_token` property.

c) Select `Copy value` from the popup menu

d) Paste the copied value after `MOXFIELD_ACCESS_TOKEN=` in the `.env` file

e) The token is only valid for 15 minutes. When it expires, follow this process again to get another token value

f) Run Command Scripts

## Command Scripts

- `npm run saveDecks`: Downloads the decks in your root moxfield folder into `.store/<userId>` u

- `npm run saveDecks -- MYFOLDER`: Download the decks in moxfield folder `MYFOLDER` into `.store/<userId>/MYFOLDER`

- `npm run savePublicDeck -- PUBLICID`: Download the deck with publicid `PUBLICID` into `.store/<userId>`

- `npm run exportDecks -- <userId>`: write exports for store folder `.store/<userId>` decks into `.store/<userId>/exports`

- `npm run exportDecks -- <userId> MYFOLDER`: as above, but for store folder `.store/<userId>/MYFOLDER`
