import { saveDecks } from "../dist/index.js";

const STORE_PATH = process.env.STORE_PATH;

/** with the folder as an argument (undefined = root folder only), save the decks
 * to the store. */
saveDecks({ path: STORE_PATH, folder: process.argv[2], exports: true });
