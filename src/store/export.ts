import type { BoardCard, Deck } from "../model";
import { normalize, toSorted } from "../util";

/** toMoxfieldTxtFormat */
export function toMoxfieldTxtExport(props: { deck: Deck }): string {
  function format(boardCards: BoardCard[]) {
    return toSorted(boardCards, (a, b) =>
      a.card.name.localeCompare(b.card.name)
    ).map(
      (_) =>
        `${_.quantity.toString()} ${_.card.name} (${_.card.set.toUpperCase()}) ${_.card.cn} ${_.isFoil ? "*F*" : ""}`
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
