import { Button } from "@/components/ui/button";

import { ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export default function LoadingButon({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {children}
      {loading && <Loader2 className="ml-4 animate-spin" />}
    </Button>
  );
}
