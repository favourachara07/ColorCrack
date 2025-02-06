export function lightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let g = ((num >> 8) & 0x00FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    let b = (num & 0x0000FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }