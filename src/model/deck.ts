import type { Card, Color } from "./card";

export type User = {
  userName: string;
  displayName: string;
  profileImageUrl: string;
  badges: string[];
};

export type DeckList = {
  decks: DeckMeta[];
};

export type DeckMeta = {
  areCommentsEnabled: boolean;
  authors: User[];
  authorsCanEdit: boolean;
  colorIdentity: Color[];
  colorIdentityPercentages: ColorPercentages;
  colorPercentages: ColorPercentages;
  colors: Color[];
  commentCount: number;
  createdAtUtc: string;
  createdByUser: User;
  folder?: Folder;
  format: Format;
  hasPrimer: boolean;
  hubNames: string[];
  id: string;
  isLegal: boolean;
  isPinned: boolean;
  isShared: boolean;
  lastUpdatedAtUtc: string;
  likeCount: number;
  mainCardId: string;
  mainCardIdIsBackFace: boolean;
  mainCardIdIsCardFace: boolean;
  mainboardCount: number;
  maybeboardCount: number;
  name: string;
  publicId: string;
  publicUrl: string;
  sfwCommentCount: number;
  sideboardCount: number;
  viewCount: number;
  visibility: string;
};

export type ColorPercentages = {
  white: number;
  blue: number;
  black: number;
  red: number;
  green: number;
};

export type Folder = {
  id: string;
  name: string;
};

export type Deck = {
  affiliates: {
    [key: string]: string;
  };
  allowPrimerClone: boolean;
  areCommentsEnabled: boolean;
  authorTags: unknown;
  authors: User[];
  authorsCanEdit: boolean;
  boards: {
    attractions: Board;
    commanders: Board;
    companions: Board;
    contraptions: Board;
    mainboard: Board;
    maybeboard: Board;
    planes: Board;
    schemes: Board;
    sideboard: Board;
    signatureSpells: Board;
    stickers: Board;
  };
  colorIdentity: Color[];
  colorIdentityPercentages: ColorPercentages;
  colorPercentages: ColorPercentages;
  colors: Color[];
  commentCount: number;
  createdAtUtc: string;
  createdByUser: User;
  description: string;
  enableMultiplePrintings: boolean;
  exportId: string;
  format: Format;
  hubs: unknown[];
  id: string;
  includeBasicLandsInPrice: boolean;
  includeCommandersInPrice: boolean;
  includeSignatureSpellsInPrice: boolean;
  isShared: boolean;
  isTooBeaucoup: boolean;
  lastUpdatedAtUtc: string;
  likeCount: number;
  main: Card;
  mainCardIdIsBackFace: boolean;
  media: unknown[];
  name: string;
  ownerUserId: string;
  publicId: string;
  publicUrl: string;
  requestedAuthors: unknown[];
  sfwCommentCount: number;
  tokens: Card[];
  version: number;
  viewCount: number;
  visibility: string;
};

export type Format =
  | "alchemy"
  | "brawl"
  | "commander"
  | "duel"
  | "explorer"
  | "future"
  | "gladiator"
  | "historic"
  | "historicbrawl"
  | "legacy"
  | "modern"
  | "oathbreaker"
  | "oldschool"
  | "pauper"
  | "paupercommander"
  | "penny"
  | "pioneer"
  | "predh"
  | "premodern"
  | "standard"
  | "standardbrawl"
  | "timeless"
  | "vintage";

export type Board = {
  count: number;
  cards: {
    [key: string]: BoardCard;
  };
};

export type BoardCard = {
  boardType: BoardType;
  card: Card;
  excludedFromColor: boolean;
  finish: string;
  isAlter: boolean;
  isCompanion: boolean;
  isFoil: boolean;
  isProxy: boolean;
  quantity: number;
  useCmcOverride: boolean;
  useColorIdentityOverride: boolean;
  useManaCostOverride: boolean;
};

export type BoardType =
  | "attractions"
  | "commanders"
  | "companions"
  | "contraptions"
  | "mainboard"
  | "maybeboard"
  | "planes"
  | "schemes"
  | "sideboard"
  | "signatureSpells"
  | "stickers";
