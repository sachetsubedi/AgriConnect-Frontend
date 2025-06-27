import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { format, isAfter, isBefore, isToday } from "date-fns";
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

export const getPath = (userId: string, path: string | string[]) => {
  if (Array.isArray(path)) {
    path = path.join("/");
  }
  return `/p/${userId}/${path}`;
};

export function areAllFilesImages(fileList: FileList) {
  if (!fileList || fileList.length === 0) {
    return false;
  }
  return Array.from(fileList).every((file) => file.type.startsWith("image/"));
}

export const formatDate = (date: string | Date) => {
  return format(date, "dd MMM, yyyy");
};

export function isTodayOrAfter(dateToCheck: Date): boolean {
  const now = new Date();
  return isToday(dateToCheck) || isAfter(dateToCheck, now);
}

export function isTodayOrBefore(dateToCheck: Date | string): boolean {
  const now = new Date();
  return isToday(dateToCheck) || isBefore(dateToCheck, now);
}

export const capitalize = (str: string) => {
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
};
