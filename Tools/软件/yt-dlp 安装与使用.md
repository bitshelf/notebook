---
tags:
---
## 安装
```shell
uv tool install yt-dlp
```

## 使用
```shell
# 最简单：自动选最佳质量
yt-dlp "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# 列出所有可用格式（分辨率/编码/大小一览）
yt-dlp -F "URL"

# 下载字幕
yt-dlp --write-subs --sub-langs "en,zh-Hans" "URL"

# 指定输出文件名模板
yt-dlp -o "%(uploader)s/%(title)s.%(ext)s" "URL"

# === 播放列表：编号前缀 ===
yt-dlp -o "%(playlist_index)02d - %(title)s.%(ext)s" "PLAYLIST_URL"

# === 下载视频 + 嵌入章节 + 嵌入缩略图 + 嵌入字幕 ===
yt-dlp --embed-metadata --embed-chapters \
       --embed-thumbnail --embed-subs \
       --sub-langs "en,zh-Hans" URL
       
# 安装第三方插件
pip install yt-dlp-SomePlugi
```

### 下载 Tips
```shell
# 在下载前就能看真实信息
yt-dlp --print "%(width)sx%(height)s %(vcodec)s %(tbr)s kbps %(duration)ss" URL

# 基础信息：分辨率、编码、码率
ffprobe -v error -show_entries stream=width,height,codec_name,bit_rate,r_frame_rate \
        -of default=noprint_wrappers=1  xxx.mkv
```