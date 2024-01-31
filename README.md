Special considerations need to be made if you need to measure items in Remotion.  
The `<div>` in which the video gets rendered has a `scale()` transform applied to it, which falsifies the values returned by `getBoundingClientRect()`.

In this repo, you find an example how you can still measure elements correctly.
Read: https://remotion.dev/docs/measuring
