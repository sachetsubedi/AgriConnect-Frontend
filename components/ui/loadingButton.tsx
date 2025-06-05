import { Icon } from "@iconify/react/dist/iconify.js";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "../ui/button";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  loading?: boolean;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
}

const LoadingButton: FC<LoadingButtonProps> = ({
  children,
  loading,
  variant = "default",
  ...props
}) => {
  return (
    <div className="">
      <Button
        className={`flex gap-2 w-full`}
        {...props}
        disabled={loading}
        variant={variant}
      >
        {children}
        <Icon
          icon={"svg-spinners:90-ring"}
          className={`animate-spin size-5 ${loading ? "" : "hidden"} `}
        ></Icon>
      </Button>
    </div>
  );
};
export default LoadingButton;
