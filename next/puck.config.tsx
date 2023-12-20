import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" }
      },
      defaultProps: {
        title: "Heading",
      },
      resolveData: async ({ props }, { changed }) => {
        // Add readOnly property logic here based on conditions
        if (!changed.title) {
          return { props };
        }

        // Simulating a delay for fetching data
        // await new Promise((resolve) => setTimeout(resolve, 100));

        return {
          props,
          readOnly: { title: false }, 
        };
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
  },
};

export default config;
