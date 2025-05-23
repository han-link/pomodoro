import type { Signal } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

interface ITimeSelectProps {
  accessibleName: string;
  time: Signal<number>;
  disabled: boolean;
}

export const TimeSelect = component$((props: ITimeSelectProps) => {
  const min = 0;
  const max = 60;
  return (
    <div class="relative w-full">
      <button
        id="decreaseButton"
        class="absolute right-9 bottom-1 cursor-pointer rounded-md border border-transparent p-1.5 text-center text-sm text-slate-600 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick$={() => {
          if (props.time.value - 1 >= min) {
            props.time.value--;
          }
        }}
        disabled={props.disabled}
        aria-label={"Increase " + props.accessibleName}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
        </svg>
      </button>
      <label
        for={"timeSelect-" + props.accessibleName.replace(" ", "")}
        class="mb-1 block text-sm text-slate-600"
      >
        <Slot />
      </label>
      <input
        id={"timeSelect-" + props.accessibleName.replace(" ", "")}
        type="number"
        bind:value={props.time}
        onBlur$={(e) => {
          const el = e.target as HTMLInputElement;
          const value = Number(el.value);
          if (value > max) {
            el.value = String(max);
            props.time.value = max;
          } else if (value < min) {
            el.value = String(min);
            props.time.value = min;
          } else if (el.value.trim() === "") {
            el.value = String(min);
            props.time.value = min;
          }
        }}
        min={min}
        max={max}
        class="ease w-[16rem] appearance-none rounded-md border border-slate-200 bg-transparent py-2 pr-20 pl-3 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        disabled={props.disabled}
      />
      <button
        id="increaseButton"
        class="absolute right-1 bottom-1 cursor-pointer rounded-md border border-transparent p-1.5 text-center text-sm text-slate-600 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick$={() => {
          if (props.time.value + 1 <= max) {
            props.time.value++;
          }
        }}
        disabled={props.disabled}
        aria-label={"Decrease " + props.accessibleName}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
        </svg>
      </button>
    </div>
  );
});
