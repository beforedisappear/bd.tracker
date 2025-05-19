#!/bin/sh

echo "Applying database migrations..."
npm run db:pg:migrate:prod
