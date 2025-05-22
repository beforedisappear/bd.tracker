#!/bin/sh

echo "Updating next static files in volume /static..."

rm -rf /static/*

cp -r /app/.next/static/* /static/

echo "Next static files updated."

exec "$@"
