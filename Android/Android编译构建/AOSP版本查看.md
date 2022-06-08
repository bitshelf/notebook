---
tags: Android 
---

- `build/core/version_defaults.mk`
```Makefile
# The last stable version name of the platform that was released.  During
# development, this stays at that previous version, while the codename indicates
# further work based on the previous version.
PLATFORM_VERSION_LAST_STABLE := 13
.KATI_READONLY := PLATFORM_VERSION_LAST_STABLE

# These are the current development codenames, if the build is not a final
# release build.  If this is a final release build, it is simply "REL".
PLATFORM_VERSION_CODENAME.TP1A := REL

# This is the user-visible version.  In a final release build it should
# be empty to use PLATFORM_VERSION as the user-visible version.  For
# a preview release it can be set to a user-friendly value like `12 Preview 1`
PLATFORM_DISPLAY_VERSION := 13
```
