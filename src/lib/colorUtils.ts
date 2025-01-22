function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const textColors: string[] = [
  "#FFFFFF", // White
  "#000000", // Black
];

export function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = getLuminance(r, g, b);

  let index = 0;
  if (luminance > 0.5) index = 1;
  return textColors[index];
}

export function generateContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = getLuminance(r, g, b);

  if (luminance > 0.5) {
    return `#${((1 << 24) | ((255 - r) << 16) | ((255 - g) << 8) | (255 - b))
      .toString(16)
      .slice(1)}`;
  } else {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }
}

export function generateComplementaryColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);

  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  return `#${((1 << 24) | (compR << 16) | (compG << 8) | compB)
    .toString(16)
    .slice(1)}`;
}
