import { type BoardCard, type Card, CardType, type Deck } from "../model";
import { toFixedFloat } from "./strings";

export function allBoardCards(deck: Deck): BoardCard[] {
  return Object.values(deck.boards).flatMap((_) => Object.values(_.cards));
}

export function allCards(deck: Deck): Card[] {
  return allBoardCards(deck)
    .map((_) => _.card)
    .concat(deck.tokens);
}

export function commanderCards(deck: Deck): BoardCard[] {
  return Object.values(deck.boards.commanders.cards);
}
export function mainboardCards(deck: Deck): BoardCard[] {
  return Object.values(deck.boards.mainboard.cards);
}
/** commanderCards and mainboardCards  */
export function edhCards(deck: Deck): BoardCard[] {
  return [...commanderCards(deck), ...mainboardCards(deck)];
}

export function mainboardCount(
  deck: Deck,
  predicate: (b: BoardCard) => boolean = () => true
): number {
  return mainboardCards(deck).reduce(
    (res, _) => res + (predicate(_) ? _.quantity : 0),
    0
  );
}

export function nonlandCount(deck: Deck, mdfc: boolean = false): number {
  return mainboardCount(deck, (b) => !isLand(b.card, mdfc));
}
export function nonlandCards(deck: Deck, mdfc: boolean = false): BoardCard[] {
  return mainboardCards(deck).filter((_) => !isLand(_.card, mdfc));
}

export function isLand(card: Card, mdfc: boolean = false): boolean {
  return (
    card.type === CardType.Land ||
    (mdfc && card.layout === "modal_dfc" && card.type_line.includes("Land"))
  );
}

const _cardTypes: [string, CardType][] = [
  ["planeswalker", CardType.Planeswalker],
  ["battle", CardType.Battle],
  ["artifact", CardType.Artifact],
  ["creature", CardType.Creature],
  ["enchantment", CardType.Enchantment],
  ["instant", CardType.Instant],
  ["sorcery", CardType.Sorcery],
  ["land", CardType.Land],
];
export function cardTypes(nonland: boolean = false): [string, CardType][] {
  const r = [..._cardTypes];
  if (nonland) {
    r.pop();
  }
  return r;
}

export function deckValueUsd(deck: Deck): number {
  return [...edhCards(deck)].reduce((deckValue, _) => {
    let usd =
      _.finish === "etched"
        ? _.card.prices.usd_etched
        : _.finish === "foil"
          ? _.card.prices.usd_foil
          : _.card.prices.usd;
    if (usd == undefined || isNaN(usd)) {
      usd = 0;
    }
    return deckValue + _.quantity * usd;
  }, 0);
}

export function cmcAvg(deck: Deck): number {
  return toFixedFloat(
    nonlandCards(deck).reduce((acc, _) => acc + _.quantity * _.card.cmc, 0) /
      nonlandCount(deck)
  );
}

export function cmcDistribution(deck: Deck): Record<number, number> {
  return nonlandCards(deck).reduce<Record<number, number>>((acc, _) => {
    acc[_.card.cmc] = (acc[_.card.cmc] ?? 0) + _.quantity;
    return acc;
  }, {});
}

export function cmcDistributionG(
  cmcDist: Record<number, number>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(cmcDist).map(([k, v]) => [k, Array(v).fill("*").join("")])
  );
}

export function typeDistribution(
  deck: Deck,
  land_mdfc: boolean = false
): Record<string, number> {
  return {
    ...cardTypes().reduce(
      (acc, [sType, eType]) => ({
        ...acc,
        [sType]: mainboardCount(deck, (_) => _.card.type === eType),
      }),
      {}
    ),
    ...(land_mdfc
      ? { land_mdfc: mainboardCount(deck, (_) => isLand(_.card, true)) }
      : {}),
  };
}
