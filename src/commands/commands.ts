import { getDeck, getDecklist, getDecksByFolder } from "../api";
import {
  type DeckExportType,
  type ExportType,
  readDecks,
  writeDeckList,
  writeDecks,
  writeExports,
} from "../store";

/** saves & exports moxfield decks */
export async function saveDecks(props: {
  /** store filepath */
  path: string;
  /** moxfield folder to save; saves root folder only if undefined */
  folder?: string;
  /** write all exports if true, or named exports if array. */
  exports?: boolean | ExportType[];
}): Promise<void> {
  try {
    const decklist = await getDecklist();
    await writeDeckList({ storePath: props.path, decklist });

    const decks = await getDecksByFolder({
      decklist,
      folder: props.folder,
      callback: async ({ deck, folder }) => {
        await writeDecks({
          storePath: props.path,
          decks: [{ deck, folder }],
        });
        if (props.exports) {
          await writeExports({
            storePath: props.path,
            decks: [{ deck, folder }],
            exports: Array.isArray(props.exports)
              ? props.exports
              : ["moxfield", "mtgo", "cockatrice" /*, "deckstat"*/],
          });
        }
      },
    });
    if (
      props.exports === true ||
      (Array.isArray(props.exports) && props.exports.includes("folderstat"))
    ) {
      await writeExports({
        storePath: props.path,
        decks: decks.map((deck) => ({ deck, folder: props.folder })),
        exports: ["folderstat"],
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/** saves & exports public moxfield decks */
export async function savePublicDeck(props: {
  /** store filepath */
  path: string;
  /** deckid */
  publicid: string;
  /** write all exports if true, or named exports if array. */
  exports?: boolean | DeckExportType[];
}): Promise<void> {
  try {
    const deck = await getDeck(props.publicid, false);

    await writeDecks({
      storePath: props.path,
      decks: [{ deck }],
    });
    if (props.exports) {
      await writeExports({
        storePath: props.path,
        decks: [{ deck }],
        exports: Array.isArray(props.exports)
          ? props.exports
          : ["moxfield", "mtgo", "cockatrice" /*, "deckstat"*/],
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function exportDecks(props: {
  /** store filepath */
  path: string;
  user_name: string;
  folder?: string;
  /** write all exports if true, or named exports if array. */
  exports?: DeckExportType[];
}): Promise<void> {
  try {
    const decks = await readDecks({
      storePath: props.path,
      user_name: props.user_name,
      folder: props.folder,
    });

    await writeExports({
      storePath: props.path,
      decks: decks.map((deck) => ({ deck, folder: props.folder })),
      exports: Array.isArray(props.exports)
        ? props.exports
        : ["moxfield", "mtgo", "cockatrice", /*"deckstat", */ "folderstat"],
    });
  } catch (e) {
    console.log(e);
  }
}
