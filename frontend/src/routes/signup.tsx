import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Link
        to="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="grid items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Enter your email below to create your account.
          </p>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
          </div>
          <Button>Sign Up</Button>
        </form>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>
          &nbsp; and &nbsp;
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
