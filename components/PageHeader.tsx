import { FC } from "react";

const PageHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="text-3xl mt-7 mb-5 font-bold text-slate-800">{title}</div>
  );
};

export default PageHeader;
