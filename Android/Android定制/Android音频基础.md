---
tags: Android
---

# Android 音频
## Android 音源 setAudioSource
-   AudioSource.DEFAULT：默认音频源；
-   AudioSource.MIC：麦克风；
-   AudioSource.VOICE_UPLINK：上行电话录音，android.Manifest.permission#CAPTURE_AUDIO_OUTPUT；
-   AudioSource.VOICE_DOWNLINK：下行电话录音，android.Manifest.permission#CAPTURE_AUDIO_OUTPUT；
-   AudioSource.VOICE_CALL：上下行电话录音，android.Manifest.permission#CAPTURE_AUDIO_OUTPUT；
-   AudioSource.CAMCORDER：设定录音来源于同方向的相机麦克风相同，若相机无内置相机或无法识别，则使用预设的麦克风
-   AudioSource.VOICE_RECOGNITION：用于语音识别；
-   AudioSource.VOICE_COMMUNICATION：用于语音通话；
-   AudioSource.UNPRECESSED：原始音频；
-   AudioSource.VOICE_PERFORMANCE：低延迟用于满足实时音频处理；
-   AudioSource.REMOTE_SUBMIX：用于传输系统混音的音频流到远端， android.Manifest.permission.CAPTURE_AUDIO_OUTPUT；
-   AudioSource.ECHO_REFERENCE：回声抑制参考信号，SystemApi，android.Manifest.permission.CAPTURE_AUDIO_OUTPUT；
-   AudioSource.RADIO_TUNER：电台广播声音，SystemApi；
-   AudioSource.HOTWORD：抢占式的热词检测，SystemApi