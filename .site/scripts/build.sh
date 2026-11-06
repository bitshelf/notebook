#!/usr/bin/env bash
set -euo pipefail
SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec npm --prefix "${SITE_DIR}" run build
