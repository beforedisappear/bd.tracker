export const createQueryString = (
  params: Record<
    string,
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | undefined
    | null
    | Record<string, string | number | boolean>
  >,
) => {
  const queryParts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      const serializedArray = JSON.stringify(value);
      queryParts.push(`${key}=${serializedArray}`);
      return;
    }

    if (typeof value === 'object') {
      const serializedObject = JSON.stringify(value);
      queryParts.push(`${key}=${serializedObject}`);
      return;
    }

    queryParts.push(`${key}=${String(value)}`);
  });

  return queryParts.join('&');
};
