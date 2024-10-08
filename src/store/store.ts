import { promises as fs } from "fs";
import path from "path";

import type { Deck, DeckList } from "../model";
import {
  toCockatriceExport,
  toFolderStatExport,
  toMoxfieldTxtExport,
  toMtgoTxtExport,
} from "./export";

/** readDeckList */
export async function readDeckList(props: {
  user_name: string;
  storePath: string;
}): Promise<DeckList> {
  const dir = await getFolderpath({
    storePath: props.storePath,
    folders: [props.user_name, "decklists"],
  });
  const files = await fs.readdir(dir);
  const deckLists: DeckList[] = [];
  for (const filename of files) {
    if (filename.endsWith(".json")) {
      const content = await fs.readFile(path.join(dir, filename), "utf8");
      deckLists.push(JSON.parse(content) as DeckList);
    }
  }

  return deckLists[0];
}

/** writeDecksLists */
export async function writeDeckList(props: {
  storePath: string;
  decklist: DeckList;
}): Promise<void> {
  const user_name = props.decklist.decks[0].createdByUser.userName;
  const filePath = await getFilepath({
    storePath: props.storePath,
    folders: [user_name, "decklists"],
    filename: "main",
    ext: "json",
  });
  const content = toJson(props.decklist);
  await fs.writeFile(filePath, content, "utf8");
  console.log(`wrote ${filePath}`);
  return;
}

/** readDecks */
export async function readDecks(props: {
  user_name: string;
  storePath: string;
  folder?: string;
}): Promise<Deck[]> {
  const dir = await getFolderpath({
    storePath: props.storePath,
    folders: [props.user_name, "decks", props.folder ?? ""],
  });
  const files = await fs.readdir(dir);
  const decks: Deck[] = [];
  for (const filename of files) {
    if (filename.endsWith(".json")) {
      const content = await fs.readFile(path.join(dir, filename), "utf8");
      decks.push(JSON.parse(content) as Deck);
    }
  }

  return decks;
}

/** writeDecks */
export async function writeDecks(props: {
  storePath: string;
  decks: { deck: Deck; folder?: string }[];
}): Promise<void> {
  const user_name = props.decks[0].deck.createdByUser.userName;
  for (const deck of props.decks) {
    const filePath = await getFilepath({
      storePath: props.storePath,
      folders: [user_name, "decks", deck.folder ?? ""],
      filename: deck.deck.name,
      ext: "json",
    });
    const content = toJson(deck.deck);
    await fs.writeFile(filePath, content, "utf8");
    console.log(`wrote ${filePath}`);
  }
  return;
}

export type DeckExportType =
  | "moxfield"
  | "mtgo"
  | "cockatrice" /*| "deckstat"*/;
export type ExportType = "folderstat" | DeckExportType;

/** writeExports  */
export async function writeExports(props: {
  storePath: string;
  decks: { deck: Deck; folder?: string }[];
  exports?: ExportType[];
}): Promise<void> {
  async function write({
    content,
    folder,
    filename,
    ext,
  }: {
    content: string;
    folder?: string;
    filename: string;
    ext: string;
  }) {
    const user_name = props.decks[0].deck.createdByUser.userName;
    const filePath = await getFilepath({
      storePath: props.storePath,
      folders: [user_name, "exports", folder ?? ""],
      filename,
      ext,
    });
    await fs.writeFile(filePath, content, { encoding: "utf8" });
    console.log(`wrote ${filePath}`);
  }

  for (const deck of props.decks) {
    if (!props.exports || props.exports.includes("moxfield"))
      await write({
        content: toMoxfieldTxtExport(deck),
        folder: deck.folder,
        filename: deck.deck.name,
        ext: "txt",
      });
    if (!props.exports || props.exports.includes("mtgo"))
      await write({
        content: toMtgoTxtExport(deck),
        folder: deck.folder,
        filename: deck.deck.name,
        ext: "mtgo.txt",
      });
    if (!props.exports || props.exports.includes("cockatrice"))
      await write({
        content: toCockatriceExport(deck),
        folder: deck.folder,
        filename: deck.deck.name,
        ext: "cod",
      });
    // if (!props.exports || props.exports.includes("deckstat"))
    //   await write({
    //     content: toDeckStatExport(deck),
    //     folder: deck.folder,
    //     filename: deck.deck.name,
    //     ext: "stat.txt",
    //   });
  }

  if (props.exports?.includes("folderstat")) {
    await write({
      content: toFolderStatExport({ decks: props.decks, types: true }),
      folder: props.decks[0].folder,
      filename: "_folder",
      ext: "stat.yaml",
    });
  }

  return;
}

function toJson(o: object): string {
  return JSON.stringify(o, null, 2);
}

async function getFolderpath(props: {
  storePath: string;
  folders?: string[];
  mkdir?: boolean;
}) {
  const dir = path.join(props.storePath, ...(props.folders ?? []));
  if (props.mkdir) await fs.mkdir(dir, { recursive: true });
  return dir;
}

async function getFilepath(props: {
  storePath: string;
  folders?: string[];
  filename: string;
  ext: string;
}) {
  const dir = await getFolderpath({
    storePath: props.storePath,
    folders: props.folders,
    mkdir: true,
  });
  const filePath = path.join(
    dir,
    `${props.filename.replaceAll(" ", "")}.${props.ext}`
  );
  return filePath;
}
