import * as React from "react";
import { Tuner } from "./Tuner";

export interface DisplayState {
    dataArray: Float32Array;
    on: boolean;
}

export class Display extends React.Component<{}, DisplayState> {
    bufferLength: number;
    dataArray: Float32Array;
    noteStrings: string[];
    tuner: Tuner;
    constructor(props: {}) {
        super(props);
        this.tuner = new Tuner();
        this.bufferLength = this.tuner.analyser.frequencyBinCount;
        this.dataArray = new Float32Array(this.bufferLength);
        this.noteStrings = [
            "C",
            "C♯",
            "D",
            "D♯",
            "E",
            "F",
            "F♯",
            "G",
            "G♯",
            "A",
            "A♯",
            "B",
        ];

        this.state = {
            dataArray: this.dataArray,
            on: false,
        };
    }

    // https://github.com/fritzvd/signaltohertz/blob/master/signaltohertz.js
    // Used to calculate the hertz of the microphone input from the signal input
    calculateHertz = (frequencies: Float32Array) => {
        const rate = 22050 / 1024;
        let maxI = frequencies[0];
        let max = frequencies[0];

        frequencies.forEach((freq, i) => {
            const oldmax = max;
            const newmax = Math.max(max, freq);
            if (oldmax !== newmax) {
                max = newmax;
                maxI = i;
            }
        });
        return maxI * rate;
    }

    // https://github.com/qiuxiang/tuner/blob/master/app/tuner.js
    // converts hz to note
    calculateNote = (frequency: number) => {
        const note = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(note) + 69;
    }

    record = () => {
        this.setState({ on: true });
        this.tuner.record();
    }

    stop = () => {
        this.setState({ on: false });
        this.tuner.stop();
    }

    render() {
        const btn = this.state.on ?
            <button onClick={this.stop}>Mic off</button> :
            <button onClick={this.record}>Mic on</button>;
        this.tuner.update(this.dataArray);
        const hertz = this.calculateHertz(this.dataArray);
        const note = this.calculateNote(hertz);

        return (
            <div className="display">
                <div>{btn}</div>
                <div>{this.noteStrings[note % 12]}</div>
                <div>{hertz}Hz</div>
            </div>
        );
    }
}
