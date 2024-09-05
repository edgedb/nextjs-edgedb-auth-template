#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

STORAGE_READINESS_POLLING_ATTEMPTS="${STORAGE_READINESS_POLLING_ATTEMPTS:-20}"
STORAGE_READINESS_POLLING_INTERVAL_SECONDS="${STORAGE_READINESS_POLLING_INTERVAL_SECONDS:-0.5}"

attempt_count=0

while [[ $attempt_count -lt $STORAGE_READINESS_POLLING_ATTEMPTS ]]; do
    if pnpm exec edgedb instance status -I="$EDGEDB_INSTANCE"; then
        break
    fi
    sleep "$STORAGE_READINESS_POLLING_INTERVAL_SECONDS"
    ((attempt_count++))
done

if [[ $attempt_count -eq $STORAGE_READINESS_POLLING_ATTEMPTS ]]; then
    echo "Maximum attempts ($STORAGE_READINESS_POLLING_ATTEMPTS) reached, could not connect to the storage instance."
    exit 1
fi

echo "Storage ready, running migrations and code generation."

./maybe-initialize-database.sh
pnpm exec edgedb migrate
pnpm run generate:all
