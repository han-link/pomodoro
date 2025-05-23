import { component$ } from "@builder.io/qwik";

export const CountdownTimer = component$((props: { time: number}) => {
    const dateObj = new Date(props.time * 1000);
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();
    const timeString = minutes.toString().padStart(2, '0') + seconds.toString().padStart(2, '0');

    return <div class="flex text-8xl font-sans text-white text-center max-w-sm">
        <div class="bg-gray-900 rounded p-1 mr-1">{timeString[0]}</div>
        <div class="bg-gray-900 rounded p-1 mx-1">{timeString[1]}</div>
        <div class="text-gray-900">:</div>
        <div class="bg-gray-900 rounded p-1 mx-1">{timeString[2]}</div>
        <div class="bg-gray-900 rounded p-1 ml-1">{timeString[3]}</div>
    </div>
});
