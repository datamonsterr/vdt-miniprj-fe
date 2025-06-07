---
description: 
globs: 
alwaysApply: true
---
src/components contains our ui components.
src/components/ui contains all shadcn components.
src/layouts contains all layouts use in react router.
src/sections contains all actual content that will be used in src/pages. Each section will be has it small components and types then include all in a src/sections/view/section_name.tsx to be included in src/pages.
src/index.css will be the root css, we actually use tailwindcss v4.
src/context will contain all context, each context will be divieded into Context, Provider and Consumer in one folder of its name. Eg: src/context/auth has AuthContext.tsx, AuthConsumer.tsx and AuthProvider.tsx.
src/hooks will contains our custom hooks.
src/types will contains all types that used across project. Otherwise, types will be saved in type.ts in the same folder of that part.
src/common.ts for storing common constants or functions or whatever that will need consistency across this project.
src/stores for zundo states to ctrl Z.
src/storise for storybook components. Used for testing the library without publishing and installing everytime.
src/mocks for storing mocks data for testing and demo.