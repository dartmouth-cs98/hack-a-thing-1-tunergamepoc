export class Tuner {
    audioContext: AudioContext;
    analyser: AnalyserNode;
    stream: MediaStream;
    constructor() {
        this.audioContext = new window.AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
    }

    record = () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream: MediaStream) => {
                this.stream = stream;
                this.audioContext.createMediaStreamSource(stream).connect(this.analyser);
            })
            .catch((err: any) => {
                console.error(err);
            });
    }

    stop = () => {
        this.stream.removeTrack(this.stream.getAudioTracks()[0]);
    }

    update = (dataArray: Float32Array) => {
        this.analyser.getFloatFrequencyData(dataArray);
    }
}
