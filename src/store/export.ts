import { dump as yaml_dump } from "js-yaml";

import { type BoardCard, type Deck } from "../model";
import {
  cmcAvg,
  cmcDistribution,
  cmcDistributionG,
  deckValueUsd,
  mainboardCount,
  normalize,
  toFixedFloat,
  toSorted,
  typeDistribution,
} from "../util";

/** toMoxfieldTxtFormat */
export function toMoxfieldTxtExport(props: { deck: Deck }): string {
  function format(boardCards: BoardCard[]) {
    return toSorted(boardCards, (a, b) =>
      a.card.name.localeCompare(b.card.name)
    ).map((_) =>
      [
        _.quantity.toString(),
        _.card.name,
        `(${_.card.set.toUpperCase()})`,
        _.card.cn,
        _.finish === "etched" ? "*E*" : _.finish === "foil" ? "*F*" : undefined,
        props.deck.authorTags[_.card.name]?.map((_) => "#" + _).join(" "),
      ]
        .filter((_) => _)
        .join(" ")
    );
  }
  const mainboard = format(Object.values(props.deck.boards.mainboard.cards));
  const commanders = format(Object.values(props.deck.boards.commanders.cards));

  return [commanders.join("\n"), mainboard.join("\n")].join("\n");
}

/** toMtgoTxtFormat */
export function toMtgoTxtExport(props: { deck: Deck }): string {
  function toName(boardCard: BoardCard) {
    const name =
      boardCard.card.card_faces.length > 0
        ? boardCard.card.card_faces[0].name
        : boardCard.card.name;
    return normalize(name);
  }
  function format(boardCards: BoardCard[]) {
    return toSorted(boardCards, (a, b) =>
      a.card.name.localeCompare(b.card.name)
    ).map((_) => `${_.quantity.toString()} ${toName(_)}`);
  }
  const mainboard = format(Object.values(props.deck.boards.mainboard.cards));
  const commanders = format(Object.values(props.deck.boards.commanders.cards));

  return [mainboard.join("\n"), commanders.join("\n")].join("\n\n");
}

/** toCockatriceFormat */
export function toCockatriceExport(props: { deck: Deck }): string {
  function toName(boardCard: BoardCard) {
    return boardCard.card.card_faces.length > 0 &&
      ["transform", "modal_dfc", "flip"].includes(boardCard.card.layout)
      ? boardCard.card.card_faces[0].name
      : boardCard.card.name;
  }
  function format(boardCards: BoardCard[]) {
    return toSorted(boardCards, (a, b) =>
      a.card.name.localeCompare(b.card.name)
    ).map(
      (_) => `<card number="${_.quantity.toString()}" name="${toName(_)}"/>`
    );
  }
  const mainboard = format(Object.values(props.deck.boards.mainboard.cards));
  const commanders = format(Object.values(props.deck.boards.commanders.cards));

  const cod = `<?xml version="1.0" encoding="UTF-8"?>
<cockatrice_deck version="1">
  <deckname>${props.deck.name}</deckname>
  <comments>${props.deck.publicUrl}</comments>
  <zone name="main">
    ${mainboard.join("\n    ")}
  </zone>
  <zone name="side">
    ${commanders.join("\n    ")}
  </zone>
</cockatrice_deck>`;

  return cod;
}

type FolderStat = {
  totalUsd: number;
  exportedAtUtc: string;
  decks: { [name: string]: DeckStat };
};
type DeckStat = {
  totalUsd: number;
  main: number;
  cmcAvg: number;
  cmcDist: Record<number, number>;
  cmcDistG: Record<number, string>;
  type?: Record<string, number>;
};

export function toFolderStatExport({
  decks,
  types = true,
}: {
  decks: { deck: Deck }[];
  types?: boolean;
}): string {
  const deckStat: FolderStat["decks"] = decks.reduce((acc, deck) => {
    const cmcDist = cmcDistribution(deck.deck);
    return {
      ...acc,
      [deck.deck.name]: {
        main: mainboardCount(deck.deck),
        ...(types ? { type: typeDistribution(deck.deck, true) } : {}),
        cmcAvg: cmcAvg(deck.deck),
        cmcDist,
        cmcDistG: cmcDistributionG(cmcDist),
        totalUsd: toFixedFloat(deckValueUsd(deck.deck)),
      } satisfies DeckStat,
    };
  }, {});
  return yaml_dump({
    exportedAtUtc: new Date().toISOString(),
    totalUsd: toFixedFloat(
      Object.values(deckStat).reduce((acc, deck) => acc + deck.totalUsd, 0)
    ),
    decks: deckStat,
  } satisfies FolderStat);
}
// export function toDeckStatExport(_props: { deck: Deck }): string {
//   // const mainboard = format(Object.values(props.deck.boards.mainboard.cards));
//   return "";
// }
