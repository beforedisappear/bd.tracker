import { SelectOption } from './Select.types';

export default { tags: ['hidden'] };

export const selectOptions: SelectOption[] = new Array(5)
  .fill('_')
  .map((_, i) => ({ name: `Name ${i}`, value: `value_${i}` }));
