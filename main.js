'use script';

const stopwatch = document.getElementById('stopwatch');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let state = 'start'
let timerId;
let elapsedMs = 0;

function timeToString(millis) {
    const ms = millis % 100;
    const s = Math.floor(millis / 1000)  % 60;
    const m = Math.floor(millis / 1000 / 60) % 60;
    const h = Math.floor(millis / 1000 / 60 / 60) % 60;

    const formattedMs = ms.toString().padStart(2, '0');
    const formattedS = s.toString().padStart(2, '0');
    const formattedM = m.toString().padStart(1, '0');
    const formattedH = h.toString().padStart(1, '0');

    return `${formattedH}:${formattedM}:${formattedS}:${formattedMs}`;

}

start.addEventListener('click',() => {
    setButtonStateRunning();
    let startMs=Date.now();
    startMs -= elapsedMs;

    timerId = setInterval(() => {
        const nowMs = Date.now();
        elapsedMs = nowMs - startMs;
        stopwatch.textContent = timeToString(elapsedMs);
    }, 10);
});


stop.addEventListener('click',() =>{
    setButtonStateStopped();
    clearInterval(timerId);
});

reset.addEventListener('click',() => {
    setButtonStateInitial();
    state='start';
    clearInterval(timerId);
    start.textContent = 'スタート';
    start.classList.remove('stop');
    elapsedMs = 0;
    stopwatch.textContent = '0:0:0:0';
});

// スタートしてからクリックできないようにする


function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;

  }
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;

  }

  setButtonStateInitial(); //初期設定


