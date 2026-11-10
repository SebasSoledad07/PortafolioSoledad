import { es } from "./es";
import { en } from "./en";

export type Lang = "es" | "en";

export const dictionary = { es, en };

/** Devuelve el diccionario del idioma activo. */
export const getCopy = (lang: Lang) => dictionary[lang];

/** Ruta de la portada en cada idioma. */
export const homePath = (lang: Lang) => (lang === "es" ? "/" : "/en/");
