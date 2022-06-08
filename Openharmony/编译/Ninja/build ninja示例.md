---
tags: ninja
---

# Ninja
```ninja
rule dp
    command = touch $out

rule cc
    command = gcc -c $in -o $out
    
rule lk
    command = gcc $in -o $out
    

build test.c   : dp test.h
build test.o   : cc test.c
build test.out : lk test.o 


default test.out
```
