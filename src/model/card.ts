export type Card = {
  acorn: boolean;
  artist: string;
  border_color: Border;
  cardHoarderUrl: string;
  cardKingdomUrl: string;
  cardMarketUrl: string;
  cardTraderUrl: string;
  card_faces: CardFace[];
  cardkingdom_id: number;
  cardmarket_id: number;
  cmc: number;
  cn: string;
  color_identity: Color[];
  color_indicator: string[];
  colors: Color[];
  colorshifted: boolean;
  content_warning: boolean;
  coolStuffIncUrl: string;
  defaultFinish: string;
  defense?: string;
  digital: boolean;
  edhrec_rank: number;
  etched: boolean;
  flavor_text?: string;
  foil: boolean;
  frame: string;
  frame_effects?: FrameEffect[];
  glossy: boolean;
  has_arena_legal: boolean;
  has_multiple_editions: boolean;
  id: string;
  image_seq: number;
  isArenaLegal: boolean;
  isToken: boolean;
  lang: string;
  latest: boolean;
  layout: Layout;
  legalities: {
    [key: string]: Legality;
  };
  loyalty?: string;
  mana_cost: string;
  multiverse_ids: number[];
  name: string;
  nonfoil: boolean;
  oracle_text: string;
  power?: string;
  prices: {
    usd?: number;
    usd_foil?: number;
    usd_etched?: number;
    eur: number;
    ck: number;
    lastUpdatedAtUtc: string;
    ck_buy: number;
    ck_buy_qty: number;
    csi: number;
    csi_buy: number;
    csi_buy_qty: number;
    ct: number;
    scg: number;
    scg_qty: number;
    scg_buy: number;
  };
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  promo_types: PromoType[];
  rarity: Rarity;
  released_at: string;
  reprint: boolean;
  reserved: boolean;
  scryfall_id: string;
  set: string;
  set_name: string;
  set_type: SetType;
  starcitygames_sku: string;
  starcitygames_url: string;
  tcgPlayerUrl: string;
  tcgplayer_id: number;
  toughness?: string;
  type: CardType;
  type_line: string;
  uniqueCardId: string;
  watermark?: string;
};

export type CardFace = Pick<
  Card,
  | "color_indicator"
  | "colors"
  | "defense"
  | "flavor_text"
  | "id"
  | "image_seq"
  | "loyalty"
  | "mana_cost"
  | "name"
  | "oracle_text"
  | "power"
  | "printed_name"
  | "printed_text"
  | "printed_type_line"
  | "toughness"
  | "type_line"
  | "watermark"
>;

export type Color = "W" | "U" | "B" | "R" | "G";

export enum CardType {
  Battle = "1",
  Planeswalker = "2",
  Creature = "3",
  Sorcery = "4",
  Instant = "5",
  Artifact = "6",
  Enchantment = "7",
  Land = "8",
  Token = "12",
}

export type Layout =
  | "adventure"
  | "art_series"
  | "augment"
  | "class"
  | "double_faced_token"
  | "double_sided"
  | "emblem"
  | "flip"
  | "host"
  | "leveler"
  | "meld"
  | "modal_dfc"
  | "normal"
  | "planar"
  | "saga"
  | "scheme"
  | "split"
  | "token"
  | "transform"
  | "vanguard";

export type SetType =
  | "alchemy"
  | "archenemy"
  | "box"
  | "commander"
  | "core"
  | "draft_innovation"
  | "duel_deck"
  | "expansion"
  | "funny"
  | "masterpiece"
  | "masters"
  | "memorabilia"
  | "planechase"
  | "promo"
  | "spellbook"
  | "starter"
  | "token"
  | "treasure_chest";

export type Legality = "legal" | "not_legal" | "banned" | "restricted";

export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "mythic"
  | "special"
  | "bonus";

export type Border = "black" | "borderless" | "gold" | "silver" | "white";

export type FrameEffect =
  | "colorshifted"
  | "companion"
  | "compasslanddfc"
  | "convertdfc"
  | "devoid"
  | "draft"
  | "etched"
  | "extendedart"
  | "fandfc"
  | "inverted"
  | "legendary"
  | "lesson"
  | "miracle"
  | "mooneldrazidfc"
  | "moonreversemoondfc"
  | "nyxtouched"
  | "originpwdfc"
  | "shatteredglass"
  | "showcase"
  | "snow"
  | "spree"
  | "sunmoondfc"
  | "tombstone"
  | "upsidedowndfc";

export type PromoType =
  | "alchemy"
  | "boosterfun"
  | "bringafriend"
  | "confettifoil"
  | "arenaleague"
  | "buyabox"
  | "convention"
  | "datestamped"
  | "dossier"
  | "draftweekend"
  | "duels"
  | "event"
  | "fnm"
  | "gameday"
  | "gateway"
  | "giftbox"
  | "instore"
  | "invisibleink"
  | "intropack"
  | "judgegift"
  | "league"
  | "openhouse"
  | "planeswalkerdeck"
  | "playerrewards"
  | "premiereshop"
  | "prerelease"
  | "promopack"
  | "raisedfoil"
  | "rebalanced"
  | "release"
  | "ripplefoil"
  | "scroll"
  | "setpromo"
  | "silverfoil"
  | "stamped"
  | "stepandcompleat"
  | "surgefoil"
  | "textured"
  | "thick"
  | "starterdeck"
  | "tourney"
  | "wizardsplaynetwork";
