export const isEqual = (value: unknown, other: unknown): boolean => {
  if (value === other) {
    return true;
  }

  if (typeof value !== typeof other) {
    return false;
  }

  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    for (const [i, element] of value.entries()) {
      if (!isEqual(element, other[i])) {
        return false;
      }
    }

    return true;
  }

  if (
    typeof value === 'object' &&
    typeof other === 'object' &&
    value !== null &&
    other !== null
  ) {
    const valueObj = value as Record<string, unknown>;
    const otherObj = other as Record<string, unknown>;
    const valueKeys = Object.keys(valueObj);
    const otherKeys = Object.keys(otherObj);

    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    return valueKeys.every(
      (key) =>
        Object.hasOwn(otherObj, key) && isEqual(valueObj[key], otherObj[key])
    );
  }

  return value === other;
};
