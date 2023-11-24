import { Alert, AlertDescription } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButon from "@/components/ui/loading-button";
import { Switch } from "@/components/ui/switch";
import { AuthContext } from "@/context/auth-provider";
import axiosClient from "@/lib/axios-client";
import { cn } from "@/lib/utils";
import { CurrentUser } from "@/types/auth";
import { AxiosResponse } from "axios";
import { AlertCircle } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface SignupError {
  [key: string]: Array<string>;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useContext(AuthContext);
  const [remember, setRemember] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<SignupError>({});

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      remember,
    };

    setLoading(true);
    axiosClient
      .post("/auth/login", payload)
      .then(({ data }) => {
        const { user, token } = data;
        setErrors({});
        setToken(token);
        setUser(user as CurrentUser);
      })
      .catch((err) => {
        const res = err.response as AxiosResponse;
        if (res && res.status == 422) {
          setErrors(res.data.errors);
          console.log(res.data.errors);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Link
        to="/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "fixed right-16 top-6 md:right-20 md:top-10"
        )}
      >
        Sign Up
      </Link>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
          <p className="text-center text-sm text-muted-foreground">
            Enter your email and password below to access your account.
          </p>
        </div>

        <form className="flex w-[280px] flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            {Object.keys(errors).map((key) =>
              errors[key].map((err, i) => (
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
          </div>
          <div className="flex flex-col gap-3">
            <Input type="email" placeholder="Email" ref={emailRef} />
            <Input type="password" placeholder="Password" ref={passwordRef} />
            <div className="mt-3 flex items-center justify-between">
              <Label htmlFor="remember">Remember me</Label>
              <Switch
                id="remember"
                checked={remember}
                onCheckedChange={(value) => {
                  setRemember(value);
                }}
              />
            </div>
          </div>

          <LoadingButon loading={loading}>Login</LoadingButon>
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
