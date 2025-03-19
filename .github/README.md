![gdg](../public/gdg.svg)

## About the Project

<div align="center">
  <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
  <img src="https://img.shields.io/badge/supabase-000000?style=for-the-badge&logo=supabase&logoColor=#3dc48f" alt="Supabase"/>
</div>

## For Team Members

> [!IMPORTANT]
> Use conventional commits for commit messages.
> Set up a cron job to run daily to prevent Supabase from deactivating the project.

## Route Access Permissions

| **Route**                   | **Admin** | **Team** | **User** |
| --------------------------- | --------- | -------- | -------- |
| `/`                         | ✅        | ✅       | ✅       |
| `/protected`                | ✅        | ✅       | ✅       |
| `/sign-in`                  | ✅        | ✅       | ✅       |
| `/sign-up`                  | ✅        | ✅       | ✅       |
| `/forgot-password`          | ✅        | ✅       | ✅       |
| `/about`                    | ✅        | ✅       | ✅       |
| `/blogs`                    | ✅        | ✅       | ✅       |
| `/events`                   | ✅        | ✅       | ✅       |
| `/admin/members`            | ✅        | ❌       | ❌       |
| `/admin/users`              | ✅        | ✅       | ❌       |
| `/protected/reset-password` | ✅        | ✅       | ✅       |
| `/profile`                  | ✅        | ✅       | ✅       |
| `/add-on/blog`              | ✅        | ✅       | ❌       |
| `/add-on/event`             | ✅        | ✅       | ❌       |
| `/edit/blog`                | ✅ (Own)  | ✅ (Own) | ❌       |
| `/edit/blog/[id]`           | ✅ (Own)  | ✅ (Own) | ❌       |
| `/edit/event`               | ✅        | ✅       | ❌       |
| `/edit/event/[id]`          | ✅        | ✅       | ❌       |
| `/dashboard`                | ✅        | ✅       | ❌       |
