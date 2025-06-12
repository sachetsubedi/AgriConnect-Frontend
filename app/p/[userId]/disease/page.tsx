"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import Required from "@/components/required";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { API_DiseaseAnalyze } from "@/lib/Api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowLeft, Flower2, ScanEye, Upload, X } from "lucide-react";
import React, { FC, use, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z
  .object({
    description: z
      .string()
      .min(10, "Please describe the disease in atlease 10 characters"),
    image: z.any(),
  })
  .superRefine((data, ctx) => {
    console.log(data.image);
    if (!data.image || data.image.length <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload an image",
        path: ["image"],
      });
    }
  });

export type DiseaseTreatment = {
  disease: string;
  description: string;
  treatment: {
    cultural_practice: string;
    chemical_treatment: {
      chemical_name: string;
      application_method: string;
    }[];
  };
};

const page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const { userId } = use(params);
  const [files, setFiles] = React.useState<File[]>([]);
  const [step, setStep] = useState(1);

  const form = useForm({
    defaultValues: { description: "", image: [] },
    resolver: zodResolver(schema),
  });

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  const mutataion = useMutation({
    mutationFn: API_DiseaseAnalyze,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  const onSubmit = () => {
    const data = form.watch();
    setStep(2);

    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    mutataion.mutate(formData);
  };

  return (
    <>
      <PageHeader title="Disease Management" />
      <CustomBreadcrumbs
        items={[
          { title: "Disease Management", link: `/p/${userId}/disease` },
          { title: "Analyze" },
        ]}
      />

      {step === 1 && (
        <div>
          <div className="text-muted-foreground flex items-center gap-2 mt-5">
            <Flower2 className="text-green-600" size={50} />
            Upload a photo of your affected crop and explain the symptoms of
            your crops, and our AI-powered system will identify possible plant
            diseases and recommend treatment steps to help you take timely
            action.
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <div className=" flex flex-col gap-2">
                <Label>
                  Description <Required />{" "}
                </Label>
                <Textarea
                  placeholder="Describe the symptoms"
                  rows={9}
                  className="resize-none"
                  {...form.register("description")}
                />
                <Label className="text-destructive">
                  {" "}
                  {form.formState.errors.description?.message}
                </Label>
              </div>
              <div>
                <Label>
                  Images <Required />
                </Label>
                <FileUpload
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  className="w-full max-w-md"
                  value={files}
                  onValueChange={(value) => {
                    setFiles(value);
                    form.clearErrors("image");
                    form.setValue("image", value);
                  }}
                  accept="image/*"
                  onFileReject={onFileReject}
                >
                  <FileUploadDropzone>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-sm">
                        Drag & drop files here
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Or click to browse (max 1 image, up to 5MB )
                      </p>
                    </div>
                    <FileUploadTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-fit"
                      >
                        Browse files
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {files.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <X />
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
                <Label className="text-destructive">
                  {" "}
                  {form.formState.errors.image?.message as any}
                </Label>
              </div>
              <div>
                <Button>
                  <ScanEye /> Analyze Disease
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {step === 2 && (
        <div>
          {mutataion.isPending && (
            <div className="flex flex-col items-center justify-center text-sm">
              <Loader />
              Please wait while we analyze the disease...
            </div>
          )}
          {mutataion.isSuccess && (
            <div className="mt-5">
              <div className="text-xl font-bold flex items-center justify-between">
                Analysis Result{" "}
                <Button variant={"outline"} onClick={() => setStep(1)}>
                  <ArrowLeft /> Back
                </Button>
              </div>

              <Card className="mt-5">
                <CardTitle></CardTitle>
                <CardContent className="p-6">
                  <div className="font-bold text-xl">
                    {mutataion.data?.data.disease}
                  </div>
                  <div className="text-muted-foreground mt-2">
                    {mutataion.data?.data.description}
                  </div>
                  <Separator className="mt-5" />
                  <div className="mt-5 font-bold">Cultural Practice</div>
                  <div className="text-muted-foreground">
                    <ul className="list-disc pl-5">
                      {mutataion.data?.data.treatment.cultural_practice
                        .split(".")
                        .map((item, i) => {
                          if (!item.trim()) return null; // Skip empty items
                          return (
                            <li key={i} className="mt-2 ml-5">
                              {item.trim()}.
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  <Separator className="mt-5" />
                  <div className="mt-5 font-bold">Chemical Treatment</div>
                  <div className="pl-5">
                    {mutataion.data?.data.treatment.chemical_treatment.map(
                      (item) => {
                        return (
                          <div key={item.chemical_name} className="mt-3">
                            <div className="font-semibold">
                              {item.chemical_name}
                            </div>
                            <div className="text-muted-foreground">
                              {item.application_method}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default page;
