import type { Deck, DeckList } from "../model";
import { getMoxfieldGot } from "./got";


const uris = {
  decks: "https://api2.moxfield.com/v3/decks",
  deck: "https://api2.moxfield.com/v3/decks/all/%PUBLICID%",
};

/** get decklist */
export async function getDecklist(): Promise<DeckList> {
  const g = getMoxfieldGot();
  return await g.get(uris.decks).json<DeckList>();
}

/** get deck by publicid */
export async function getDeck(
  publicId: string,
  require_access_token = true
): Promise<Deck> {
  const g = getMoxfieldGot(require_access_token);
  return await g.get(uris.deck.replace("%PUBLICID%", publicId)).json<Deck>();
}

/** get deck by deck name */
export async function getDeckByName({
  decklist,
  name,
}: {
  decklist?: DeckList;
  name: string;
}): Promise<Deck> {
  const list = decklist ?? (await getDecklist());
  const deckMeta = list.decks.find((_) => _.name == name);
  if (!deckMeta) throw new Error(`deck name ${name} not found in decklist`);
  return await getDeck(deckMeta.publicId);
}

/** If no folder name is passed, only gets root folder decks */
export async function getDecksByFolder({
  decklist,
  folder,
  callback,
}: {
  decklist?: DeckList;
  folder?: string;
  callback?: (o: { deck: Deck; folder?: string }) => Promise<void>;
} = {}): Promise<Deck[]> {
  const list = decklist ?? (await getDecklist());
  const deckMetas = list.decks.filter((_) => _.folder?.name === folder);
  const decks: Deck[] = [];
  for (const _ of deckMetas) {
    const deck = await getDeck(_.publicId);
    decks.push(deck);
    if (callback) await callback({ deck, folder });
    // await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_INTERVAL));
  }
  return decks;
}
