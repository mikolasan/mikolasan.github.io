---
date: 2021-06-13
title: Callback from C to Java method
published: 2021-06-13
lastModified: 2021-06-13
---


**api_c_wrap.c**

```c
#include <jni.h>
#include <stdlib.h>
#include <string.h>

#include "api.h"

static JNIEnv* genv = NULL;
static jclass gclass = NULL;
static jmethodID gcallbackid = 0;

static void msg_callback(const char* msg) {
  printf("c/c++ callback !!!\n");
  jstring message = (*genv)->NewStringUTF(genv, msg);
  (*genv)->CallStaticVoidMethod(genv, gclass, gcallbackid, message);
}


SWIGEXPORT void JNICALL Java_JNI_1set_1api_1msg_1callback(JNIEnv *jenv, jclass jcls) {
  genv = jenv;
  gclass = jcls;
  gcallbackid = (*jenv)->GetStaticMethodID(jenv, jcls, "callMsgCallback", "(Ljava/lang/String;)V");
  api_msg_callback(msg_callback);
}
```

**MyLibraryJNI.java**

```java
public class MyLibraryJNI {
  private static ApiMsgCallback msgCallback = null;
  public final static native int set_api_msg_callback();
  public final static void setMsgCallback(ApiMsgCallback callback) {
    msgCallback = callback;
  }
  public final static void callMsgCallback(String message) {
    System.out.println("java callMsgCallback");
    msgCallback.call(message);
  }
}
```

**MyLibrary.java**

```java
public class MyLibrary {
  public static void set_api_msg_callback(ApiMsgCallback callback) {
    MyLibraryJNI.setMsgCallback(callback);
    MyLibraryJNI.slon_application_set_api_msg_callback();
  }
}
```


## Reference

- https://stackoverflow.com/questions/9630134/jni-how-to-callback-from-c-or-c-to-java
- https://stackoverflow.com/questions/6746078/implement-callback-function-in-jni-using-interface
- https://stackoverflow.com/questions/56230509/what-is-the-difference-between-jobject-jclass-in-c-ndk
- https://github.com/android/ndk-samples/blob/master/hello-jniCallback/app/src/main/cpp/hello-jnicallback.c