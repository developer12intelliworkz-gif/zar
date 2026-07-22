type NamedCategory = {
  name: string;
  slug: string;
};

function categoryHaystack(category: NamedCategory): string {
  return `${category.name} ${category.slug}`.trim().toLowerCase();
}

function matchesAny(haystack: string, terms: string[]): boolean {
  return terms.some((term) => haystack.includes(term));
}

function getCategoryMenuOrder(category: NamedCategory): number {
  const haystack = categoryHaystack(category);

  if (matchesAny(haystack, ['bangle', 'bracelet'])) {
    return 0;
  }

  if (matchesAny(haystack, ['earring'])) {
    return 5;
  }

  if (matchesAny(haystack, ['ring'])) {
    return 1;
  }

  if (matchesAny(haystack, ['men'])) {
    return 2;
  }

  if (matchesAny(haystack, ['pendant'])) {
    return 3;
  }

  if (matchesAny(haystack, ['mangalsutra', 'necklace'])) {
    return 4;
  }

  return 99;
}

export function sortCategoriesForMenu<T extends NamedCategory>(categories: T[]): T[] {
  return [...categories].sort((left, right) => {
    const orderDiff = getCategoryMenuOrder(left) - getCategoryMenuOrder(right);

    if (orderDiff !== 0) {
      return orderDiff;
    }

    return left.name.localeCompare(right.name);
  });
}
