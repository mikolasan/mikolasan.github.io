---
title: CDN on AWS
date: 2024-10-23
published: 2025-02-04
lastModified: 2024-10-23
---

If one needs to serve static files evenly fast to any device in the world then they are probably thinking about CDN.

## Plan

1. create **S3** bucket
2. create a “distribution” in AWS **CloudFront** for that bucket (how many times my colleagues keep calling it CloudFlare?)

## Caveats

- to serve **index.html** without specifying this in the path - [add special function to CloudFront](https://stackoverflow.com/questions/59634922/how-do-i-serve-index-html-in-subfolders-with-s3-cloudfront)

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
```

- [late CSS loading](https://stackoverflow.com/questions/21147149/flash-of-unstyled-content-fouc-in-firefox-only-is-ff-slow-renderer) in Firefox

```html
<head>
  <link rel="stylesheet" href="css/styles.css" />

  <script>
    /*to prevent Firefox FOUC, this must be here*/
    let FF_FOUC_FIX;
  </script>
</head>
```

- serve compressed files ([this](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html) doesn’t work - need to try in the console) 

- when new files uploaded to the bucket - [create invalidation in CloudFront](https://stackoverflow.com/questions/30154461/aws-cloudfront-not-updating-on-update-of-files-in-s3)