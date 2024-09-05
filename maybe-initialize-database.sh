#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

# This script is used to configure the database for the first time. It checks if the database is
# brand new by seeing if the current schema is empty and the required auth configuration is also
# empty. If so, it will run migrations, and configure auth.

is_schema_empty() {
    local result
    result=$(pnpm exec edgedb migration log --from-db | wc -l | tr -d ' ')
    if [ "$result" -eq 0 ]; then
        return 0
    else
        return 1
    fi
}

is_auth_config_empty() {
    local result
    result=$(pnpm exec edgedb query "select ext::auth::signing_key_exists();")
    if [ "$result" = "true" ]; then
        return 1
    else
        return 0
    fi
}

main() {
    # Check if the schema is empty
    if is_schema_empty; then
        echo "Schema is empty. Running migrations..."
        pnpm exec edgedb migrate
    else
        echo "Schema is not empty. Skipping migrations."
    fi

    # Check if auth config is empty
    if is_auth_config_empty; then
        echo "Auth config is empty. Configuring auth..."
        pnpm exec tsx auth-initialize.ts
    else
        echo "Auth config is not empty. Skipping auth configuration."
    fi
}

main;
