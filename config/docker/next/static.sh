#!/bin/sh

if [ ! "$(ls -A /static)" ]; then
  echo "Static folder empty, copying static files..."
  cp -r /app/.next/static/* /static/
fi

exec "$@" 