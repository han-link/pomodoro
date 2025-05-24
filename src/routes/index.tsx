import type { Signal } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { TimeSelect } from "~/components/time-selector";
import { CountdownTimer } from "~/components/countdown-timer";

interface IPomodoroSettings {
  pomodoro: Signal<number>;
  shortBreak: Signal<number>;
  longBreak: Signal<number>;
}

export default component$(() => {
  const isRunning = useSignal(false);
  const settings: IPomodoroSettings = {
    pomodoro: useSignal(25),
    shortBreak: useSignal(5),
    longBreak: useSignal(15),
  };

  const selected = useSignal<"pomodoro" | "shortBreak" | "longBreak">(
    "pomodoro",
  );

  // timer holds seconds (minutes * 60)
  const timer = useSignal(settings.pomodoro.value * 60);

  // Sync timer when selection or settings change (only if not running)
  useTask$(({ track }) => {
    track(() => selected.value);
    track(() => settings.pomodoro.value);
    track(() => settings.shortBreak.value);
    track(() => settings.longBreak.value);
    track(() => isRunning.value);

    if (!isRunning.value) {
      switch (selected.value) {
        case "pomodoro":
          timer.value = settings.pomodoro.value * 60;
          break;
        case "shortBreak":
          timer.value = settings.shortBreak.value * 60;
          break;
        case "longBreak":
          timer.value = settings.longBreak.value * 60;
          break;
      }
    }
  });

  // Countdown logic
  useTask$(async ({ track, cleanup }) => {
    track(() => isRunning.value);
    if (!isRunning.value) return;

    // Reset seconds at start
    switch (selected.value) {
      case "pomodoro":
        timer.value = settings.pomodoro.value * 60;
        break;
      case "shortBreak":
        timer.value = settings.shortBreak.value * 60;
        break;
      case "longBreak":
        timer.value = settings.longBreak.value * 60;
        break;
    }
    if (typeof Notification !== "undefined") {
      if (Notification.permission !== "denied") {
        await Notification.requestPermission();
      }
    }

    const id = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        isRunning.value = false;
        if (typeof Notification !== "undefined") {
          new Notification("Your timer is up!");
        }
        clearInterval(id);
      }
    }, 1000);

    cleanup(() => clearInterval(id));
  });

  return (
    <>
      <main class="flex h-screen w-screen items-center justify-center">
        <div class="flex max-w-lg flex-col items-center">
          <CountdownTimer time={timer.value} />
          <div class="my-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Pomodoro */}
            <div class="grid w-full grid-rows-2 place-items-center gap-2">
              <button
                type="button"
                data-ripple-dark="true"
                onClick$={() => (selected.value = "pomodoro")}
                disabled={isRunning.value}
                class="bg-white-900 w-full cursor-pointer rounded-lg border border-gray-900/10 px-6 py-3 font-sans text-xs font-bold uppercase select-none hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Pomodoro
              </button>
              <TimeSelect
                accessibleName="pomodoro timer"
                time={settings.pomodoro}
                disabled={isRunning}
                hideLabel={true}
              >
                pomodoro timer
              </TimeSelect>
            </div>

            {/* Short Break */}
            <div class="grid w-full grid-rows-2 place-items-center gap-2">
              <button
                type="button"
                data-ripple-dark="true"
                onClick$={() => (selected.value = "shortBreak")}
                disabled={isRunning.value}
                class="bg-white-900 w-full cursor-pointer rounded-lg border border-gray-900/10 px-6 py-3 font-sans text-xs font-bold uppercase select-none hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Short Break
              </button>
              <TimeSelect
                accessibleName="short break"
                time={settings.shortBreak}
                disabled={isRunning}
                hideLabel={true}
              >
                short break
              </TimeSelect>
            </div>

            {/* Long Break */}
            <div class="grid w-full grid-rows-2 place-items-center gap-2">
              <button
                type="button"
                data-ripple-dark="true"
                onClick$={() => (selected.value = "longBreak")}
                disabled={isRunning.value}
                class="bg-white-900 w-full cursor-pointer rounded-lg border border-gray-900/10 px-6 py-3 font-sans text-xs font-bold uppercase select-none hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Long Break
              </button>
              <TimeSelect
                accessibleName="long break"
                time={settings.longBreak}
                disabled={isRunning}
                hideLabel={true}
              >
                long break
              </TimeSelect>
            </div>
          </div>

          <button
            type="button"
            data-ripple-light="true"
            onClick$={() => (isRunning.value = !isRunning.value)}
            class="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold text-white uppercase shadow-md shadow-gray-900/10 transition-all select-none hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {!isRunning.value ? "Start" : "Stop"}
          </button>
        </div>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pomodoro",
  meta: [
    {
      name: "description",
      content: "Qwik Pomodoro Timer",
    },
  ],
};
