"use client";

import { Data } from "@/core/types/Config";
import { resolveAllData } from "@/core/lib/resolve-all-data";
import { Puck } from "@/core/components/Puck";
import { Render } from "@/core/components/Render";
import { useEffect, useState } from "react";
import { Button } from "@/core/components/Button";
import headingAnalyzer from "@/plugin-heading-analyzer/src/HeadingAnalyzer";
import config, { initialData } from "../../config";
import './client.css'
import * as htmlToImage from 'html-to-image';

const EMAIL_ID = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const isBrowser = typeof window !== "undefined";

export function Client({ path, isEdit }: { path: string; isEdit: boolean }) {
  // unique b64 key that updates each time we add / remove components
  const componentKey = Buffer.from(
    `${Object.keys(config.components).join("-")}`
  ).toString("base64");

  const key = `puck-demo:${componentKey}:${path}`;

  const [data, setData] = useState<Data | undefined>(undefined);
const [role, setRole] = useState ('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = EMAIL_ID
        const response = await fetch(
          'http://localhost:5001/api/v1/admin/mockdata/'+userEmail
        );
        const jsonData = await response.json();
        console.log("responseeee",jsonData);
        
        if(jsonData.role == 'superadmin'){
          setRole(jsonData.role)
          const modifiedData = {
            "content": [  
          ],
            "root": {
            },
            "zones": {}
          }
          
          setData(modifiedData);
        }else{
          setData(jsonData.modifiedData[path] || undefined);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isBrowser) {
        fetchData();
    }
  }, [key, path, isBrowser]);

  const [resolvedData, setResolvedData] = useState<Data | undefined>(data);

  useEffect(() => {
    if (data && !isEdit) {
      resolveAllData(data, config).then(setResolvedData);
    }
  }, [data, isEdit]);

  useEffect(() => {
    if (!isEdit) {
      const title = data?.root.props?.title || data?.root.title;
      document.title = title || "";
    }
  }, [data, isEdit]);


const UpdateData = async (data: Data) => {
  try {
    const userEmail = EMAIL_ID
    
    let userApi = 'http://localhost:5001/api/v1/admin/publishUpdateCard/'
    if(role == 'superadmin'){
      userApi = 'http://localhost:5001/api/v1/admin/publishAddCompanyCard/' 
    }
    const response = await fetch(userApi+userEmail, {
      method: 'POST', // Specify the request method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({ cardData: data }), // Convert data to JSON format and include in the request body
    });

    const jsonData = await response.json();
    console.log('responseeee', jsonData);

    // Assuming `setData` is a function you've defined elsewhere
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleSaveButton = async (data: Data) => {
  try {
    const userEmail = EMAIL_ID
    
    let userApi = 'http://localhost:5001/api/v1/admin/updateCard/'
    if(role == 'superadmin'){
       userApi = 'http://localhost:5001/api/v1/admin/addCompanyCard/' 
    }

    const response = await fetch(userApi+userEmail, {
      method: 'POST', // Specify the request method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({ cardData: data }), // Convert data to JSON format and include in the request body
    });

    const jsonData = await response.json();
    console.log('responseeee', jsonData);

    const puckComponents = document.querySelectorAll("#puck-component");
    const originalDisplayStyles = [];

    for (let i = 0; i < puckComponents.length; i++) {
      const puckComponent = puckComponents[i] as HTMLElement;
      originalDisplayStyles.push(puckComponent.style.display);
      puckComponent.style.display = "none";
    }

      htmlToImage.toPng(document.getElementById('puck-dropzone'))
      .then(function (dataUrl) {
        for (let i = 0; i < puckComponents.length; i++) {
          const puckComponent = puckComponents[i] as HTMLElement;
          puckComponent.style.display = originalDisplayStyles[i];
        }
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'download.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    // Assuming `setData` is a function you've defined elsewhere
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  if (isEdit && data != undefined) {
    return (
      <div>
        <Puck
          config={config}
          data={data}
          onSave={async (data: Data) => {
            handleSaveButton(data);
          }}
          onPublish={async (data: Data) => {
            UpdateData(data);
          }}
          plugins={[headingAnalyzer]}
          headerPath={path}
          renderHeaderActions={() => (
            <>
              <div>
                <Button href={path} newTab variant="warning">
                  View page
                </Button>
              </div>
            </>
          )}
        />
      </div>
    );
  }

  if (data && resolvedData != undefined) {
    return <Render config={config} data={resolvedData} />;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div className="spinner"></div>
      </div>
    </div>
  );
  
}

export default Client;
