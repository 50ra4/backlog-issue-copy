type PrimitiveValue = string | number | boolean | undefined;
type QueryParameterValue = PrimitiveValue | null | PrimitiveValue[];

export type QueryParameter = Record<PropertyKey, QueryParameterValue>;

export const object2queryString = <T extends QueryParameter>(obj: T) => {
  const pairs: [string, string][] = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'undefined' || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'undefined') return;
        pairs.push([`${key}[]`, v.toString()]);
      });
      return;
    }

    pairs.push([key, value.toString()]);
  });

  if (!pairs.length) return '';

  return pairs.map(([key, value]) => `${key}=${value}`).join('&');
};
