import { saveDecks } from "../dist/index.js";

/** with the folder as an argument (undefined = root folder only), save the decks
 * to the store. */
saveDecks({ path: ".store", folder: process.argv[2], exports: true });
