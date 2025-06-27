import { T_RecommCropType } from "@/lib/Api/api";
import { capitalize } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

const RecomCropCard: FC<{ crop: T_RecommCropType }> = ({ crop }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card
      className="hover:scale-[1.01] transition-all ease-in-out cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="p-6 flex justify-between ">
        <div>
          <CardTitle className="capitalize text-xl">
            {" "}
            <Button variant={"outline"} className="p-1 h-6 w-6">
              <ChevronDown
                className={` transition-all ease-in-out ${
                  expanded ? "rotate-180" : ""
                }  `}
              />{" "}
            </Button>{" "}
            {crop.name}{" "}
          </CardTitle>
          {expanded && (
            <>
              <div className="mt-5">
                <div className="font-bold">Plantation process</div>
              </div>

              <div>
                {crop.process.process.split(";").map((step, index) => {
                  return (
                    <li key={index} className="text-sm">
                      {capitalize(step)}.{" "}
                    </li>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="text-sm">
          <div className="flex gap-5 font-[500]">
            <div className="text-muted-foreground w-24">Plantation on</div>
            <div>{crop.process.planting}</div>
          </div>
          <div className="flex gap-5 font-[500]">
            <div className="text-muted-foreground w-24">Harvest on</div>
            <div>{crop.process.harvest}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecomCropCard;
