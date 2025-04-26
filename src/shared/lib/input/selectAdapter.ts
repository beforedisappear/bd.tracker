type ToSelectOptionsConfig<T> = {
  labelKey: keyof T;
  valueKey: keyof T;
};

export function selectAdapter<T>(items: T[], config: ToSelectOptionsConfig<T>) {
  const { labelKey, valueKey } = config;

  return items.map(item => ({
    name: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
}
