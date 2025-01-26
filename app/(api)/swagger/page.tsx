import { SwaggerPageContent } from './content';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API documentation',
};

export default function SwaggerPage() {
  return <SwaggerPageContent />;
}
