import slugify from 'slugify';

export const getSlug = (name: string) => {
  return slugify(name, {
    lower: true,
    strict: true,
    locale: 'ru',
  });
};
