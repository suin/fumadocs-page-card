# @suin/fumadocs-page-card

A React component for Fumadocs that renders beautiful page cards with automatic metadata extraction from MDX frontmatter.

[![npm version](https://img.shields.io/npm/v/@suin/fumadocs-page-card.svg)](https://www.npmjs.com/package/@suin/fumadocs-page-card)
[![npm downloads](https://img.shields.io/npm/dm/@suin/fumadocs-page-card.svg)](https://www.npmjs.com/package/@suin/fumadocs-page-card)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/suin/fumadocs-page-card/actions/workflows/ci.yml/badge.svg)](https://github.com/suin/fumadocs-page-card/actions/workflows/ci.yml)
[![Publish](https://github.com/suin/fumadocs-page-card/actions/workflows/publish.yml/badge.svg)](https://github.com/suin/fumadocs-page-card/actions/workflows/publish.yml)

## Features

- 🎨 **Beautiful Cards**: Renders elegant page cards with title, description, and clickable links
- 🔗 **Automatic Metadata**: Extracts title and description from MDX frontmatter automatically
- 📝 **TypeScript Support**: Fully typed with comprehensive TypeScript definitions
- 🚀 **Fumadocs Integration**: Seamlessly integrates with Fumadocs MDX components
- 🎯 **Relative Paths**: Supports relative path navigation between MDX files
- ⚡ **Lightweight**: Minimal bundle size with no external dependencies

## Installation

```bash
npm install @suin/fumadocs-page-card
# or
yarn add @suin/fumadocs-page-card
# or
pnpm add @suin/fumadocs-page-card
# or
bun add @suin/fumadocs-page-card
```

## Prerequisites

This package requires the following peer dependencies:

- `fumadocs-core` ^15.5.4
- `fumadocs-ui` ^15.5.4

## Quick Start

### 1. Setup MDX Components

First, configure your MDX components to include the PageCard component:

```tsx
// mdx-components.tsx
import getPageCardComponents from "@suin/fumadocs-page-card";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { source } from "@/lib/source";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...getPageCardComponents({ source }),
    ...components,
  };
}
```

### 2. Create Target Page

Create an MDX file that you want to link to (e.g., `content/docs/target.mdx`):

```mdx
---
title: Getting Started
description: Learn how to get started with our platform
---

# Getting Started

Welcome to our platform! This guide will help you get up and running quickly.
```

### 3. Use PageCard Component

In another MDX file (e.g., `content/docs/index.mdx`), use the PageCard component:

```mdx
---
title: Documentation
description: Welcome to our documentation
---

# Documentation

## Quick Links

<PageCard href="./target.mdx" />
```

![](screenshot.png)

## API Reference

### `getPageCardComponents(config)`

Returns an object containing the `PageCard` component that can be spread into your MDX components.

#### Parameters

- `config` (object):
  - `source` (required): Your Fumadocs source instance
  - `className` (optional): CSS class name for the card container (default: `"my-4"`)

#### Returns

An object with the `PageCard` component.

### `PageCard` Component

A React component that renders a card linking to another MDX page.

#### Props

- `href` (string, required): The relative path to the target MDX file
  - Must start with `./` or `../`
  - Must end with `.mdx` extension
  - Example: `"./getting-started.mdx"` or `"../advanced/configuration.mdx"`

## Examples

### Basic Usage

```mdx
<PageCard href="./getting-started.mdx" />
```

### Multiple Cards

```mdx
## Documentation Sections

<PageCard href="./installation.mdx" />
<PageCard href="./configuration.mdx" />
<PageCard href="./api-reference.mdx" />
```

### Custom Styling

You can customize the card styling by passing a `className` to the `getPageCardComponents` function:

```tsx
// mdx-components.tsx
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...getPageCardComponents({
      source,
      className: "my-6 border-2 border-blue-200",
    }),
    ...components,
  };
}
```

## File Structure

Your MDX files should follow this structure for the PageCard component to work properly:

```
content/
├── docs/
│   ├── index.mdx          # Main page with PageCard components
│   ├── getting-started.mdx # Target page
│   ├── installation.mdx   # Target page
│   └── configuration.mdx  # Target page
```

## Error Handling

The component will throw an error if:

- The target page is not found
- The `href` path is invalid
- The target page doesn't have the required frontmatter (`title` is required)

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/suin/fumadocs-page-card.git
   cd fumadocs-page-card
   ```

2. Setup development environment (managed by Devbox):

   ```bash
   devbox shell
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Build the project:

   ```bash
   bun run build
   ```

5. Run tests:
   ```bash
   bun test
   ```

### Code Style

This project uses:

- TypeScript for type safety
- Biome for code formatting and linting
- Bun for package management and testing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [existing issues](https://github.com/suin/fumadocs-page-card/issues)
2. Create a new issue with a detailed description
3. Include reproduction steps and your environment details

## Related

- [Fumadocs](https://fumadocs.vercel.app/) - The documentation framework this package extends
- [Fumadocs UI](https://fumadocs.vercel.app/ui) - UI components for Fumadocs
- [Fumadocs Core](https://fumadocs.vercel.app/core) - Core functionality for Fumadocs

---

Made with ❤️ by [suin](https://github.com/suin)
