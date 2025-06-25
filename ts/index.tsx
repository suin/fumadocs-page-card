import { Card } from "fumadocs-ui/components/card";

export default function getComponents({ source, className = "my-4" }: Config) {
  return {
    PageCard({ href }: Props) {
      const { title, description, url } = getPage(href, source);
      return (
        <Card title={title} href={url} className={className}>
          {description}
        </Card>
      );
    },
  };
}

interface Config {
  readonly source: Source;
  readonly className?: undefined | string;
}

interface Props {
  /**
   * The path to the page, from the current MDX file.
   *
   * For example, if the current MDX file is at `docs/guide.mdx` and you want to link to `docs/guide/installation.mdx`,
   * you would use `"./guide/installation.mdx"`.
   */
  readonly href: string;
}

function getPage(path: string, source: Source): Page {
  const result = source.getPageByHref(path, { language: "" });
  if (!result) {
    throw new Error(`Page not found: ${path}`);
  }
  const { url } = result.page;
  const { title, description } = result.page.data;
  return { title, description, url };
}

interface Page {
  readonly title: string;
  readonly description: undefined | string;
  readonly url: string;
}

interface Source {
  getPageByHref(
    href: string,
    options?: { language?: string },
  ): GetPageByHrefResult | undefined;
}

interface GetPageByHrefResult {
  page: {
    url: string;
    data: {
      title: string;
      description?: string | undefined;
    };
  };
}
