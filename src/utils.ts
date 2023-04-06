type QueryParameterValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean)[];

export type QueryParameter = Record<PropertyKey, QueryParameterValue>;

export const object2queryString = <T extends QueryParameter>(obj: T) => {
  const params = Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null || typeof value === 'undefined') {
      return acc;
    }
    acc.append(key, value.toString());
    return acc;
  }, new URLSearchParams());

  params.sort();
  return params.toString();
};