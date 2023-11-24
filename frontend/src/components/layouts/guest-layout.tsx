import ModeToggle from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="container relative grid h-screen max-w-none items-center justify-center px-0 md:grid-cols-2">
      <div className="relative hidden h-full flex-col p-10 text-white  md:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="z-20">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            TechMan
          </h1>
        </div>

        <div className="z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="px-8">
        <div className="fixed right-6 top-6 md:right-10 md:top-10">
          <ModeToggle />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
