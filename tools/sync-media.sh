#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash tools/sync-media.sh <R2_BUCKET_NAME>
#
# What it does:
#   Uploads everything under ./media-src to the specified R2 bucket,
#   keeping the relative path as the R2 object key.
#
# Requirements:
#   - wrangler installed: npm i -g wrangler
#   - wrangler logged in: wrangler login

if [[ $# -lt 1 ]]; then
  echo "Usage: bash tools/sync-media.sh <R2_BUCKET_NAME>"
  exit 1
fi

BUCKET="$1"
SRC_DIR="media-src"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "ERROR: $SRC_DIR not found."
  exit 1
fi

echo "Uploading $SRC_DIR -> R2 bucket: $BUCKET"
echo "----------------------------------------"

# Find files (excluding README)
while IFS= read -r -d '' file; do
  rel="${file#${SRC_DIR}/}"
  # skip readme files
  if [[ "$rel" == "README.md" ]]; then
    continue
  fi

  key="$rel"
  echo "PUT $key"
  wrangler r2 object put "${BUCKET}/${key}" --file "$file" >/dev/null
done < <(find "$SRC_DIR" -type f -print0)

echo "Done."
