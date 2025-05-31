"use client";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import Required from "@/components/required";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { API_CreateProduct } from "@/lib/Api/api";
import { UNITS } from "@/lib/data";
import { areAllFilesImages, cn, getPath, mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon, CircleX, Eraser, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { I_Params } from "../page";
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
    pricePerUnit: z.string().min(1, "Price per unit is required"),
    quantity: z.string().min(1, "Quantity is required"),
    unit: z.string().min(1, "Unit is required"),
    harvested: z.boolean().optional(),
    willHarvestAt: z.date().optional(),
    files: z.any(),
  })
  .superRefine((v, c) => {
    if (!v.harvested && !v.willHarvestAt) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Harvest Date is required if not harvested",
        path: ["willHarvestAt"],
      });
    }

    if (!(v.files instanceof FileList)) {
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

export type T_CreateProduct = z.infer<typeof createProductSchema>;

const CreateProduct: FC<{ params: Promise<I_Params> }> = ({ params }) => {
  const { userId } = use(params);

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      pricePerUnit: "",
      quantity: "",
      unit: "",
      harvested: true,
      willHarvestAt: new Date(),
    },
  });

  const router = useRouter();

  const mutatation = useMutation({
    mutationFn: API_CreateProduct,
    onSuccess: () => {
      form.reset();
      form.setValue("harvested", true);
      form.setValue("willHarvestAt", new Date());
      toast.success("Product created successfully");
      return router.push(getPath(userId, "products"));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      mapFieldsOnError(error, form.setError);
      return toast.error(
        error.response?.data.message || "Something went wrong"
      );
    },
  });

  const onSubmit = async (data: T_CreateProduct) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("pricePerUnit", data.pricePerUnit);
    formData.append("quantity", data.quantity);
    formData.append("unit", data.unit);
    formData.append("harvested", String(data.harvested));
    if (data.willHarvestAt) {
      formData.append("willHarvestAt", data.willHarvestAt.toISOString());
    }
    if (data.files) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append("photo", data.files[i]);
      }
    }
    return mutatation.mutate(formData);
  };

  return (
    <div>
      <PageHeader title="Add Product" />
      <CustomBreadcrumbs
        items={[
          { title: "Products", link: `/p/${userId}/products` },
          { title: "Add" },
        ]}
      />

      <div className="mt-10 font-[500]">
        <div>Product Details</div>
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
                    <FormItem className="w-full">
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
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a unit</SelectLabel>
                              {UNITS.map((unit) => (
                                <SelectItem value={unit.value} key={unit.value}>
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
                name="pricePerUnit"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>
                        Price Per Unit <Required />{" "}
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
                name="files"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>
                        Photos <Required />{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            form.setValue("files", e.target.files);
                            form.clearErrors("files");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {!form.watch("harvested") && (
                <FormField
                  control={form.control}
                  name="willHarvestAt"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>
                          Harvest Date <Required />{" "}
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild className="w-full">
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-full p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value as any}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full gap-3 col-span-2">
                      <FormLabel className="flex items-center !mt-0">
                        Description{" "}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Description"
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="harvested"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full flex items-center gap-3">
                      <FormControl>
                        <Switch
                          checked={form.watch("harvested")}
                          onCheckedChange={(val) => {
                            form.setValue("harvested", val);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="flex items-center !mt-0">
                        Harvested{" "}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="flex justify-end gap-5">
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
                    form.setValue("harvested", true);
                    form.setValue("willHarvestAt", new Date());
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
  );
};

export default CreateProduct;
