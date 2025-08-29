export const bytesToMB = (bytes: number) => (bytes ? bytes / (1024 * 1024) : 0);

export const getCSSVariable = (name: string): string | null =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const generateBrandColors = (
  baseColor: string
): Record<string, string> => {
  if (!baseColor) return {};

  //convert hex to HSL
  const hexToHSL = (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  };

  const [h, s] = hexToHSL(baseColor);

  //  color varients
  const shades: Record<string, number> = {
    50: 95,
    100: 90,
    200: 80,
    300: 70,
    400: 60,
    500: 50,
    600: 40,
    700: 30,
    800: 20,
    900: 15,
    950: 9,
  };

  const result: Record<string, string> = {};

  Object.entries(shades).forEach(([key, lightness]) => {
    result[`--tt-brand-color-${key}`] = `hsl(${h}, ${s}%, ${lightness}%)`;
  });

  return result;
};

export const setBrandColors = () => {
  const updatedColor = getCSSVariable("--brand-color") || "#6229ff";
  const brandHoverColor = generateBrandColors(updatedColor);

  Object.entries(brandHoverColor).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};
