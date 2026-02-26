---
tags:
  - ALSA
---

# alsactl
> alsactl - advanced controls for ALSA soundcard driver

* `/var/lib/alsa/asound.state` (or whatever file you specify with the  **-f**  flag)  is  used  to store  current  settings for your soundcards
*  The  configuration  file  is generated automatically by running `alsactl store`
* `alsactl store` 在关机时自动执行
