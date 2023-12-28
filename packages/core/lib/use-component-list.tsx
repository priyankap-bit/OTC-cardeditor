import { ReactNode, useEffect, useState } from "react";
import { Config, UiState } from "../types/Config";
import { ComponentList } from "../components/ComponentList";

export const useComponentList = (config: Config, ui: UiState) => {
  const [componentList, setComponentList] = useState<ReactNode[]>();
  const [planName, setPlanName] = useState("test");

  useEffect(() => {
    console.log("first effect")
    const fetchData = async () => {
      try {
        const userEmail = 'dabone8248@ubinert.com';
        const response = await fetch(
          'http://localhost:5001/api/v1/admin/fetchPlan/' + userEmail
        );
        const jsonData = await response.json();
        setPlanName(jsonData.planName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    console.log("second effect", planName)
    if (Object.keys(ui.componentList).length > 0) {
      const matchedComponents: string[] = [];

      let _componentList: ReactNode[];

      let dataArray = [
        { componentname: "ButtonGroup", plans: ["Free","Team"] },
        { componentname: "Card", plans: ["Free","Professional","Team"] },
        { componentname: "ImageGallery", plans: ["Free", "Team"] },
        { componentname: "Columns", plans: ["Free","Team"] },
        { componentname: "Hero", plans: ["Free","Team"] },
        { componentname: "Heading", plans: ["Free","Team"] },
        { componentname: "Flex", plans: ["Professional","Team"] },
        { componentname: "Logos", plans: ["Professional","Team"] },
        { componentname: "Stats", plans: ["Professional","Team"] },
        { componentname: "Text", plans: ["Free","Professional","Team"] },
        { componentname: "Image", plans: ["Free","Professional","Team"] },
        { componentname: "VerticalSpace", plans: ["Professional","Team"] },
        { componentname: "SingleVideo", plans: ["Professional","Team"] },
        { componentname: "VideoGallery", plans: ["Professional","Team"] },
        { componentname: "Testimonial", plans: ["Free","Professional","Team"] },
      ];

      _componentList = Object.entries(ui.componentList).map(
        ([categoryKey, category]) => {
          if (category.visible === false || !category.components) {
            return null;
          }

          return (
            <ComponentList
              id={categoryKey}
              key={categoryKey}
              title={category.title || categoryKey}
            >
              {category.components.map((componentName, i) => {
                matchedComponents.push(componentName as string);
                 // Check if the component name and plan match in dataArray
            const matchingData = dataArray.find(
              (data) =>
                data.componentname === componentName &&
                data.plans.includes(planName)
            );

             // Determine whether to disable the component based on the matchingData
             const disable = !matchingData;
                return (
                  <ComponentList.Item
                    key={componentName}
                    component={componentName as string}
                    index={i}
                    id={`${categoryKey}::${componentName}`}
                    extraField={disable}
                  />
                );
              })}
            </ComponentList>
          );
        }
      );

      // const remainingComponents = Object.keys(config.components).filter(
      //   (component) => matchedComponents.indexOf(component) === -1
      // );

      // if (
      //   remainingComponents.length > 0 &&
      //   !ui.componentList.other?.components &&
      //   ui.componentList.other?.visible !== false &&
      //   ui.componentList.other?.disable !== false
      // ) {
      //   _componentList.push(
      //     <ComponentList
      //       id="other"
      //       key="other"
      //       title={ui.componentList.other?.title || "Other"}
      //     >
      //       {remainingComponents.map((componentName, i) => {
      //         return (
      //           <ComponentList.Item
      //             key={componentName}
      //             component={componentName as string}
      //             index={i}
      //             id={`other::${componentName}`}
      //           />
      //         );
      //       })}
      //     </ComponentList>
      //   );
      // }

      setComponentList(_componentList);
    }
  }, [config.categories, ui.componentList, planName]);

  return componentList;
};
