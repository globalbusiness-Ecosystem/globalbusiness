export const SEARCH_KEYWORDS = {
  'Real Estate': {
    exact: ['real estate'],
    keywords: ['property', 'villa', 'house', 'عقار', 'عقارات', 'شقة'],
  },
  'Gold': {
    exact: ['gold'],
    keywords: ['bullion', 'jewelry', 'ذهب', 'سبائك'],
  },
  'Motor': {
    exact: ['motor'],
    keywords: ['car', 'vehicle', 'سيارة', 'سيارات'],
  },
  'Aladdin AI': {
    exact: ['aladdin ai', 'aladdin'],
    keywords: ['ai', 'assistant', 'ذكاء اصطناعي'],
  },
  'Weavers': {
    exact: ['weavers'],
    keywords: ['textile', 'fabric', 'clothing', 'نسيج', 'أقمشة'],
  },
  'Dhualqarnayn': {
    exact: ['dhualqarnayn'],
    keywords: ['heritage', 'islamic', 'تراث'],
  },
  'PNC': {
    exact: ['pnc'],
    keywords: ['news', 'community', 'أخبار'],
  },
  'FourHands': {
    exact: ['fourhands', 'four hands'],
    keywords: ['furniture', 'handmade', 'أثاث'],
  },
  'em.pi': {
    exact: ['em.pi'],
    keywords: ['shopping', 'store', 'تسوق', 'متجر'],
  },
} as const;

export function normalizeSearch(query: string): string {
  return query.toLowerCase().trim();
}

export function findExactMatch(query: string): string | null {
  const normalized = normalizeSearch(query);
  
  for (const [platformName, keywordData] of Object.entries(SEARCH_KEYWORDS)) {
    if (keywordData.exact.some(exact => exact === normalized)) {
      return platformName;
    }
  }
  
  return null;
}

export function findMatchingPlatforms(query: string): string[] {
  if (!query.trim()) {
    return [];
  }

  const normalized = normalizeSearch(query);
  const matches: string[] = [];

  for (const [platformName, keywordData] of Object.entries(SEARCH_KEYWORDS)) {
    const allKeywords = [platformName.toLowerCase(), ...keywordData.exact, ...keywordData.keywords];
    
    if (allKeywords.some(keyword => keyword.includes(normalized) || normalized.includes(keyword))) {
      matches.push(platformName);
    }
  }

  return matches;
}
