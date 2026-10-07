# Portfolio CMS — No-Code Admin

A React + Spring Boot portfolio CMS where the admin can update portfolio content without editing source code.

## What the admin can manage

- Site Settings: site name, hero text, profile image, resume/social links, contact details and section headings.
- About: title, description and image.
- Projects, Skills, Experience, Services, Testimonials and Blogs: add, edit, delete, publish/unpublish, reorder and replace images.
- Media Library: upload and delete images.
- Messages: read/unread and delete contact messages.
- Image upload is handled by Spring Boot and stored in the configured upload directory.
- JWT authentication protects admin write operations.

## Backend

Requirements: Java 21 and MySQL.

1. Create a MySQL database named `portfolio_cms`.
2. Set environment variables if needed:
   - `DB_PASSWORD`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `UPLOAD_DIR`
3. Run the Spring Boot application on port 8080.

Default admin credentials when no environment variables are supplied:
- Username: `admin`
- Password: `admin123`

Change these credentials for production.

## Frontend

From `frontend/portfolio-frontend`:

```bash
npm install
npm run dev
```

The frontend expects:
`VITE_API_BASE_URL=http://localhost:8080`

## Admin

Open `/admin/login`, sign in, then use the sidebar to manage all CMS content.

The public portfolio reads content from the database. There is no need to edit JSX/Java files for normal text or image changes.
