import { capitalize } from "@/lib/utils";
import { FC } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

const Welcome: FC<{ name: string; avatar: string; type: string }> = ({
  name,
  avatar,
  type,
}) => {
  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardContent className="p-6 flex justify-between">
        <CardTitle className="text-2xl flex flex-col gap-3 font-bold mb-4 text-gray-700">
          Welcome 👋{" "}
          <div className="text-4xl text-primary">{capitalize(name)}</div>
          <div className="text-sm">You are a {type} in AgriConnect Nepal</div>
        </CardTitle>
        <div className="flex flex-col gap-2 items-center">
          <img src={avatar} className="h-24 w-24 rounded-md" alt="avatar" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Welcome;
