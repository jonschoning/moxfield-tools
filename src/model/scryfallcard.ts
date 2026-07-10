import type { Border, Color, FrameEffect, Layout, Legality, Rarity, SetType } from "./card";

export type ScryfallCard = {
  object: "card";

  id: string;
  oracle_id: string;

  multiverse_ids: number[];
  mtgo_id?: number;
  mtgo_foil_id?: number;
  tcgplayer_id?: number;
  cardmarket_id?: number;

  name: string;
  lang: string;
  released_at: string;

  uri: string;
  scryfall_uri: string;

  layout: Layout;

  highres_image: boolean;
  image_status: string;
  image_updated_at?: string;

  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };

  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;

  colors?: Color[];
  color_identity: Color[];
  color_indicator?: Color[];

  keywords: string[];

  legalities: {
    [key: string]: Legality;
  };

  games: ("paper" | "arena" | "mtgo")[];

  reserved: boolean;
  game_changer: boolean;

  foil: boolean;
  nonfoil: boolean;
  finishes: string[];

  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;

  set_id: string;
  set: string;
  set_name: string;
  set_type: SetType;

  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;

  rulings_uri: string;
  prints_search_uri: string;

  collector_number: string;

  digital: boolean;
  rarity: Rarity;

  flavor_text?: string;

  card_back_id?: string;

  artist: string;
  artist_ids: string[];
  illustration_id?: string;

  border_color: Border;
  frame: string;
  frame_effects?: FrameEffect[];

  security_stamp?: string;

  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;

  edhrec_rank?: number;

  prices: {
    usd: string | null;
    usd_foil: string | null;
    usd_etched: string | null;
    eur: string | null;
    eur_foil: string | null;
    tix: string | null;
  };

  related_uris: {
    gatherer?: string;
    edhrec?: string;
    tcgplayer_infinite_articles?: string;
    tcgplayer_infinite_decks?: string;
    [key: string]: string | undefined;
  };

  purchase_uris?: {
    tcgplayer?: string;
    cardmarket?: string;
    cardhoarder?: string;
    [key: string]: string | undefined;
  };

  card_faces?: CardFace[];

  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;

  power?: string;
  toughness?: string;
  loyalty?: string;
  defense?: string;

  watermark?: string;
};

export type CardFace = Pick<
  ScryfallCard,
  | "artist"
  | "color_indicator"
  | "colors"
  | "defense"
  | "flavor_text"
  | "illustration_id"
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
  | "image_uris"
>;