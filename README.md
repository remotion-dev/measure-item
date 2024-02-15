https://remotion.dev/docs/measuring

In v4.0.111, we introduced the [`useCurrentScale()`](https://remotion.dev/docs/use-current-scale) hook, which makes measuring items more simple.

The example in this repo only applies for Remotion versions <=4.0.110:

Special considerations need to be made if you need to measure items in Remotion.  
The `<div>` in which the video gets rendered has a `scale()` transform applied to it, which falsifies the values returned by `getBoundingClientRect()`.

In this repo, you find an example how you can still measure elements correctly.

