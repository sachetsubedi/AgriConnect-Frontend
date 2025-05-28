import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapFieldsOnError = (err: AxiosError<any>, setError: any) => {
  if (err.response?.status !== 422) return;
  const data = err?.response?.data?.data;
  if (!data) return;
  Object.entries(data).map(([key, value]) => {
    // @ts-expect-error
    const error = value[0];
    setError(key, {
      message: error,
    });
  });
};

export const getPath = (userId: string, path: string) => {
  return `/p/${userId}/${path}`;
};

export function areAllFilesImages(fileList: FileList) {
  return Array.from(fileList).every((file) => file.type.startsWith("image/"));
}
