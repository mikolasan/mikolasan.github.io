---
date: 2023-05-18
title: Voice recognition AI model
published: 2023-05-18
lastModified: 2023-05-18
---

First thing you may find is [Whisper](https://github.com/openai/whisper) by OpenAI. Surprisingly it's open sourced, but the normal model requires 10GB of video memory which is indimidating for an average laptop (my laptop is from 2018). But what can be better than Python? That's right C++ rewrite [Whisper.cpp](https://github.com/ggerganov/whisper.cpp). Another optimization is [faster-whisper](https://github.com/guillaumekln/faster-whisper).

```cmd
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
models\download-ggml-model.cmd medium

cmake -DCMAKE_BUILD_TYPE=Release -S . -B build
cmake --build build --target all
```

Install **ffmpeg** from [here](https://www.gyan.dev/ffmpeg/builds/) for example. I have this folder in `PATH` for my user account `C:\Users\neupo\.local\bin`, so I extract `ffmpeg.exe` there.

Then convert audio files from Voice Recorder from `m4a` to `wav`

I use **Git Bash** in order to use a bash script (any other MSYS2 install will work too).

```bash
pushd /c/Users/neupo/Documents/Personal/VoiceRecordings
ls -1 *.m4a | while read -r input_file
do
  echo "'$input_file' -> '${input_file%.m4a}.wav'"
  output_file="${input_file%.m4a}.wav"
  if [ ! -f "$output_file" ]; then
    ffmpeg -hide_banner -loglevel error -nostats -i "$input_file" -ar 16000 -ac 1 -c:a pcm_s16le "$output_file" 
  fi
done
popd
```

```
main.exe -m c:\Users\neupo\robot\whisper.cpp\models\ggml-medium.bin -f "c:\Users\neupo\robot\whisper.cpp\samples\New Recording 8.wav"
```

## Output

```
c:\Users\neupo\robot\whisper.cpp>main.exe -m c:\Users\neupo\robot\whisper.cpp\models\ggml-medium.bin -f "c:\Users\neupo\robot\whispe
r.cpp\samples\New Recording 8.wav"
whisper_init_from_file_no_state: loading model from 'c:\Users\neupo\robot\whisper.cpp\models\ggml-medium.bin'
whisper_model_load: loading model
whisper_model_load: n_vocab       = 51865
whisper_model_load: n_audio_ctx   = 1500
whisper_model_load: n_audio_state = 1024
whisper_model_load: n_audio_head  = 16
whisper_model_load: n_audio_layer = 24
whisper_model_load: n_text_ctx    = 448
whisper_model_load: n_text_state  = 1024
whisper_model_load: n_text_head   = 16
whisper_model_load: n_text_layer  = 24
whisper_model_load: n_mels        = 80
whisper_model_load: ftype         = 1
whisper_model_load: qntvr         = 0
whisper_model_load: type          = 4
whisper_model_load: mem required  = 1899.00 MB (+   43.00 MB per decoder)
whisper_model_load: adding 1608 extra tokens
whisper_model_load: model ctx     = 1462.58 MB
whisper_model_load: model size    = 1462.12 MB
whisper_init_state: kv self size  =   42.00 MB
whisper_init_state: kv cross size =  140.62 MB

system_info: n_threads = 4 / 8 | AVX = 1 | AVX2 = 1 | AVX512 = 0 | FMA = 1 | NEON = 0 | ARM_FMA = 0 | F16C = 1 | FP16_VA = 0 | WASM_
SIMD = 0 | BLAS = 0 | SSE3 = 1 | VSX = 0 | COREML = 0 |

main: processing 'c:\Users\neupo\robot\whisper.cpp\samples\New Recording 8.wav' (4921121 samples, 307.6 sec), 4 threads, 1 processor
s, lang = en, task = transcribe, timestamps = 1 ...


[00:00:00.000 --> 00:00:13.920]   Hello, I'm going to the North Peak and maybe Bridge Mountain.
[00:00:13.920 --> 00:00:16.520]   I think it's a trail.
[00:00:16.520 --> 00:00:18.920]   Trail name.
[00:00:18.920 --> 00:00:19.920]   Bridge Mountain.
[00:00:19.920 --> 00:00:31.040]   So, while I'm going there I'm thinking about...
[00:00:31.040 --> 00:00:35.880]   If you name it really...
[00:00:35.880 --> 00:00:38.720]   Walk and road is all about artificial intelligence.
[00:00:38.720 --> 00:00:54.720]   I want to critique, approach and excitement of some researchers who review or they view...
[00:00:54.720 --> 00:01:02.640]   No, they see large language models as GPT.
[00:01:02.640 --> 00:01:15.560]   It's our first step to...
[00:01:15.560 --> 00:01:19.960]   To better models of intelligence that we have.
[00:01:19.960 --> 00:01:26.120]   Like algorithms that are smart in some way.
[00:01:26.120 --> 00:01:29.400]   You can call them like smart algorithms, right?
[00:01:29.400 --> 00:01:37.320]   No one uses that term, but what it means is that you don't need to program it.
[00:01:37.320 --> 00:01:55.080]   You maybe locally specify what it should do and it finds its way how better do it in some
[00:01:55.080 --> 00:02:02.400]   optimal way.
[00:02:02.400 --> 00:02:10.640]   And of course, maybe it's not really complex algorithms, like not algorithms, complex tasks.
[00:02:10.640 --> 00:02:13.440]   Like find all...
[00:02:13.440 --> 00:02:16.400]   Find the formula for any prime number.
[00:02:16.400 --> 00:02:22.280]   Say this and it's like "oh" and it starts crunching all theorems.
[00:02:22.280 --> 00:02:34.200]   Or like reinventing in few hours what humanity developed in centuries, let's say, right?
[00:02:34.200 --> 00:02:36.480]   That's maybe some people would expect.
[00:02:36.480 --> 00:02:44.640]   But what we already see and what many people are really excited about, actually scared about,
[00:02:44.640 --> 00:02:52.280]   is some mundane, some boring but time-consuming tasks.
[00:02:52.280 --> 00:03:01.840]   I don't know, like writing emails, summarizing big text in some short summary.
[00:03:01.840 --> 00:03:09.800]   You don't need to maybe read a whole book or big article, some complex article, if you're
[00:03:09.800 --> 00:03:15.600]   looking for some specific, I guess, moment.
[00:03:15.600 --> 00:03:23.920]   It's like you want to understand if that article contains that, which can just ask that algorithm
[00:03:23.920 --> 00:03:27.600]   this question and it will do it in a second, right?
[00:03:27.600 --> 00:03:31.520]   It will just immediately answer you.
[00:03:31.520 --> 00:03:33.920]   The problem is do we trust that answer?
[00:03:33.920 --> 00:03:40.800]   Or is the problem that the output not always is true based on data?
[00:03:40.800 --> 00:03:44.040]   It can... because it needs to answer something.
[00:03:44.040 --> 00:03:48.760]   This is the problem that I assume will be solved soon.
[00:03:48.760 --> 00:03:52.760]   That should be something simple.
[00:03:52.760 --> 00:04:06.960]   Because if this is a model based on probabilities, then for the correct answer we have high probab
ility.
[00:04:06.960 --> 00:04:12.080]   Or maybe the common myth, so we have a high probability there.
[00:04:12.080 --> 00:04:20.920]   If you put some strange, unbelievable conditions, it will answer anyway.
[00:04:20.920 --> 00:04:27.400]   But what if... can it ask other questions, additional questions?
[00:04:27.400 --> 00:04:29.480]   Can it say that doesn't make sense?
[00:04:29.480 --> 00:04:36.000]   For some reason they didn't put such guards there, so it just always answers.
[00:04:36.000 --> 00:04:47.080]   I mean, they put some guards, but it can say "SNI model, I cannot say about this and this,
[00:04:47.080 --> 00:04:52.400]   so I don't have enough knowledge about it".
[00:04:52.400 --> 00:05:00.480]   Or if it's really low probability, like I said, once it responds "bro", and says "what
[00:05:00.480 --> 00:05:01.480]   do you mean?"
[00:05:01.480 --> 00:05:03.640]   And I don't understand, give me no context.
[00:05:03.640 --> 00:05:06.480]   (heavy breathing)
[00:05:06.480 --> 00:05:29.960]   Thanks for watching.


whisper_print_timings:     load time =  1334.92 ms
whisper_print_timings:     fallbacks =   0 p /   0 h
whisper_print_timings:      mel time =  5091.06 ms
whisper_print_timings:   sample time =  3030.49 ms /   721 runs (    4.20 ms per run)
whisper_print_timings:   encode time = 439502.44 ms /    15 runs (29300.16 ms per run)
whisper_print_timings:   decode time = 83150.84 ms /   719 runs (  115.65 ms per run)
whisper_print_timings:    total time = 532588.44 ms
```

## CUDA optimized version

```
-- Building for: Visual Studio 17 2022
-- Selecting Windows SDK version 10.0.20348.0 to target Windows 10.0.19045.
-- The C compiler identification is MSVC 19.32.31332.0
-- The CXX compiler identification is MSVC 19.32.31332.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.32.31326/bin/Hostx64/x64/c
l.exe - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.32.31326/bin/Hostx64/x64
/cl.exe - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Found Git: C:/Program Files/Git/cmd/git.exe (found version "2.28.0.rc2.windows.1")
-- Looking for pthread.h
-- Looking for pthread.h - not found
-- Found Threads: TRUE
-- Found CUDAToolkit: C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.3/include (found version "11.3.109")
-- cuBLAS found
CMake Error at C:/Program Files/CMake/share/cmake-3.22/Modules/CMakeDetermineCompilerId.cmake:470 (message):
  No CUDA toolset found.
Call Stack (most recent call first):
  C:/Program Files/CMake/share/cmake-3.22/Modules/CMakeDetermineCompilerId.cmake:6 (CMAKE_DETERMINE_COMPILER_ID_BUILD)
  C:/Program Files/CMake/share/cmake-3.22/Modules/CMakeDetermineCompilerId.cmake:59 (__determine_compiler_id_test)
  C:/Program Files/CMake/share/cmake-3.22/Modules/CMakeDetermineCUDACompiler.cmake:298 (CMAKE_DETERMINE_COMPILER_ID)
  CMakeLists.txt:151 (enable_language)


-- Configuring incomplete, errors occurred!
See also "C:/Users/neupo/robot/whisper.cpp/build/CMakeFiles/CMakeOutput.log".
See also "C:/Users/neupo/robot/whisper.cpp/build/CMakeFiles/CMakeError.log".

c:\Users\neupo\robot\whisper.cpp>nvcc --help

Usage  : nvcc [options] <inputfile>
```


```
cmake -G "Visual Studio 17 2022" -T version=19.32,cuda=11.3,host=x64,VCTargetsPath="C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.3\ext
ras\visual_studio_integration\MSBuildExtensions" -DCMAKE_BUILD_TYPE=Release -DWHISPER_CUBLAS=ON -S . -B build
```

copy files from `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.3\extras\visual_studio_integration\MSBuildExtensions` to `C:\Program Files\Microsoft Visual Studio\2022\Community\Msbuild\Microsoft\VC\v170\BuildCustomizations`

https://stackoverflow.com/questions/56636714/cuda-compile-problems-on-windows-cmake-error-no-cuda-toolset-found

```
cmake -G "Visual Studio 17 2022" -A x64 -DCMAKE_BUILD_TYPE=Release -DWHISPER_CUBLAS=ON -S . -B build
devenv build\whisper.cpp.sln /build
```
