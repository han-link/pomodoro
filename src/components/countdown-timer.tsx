import { component$ } from "@builder.io/qwik";

export const CountdownTimer = component$((props: { time: number }) => {
  const dateObj = new Date(props.time * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();
  const timeString =
    minutes.toString().padStart(2, "0") + seconds.toString().padStart(2, "0");

  return (
    <div class="flex max-w-sm text-center font-sans text-8xl text-white">
      <div class="mr-1 rounded bg-gray-900 p-1">{timeString[0]}</div>
      <div class="mx-1 rounded bg-gray-900 p-1">{timeString[1]}</div>
      <div class="text-gray-900">:</div>
      <div class="mx-1 rounded bg-gray-900 p-1">{timeString[2]}</div>
      <div class="ml-1 rounded bg-gray-900 p-1">{timeString[3]}</div>
    </div>
  );
});
