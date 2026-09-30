# 🤝 Contributing Guidelines

Thank you for contributing to QuickBasket! To keep the codebase robust, performant, and clean, please adhere to the following contribution workflows and standards.

---

## 🌿 Branching Strategy

1. **Main Branch (`main`)**: Production-ready code. All changes merge into `main` via reviewed Pull Requests.
2. **Feature & Bug Branches**:
   - `feat/feature-name`: New capabilities or UX improvements (e.g. `feat/upi-qr-flow`).
   - `fix/bug-description`: Bug resolutions (e.g. `fix/cart-item-count-badge`).
   - `docs/topic`: Documentation changes (e.g. `docs/api-client-examples`).
   - `refactor/scope`: Code cleanup with no functional behavior changes (e.g. `refactor/zustand-stores`).
   - `chore/task`: Maintenance, dependency bumps, or pipeline tweaks (e.g. `chore/upgrade-expo-51`).

---

## 📝 Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

### Supported Types:
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation updates only.
- `style`: Formatting changes that do not alter code logic (white-space, formatting, semicolons).
- `refactor`: Code changes that neither fix bugs nor add features.
- `perf`: Code changes that improve runtime performance or bundle size.
- `test`: Adding or correcting tests.
- `chore`: Changes to build pipeline, Turbo config, or auxiliary tools.

### Example:
```
feat(web): add delivery instructions text box to checkout
fix(validation): allow 6-digit pincodes with valid non-zero prefix
docs(readme): add architecture diagram and deployment instructions
```

---

## 📏 Coding Standards & Best Practices

1. **TypeScript Strictness**:
   - Never use `any` without an explicit, documented justification.
   - All shared entities must be added to `@quickbasket/types`.
2. **Component Conventions**:
   - Keep components focused and modular under `apps/web/src/components/`.
   - Distinguish Server Components from Client Components; apply `'use client'` only when interactive state, effects, or browser APIs are required.
3. **Responsive Design**:
   - Test layouts across mobile (360px - 414px), tablet (768px), and desktop (1280px+).
   - Use predefined Tailwind tokens from `@quickbasket/config`. Avoid arbitrary ad-hoc hex values.

---

## 🚀 Pull Request Checklist

Before submitting your PR, ensure:
- [ ] You ran `pnpm typecheck` and verified zero compiler errors.
- [ ] You ran `pnpm lint` and resolved all linting warnings.
- [ ] You ran `pnpm build` and verified all apps compile successfully.
- [ ] Branch is rebased against the latest `main`.
- [ ] PR title follows Conventional Commits format.
