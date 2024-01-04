import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { DropZone } from "@/core/components/DropZone";
import { Section } from "../../components/Section";

const getClassName = getClassNameFactory("Columns", styles);

export type ColumnsProps = {
  Distribution: "auto" | "manual";
  Columns: {
    span?: number;
  }[];
};

export const Columns: ComponentConfig<ColumnsProps> = {
  fields: {
    Distribution: {
      type: "radio",
      options: [
        {
          value: "auto",
          label: "Auto",
        },
        {
          value: "manual",
          label: "Manual",
        },
      ],
    },
    Columns: {
      type: "array",
      getItemSummary: (col, id) =>
        `Column ${id + 1}, span ${
          col.span ? Math.max(Math.min(col.span, 12), 1) : "auto"
        }`,
      arrayFields: {
        span: {
          label: "Span (1-12)",
          type: "number",
        },
      },
    },
  },
  defaultProps: {
    Distribution: "auto",
    Columns: [{}, {}],
  },
  render: ({ Columns, Distribution }) => {
    return (
      <Section>
        <div
          className={getClassName()}
          style={{
            gridTemplateColumns:
              Distribution === "manual"
                ? "repeat(12, 1fr)"
                : `repeat(${Columns.length}, 1fr)`,
          }}
        >
          {Columns.map(({ span }, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gridColumn:
                  span && Distribution === "manual"
                    ? `span ${Math.max(Math.min(span, 12), 1)}`
                    : "",
              }}
            >
              <DropZone
                zone={`column-${idx}`}
                disallow={["Hero", "Logos", "Stats"]}
              />
            </div>
          ))}
        </div>
      </Section>
    );
  },
};
