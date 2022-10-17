export function removeDuplicateKeyInObjectArrayHelper<T>(
  arr: T[],
  key: string,
): T[] {
  // @ts-ignore
  return [...new Map(arr.map(item => [item[key], item])).values()];
}
