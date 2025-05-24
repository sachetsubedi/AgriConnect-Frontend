import { FC, ReactNode } from "react";

const layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
