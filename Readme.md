# TunerGame Proof of Concept

I attempted to make a rudamentary tuner game where you could score points for being in tune.
I learned that accepting audio input is in fact quite hard! I'm glad I learned the basics of it but in the future it seems worth it to just use an already built version. Additionaly, while trying to make a TypeScript project all on my own was rewarding, I think I will just stick to JavaScript next time.

The main thing that didn't work was continously updating the note displayed, I ended up having to update the hertz and note on a manual trigger.
I also tried to deploy it with surge but unfortunately the microphone will not accept input this way, please run locally to test.

### Works Cited:
* https://github.com/fritzvd/signaltohertz
* https://github.com/qiuxiang/tuner/blob/master/app/app.js
* https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
* https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
* https://pages.mtu.edu/~suits/NoteFreqCalcs.html
