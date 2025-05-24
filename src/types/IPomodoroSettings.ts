import type { Signal } from "@builder.io/qwik";

export interface IPomodoroSettings {
  timer: {
    pomodoro: Signal<number>;
    shortBreak: Signal<number>;
    longBreak: Signal<number>;
  };
}
