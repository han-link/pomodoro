import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CountdownTimer } from "~/components/countdown-timer";
import { useContextProvider, createContextId } from "@builder.io/qwik";
import { SettingsModal } from "~/components/settings";
import type { IPomodoroSettings, ITimer } from "~/types";

export const SettingsContext =
  createContextId<IPomodoroSettings>("settings-context");

export const TimerContext = createContextId<ITimer>("timer-context");

export default component$(() => {
  const timer: ITimer = {
    time: useSignal(25 * 60),
    isRunning: useSignal(false),
  };

  useContextProvider(TimerContext, timer);

  const settings: IPomodoroSettings = {
    timer: {
      pomodoro: useSignal(25),
      shortBreak: useSignal(5),
      longBreak: useSignal(15),
    },
  };

  useContextProvider(SettingsContext, settings);

  const selected = useSignal<"pomodoro" | "shortBreak" | "longBreak">(
    "pomodoro",
  );

  useTask$(({ track }) => {
    track(() => selected.value);
    track(() => settings.timer.pomodoro.value);
    track(() => settings.timer.shortBreak.value);
    track(() => settings.timer.longBreak.value);
    track(() => timer.isRunning.value);

    if (!timer.isRunning.value) {
      switch (selected.value) {
        case "pomodoro":
          timer.time.value = settings.timer.pomodoro.value * 60;
          break;
        case "shortBreak":
          timer.time.value = settings.timer.shortBreak.value * 60;
          break;
        case "longBreak":
          timer.time.value = settings.timer.longBreak.value * 60;
          break;
      }
    }
  });

  // Countdown logic
  useTask$(async ({ track, cleanup }) => {
    track(() => timer.isRunning.value);
    if (!timer.isRunning.value) return;

    // Reset seconds at start
    switch (selected.value) {
      case "pomodoro":
        timer.time.value = settings.timer.pomodoro.value * 60;
        break;
      case "shortBreak":
        timer.time.value = settings.timer.shortBreak.value * 60;
        break;
      case "longBreak":
        timer.time.value = settings.timer.longBreak.value * 60;
        break;
    }
    if (typeof Notification !== "undefined") {
      if (Notification.permission !== "denied") {
        await Notification.requestPermission();
      }
    }

    // Start Worker
    const worker = new Worker("/scripts/worker/time-worker.js");
    worker.postMessage(`start-timer_${timer.time.value}`);

    worker.onmessage = (e) => {
      const elapsedTime = parseInt(e.data);
      if (timer.time.value > 0) {
        timer.time.value -= elapsedTime;
      } else {
        timer.isRunning.value = false;
        if (typeof Notification !== "undefined") {
          new Notification("Your timer is up!");
        }
      }
    };

    worker.onerror = () => {
      timer.isRunning.value = false;
    }

    cleanup(() => {
      worker.postMessage("stop-timer");
      worker.terminate();
    });
  });

  return (
    <>
      <main class="flex h-screen w-screen items-center justify-center">
        <div class="flex max-w-lg flex-col items-center">
          <CountdownTimer time={timer.time.value} />
          <div class="my-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Pomodoro */}
            <button
              type="button"
              data-ripple-dark="true"
              onClick$={() => (selected.value = "pomodoro")}
              disabled={timer.isRunning.value}
              class="bg-white-900 w-full cursor-pointer rounded-lg border border-gray-900/10 px-6 py-3 font-sans text-xs font-bold uppercase select-none hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Pomodoro
            </button>

            {/* Short Break */}
            <button
              type="button"
              data-ripple-dark="true"
              onClick$={() => (selected.value = "shortBreak")}
              disabled={timer.isRunning.value}
              class="bg-white-900 w-full cursor-pointer rounded-lg border border-gray-900/10 px-6 py-3 font-sans text-xs font-bold uppercase select-none hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Short Break
            </button>

            {/* Long Break */}
            <button
              type="button"
              data-ripple-dark="true"
              onClick$={() => (selected.value = "longBreak")}
              disabled={timer.isRunning.value}
              class="bg-white-900 w-full cursor-pointer rounded-lg border border-gray-900/10 px-6 py-3 font-sans text-xs font-bold uppercase select-none hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Long Break
            </button>
          </div>

          <button
            type="button"
            data-ripple-light="true"
            onClick$={() => (timer.isRunning.value = !timer.isRunning.value)}
            class="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold text-white uppercase shadow-md shadow-gray-900/10 transition-all select-none hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {!timer.isRunning.value ? "Start" : "Stop"}
          </button>
        </div>
        <SettingsModal />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pomodoro",
  meta: [
    {
      name: "Pomodoro Timer",
      content: "Qwik Pomodoro Timer",
    },
  ],
};
