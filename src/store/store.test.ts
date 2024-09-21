import { promises as fs } from "fs";

import {
  readDeckList,
  readDecks,
  toCockatriceExport,
  toMoxfieldTxtExport,
  toMtgoTxtExport,
  writeExports,
} from ".";

let storePath = ".store";
const libStorePath = "lib/moxfield-tools/.store";

await fs.access(storePath, fs.constants.F_OK).catch(() => {
  storePath = libStorePath;
});

describe.skip("store test", () => {
  it("readDeckList passes", async () => {
    const decklist = await readDeckList({ user_name: "test", storePath });
    expect(decklist.decks.length).toBeGreaterThan(0);
    expect(decklist.decks[0].name.length).toBeGreaterThan(0);
  });
  it("readDecks passes", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    expect(decks[0].name.length).toBeGreaterThan(0);
    expect(decks.length).toBeGreaterThan(0);
  });

  it.skip("writeExports passes", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    await writeExports({ storePath, decks: decks.map((deck) => ({ deck })) });
    expect(true).toBe(true);
  });

  it("toMoxfieldTxtFormat passes", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    const result = toMoxfieldTxtExport({ deck: decks[0] });
    expect(result.length).toBeGreaterThan(0);
  });
  it("toMtgoTxtFormat passes", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    const result = toMtgoTxtExport({ deck: decks[0] });
    expect(result.length).toBeGreaterThan(0);
  });
  it("toCockatriceFormat passes", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    const result = toCockatriceExport({ deck: decks[0] });
    expect(result.length).toBeGreaterThan(0);
  });
});
