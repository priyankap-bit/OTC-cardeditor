import { Client } from "./client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPage } from "../../lib/get-page";

const getDataFromLocalStorage = () => {
  // Retrieve data from localStorage or return default data if not found
  const data = localStorage.getItem('previewData');
  return data ? JSON.parse(data) : { defaultData: 'if no data is found' };
};

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  const path = `/${puckPath.join("/")}`;

  return {
    title: getPage(path)?.root.props.title,
  };
}


export default async function Page({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}) {
  const path = `/${puckPath.join("/")}`;
  const data = getDataFromLocalStorage();

  if (!data) {
    return notFound();
  }
  console.log(data)
  return <Client data={data} />;
}

// Force Next.js to produce static pages: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// Delete this if you need dynamic rendering, such as access to headers or cookies
export const dynamic = "force-static";
