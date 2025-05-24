class PomodoroTimer {
  constructor(timeToCount) {
    this.startTime = Date.now();
    this.countedSeconds = 0;
    this.timeToCount = timeToCount;
  }

  getElapsedTime() {
    // Calculate the elapsedSinceStart time in milliseconds from the start in seconds
    const elapsedSinceStart = Math.round((Date.now() - this.startTime) / 1000);
    const delta = elapsedSinceStart - this.countedSeconds;
    this.countedSeconds += delta;
    // Calculate how many seconds exceeded the target time (if any)
    const over =
      this.countedSeconds > this.timeToCount
        ? this.countedSeconds - this.timeToCount
        : 0;

    const elapsed = delta - over;

    return elapsed > 0 ? elapsed : 1;
  }
}

let timer = null;
self.addEventListener("message", (e) => {
  const msg = e.data;

  if (msg.startsWith("start-timer")) {
    const [, secondsString] = msg.split("_");
    const seconds = parseInt(secondsString, 10);

    if (isNaN(seconds)) {
      throw Error("Invalid message to start worker");
    }

    const timerObj = new PomodoroTimer(seconds);

    timer = setInterval(() => {
      postMessage(timerObj.getElapsedTime());
    }, 1000);
  }

  if (msg === "stop-timer") {
    clearInterval(timer);
  }
});
