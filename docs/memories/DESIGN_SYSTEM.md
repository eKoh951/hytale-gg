# Hytale.GG Design System Documentation

## Overview
Custom shadcn/ui registry-based design system for Hytale.GG project. The system uses a distributed architecture with a centralized registry repository and component consumption in the main application.

## Architecture

### Main Project: walking-stream
**Location**: `c:\Users\great\Documents\code\walking-stream`

#### components.json Configuration
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@hytale": "https://hytale-gg-registry.vercel.app/r/{name}.json"
  }
}
```

#### Key Settings
- **Style**: New York variant (modern, clean design)
- **RSC**: Enabled (React Server Components)
- **CSS Variables**: Enabled for dynamic theming
- **Base Color**: Zinc (overridden by custom theme)
- **Registry**: Points to custom Hytale.GG registry at `https://hytale-gg-registry.vercel.app/`

#### Component Structure
- **UI Components**: `components/ui/` (18 components)
  - Standard shadcn components: avatar, badge, button, card, dropdown-menu, input, label, separator, sheet, sidebar, skeleton, sonner, switch, tabs, textarea, tooltip
  - Custom: hytale-decorations.tsx (77KB), section-backgrounds.tsx
- **Brand Components**: `components/` root
  - brand-header.tsx
  - brand-sidebar.tsx
  - logo.tsx
- **Feature Components**: Organized by feature (auth, branding, landing, profile)

### Registry Repository: hytale-gg-registry
**Location**: `C:\Users\great\Documents\code\hytale-gg-registry`
**Deployment**: https://hytale-gg-registry.vercel.app/

#### Registry Structure
- **registry.json**: Central configuration with 43 registry items
- **components.json**: Registry's own configuration (uses gray base color)
- **README.md**: Setup and deployment instructions
- **src/**: Source files for all registry components

#### Registry Items (43 total)

**Theme (1)**
- `theme`: Gaming-themed design tokens with light/dark modes

**Blocks (3)**
- `blank`: Minimal application template
- `dashboard`: Dashboard with brand components
- `store`: E-commerce store layout

**Brand Components (4)**
- `brand-header`: Styled navigation header
- `brand-sidebar`: Navigation sidebar
- `logo`: Brand logo component
- `login`: Authentication form

**Content Components (3)**
- `hero`: Landing page hero section
- `promo`: Promotional banner
- `product-grid`: Product display grid

**UI Primitives (32)**
- accordion, alert, avatar, badge, breadcrumb, button, calendar, card, chart, checkbox, data-table, date-picker, dialog, dropdown-menu, input, menu-bar, select, separator, skeleton, slider, sonner, switch, table, tabs, toggle-group, tooltip

## Color System

### Theme Palette
Uses OKLCH color space for modern, perceptually uniform colors.

**Light Mode**
- Background: `oklch(1.0 0 0)` (white)
- Foreground: `oklch(0.15 0.01 264)` (dark blue-gray)
- Primary: `oklch(0.58 0.18 295)` (purple - gaming accent)
- Secondary: `oklch(0.82 0.15 85)` (yellow/gold)
- Accent: `oklch(0.58 0.18 295)` (purple)
- Destructive: `oklch(0.62 0.22 27)` (red)

**Dark Mode**
- Background: `oklch(0.10 0.005 264)` (very dark blue-gray)
- Foreground: `oklch(0.98 0.005 264)` (off-white)
- Primary: `oklch(0.58 0.18 295)` (purple)
- Secondary: `oklch(0.82 0.15 85)` (yellow/gold)
- Sidebar: `oklch(0.13 0.005 264)` (dark with blue tint)

**Sidebar-Specific Tokens**
- sidebar-primary, sidebar-accent, sidebar-border, sidebar-ring
- Ensures consistent navigation styling

**Chart Colors**
- 5 distinct colors for data visualization
- Derived from primary/secondary palette

## Component Dependencies

### Registry Dependencies
Components declare dependencies on:
1. **UI Primitives**: Base shadcn components (button, input, etc.)
2. **Theme**: All items depend on the theme for styling
3. **Registry Items**: Cross-references to other custom components
  - Example: brand-header depends on button, input, avatar, sidebar, sonner, logo, theme

### Installation Pattern
When installing a component from @hytale registry:
```bash
shadcn add @hytale/component-name
```

This pulls the component JSON from the registry endpoint and installs all dependencies.

## File Mappings

Registry items define file targets for installation:

**Example: brand-header**
- Source: `src/components/brand-header.tsx`
- Target: `components/brand-header.tsx`
- Also installs: shell-layout.tsx → app/layout.tsx

**Example: theme**
- Source: `src/app/globals.css` → Target: `app/globals.css`
- Source: `postcss.config.mjs` → Target: `postcss.config.mjs`

## Aliases Configuration

All projects use consistent path aliases:
```
@/components  → components/
@/lib/utils   → lib/utils.ts
@/ui          → components/ui/
@/lib         → lib/
@/hooks       → hooks/
```

## Authentication & Security

The registry supports optional authentication:
- Environment variable: `REGISTRY_AUTH_TOKEN`
- Middleware protection for `/r/:path` routes
- Token passed via query parameter to v0 platform

## v0 Integration

Registry exposes "Open in v0" buttons for each component:
- Redirects to v0.dev with prepopulated context
- Passes component JSON and theme information
- Enables AI-assisted component generation and customization

## Deployment

**Registry Deployment**
- Platform: Vercel
- URL: https://hytale-gg-registry.vercel.app/
- Endpoints: `/r/{component-name}.json`
- Build: Automatic from registry.json during build/dev

## Key Concepts

### Registry System
- **Distributed**: Registry separate from consuming projects
- **Versioned**: Each component can have independent versions
- **Discoverable**: Registry UI shows all available components
- **Extensible**: Easy to add new components to registry.json

### Design Tokens
- **CSS Variables**: All colors defined as CSS custom properties
- **OKLCH Space**: Modern color model for better consistency
- **Light/Dark**: Full theme support with separate token sets
- **Sidebar**: Dedicated tokens for navigation components

### Component Types
- **registry:theme**: Design tokens and global styles
- **registry:block**: Full page/layout templates
- **registry:component**: Reusable UI components
- **registry:ui**: Primitive components (shadcn base)
- **registry:file**: Configuration files (postcss, etc.)
- **registry:page**: Page templates
- **registry:lib**: Utility functions

## Best Practices

1. **Always update registry.json** when adding new components
2. **Define dependencies** clearly in registry items
3. **Use consistent aliases** across all projects
4. **Keep theme centralized** in registry for consistency
5. **Test components** in registry before consuming
6. **Document file mappings** for installation clarity
7. **Maintain authentication** for production registries

## Related Files
- Main project components.json: `c:\Users\great\Documents\code\walking-stream\components.json`
- Registry config: `C:\Users\great\Documents\code\hytale-gg-registry\registry.json`
- Registry components.json: `C:\Users\great\Documents\code\hytale-gg-registry\components.json`
- Registry README: `C:\Users\great\Documents\code\hytale-gg-registry\README.md`

## Last Updated
February 3, 2026
