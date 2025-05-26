import { Icon } from "@iconify/react/dist/iconify.js";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "../ui/button";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  loading?: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <div className="w-full">
      <Button className={`flex gap-2 w-full`} {...props} disabled={loading}>
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
