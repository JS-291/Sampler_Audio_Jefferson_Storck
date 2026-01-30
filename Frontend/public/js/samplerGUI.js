import { playSound, trimAudio } from "./soundutils.js";

export class SamplerGUI {
  constructor(engine, containerId) {
    this.index=0;
    this.engine = engine;
    this.container = document.getElementById(containerId);
    this.padElements = [];
    this.playheadRequest = null;
    this.selectedPad;
    this.minSlider = document.getElementById("slider-min");
    this.maxSlider = document.getElementById("slider-max");

    document.querySelectorAll("input[type='range']").forEach(el=>el.addEventListener("input",(e)=>{
      const value = parseFloat(e.target.value);
      let min, max, temp;
      if(e.target.id === "slider-min"){
        temp=parseFloat(this.maxSlider.value);
        min= value>= temp ? temp-0.001 : value;
        max= temp;
        this.minSlider.value= min;
      }else{
        temp=parseFloat(this.minSlider.value);
        max= value<= temp ? temp+0.001 : value;
        min= temp;
        this.maxSlider.value= max;
      }
      this.setRange(min, max);
    }));
    this.setRange(0, 1);
  }

  renderPads() {
    this.index=0;
    this.container.innerHTML = "";
    this.padElements = [];

    this.engine.getSlots().forEach((slot) => {
      const padWrapper = document.createElement("div");
      padWrapper.classList.add("pad-wrapper");

      const button = document.createElement("button");
      button.textContent = slot.name;
      button.classList.add("pad");
      button.id=`pad${this.index}`;
      this.index++;

      button.addEventListener("click", () => {
        if(this.selectedPad) this.selectedPad.classList.toggle("pad-selected");
        button.classList.toggle("pad-selected");
        this.selectedPad = button;
      });

      const trimBar = document.createElement("div");
      trimBar.classList.add("trim-bar");
      trimBar.style.display = "none";

      button.onclick = () => this.playSlot(slot, trimBar);

      padWrapper.appendChild(button);
      padWrapper.appendChild(trimBar);
      this.container.appendChild(padWrapper);

      this.padElements.push({ button, trimBar });
    });
  }

  playSlot(slot, trimBar) {
    trimBar.style.display = "block";
    const padWidth = trimBar.parentElement.clientWidth;

    const trim = slot.trim || { start: 0, end: 1 };
    const barStart = trim.start * padWidth;
    const barWidth = (trim.end - trim.start) * padWidth;

    trimBar.style.left = barStart + "px";
    trimBar.style.width = "0px";
    trimBar.style.transition = `width ${slot.buffer.duration*this.maxSlider.value-slot.buffer.duration*this.minSlider.value}s linear`;
    requestAnimationFrame(() => {
      trimBar.style.width = barWidth + "px";
    });

    playSound(this.engine.audioCtx, slot.buffer,slot.buffer.duration*this.minSlider.value, slot.buffer.duration*this.maxSlider.value);

    const canvas = document.getElementById("waveformCanvas");
    if (canvas) {
      const trimmedBuffer = trimAudio(this.engine.audioCtx, slot.buffer, slot.buffer.duration*this.minSlider.value, slot.buffer.duration*this.maxSlider.value);
      this.drawWaveform(trimmedBuffer, canvas);
      this.animatePlayhead(trimmedBuffer, canvas);
    }

    setTimeout(() => {
      trimBar.style.display = "none";
      trimBar.style.transition = "none";
      trimBar.style.width = "0px";
    }, slot.buffer.duration * 1000);
  }

  drawWaveform(buffer, canvas) {
    const ctx = canvas.getContext("2d");
    const data = buffer.getChannelData(0);

    const w = canvas.clientWidth;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const mid = h / 2;
	  ctx.fillStyle = '#000';
	  ctx.fillRect(0, 0, w, h);

	  ctx.strokeStyle = '#ff0000ff';
	  ctx.lineWidth = 1;
	  ctx.beginPath();

	  const step = w / data.length;
	  let x = 0;
	  for (let i = 0; i < data.length; i++) {
	  	const y = mid - data[i] * mid;
		  i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
		  x += step;
	  }

	  ctx.stroke();
  }

  animatePlayhead(buffer, canvas) {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const duration = buffer.duration;
    const startTime = this.engine.audioCtx.currentTime;

    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    const drawFrame = () => {
      const elapsed = this.engine.audioCtx.currentTime - startTime;
      const progress = elapsed / duration;
      if (progress >= 1) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ff0000ff";
      for (let i = 0; i < width; i++) {
        let min = 1.0, max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = data[i * step + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
      }

      const playheadX = progress * width;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      this.playheadRequest = requestAnimationFrame(drawFrame);
    };

    cancelAnimationFrame(this.playheadRequest);
    this.playheadRequest = requestAnimationFrame(drawFrame);
  }

  setRange(start, end) {
    const range = document.querySelector(".range");
    const left=start*100;
    const width = (end-start)*100;
    range.style.left = `${left}%`;
    range.style.width = `${width}%`;
  }
}