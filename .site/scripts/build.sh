#!/usr/bin/env bash
# Build the static site from the vault that lives in the parent directory.
# Nothing in the vault is modified or deleted. Only Markdown, images and the
# public-friendly Obsidian formats (Canvas, Bases, Excalidraw) are copied to a
# temporary directory for the build; binaries are never published.
#
# This script is shared by GitHub Pages (`.github/workflows/deploy-site.yml`),
# Cloudflare Pages and EdgeOne Pages. Platform builds can override the
# canonical URL with SITE_URL, e.g.:
#   SITE_URL=https://bitshelf.github.io/notebook  (default)
#   SITE_URL=https://bitshelf-notebook.pages.dev
#   SITE_URL=https://bitshelf-notebook.edgeone.app
set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "${SITE_DIR}/.." && pwd)"
CONTENT_DIR="${QUARTZ_CONTENT_DIR:-${TMPDIR:-/tmp}/bitshelf-notebook-content}"
OUTPUT_DIR="${QUARTZ_OUTPUT_DIR:-${SITE_DIR}/public}"
cd "${SITE_DIR}"

# Optional canonical URL. `baseUrl` in quartz.config.yaml is rewritten for the
# duration of the build only: the tracked config file is restored on exit (so a
# local run never leaves the repository dirty, and CI checkouts stay pristine).
CONFIG_BACKUP=""
restore_config() {
  if [ -n "${CONFIG_BACKUP}" ] && [ -f "${CONFIG_BACKUP}" ]; then
    cp "${CONFIG_BACKUP}" "${SITE_DIR}/quartz.config.yaml"
    rm -f "${CONFIG_BACKUP}"
  fi
}
trap restore_config EXIT
if [ -n "${SITE_URL:-}" ]; then
  host="${SITE_URL#http://}"
  host="${host#https://}"
  host="${host%/}"
  CONFIG_BACKUP="$(mktemp)"
  cp quartz.config.yaml "${CONFIG_BACKUP}"
  sed -i "s|^  baseUrl: .*|  baseUrl: ${host}|" quartz.config.yaml
fi

# Dependencies (skipped for local iterations when node_modules already exists,
# or when the hosting platform already ran an install step).
if [ "${SKIP_INSTALL:-0}" != "1" ]; then
  npm install --no-audit --no-fund
fi

# Third-party Quartz plugins are version-pinned in package-lock.json and get
# patched for the Obsidian-vault use case (virtual pages, Kanban views, ...).
# This must always run after npm install, because npm may replace the files.
node "${SITE_DIR}/scripts/patch-plugins.mjs"

# Upstream Quartz baseline check: the vendored core must only differ in files
# registered in vendor/core-patches.mjs / vendor/quartz-manifest.json. Fails the
# build on hand edits so `scripts/sync-quartz.mjs` stays the single upgrade path.
node "${SITE_DIR}/scripts/check-quartz-vendor.mjs"

# Fresh copy of the publishable subset: Markdown, images and Obsidian data
# formats. Canvas whiteboards, Bases views and Excalidraw drawings are part of
# the published site now.
rm -rf "${CONTENT_DIR}"
mkdir -p "${CONTENT_DIR}"

cd "${REPO_ROOT}"
find . -type f \( \
    -name '*.md' -o -name '*.canvas' -o -name '*.base' -o -name '*.excalidraw' \
    -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.webp' \
    -o -name '*.gif' -o -name '*.svg' -o -name '*.bmp' -o -name '*.ico' -o -name '*.avif' \
  \) \
  -not -path './.site/*' \
  -not -path './.git/*' \
  -not -path './.github/*' \
  -not -path './.obsidian/*' \
  -not -path './.agent/*' \
  -not -path './.vaultexplorer/*' \
  -not -path './.trash/*' \
  -not -path './.smart-env/*' \
  -not -path './.dsh-tmp/*' \
  -not -path './node_modules/*' \
  -not -path './pdf/*' \
  -not -path './Tools/Obsidian/Excalidraw/*' \
  -print0 | while IFS= read -r -d '' f; do
    rel="${f#./}"
    mkdir -p "${CONTENT_DIR}/$(dirname "${rel}")"
    cp "${f}" "${CONTENT_DIR}/${rel}"
  done

cp "${SITE_DIR}/homepage.md" "${CONTENT_DIR}/index.md"

# Apply last-commit timestamps so "recently updated" listings are meaningful,
# then repair the few notes whose frontmatter is not valid YAML (copy only).
node "${SITE_DIR}/scripts/restore-dates.mjs" "${REPO_ROOT}" "${CONTENT_DIR}"
node "${SITE_DIR}/scripts/normalize-content.mjs" "${CONTENT_DIR}"

cd "${SITE_DIR}"
node ./quartz/bootstrap-cli.mjs plugin install
node ./quartz/bootstrap-cli.mjs build -d "${CONTENT_DIR}" -o "${OUTPUT_DIR}"

# Host-specific static files that must live in the output root.
# Cloudflare Pages reads `_headers` from the deployed directory; EdgeOne Pages
# reads `.site/edgeone.json` from the project root, so it is not copied here.
if [ -f "${SITE_DIR}/platform/_headers" ]; then
  cp "${SITE_DIR}/platform/_headers" "${OUTPUT_DIR}/_headers"
fi
