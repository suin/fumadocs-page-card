import { describe, expect, it, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import type { Card } from "fumadocs-ui/components/card";
import getComponents from "./index";

// Mock fumadocs-ui components
const MockCard = ({
  title,
  href,
  className,
  children,
}: Parameters<typeof Card>[0]) => (
  <div data-testid="card" className={className}>
    <a href={href} data-testid="card-link">
      {title}
    </a>
    <p data-testid="card-description">{children}</p>
  </div>
);

// Mock the module
mock.module("fumadocs-ui/components/card", () => ({
  Card: MockCard,
}));

describe("PageCard Component", () => {
  it("renders a card with title, description, and link", () => {
    // Mock fumadocs-core source
    const mockSource = {
      getPageByHref: mock(() => ({
        page: {
          url: "/docs/getting-started",
          data: {
            title: "Getting Started",
            description: "Learn how to get started with our platform",
          },
        },
      })),
    };

    // Get the PageCard component
    const { PageCard } = getComponents({
      source: mockSource,
    });

    // Render the component
    render(<PageCard href="./getting-started.mdx" />);

    // Assertions using standard DOM methods
    const card = screen.getByTestId("card");
    const link = screen.getByTestId("card-link");
    const description = screen.getByTestId("card-description");

    expect(card).toBeDefined();
    expect(link.getAttribute("href")).toBe("/docs/getting-started");
    expect(link.textContent).toBe("Getting Started");
    expect(description.textContent).toBe(
      "Learn how to get started with our platform",
    );
  });

  it("throws error when page is not found", () => {
    // Mock fumadocs-core source to return null
    const mockSource = {
      getPageByHref: mock(() => undefined),
    };

    // Get the PageCard component
    const { PageCard } = getComponents({
      source: mockSource,
    });

    // Expect the component to throw an error when rendered
    expect(() => {
      render(<PageCard href="./non-existent.mdx" />);
    }).toThrow("Page not found: ./non-existent.mdx");
  });

  it("handles pages without description", () => {
    // Mock fumadocs-core source with page that has no description
    const mockSource = {
      getPageByHref: mock(() => ({
        page: {
          url: "/docs/api-reference",
          data: {
            title: "API Reference",
            description: undefined,
          },
        },
      })),
    };

    // Get the PageCard component
    const { PageCard } = getComponents({
      source: mockSource,
    });

    // Render the component
    render(<PageCard href="./api-reference.mdx" />);

    // Assertions
    const description = screen.getByTestId("card-description");
    expect(description.textContent).toBe("API Reference");
  });

  it("uses default className when not provided", () => {
    // Mock fumadocs-core source
    const mockSource = {
      getPageByHref: mock(() => ({
        page: {
          url: "/docs/tutorial",
          data: {
            title: "Tutorial",
            description: "Step-by-step guide",
          },
        },
      })),
    };

    // Get the PageCard component without className
    const { PageCard } = getComponents({
      source: mockSource,
    });

    // Render the component
    render(<PageCard href="./tutorial.mdx" />);

    // Assertions
    const card = screen.getByTestId("card");
    expect(card.className).toBe("my-4"); // Default className
  });
});
