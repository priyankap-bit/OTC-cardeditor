"use client";

import type { Data } from "@measured/puck";
import { Button, Puck } from "@measured/puck";
import config from "../../../puck.config";
import { v4 as uuidv4 } from 'uuid'; 

export function Client({ path, data }: { path: string; data: Data }) {
  // Define the saveDraft function
  const saveDraft = async (data: Data) => {
    try {
      // Generate a unique ID using UUID
      const uniqueId = uuidv4();
  
      // Store the data in localStorage with the generated unique ID as the key
      localStorage.setItem("previewData", JSON.stringify(data));
      
      console.log("Draft saved with ID:", uniqueId);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data: Data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
      onChange={(data) => {
        saveDraft(data)
      }}
      renderHeaderActions={() => (
        <>
          <Button href="/preview" newTab variant="secondary">
            Preview
          </Button>
        </>
      )}
    />
  );
}
