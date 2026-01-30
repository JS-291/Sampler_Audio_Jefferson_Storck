import { loadAndDecodeSound } from "./soundutils.js";

export class SamplerEngine {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;
    this.slots = [];
		this.recorder;
    this.setRecord();
  }

  async setRecord(){
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recorder = new MediaRecorder(stream);

      this.recorder.addEventListener('dataavailable', this.onRecordingReady.bind(this));
      this.recorder.addEventListener('start', () => console.log('Recording started'));
      console.log('Recorder ready');
    } catch (err) {
      console.error('Micro access denied:', err);
    }
  }

  async onRecordingReady(event) {
    const Blob = event.data;
    try {
      const arrayBuffer = await Blob.arrayBuffer();
      const decoded = await this.audioCtx.decodeAudioData(arrayBuffer);
      this.slots.push({ name: `Recording ${this.slots.length+1}`, buffer: decoded });
      document.dispatchEvent(new CustomEvent("recordingReady"));
    } catch (err) {
      console.error('Audio decode failed:', err);
    }
  }

  async loadFile(file) {
    if (!file) return;

    const soundURL = `http://localhost:8010/presets/${file.url.replace(/^\.\//, "")}`;


    const decodedBuffer = await loadAndDecodeSound(soundURL, this.audioCtx);

    this.slots.push({
      name: file.name || `Sound ${this.slots.length+1}`,
      buffer: decodedBuffer,
    });
  }

  reset(){
    this.slots = [];
  }

  add(name, buffer) {
    this.slots.push({
      name: name,
      buffer: buffer
    });
  }

  play(index) {
    const slot = this.slots[index];
    if (!slot || !slot.buffer) return;

    const source = this.audioCtx.createBufferSource();
    source.buffer = slot.buffer;
    source.connect(this.audioCtx.destination);
    source.start();
    return source;
  }

  getSlots() {
    return this.slots;
  }

  getRecorder(){
    return this.recorder;
  }

  getLength(){
    return this.slots.length;
  }
}