import { component$ } from "@builder.io/qwik";

export const CountdownTimer = component$((props: { time: number }) => {
  const minutes = Math.floor(props.time / 60);
  const seconds = props.time % 60;
  let minStr = "00";
  let secStr = "00";
  if (!isNaN(minutes) || !isNaN(seconds)) {
    minStr = String(minutes).padStart(2, "0");
    secStr = String(seconds).padStart(2, "0");
  }

  return (
    <div class="flex max-w-sm text-center font-sans text-8xl text-white">
      <div class="mr-1 rounded bg-gray-900 p-1">{minStr[0]}</div>
      <div class="mx-1 rounded bg-gray-900 p-1">{minStr[1]}</div>
      <div class="text-gray-900">:</div>
      <div class="mx-1 rounded bg-gray-900 p-1">{secStr[0]}</div>
      <div class="ml-1 rounded bg-gray-900 p-1">{secStr[1]}</div>
    </div>
  );
});
