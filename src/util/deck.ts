import type { Deck } from "../model";

export function allBoardCards(deck: Deck) {
  return Object.values(deck.boards).flatMap((_) => Object.values(_.cards));
}

export function allCards(deck: Deck) {
  return allBoardCards(deck)
    .map((_) => _.card)
    .concat(deck.tokens);
}

export function mainBoardCards(deck: Deck) {
  return Object.values(deck.boards.mainboard.cards);
}
