import Link from "next/link";
import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface CustomBreadcrumbsProps {
  items: { link?: string; title: string }[];
}

const CustomBreadcrumbs: FC<CustomBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <div className="flex items-center gap-3" key={index}>
              <BreadcrumbItem>
                <Link href={item.link || ""}>{item.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          );
        })}
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumbs;
