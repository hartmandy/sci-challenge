export type CardData = {
  id: string; // NOTE: Added id
  set: string;
  number: string;
  name: string;
  type: string;
  aspects: string[];
  traits: string[];
  arenas: string[];
  cost: number;
  power: number;
  hp: string; // NOTE: changed to type string
  fronttext: string;
  doublesided: boolean;
  rarity: string;
  unique: boolean;
  artist: string;
  varianttype: string;
  marketprice: string;
  foilprice: string;
  frontArt: string;
};
