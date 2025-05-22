#!/bin/sh

echo "Cleaning /static (volume)..."
rm -rf /static/* /static/.* 2>/dev/null || true

echo "Copying fresh static files to volume..."
cp -r /app/.next/static/* /static/

echo "Updating access rights..."
chown -R nextjs:nodejs /static

echo "Static files updated."

exec "$@"
