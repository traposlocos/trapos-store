import { Color } from "../Components/Dashboard/ProductUploads";

export const categories = [
  "buzos",
  "camisetas",
  "camperas",
  "canguros",
  "gorras",
  "musculosas",
  "manga larga",
  "tazas",
  "todos",
];

export const tshirtsSubCats: string[] = [
  "arte",
  "retro",
  "geek",
  "frases",
  "naturaleza",
  "cine y tv",
  "música",
  "humor",
  "política",
  "cultura",
];

export const sizes: string[] = ["XXL", "XL", "L", "M", "S"];

export const colors: Color[] = [
  { name: "azul", hex: "#1d4ed8" },
  { name: "negro", hex: "#171717" },
  { name: "gris", hex: "#6b7280" },
  { name: "blanco", hex: "#fafafa" },
  { name: "verde", hex: "#166534" },
  { name: "amarillo", hex: "#eab308" },
  { name: "rojo", hex: "#ef4444" },
];

export const icons = [
  {
    img: "/t-shirt.png",
    href: "/tienda/camisetas",
    category: "Camisetas",
  },
  {
    img: "/cap.png",
    href: "/tienda/gorras",
    category: "Gorras",
  },
  {
    img: "/hoodie.png",
    href: "/tienda/canguros",
    category: "Canguros",
  },
  {
    img: "/coffee-cup.png",
    href: "/tienda/tazas",
    category: "Tazas",
  },
];
