import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  timestamp: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Default formatting options for day, month, and year
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Merge default options with auth-provided options
  const finalOptions = { ...defaultOptions, ...options };

  // Format the date with the final options
  return date.toLocaleDateString("en-US", finalOptions);
}

export function truncateText(text: string, maxLength = 40) {
  if (text.length <= maxLength) {
    return text; // If the text is less than or equal to maxLength, return it as is
  }
  return text.slice(0, maxLength) + " ..."; // Otherwise, truncate and add '...'
}
