import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { TimeSelect } from "~/components/time-selector";
import { SettingsContext, TimerContext } from "~/routes";

export const SettingsModal = component$(() => {
  const timer = useContext(TimerContext);
  const settings = useContext(SettingsContext);
  return (
    <div
      data-dialog-backdrop="settings-modal"
      data-dialog-backdrop-close="true"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center opacity-0 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        data-dialog="settings-modal"
        data-dialog-mount="opacity-100 translate-y-0 scale-100"
        data-dialog-unmount="opacity-0 -translate-y-28 scale-90 pointer-events-none"
        data-dialog-transition="transition-all duration-300"
        class="relative m-4 rounded-lg bg-white p-4 shadow-sm"
      >
        <div class="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
          Settings
        </div>
        <div class="relative flex flex-col gap-2 border-t border-slate-200 py-4 leading-normal font-light text-slate-600">
          <TimeSelect
            accessibleName="pomodoro time"
            time={settings.timer.pomodoro}
            disabled={timer.isRunning.value}
          >
            Pomodoro
          </TimeSelect>
          <TimeSelect
            accessibleName="short break time"
            time={settings.timer.shortBreak}
            disabled={timer.isRunning.value}
          >
            Short break
          </TimeSelect>
          <TimeSelect
            accessibleName="long break time"
            time={settings.timer.longBreak}
            disabled={timer.isRunning.value}
          >
            Long break
          </TimeSelect>
        </div>
        <div class="flex shrink-0 flex-wrap items-center justify-end pt-4">
          <button
            data-dialog-close="true"
            class="rounded-md border border-transparent px-4 py-2 text-center text-sm text-slate-600 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});
