import { Plus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

const PageHeader: FC<{
  title: string;
  createPage?: string;
  createPageTitle?: string;
}> = ({ title, createPage, createPageTitle }) => {
  return (
    <div className="mt-7 mb-5 flex justify-between">
      <div className="text-3xl  font-bold text-slate-800">{title}</div>
      {createPage && (
        <Link href={createPage || "#"}>
          <Button variant={"default"}>
            <Plus /> {createPageTitle ?? "Create"}{" "}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
