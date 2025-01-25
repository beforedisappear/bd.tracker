'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { openApiSpec } from '../../../config/swagger/swagger.config';
// import dynamic from 'next/dynamic';

// const DynamicSwaggerUi = dynamic(() => import('swagger-ui-react'), {
//   ssr: false,
// });

export default function SwaggerPage() {
  return <SwaggerUI spec={openApiSpec} />;
}
