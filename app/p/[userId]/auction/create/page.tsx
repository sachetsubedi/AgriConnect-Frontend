"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import Required from "@/components/required";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loadingButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { API_CreateAuction } from "@/lib/Api/api";
import { UNITS } from "@/lib/data";
import { areAllFilesImages, getPath, mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format, isAfter } from "date-fns";
import {
  ChevronDownIcon,
  CircleX,
  Eraser,
  Send,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, use, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createProductSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(20, "Title must be less than 20 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(100, "Description must be less than 100 characters"),
    quantity: z.string().min(1, "Quantity is required"),
    unit: z.string().min(1, "Unit is required"),
    files: z.any(),
    startPrice: z.coerce.number().positive("Start price must be a more than 0"),
    startDate: z.date(),
    endDate: z.date(),
  })
  .superRefine((v, c) => {
    if (!v.startDate) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start date is required",
        path: ["startDate"],
      });
    }

    if (!v.endDate) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date is required",
        path: ["endDate"],
      });
    }

    if (!isAfter(v.endDate, v.startDate)) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after start date",
        path: ["endDate"],
      });
    }

    if (v.files.length === 0) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select at least one photo",
        path: ["files"],
      });
    } else if (v.files.length > 5) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You can upload a maximum of 5 photos",
        path: ["files"],
      });
    }

    if (!areAllFilesImages(v.files)) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "All files must be images",
        path: ["files"],
      });
    }
  });

const CreateAcution: FC<{ params: Promise<{ userId: string }> }> = ({
  params,
}) => {
  const { userId } = use(params);

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      quantity: "",
      unit: "",
      startDate: new Date(),
      endDate: new Date(),
      files: [],
      startPrice: 0,
    },
  });

  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  const mutatation = useMutation({
    mutationFn: API_CreateAuction,
    onSuccess: () => {
      form.reset();
      toast.success("Auction created successfully");
      return router.push(getPath(userId, "auction"));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      mapFieldsOnError(error, form.setError);
      return toast.error(
        error.response?.data.message || "Something went wrong"
      );
    },
  });

  const onSubmit = async () => {
    const data = form.watch();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("unit", data.unit);
    formData.append("startPrice", data.startPrice.toString());
    formData.append("startDate", format(data.startDate, "yyyy-MM-dd"));
    formData.append("endDate", format(data.endDate, "yyyy-MM-dd"));

    if (data.files) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append("photo", data.files[i]);
      }
    }
    return mutatation.mutate(formData);
  };
  return (
    <div>
      <PageHeader title="Auctions" />
      <CustomBreadcrumbs
        items={[
          { title: "Auctions", link: `/p/${userId}/auction` },
          { title: "Create" },
        ]}
      />
      <div>
        <div className="mt-10 font-[500]">
          <div className="font-bold">Product Details</div>
          <div>
            <Form {...form}>
              <form
                className="mt-5 grid grid-cols-2 gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full col-span-2">
                        <FormLabel>
                          Title <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Sugarcane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>
                          Quantity <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="22" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>
                          Unit <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue("unit", value);
                              form.clearErrors("unit");
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select a unit</SelectLabel>
                                {UNITS.map((unit) => (
                                  <SelectItem
                                    value={unit.value}
                                    key={unit.value}
                                  >
                                    {unit.title}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full gap-3 ">
                        <FormLabel>Description </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Description"
                            rows={8}
                            className="resize-none p-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full ">
                        <FormLabel>
                          Photos <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            maxFiles={5}
                            maxSize={5 * 1024 * 1024}
                            className="w-full "
                            value={files}
                            onValueChange={(v) => {
                              setFiles(v);
                              form.setValue("files", v);
                              form.clearErrors("files");
                            }}
                            onFileReject={onFileReject}
                            multiple
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
                                  Or click to browse (max 5 files, up to 5MB
                                  each)
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="col-span-2 font-bold my-5">Auction Details</div>

                <FormField
                  control={form.control}
                  name="startPrice"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>
                          Start Price <Required />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full flex flex-col gap-2">
                        <FormLabel>
                          Start Date <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <Popover
                            open={startDateOpen}
                            onOpenChange={setStartDateOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-full justify-between font-normal"
                              >
                                {form.watch("startDate")
                                  ? format(
                                      form.watch("startDate"),
                                      "dd MMMM yyyy"
                                    )
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={form.watch("startDate")}
                                captionLayout="dropdown"
                                disabled={(date) => date < new Date()}
                                onSelect={(date) => {
                                  setStartDate(date);
                                  setStartDateOpen(false);
                                  if (!date) return;
                                  form.setValue("startDate", date);
                                  form.clearErrors("startDate");
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full flex flex-col gap-2">
                        <FormLabel>
                          End Date <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <Popover
                            open={endDateOpen}
                            onOpenChange={setEndDateOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-full justify-between font-normal"
                              >
                                {form.watch("endDate")
                                  ? format(
                                      form.watch("endDate"),
                                      "dd MMMM yyyy"
                                    )
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={form.watch("endDate")}
                                captionLayout="dropdown"
                                disabled={(date) => date < new Date()}
                                onSelect={(date) => {
                                  setEndDate(date);
                                  setEndDateOpen(false);
                                  if (!date) return;
                                  form.setValue("endDate", date);
                                  form.clearErrors("endDate");
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="flex justify-end gap-5 col-span-2">
                  <Link href={getPath(userId, "products")}>
                    <Button variant={"outline"}>
                      <CircleX /> Cancel
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      form.setValue("files", null);
                    }}
                  >
                    <Eraser />
                    Clear
                  </Button>
                  <div>
                    <LoadingButton
                      type="submit"
                      variant={"default"}
                      loading={mutatation.isPending}
                    >
                      <Send />
                      Submit
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAcution;
