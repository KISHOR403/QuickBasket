# 📦 Monorepo Architecture & Turborepo Pipeline

QuickBasket uses **Turborepo** and **pnpm workspaces** to orchestrate build pipelines, package resolution, and dependency isolation across all applications and shared libraries.

---

## 🏗️ Workspace Layout

The repository is divided into two primary workspaces:
1. `apps/*`: Runnable client end-user applications.
2. `packages/*`: Reusable internal libraries and configuration modules.

```
quickbasket/
├── apps/
│   ├── web/                    # @quickbasket/web (Next.js 14)
│   └── mobile/                 # @quickbasket/mobile (Expo 51 / React Native)
├── packages/
│   ├── api-client/             # @quickbasket/api-client (TanStack Query hooks)
│   ├── config/                 # @quickbasket/config (Tailwind preset & theme tokens)
│   ├── mocks/                  # @quickbasket/mocks (In-memory dataset & generator)
│   ├── types/                  # @quickbasket/types (Domain TypeScript interfaces)
│   ├── utils/                  # @quickbasket/utils (Helpers, currency, ETA formatting)
│   └── validation/             # @quickbasket/validation (Zod input schemas)
├── package.json                # Monorepo root config & scripts
├── pnpm-workspace.yaml         # pnpm package discovery paths
├── turbo.json                  # Turborepo task pipeline definition
└── tsconfig.base.json          # Shared strict TypeScript base configuration
```

---

## ⚡ Turborepo Pipeline Configuration

The build pipeline in [`turbo.json`](file:///d:/Project/QuickBasket/turbo.json) defines topological dependencies between tasks:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

### Key Pipeline Behaviors:
- **`^build` Dependency**: When building an app or package, Turborepo builds its upstream dependencies first. For example, building `@quickbasket/web` triggers builds for `@quickbasket/types`, `@quickbasket/utils`, `@quickbasket/validation`, `@quickbasket/mocks`, and `@quickbasket/api-client` in topological order.
- **Cache Artifacts**: Build outputs (`.next/**`, `dist/**`) are fingerprint-hashed and cached in `.turbo/`. Rebuilding unchanged code returns an instant `FULL TURBO` cache hit.
- **Persistent Dev**: The `dev` script runs concurrently across web and mobile without caching.

---

## 🔗 Package Dependency Matrix

The table below illustrates how apps and packages depend on each other:

| Package / App | types | utils | validation | mocks | api-client | config |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **`apps/web`** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **`apps/mobile`** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **`packages/api-client`** | ✅ | ❌ | ❌ | ✅ | — | ❌ |
| **`packages/validation`** | ✅ | ❌ | — | ❌ | ❌ | ❌ |
| **`packages/mocks`** | ✅ | ❌ | ❌ | — | ❌ | ❌ |
| **`packages/utils`** | ❌ | — | ❌ | ❌ | ❌ | ❌ |
| **`packages/config`** | ❌ | ❌ | ❌ | ❌ | ❌ | — |

*Legend: ✅ Direct Dependency | ❌ Not Dependent | — Self*

> [!NOTE]
> All inter-workspace dependencies use the `workspace:*` specifier in their respective `package.json` files. This ensures local linking without requiring npm registry publication.

---

## 🛠️ TypeScript Inheritance Model

All packages and apps inherit compilation rules from the root [`tsconfig.base.json`](file:///d:/Project/QuickBasket/tsconfig.base.json):

- **Target**: `ES2022`
- **Module Resolution**: `Bundler`
- **Type Checking**: Strict (`"strict": true`)
- **JSON Imports**: Allowed (`"resolveJsonModule": true`)

Each workspace package specifies its specific module options while sharing common linting and strictness guarantees.

---

## 🧹 Cache Invalidation & Cleaning

To clear all Turborepo and Next.js caches when debugging build or state anomalies:

```bash
# Run Turbo clean and purge all workspace node_modules
pnpm clean

# Reinstall and relink all workspace packages
pnpm install
```
