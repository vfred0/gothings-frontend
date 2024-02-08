export function getAllValues<T extends object, K extends keyof T>(
  enumeration: T
): T[K][] {
  return Object.values(enumeration).filter(
    value => typeof value === 'string'
  ) as T[K][];
}

export function getAllKeys<T extends object, K extends keyof T>(
  enumeration: T
): K[] {
  return Object.keys(enumeration).filter(
    key => typeof enumeration[key as K] === 'string'
  ) as K[];
}

export function containsValue<T extends object, K extends keyof T>(
  enumeration: T,
  value: string
): boolean {
  return getAllValues(enumeration).includes(value as T[K]);
}

export function toUpperSnakeCase(name: string): string {
  return name
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toUpperCase();
}

export function toCamelCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, firstChar => firstChar.toUpperCase())
    .replace(/\s/g, '');
}

export function getValue<T>(
  value: string,
  enumObject: T
): T[keyof T] | undefined {
  const camelCaseValue = toCamelCase(value) as keyof T;
  return enumObject[camelCaseValue];
}

export function getKey<T extends object, K extends keyof T>(
  enumeration: T,
  value: T[K]
): K | undefined {
  const key = getAllKeys(enumeration).find(
    key => enumeration[key] === value
  ) as K;
  return toUpperSnakeCase(key as string) as K;
}
