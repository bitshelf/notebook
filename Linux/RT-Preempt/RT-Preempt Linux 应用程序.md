---
tags:
  - Linux/RT-Preempt
---
## example
```c
/*                                                                  
 * POSIX Real Time Example
 * using a single pthread as RT thread
 */
 
#include <limits.h>
#include <pthread.h>
#include <sched.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
 
void *thread_func(void *data)
{
        /* Do RT specific stuff here */
        return NULL;
}
 
int main(int argc, char* argv[])
{
        struct sched_param param;
        pthread_attr_t attr;
        pthread_t thread;
        int ret;
 
        /* Lock memory */
        if(mlockall(MCL_CURRENT|MCL_FUTURE) == -1) {
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("mlockall failed: %m\n");
                [exit](http://www.opengroup.org/onlinepubs/009695399/functions/exit.html)(-2);
        }
 
        /* Initialize pthread attributes (default values) */
        ret = pthread_attr_init(&attr);
        if (ret) {
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("init pthread attributes failed\n");
                goto out;
        }
 
        /* Set a specific stack size  */
        ret = pthread_attr_setstacksize(&attr, PTHREAD_STACK_MIN);
        if (ret) {
            [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("pthread setstacksize failed\n");
            goto out;
        }
 
        /* Set scheduler policy and priority of pthread */
        ret = pthread_attr_setschedpolicy(&attr, SCHED_FIFO);
        if (ret) {
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("pthread setschedpolicy failed\n");
                goto out;
        }
        param.sched_priority = 80;
        ret = pthread_attr_setschedparam(&attr, &param);
        if (ret) {
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("pthread setschedparam failed\n");
                goto out;
        }
        /* Use scheduling parameters of attr */
        ret = pthread_attr_setinheritsched(&attr, PTHREAD_EXPLICIT_SCHED);
        if (ret) {
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("pthread setinheritsched failed\n");
                goto out;
        }
 
        /* Create a pthread with specified attributes */
        ret = pthread_create(&thread, &attr, thread_func, NULL);
        if (ret) {
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("create pthread failed\n");
                goto out;
        }
 
        /* Join the thread and wait until it is done */
        ret = pthread_join(thread, NULL);
        if (ret)
                [printf](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html)("join pthread failed: %m\n");
 
out:
        return ret;
}
```

## Link
- [realtime:documentation:howto:applications:application\_base \[Wiki\]](https://wiki.linuxfoundation.org/realtime/documentation/howto/applications/application_base)