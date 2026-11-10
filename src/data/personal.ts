import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n";
import breakingBadPoster from "../assets/personal/series/breaking-bad.jpg";
import elMentalistaPoster from "../assets/personal/series/el-mentalista.jpg";
import luciferPoster from "../assets/personal/series/lucifer.jpg";
import suitsPoster from "../assets/personal/series/suits.jpg";
import fcbCrest from "../assets/personal/fcb/crest.png";
import fcbKit from "../assets/personal/fcb/kit-2627.jpg";

/** Texto que existe en ambos idiomas del sitio. */
export type LocalizedText = Record<Lang, string>;

export interface Series {
  title: string;
  genre: LocalizedText;
  description: LocalizedText;
  /** Portada oficial de la serie, importada desde src/assets para que Astro la optimice. */
  poster: ImageMetadata;
  posterAlt: LocalizedText;
}

export interface FavoriteTeam {
  name: string;
  chips: string[];
  /** Escudo del club; se usa como referencia visual, no como marca del sitio. */
  crest: ImageMetadata;
  crestAlt: LocalizedText;
  /** Camiseta local de la temporada 2026/27. */
  kit: ImageMetadata;
  kitAlt: LocalizedText;
  kitLabel: LocalizedText;
  info: LocalizedText;
}

export const favoriteTeam: FavoriteTeam = {
  name: "FC Barcelona",
  chips: ["Blaugrana", "La Liga", "Visca el Barça"],
  crest: fcbCrest,
  crestAlt: { es: "Escudo del FC Barcelona", en: "FC Barcelona crest" },
  kit: fcbKit,
  kitAlt: {
    es: "Camiseta local del FC Barcelona 2026/27",
    en: "FC Barcelona 2026/27 home jersey",
  },
  kitLabel: { es: "Local 26/27", en: "Home 26/27" },
  info: {
    es: "Fundado en 1899, compite en La Liga y juega como local en el Spotify Camp Nou.",
    en: "Founded in 1899, it competes in La Liga and plays its home matches at Spotify Camp Nou.",
  },
};

export const series: Series[] = [
  {
    title: "El Mentalista",
    genre: { es: "Policial", en: "Crime" },
    description: {
      es: "Un consultor que resuelve crímenes leyendo a las personas.",
      en: "A consultant who solves crimes by reading people.",
    },
    poster: elMentalistaPoster,
    posterAlt: {
      es: "Portada de la serie El Mentalista",
      en: "The Mentalist series poster",
    },
  },
  {
    title: "Lucifer",
    genre: { es: "Fantasía", en: "Fantasy" },
    description: {
      es: "El diablo, retirado en Los Ángeles, colabora con la policía.",
      en: "The devil, retired in Los Angeles, teams up with the police.",
    },
    poster: luciferPoster,
    posterAlt: {
      es: "Portada de la serie Lucifer",
      en: "Lucifer series poster",
    },
  },
  {
    title: "Suits",
    genre: { es: "Drama legal", en: "Legal drama" },
    description: {
      es: "Abogados de Nueva York: ingenio, estrategia y ambición.",
      en: "New York lawyers: wit, strategy and ambition.",
    },
    poster: suitsPoster,
    posterAlt: {
      es: "Portada de la serie Suits",
      en: "Suits series poster",
    },
  },
  {
    title: "Breaking Bad",
    genre: { es: "Drama criminal", en: "Crime drama" },
    description: {
      es: "Un profesor de química y su caída en el mundo criminal.",
      en: "A chemistry teacher and his descent into the criminal world.",
    },
    poster: breakingBadPoster,
    posterAlt: {
      es: "Portada de la serie Breaking Bad",
      en: "Breaking Bad series poster",
    },
  },
];
