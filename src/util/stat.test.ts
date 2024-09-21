import { promises as fs } from "fs";

import { CardType } from "../model";
import { readDecks } from "../store";
import { allCards, mainBoardCards } from "./deck";
import { hyp } from "./stat";

let storePath = ".store";
const libStorePath = "lib/moxfield-tools/.store";
await fs.access(storePath, fs.constants.F_OK).catch(() => {
  storePath = libStorePath;
});

describe("stat tests", () => {
  it("hyp passes", () => {
    // chance for 3 or more successes, pop: 99, succ in pop: 35, succ in samp: 7
    const val = hyp(3, 99, 35, 7);
    expect(val.toFixed(3)).toBe("0.477");
  });
  it.skip("prop dist", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    const set = new Set<string>();
    for (const deck of decks) {
      const allcards = allCards(deck);
      for (const card of allcards) {
        set.add(card.type);
        // for (const x of card.promo_types) {
        //   set.add(x);
        // }
      }
    }
    console.log(set);

    expect(true).toBe(true);
  });
  it.skip("hyp lands", async () => {
    const decks = await readDecks({ user_name: "test", storePath });
    const deck = decks[5];
    const maincards = mainBoardCards(deck);
    const landQty = maincards.reduce((xs, { quantity, card }) => {
      const predicate =
        (card.type == CardType.Land ||
          (card.layout == "modal_dfc" && card.type_line.includes("Land"))) &&
        !(card.name == "Maze of Ith");
      return xs + (predicate ? quantity : 0);
    }, 0);
    console.log(deck.name);
    console.log(landQty);
    const val = hyp(3, 99, landQty, 7);
    console.log((val * 100).toFixed(1));
    expect(true).toBe(true);
  });
});
