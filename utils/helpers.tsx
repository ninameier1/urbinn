export function isValidColor(color: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

export function getThemeForIndex(index: number, total: number) {
  const hue = (360 / total) * index;
  return {
    mainColour: `hsl(${hue}, 88%, 73%)`,
    subColour:  `hsl(${hue}, 88%, 85%)`,
  };
}

export function slugify(title: string, maxWords = 6) {
  return title
    .toLowerCase()
    .replace(/[äàáâ]/g, 'a')
    .replace(/[ëèéê]/g, 'e')
    .replace(/[ïìíî]/g, 'i')
    .replace(/[öòóô]/g, 'o')
    .replace(/[üùúû]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, maxWords)
    .join('-');
}