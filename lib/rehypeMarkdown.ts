import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
// @ts-ignore
import remarkLinks from "remark-wiki-link-plus";
import rehypePrism from "rehype-prism-plus";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";

import rehypeObsidian from "./rehypeObsidian";
import type { Folder } from "../hooks/useStore.d";
import { getItem, getItemByPath } from "./fileSystem";

const rehypeMarkdown = (markdown: string, fileSystem: Folder) => {
    return (
        unified()
            .use(remarkParse)
            .use(remarkBreaks)
            .use(remarkGfm)
            .use(remarkMath)

            .use(remarkLinks, {
                pageResolver: (path: string) => [path],
                hrefTemplate: (path: string) => {
                    // return `/api/vault?path=/assets/${path}&raw=true`;
                    console.log(path);
                    if (!path.includes(".")) {
                        path += ".md";
                    }

                    const item =
                        getItem(fileSystem, path, "name") ||
                        getItemByPath(fileSystem, path);

                    console.log(item);

                    if (item && "downloadUrl" in item) {
                        return item.downloadUrl;
                    }

                    return path;
                },
            })
            .use(remarkRehype)
            .use(rehypePrism)
            // .use(rehypeObsidian)
            .use(rehypeKatex)
            .use(rehypeReact, { createElement, Fragment })
            .processSync(markdown).result
    );
};

export default rehypeMarkdown;
