import EventsList from "@/components/EventsList";
import H1 from "@/components/H1";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const city = params.city;

  return {
    title: city === "all" ? "All Events" : `Events in ${capitalize(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function Events({
  params,
  searchParams,
}: EventsPageProps) {
  const city =
    params.city === "all"
      ? "All Events"
      : params.city.charAt(0).toUpperCase() + params.city.slice(1);

  const page = searchParams.page || 1;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  // console.dir(events, 1);

  return (
    <main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
      <H1 className='mb-28'>
        {params.city === "all" && "All Events"}
        {params.city !== "all" && `Events in ${capitalize(city)}`}
      </H1>

      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={params.city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
