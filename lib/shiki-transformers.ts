/**
 * Custom Shiki transformer to add copy button to code blocks
 */
export function transformerCopyButton() {
  return {
    name: "copy-button",
    pre(node: any) {
      // Add a copy button wrapper
      const copyButton = {
        type: "element",
        tagName: "button",
        properties: {
          className: ["shiki-copy-button"],
          type: "button",
          "aria-label": "Copy code",
          "data-copy": "true",
        },
        children: [
          {
            type: "element",
            tagName: "svg",
            properties: {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
            children: [
              {
                type: "element",
                tagName: "rect",
                properties: {
                  width: "14",
                  height: "14",
                  x: "8",
                  y: "8",
                  rx: "2",
                  ry: "2",
                },
                children: [],
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                },
                children: [],
              },
            ],
          },
        ],
      };

      // Make the pre element relative for positioning
      if (!node.properties.style) {
        node.properties.style = "";
      }
      node.properties.style += "position: relative;";

      // Add the copy button as the first child
      node.children.unshift(copyButton);
    },
  };
}
