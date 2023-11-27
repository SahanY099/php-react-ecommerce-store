import { Alert, AlertDescription } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButon from "@/components/ui/loading-button";
import { AuthContext } from "@/context/auth-provider";
import axiosClient from "@/lib/axios-client";
import { cn } from "@/lib/utils";
import { AuthError, CurrentUser } from "@/types/auth";
import { AxiosResponse } from "axios";
import { AlertCircle } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<AuthError | null>();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: passwordConfirmationRef.current?.value,
    };

    setLoading(true);
    axiosClient
      .post("/auth/signup", payload)
      .then(({ data }) => {
        const { user, token } = data;
        setErrors(null);
        setToken(token);
        setUser(user as CurrentUser);
      })
      .catch((err) => {
        const res = err.response as AxiosResponse;
        if (res && res.status == 422) {
          setErrors(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Link
        to="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          // "fixed right-6 top-6 md:right-8 md:top-8"
          "fixed right-16 top-6 md:right-20 md:top-10"
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

        <form
          className="flex max-w-[300px] flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            {errors &&
              errors.errors &&
              Object.keys(errors.errors).map(
                (key) =>
                  errors.errors?.[key].map((err, i) => (
                    <Alert
                      key={`${key} ${i}`}
                      variant="destructive"
                      className="flex flex-row items-start"
                    >
                      <div className="mr-3 inline-block">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <AlertDescription>{err}</AlertDescription>
                    </Alert>
                  ))
              )}

            {errors && !errors.errors && errors.message && (
              <Alert
                variant="destructive"
                className="flex flex-row items-start"
              >
                <div className="mr-3 inline-block">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <AlertDescription>{errors?.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Input type="email" placeholder="Email" ref={emailRef} />
            <Input type="password" placeholder="Password" ref={passwordRef} />
            <Input
              type="password"
              placeholder="Confirm Password"
              ref={passwordConfirmationRef}
            />
          </div>

          <LoadingButon loading={loading}>Sign Up</LoadingButon>
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
