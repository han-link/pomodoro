import type { Signal } from "@builder.io/qwik";

export interface ITimer {
  time: Signal<number>;
  isRunning: Signal<boolean>;
}
