---
tags: command 
---

# sudo
* `sudo su`
	* no-login shell
	* sets `HOME` to `/root`
	* prunes the environment
* `sudo -i`
	* login shell
	* sets `HOME` to `/root`
	* Prunes the environment
* `sudo su -l`
	* login shell
	* sets `HOME` to `/root`
	* Prunes the environment
	
	 ⚠When invoking a shell, this is equivalent to `sudo -i`
* `sudo -s`
	* non-login shell
	* sets `HOME` to `root`
	* Prunes the environment

	⚠When invoking a shell, this is equivalent to `sudo su`
* `sudo -Es`
	* non-login shell
	* Leaves `HOME` alone
	* Leaves the environment alone(except for `$PATH` and `$LD_LIBRARY_PATH` iirc)