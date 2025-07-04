"use client";
import Loader from "@/components/Loader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSession } from "@/hooks/useSession";
import { getPath } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const session = useSession();

  if (session.isLoading || !session.data) return <Loader />;

  return (
    <div>
      <h1 className="font-bold text-xl">Account</h1>
      <Card className="mt-5">
        <CardContent className="p-6">
          <CardTitle className="flex justify-between">
            User Details{" "}
            <Link
              href={getPath(session.data?.id, ["setting"])}
              className="text-sm"
            >
              <Button>
                <Pencil /> Edit
              </Button>
            </Link>
          </CardTitle>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="flex items-center ml-10">
              <Avatar className="w-32 h-32">
                <AvatarImage src={session.data?.avatar}></AvatarImage>
              </Avatar>
            </div>
            <div>
              <div className="font-[500] text-md flex">
                <div className="text-muted-foreground w-28">Name</div>
                <div>{session.data?.name}</div>
              </div>
              <div className="font-[500] text-md flex">
                <div className="text-muted-foreground w-28">Email</div>
                <div>{session.data?.email}</div>
              </div>

              <div className="font-[500] text-md flex">
                <div className="text-muted-foreground w-28">Phone</div>
                <div>{session.data?.phone || "-"}</div>
              </div>

              <div className="font-[500] text-md flex">
                <div className="text-muted-foreground w-28">Address</div>
                <div>{session.data?.address || "-"}</div>
              </div>

              <div className="font-[500] text-md flex">
                <div className="text-muted-foreground w-28">Account Type</div>
                <div className="capitalize">
                  {session.data?.userType || "-"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
