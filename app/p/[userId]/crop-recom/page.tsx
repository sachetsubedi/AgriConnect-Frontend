"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import Map from "@/components/maps/Map";
import PageHeader from "@/components/PageHeader";
import RecomCropCard from "@/components/recommendation/cropCard";
import { Button } from "@/components/ui/button";
import { API_GetRecommendation } from "@/lib/Api/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Brain } from "lucide-react";
import { FC, use, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);

  const [step, setStep] = useState(1);

  const locationForm = useForm({
    defaultValues: {
      location: [0, 0],
    },
  });

  const recommendMutation = useMutation({
    mutationFn: API_GetRecommendation,
    onError: (err: AxiosError<any>) => {
      toast.error(err.response?.data.message);
      setStep(1);
    },
  });

  return (
    <div>
      <PageHeader title="Crop Recommendation" />
      <CustomBreadcrumbs
        items={[
          { title: "Crop Recommendation", link: `/p/${userId}/crop-recom` },
          { title: "Recommend" },
        ]}
      />

      {step === 1 && (
        <>
          <div className="mt-5">
            <div className="text-lg mb-3 text-muted-foreground">
              Crop Recommendation System is designed to help farmers and
              agricultural planners identify the most suitable crops for a
              specific location based on various environmental and soil
              conditions.
            </div>
          </div>
          <div className="font-bold">Choose your location</div>

          <Map form={locationForm}></Map>
          <Button
            className="mt-5"
            onClick={() => {
              setStep(2);
              const location = locationForm.getValues("location");
              if (location[0] === 0 && location[1] === 0) {
                toast.error("Please select a valid location on the map");
                return;
              }
              recommendMutation.mutate({
                location: locationForm.getValues("location"),
              });
            }}
          >
            <Brain /> Get Recommendations
          </Button>
        </>
      )}

      {step === 2 && (
        <div className="mt-5">
          {recommendMutation.isPending && (
            <div className="flex flex-col items-center justify-center text-sm">
              <Loader />
              Please wait while we find best crops for you...
            </div>
          )}
          {recommendMutation.isSuccess && (
            <div className="flex flex-wrap gap-5">
              {recommendMutation.data.crop.map((crop, index) => {
                return <RecomCropCard crop={crop} key={index}></RecomCropCard>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
