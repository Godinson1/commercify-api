#!/bin/sh

set -e

echo "run migration"
npm run migration:run

echo "start application"
exec $@