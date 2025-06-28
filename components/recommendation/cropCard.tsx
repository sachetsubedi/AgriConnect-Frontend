import { T_RecommCropType } from "@/lib/Api/api";
import { FC } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

const RecomCropCard: FC<{ crop: T_RecommCropType }> = ({ crop }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:scale-[1.01] transition-all ease-in-out cursor-pointer w-[350px]">
          <CardContent className="p-0 flex flex-col justify-between">
            <div>
              <img
                src={crop.image}
                alt="image"
                className="w-full h-[200px] rounded-md"
              />
            </div>
            <div className="p-2">
              <CardTitle className="capitalize text-xl">{crop.name}</CardTitle>
              <div className="text-sm font-bold text-muted-foreground">
                {crop.process.planting} - {crop.process.harvest}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="overflow-y-scroll max-h-[80vh]">
        <div className="flex flex-col gap-2 mt-5">
          <img
            src={crop.image}
            alt="image"
            className="w-full h-[300px] rounded-md"
          />
          <DialogTitle className="text-lg font-bold capitalize">
            {crop.name}
          </DialogTitle>
          <div className="text-sm font-bold flex">
            <div className="w-[80px] text-muted-foreground">Plant at</div>
            {crop.process.planting}
          </div>
          <div className="text-sm font-bold flex">
            <div className="w-[80px] text-muted-foreground">Harvest at</div>
            {crop.process.harvest}
          </div>

          <Separator className="my-2" />

          <div className="text-black font-bold">Process</div>
          <ol className="text-sm list-decimal list-inside flex flex-col gap-3">
            {crop.process.process.split(";").map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecomCropCard;
