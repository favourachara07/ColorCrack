import { lightenDarkenColor } from "./lightenDarkenColor";

export  function generateShades(color) {
    let shades = [];
    for (let i = 0; i < 6; i++) {
      let shade = lightenDarkenColor(color, i * 20 - 50);
      shades.push(shade);
    }
    return shades;
  }