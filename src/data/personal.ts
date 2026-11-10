import type { Lang } from "../i18n";

/** Texto que existe en ambos idiomas del sitio. */
export type LocalizedText = Record<Lang, string>;

export interface Series {
  title: string;
  genre: LocalizedText;
  description: LocalizedText;
}

/** Equipo favorito. Sin escudo: los colores del club son solo decoración. */
export const favoriteTeam = {
  name: "FC Barcelona",
  chips: ["Blaugrana", "La Liga", "Visca el Barça"],
};

export const series: Series[] = [
  {
    title: "El Mentalista",
    genre: { es: "Policial", en: "Crime" },
    description: {
      es: "Un consultor que resuelve crímenes leyendo a las personas.",
      en: "A consultant who solves crimes by reading people.",
    },
  },
  {
    title: "Lucifer",
    genre: { es: "Fantasía", en: "Fantasy" },
    description: {
      es: "El diablo, retirado en Los Ángeles, colabora con la policía.",
      en: "The devil, retired in Los Angeles, teams up with the police.",
    },
  },
  {
    title: "Suits",
    genre: { es: "Drama legal", en: "Legal drama" },
    description: {
      es: "Abogados de Nueva York: ingenio, estrategia y ambición.",
      en: "New York lawyers: wit, strategy and ambition.",
    },
  },
  {
    title: "Breaking Bad",
    genre: { es: "Drama criminal", en: "Crime drama" },
    description: {
      es: "Un profesor de química y su caída en el mundo criminal.",
      en: "A chemistry teacher and his descent into the criminal world.",
    },
  },
];
