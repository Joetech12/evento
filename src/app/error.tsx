"use client"; // Error components must be Client Components

import H1 from "@/components/H1";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log({ error });
  }, [error]);

  return (
    <main className='text-center py-24'>
      {/* <H1 className="mb-5">Something went wrong!</H1> */}
      {/* <H1 className="mb-[20px]">Something went wrong!</H1> */}
      <H1 className='mb-[20px]'>{error.message}</H1>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </button>
    </main>
  );
}