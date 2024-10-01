import { savePublicDeck } from "../dist/index.js";

const STORE_PATH = process.env.STORE_PATH;

/** with the deck's publicid as an argument, save the deck to the store */
savePublicDeck({ path: STORE_PATH, publicid: process.argv[2], exports: true });
