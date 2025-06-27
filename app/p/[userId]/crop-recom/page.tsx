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

const sampleData = [
  {
    name: "fenugreek",
    probability: 0.032071298590549316,
    process: {
      name: "fenugreek",
      planting: "Ashoj–Kartik or Chaitra–Baisakh",
      harvest: "Poush–Magh or Baisakh–Jestha",
      process:
        "Sow seeds directly in beds or rows; irrigate lightly; apply compost; harvest leaves at 25–30 days; for seeds, allow to mature and dry; cut and thresh; winnow and store",
    },
  },
  {
    name: "mint",
    probability: 0.032071298590549316,
    process: {
      name: "mint",
      planting: "Chaitra–Baisakh",
      harvest: "Multiple harvests through monsoon",
      process:
        "Plant runners in moist soil; irrigate frequently; apply compost monthly; harvest leaves every 20–30 days; cut stems above ground for continuous growth",
    },
  },
  {
    name: "apple",
    probability: 0.0316458926475707,
    process: {
      name: "apple",
      planting: "Baisakh–Jestha (Apr–May)",
      harvest: "Shrawan–Bhadra (Aug–Sep)",
      process:
        "Select hill area with cold winter; plant grafted saplings in pits with manure; provide irrigation during dry months; prune trees annually; spray to control pests and diseases; harvest when fruits turn red and firm; pick by hand and handle carefully; grade and pack for storage",
    },
  },
  {
    name: "litchi",
    probability: 0.0316458926475707,
    process: {
      name: "litchi",
      planting: "Chaitra–Baisakh (Mar–May)",
      harvest: "Jestha–Asar (May–Jul)",
      process:
        "Plant saplings in fertile soil with good drainage; mulch and irrigate regularly; apply fertilizers three times yearly; prune after harvest; protect from litchi borer; harvest when skin turns pink-red; pick by hand and handle gently; pack and store in cool place",
    },
  },
  {
    name: "sugarcane",
    probability: 0.02455458798338931,
    process: {
      name: "sugarcane",
      planting: "Poush–Magh (Dec–Feb)",
      harvest: "Next winter to spring (Poush–Chaitra)",
      process:
        "Plough and level land; place seed canes horizontally in furrows; cover with soil and irrigate; apply fertilizers in split doses; control weeds and borers; provide frequent irrigation; harvest when canes mature and leaves turn dry; cut at ground level and strip leaves; transport to mill or process for jaggery",
    },
  },
  {
    name: "rice",
    probability: 0.024228886558296307,
    process: {
      name: "rice",
      planting: "Asar15 (Nepali mid‑June/start of monsoon, ~June 29)",
      harvest: "Kartik–Mangsir (Oct–Nov)",
      process:
        "Prepare nursery beds and sow rice seeds; irrigate nursery regularly for 20–30 days; plough main field and puddle it using water; transplant seedlings into main field with spacing; apply basal fertilizers and top-dress with urea during tillering; manage weeds and pests; irrigate during dry spells especially at flowering and grain filling; drain water before harvest; harvest mature rice when grains turn golden; cut plants manually or by sickle; dry sheaves under sun; thresh using machine or traditional tools; winnow and store grains after proper drying",
    },
  },
  {
    name: "wheat",
    probability: 0.024228886558296307,
    process: {
      name: "wheat",
      planting: "Kartik–Mangsir (Oct–Dec)",
      harvest: "Falgun–Chaitra (Mar–Apr)",
      process:
        "Plough field 2–3 times to achieve fine tilth; apply well-rotted farmyard manure and basal fertilizer; treat wheat seeds and sow in rows 20–25 cm apart; lightly cover seeds with soil and level field; apply first irrigation at crown root initiation; apply nitrogen top-dressing after tillering; weed manually or use herbicide; irrigate at critical stages like flowering and grain filling; monitor for rust or aphid infestation; harvest when spikes turn golden and hard; cut plants and bundle them; dry in sun for several days; thresh manually or with machine; winnow and store in dry place",
    },
  },
  {
    name: "maize",
    probability: 0.024228886558296307,
    process: {
      name: "maize",
      planting: "Chaitra–Baisakh (Mar–Apr)",
      harvest: "Shrawan–Bhadra (Jul–Aug)",
      process:
        "Plough field thoroughly and apply compost; sow seeds directly at 20–25 cm spacing in rows; apply basal dose of fertilizer; irrigate after germination and at critical stages; control weeds manually or chemically; apply top-dressing during knee-high stage; protect from stem borers and fall armyworm; harvest when cobs are dry and kernels are hard; remove husk and dry cobs; shell manually or with machine; store in dry and cool place",
    },
  },
  {
    name: "barley",
    probability: 0.024228886558296307,
    process: {
      name: "barley",
      planting: "Kartik–Mangsir (Oct–Dec)",
      harvest: "Falgun–Chaitra (Mar–Apr)",
      process:
        "Prepare land with deep ploughing; broadcast or line sow seeds in rows 20 cm apart; apply organic manure and fertilizers; irrigate at tillering and grain filling; manage weeds and pests; harvest when spikes turn yellow and grains are hard; cut and bundle stalks; dry in sun and thresh; clean and store grains properly",
    },
  },
  {
    name: "millet",
    probability: 0.024228886558296307,
    process: {
      name: "millet",
      planting: "Asar–Shrawan (Jun–Aug)",
      harvest: "Kartik–Mangsir (Oct–Nov)",
      process:
        "Plough field and apply compost; sow seeds by broadcasting or in rows; cover seeds lightly with soil; apply fertilizers if available; weed during early growth; irrigate only if rainfall is insufficient; harvest when heads turn brown and grains harden; cut heads and dry on mat or sheet; thresh and winnow; store in airtight container",
    },
  },
  {
    name: "tea",
    probability: 0.024228886558296307,
    process: {
      name: "tea",
      planting: "Planted once; harvested in flushes",
      harvest: "Apr–Nov (multiple flushes)",
      process:
        "Plant tea cuttings or seedlings in rows on slopes; provide partial shade and mulch; weed and prune regularly; apply fertilizers and maintain soil pH; pluck young leaves every 7–15 days; process leaves immediately after plucking; dry and pack for market",
    },
  },
  {
    name: "coffee",
    probability: 0.024228886558296307,
    process: {
      name: "coffee",
      planting: "Spring (Chaitra–Baisakh)",
      harvest: "Years 3–4 post planting; fruits ripen Oct–Dec",
      process:
        "Plant seedlings in shaded area with good drainage; apply organic manure and mulch; weed and prune to maintain shape; irrigate during dry periods; apply fertilizers during flowering and fruit setting; harvest red ripe cherries by hand; process by wet or dry method; dry beans and store in cool dry place",
    },
  },
  {
    name: "citrus",
    probability: 0.024228886558296307,
    process: {
      name: "citrus",
      planting: "Chaitra–Baisakh (Mar–Apr)",
      harvest: "Shrawan–Magh (Jul–Jan)",
      process:
        "Plant budded plants in well-drained soil; irrigate regularly; apply fertilizers three times a year; prune to shape trees; monitor for citrus canker and aphids; harvest when fruits are full size and firm; pick carefully by hand; store in cool place",
    },
  },
  {
    name: "buckwheat",
    probability: 0.024228886558296307,
    process: {
      name: "buckwheat",
      planting: "Shrawan–Bhadra (Jul–Aug)",
      harvest: "Kartik–Mangsir (Oct–Nov)",
      process:
        "Prepare land and broadcast seeds in late summer; avoid excessive water; apply compost; weed once or twice; harvest when most seeds are brown and firm; cut plants and dry; thresh by beating or machine; winnow and store",
    },
  },
  {
    name: "cardamom",
    probability: 0.024228886558296307,
    process: {
      name: "cardamom",
      planting: "Monsoon onset (Asar–Shrawan)",
      harvest: "Falgun–Chaitra (Mar–Apr)",
      process:
        "Plant rhizomes under shade trees in moist area; mulch and irrigate regularly; apply organic manure; control thrips and fungal diseases; harvest mature capsules every 30–40 days; dry in curing chamber or sun; grade and store in airtight containers",
    },
  },
];

const page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
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
            <div className="flex flex-col gap-2">
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

export default page;
