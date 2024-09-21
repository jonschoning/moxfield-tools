import { savePublicDeck } from "../dist/index.js";

/** with the deck's publicid as an argument, save the deck to the store */
savePublicDeck({ path: ".store", publicid: process.argv[2], exports: true });
