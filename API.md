# RHC Portfolio API Reference

Base URL: `https://your-render-service.onrender.com/api`  
All admin routes require `Authorization: Bearer <token>` header.

## Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | — | Login → returns `{ token, email }` |
| GET  | `/auth/me` | ✓ | Returns current admin info |

## Site Settings
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/site-settings` | — | Returns `{ key: value }` map |
| PUT | `/site-settings/:key` | ✓ | Upsert setting `{ value }` |
| DELETE | `/site-settings/:key` | ✓ | Delete setting |

**Keys used by frontend:** `home_hero_title`, `home_hero_description`, `home_projects_description`, `resume_intro`, `resume_url`, `meta_description`

## Project Classes
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/project-classes` | — | List all (with project count) |
| GET | `/project-classes/:id` | — | Single class with nested projects |
| POST | `/project-classes` | ✓ | Create `{ name, slug, order? }` |
| PUT | `/project-classes/:id` | ✓ | Update |
| DELETE | `/project-classes/:id` | ✓ | Delete |

## Projects
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/projects` | — | List all; query: `?classId=&featured=true` |
| GET | `/projects/:id` | — | Single project with class |
| POST | `/projects` | ✓ | Create `{ title, description, imageUrl?, techStack[], link?, githubRepo?, classId, featured?, order? }` |
| PUT | `/projects/:id` | ✓ | Update (partial) |
| DELETE | `/projects/:id` | ✓ | Delete |

## Publications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/publications` | — | List all (newest first) |
| GET | `/publications/:id` | — | Single publication |
| POST | `/publications` | ✓ | Create `{ title, summary, coAuthors[], link?, imageUrl?, publishedAt? }` |
| PUT | `/publications/:id` | ✓ | Update (partial) |
| DELETE | `/publications/:id` | ✓ | Delete |

## Certifications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/certifications` | — | List all (newest first) |
| GET | `/certifications/:id` | — | Single certification |
| POST | `/certifications` | ✓ | Create `{ name, organization, issuedAt, badgeUrl?, credentialUrl? }` |
| PUT | `/certifications/:id` | ✓ | Update (partial) |
| DELETE | `/certifications/:id` | ✓ | Delete |

## Contact
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/contact` | — | Get contact details |
| PUT | `/contact` | ✓ | Upsert `{ email?, linkedin?, github?, phone?, location? }` |

## Upload
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/upload` | ✓ | Upload file (multipart `file` field) → `{ url, publicId }` |
| DELETE | `/upload` | ✓ | Delete by `{ publicId }` |

## Health
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Server health check |
