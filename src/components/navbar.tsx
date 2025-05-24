import { component$ } from "@builder.io/qwik";
import { GoMarkGithub16, GoGear24 } from "@qwikest/icons/octicons";
import PomodoroImg from "~/assets/pomodoro.png?w=64&h=64&jsx";

export const Navbar = component$(() => {
  return (
    <nav class="absolute top-0 mx-auto w-full rounded-md bg-white px-4 py-2 text-white shadow-md lg:px-8 lg:py-3">
      <div class="container mx-auto flex flex-wrap items-center justify-between text-slate-800">
        <nav>
          <a
            href="/"
            class="flex items-center gap-2 py-1.5 text-base font-semibold text-slate-800 transition-colors hover:text-slate-600"
          >
            <PomodoroImg
              class="h-[30px] w-[30px] rounded"
              alt="Pomodoro Logo"
              loading="eager"
            />
            <span>Pomodoro</span>
          </a>
        </nav>

        <div>
          <ul class="mt-0 mb-0 flex flex-row items-center gap-6">
            <li class="flex items-center gap-x-2 p-1 text-sm text-slate-600">
              <a
                href="https://github.com/han-link/pomodoro"
                class="flex items-center gap-1"
              >
                <GoMarkGithub16 />
                Github
              </a>
            </li>
            <li class="flex items-center gap-x-2 p-1 text-sm text-slate-600">
              <button
                data-dialog-target="settings-modal"
                class="flex cursor-pointer items-center gap-1"
              >
                <GoGear24 />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
