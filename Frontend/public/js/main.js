import { SamplerEngine } from "./samplerEngine.js";
import { SamplerGUI } from "./samplerGUI.js";

let audioCtx;
let engine;
let gui;
let presets = [];
let bar;
let dropdown;
let record;
let stop;
let urlParams;
let headless;

window.onload = async () => {
  audioCtx = new AudioContext();
  engine = new SamplerEngine(audioCtx);
  dropdown = document.getElementById("presetDropdown");
  urlParams = new URLSearchParams(window.location.search);
  headless = urlParams.get('test');
  if(!headless){
    gui = new SamplerGUI(engine, "padsContainer");
    bar = document.getElementById("bar");
    record=document.getElementById("record");
    stop=document.getElementById("stop");
    record.addEventListener('click', startRecording);
    stop.addEventListener('click', stopRecording);
    stop.disabled=true;
    document.addEventListener("recordingReady", () => {
      console.log("Render");
      gui.renderPads();
    });
  }else{
    console.log("Launching headless mode");
    document.getElementById("main").classList.add("headless");
  }
  await loadPresets();
};

function startRecording() {
  record.disabled=true;
  stop.disabled=false;
  engine.getRecorder().start();
}

function stopRecording() {
  record.disabled=false;
  stop.disabled=true;
  engine.getRecorder().stop();
}

async function loadPresets() {
  const response = await fetch("http://localhost:8010/api/presets");
  presets = await response.json();

  dropdown.querySelectorAll("option:not([value=''])").forEach(opt => opt.remove());

  presets.forEach(preset => {
    const option = document.createElement("option");
    option.value = preset.name;
    option.textContent = preset.name;
    dropdown.appendChild(option);
  });
}

document.getElementById("presetDropdown").addEventListener("change", async (e) => {
  const selectedName = e.target.value;
  if (!selectedName) return;

  const preset = presets.find(p => p.name === selectedName);
  if (!preset) return console.warn("Preset not found:", selectedName);

  if(!headless){
    bar.value = 0;
    bar.max = preset.samples.length;
  }
  engine.reset();

  await Promise.all(
    preset.samples.map(async (sample) => {
      await engine.loadFile(sample);
      if(!headless)bar.value++;
    })
  );
  if(!headless)gui.renderPads();
});

document.addEventListener("keydown",(e)=>{
  switch (e.code){
    case "KeyQ": 
      if(headless){engine.play(0) }else if(engine.getLength()>0) document.getElementById("pad0").click(); 
      break;
    case "KeyW": 
      if(headless){engine.play(1) }else if(engine.getLength()>1) document.getElementById("pad1").click(); 
      break;
    case "KeyE":
      if(headless){engine.play(2) }else if(engine.getLength()>2) document.getElementById("pad2").click(); 
      break;
    case "KeyR":
      if(headless){engine.play(3) }else if(engine.getLength()>3) document.getElementById("pad3").click(); 
      break;
    case "KeyT":
      if(headless){engine.play(4) }else if(engine.getLength()>4) document.getElementById("pad4").click(); 
      break;
    case "KeyY":
      if(headless){engine.play(5) }else if(engine.getLength()>5) document.getElementById("pad5").click(); 
      break;
    case "KeyU":
      if(headless){engine.play(6) }else if(engine.getLength()>6) document.getElementById("pad6").click(); 
      break;
    case "KeyI":
      if(headless){engine.play(7) }else if(engine.getLength()>7) document.getElementById("pad7").click(); 
      break;
    case "KeyO":
      if(headless){engine.play(8) }else if(engine.getLength()>8) document.getElementById("pad8").click(); 
      break;
    case "KeyP":
      if(headless){engine.play(9) }else if(engine.getLength()>9) document.getElementById("pad9").click(); 
      break;
    case "KeyA":
      if(headless){engine.play(10) }else if(engine.getLength()>10) document.getElementById("pad10").click(); 
      break;
    case "KeyS":
      if(headless){engine.play(11) }else if(engine.getLength()>11) document.getElementById("pad11").click(); 
      break;
    case "KeyD":
      if(headless){engine.play(12) }else if(engine.getLength()>12) document.getElementById("pad12").click(); 
      break;
    case "KeyF":
      if(headless){engine.play(13) }else if(engine.getLength()>13) document.getElementById("pad13").click(); 
      break;
    case "KeyG":
      if(headless){engine.play(14) }else if(engine.getLength()>14) document.getElementById("pad14").click(); 
      break;
    case "KeyH":
      if(headless){engine.play(15) }else if(engine.getLength()>15) document.getElementById("pad15").click(); 
      break;
    case "KeyJ":
      if(headless){engine.play(16) }else if(engine.getLength()>16) document.getElementById("pad16").click(); 
      break;
    case "KeyK":
      if(headless){engine.play(17) }else if(engine.getLength()>17) document.getElementById("pad17").click(); 
      break;
    case "KeyL":
      if(headless){engine.play(18) }else if(engine.getLength()>18) document.getElementById("pad18").click(); 
      break;
    case "Semicolon":
      if(headless){engine.play(19) }else if(engine.getLength()>19) document.getElementById("pad19").click(); 
      break;
    case "KeyZ":
      if(headless){engine.play(20) }else if(engine.getLength()>20) document.getElementById("pad20").click(); 
      break;
    case "KeyX":
      if(headless){engine.play(21) }else if(engine.getLength()>21) document.getElementById("pad21").click(); 
      break;
    case "KeyC":
      if(headless){engine.play(22) }else if(engine.getLength()>22) document.getElementById("pad22").click(); 
      break;
    case "KeyV":
      if(headless){engine.play(23) }else if(engine.getLength()>23) document.getElementById("pad23").click(); 
      break;
    case "KeyB":
      if(headless){engine.play(24) }else if(engine.getLength()>24) document.getElementById("pad24").click(); 
      break;
    case "KeyN":
      if(headless){engine.play(25) }else if(engine.getLength()>25) document.getElementById("pad25").click(); 
      break;
    case "ArrowRight":
      if (dropdown.selectedIndex < dropdown.options.length - 1) {
        dropdown.selectedIndex++;
        console.log(`preset ${dropdown.value} selected`);
        dropdown.dispatchEvent(new Event("change", { bubbles: true }));
      }
      break;
    case "ArrowLeft":
      if (dropdown.selectedIndex > 0) {
        dropdown.selectedIndex--;
        console.log(`preset ${dropdown.value} selected`);
        dropdown.dispatchEvent(new Event("change", { bubbles: true }));
      }
  }

});

