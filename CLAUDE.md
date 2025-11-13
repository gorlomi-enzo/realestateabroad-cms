# Strapi Multi-Site CMS

A headless CMS powering content for multiple sites using a unified backend.

## 🌐 Sites Supported

| Site | Domain | Content Types | Site ID |
|------|--------|---------------|---------|
| **Real Estate Abroad** | realestateabroad.com | Blog posts, News articles | 1 |
| **Online Casino Bonus** | onlinecasinobonus.one | News articles | 2 |

## 🏗️ Architecture

### Multi-Site Strategy

This CMS uses **two different approaches** for multi-site content:

1. **Enumeration Field** (news-articles)
   - Simple string enumeration: `"onlinecasinobonus" | "realestateabroad"`
   - Lightweight and performant
   - Best for content that doesn't need deep site metadata

2. **Relation Field** (blog-posts)
   - Foreign key relation to the `site` entity
   - Access to full site configuration (colors, meta defaults, etc.)
   - Best for content that needs site-specific branding

## 📋 Content Types

### 1. Site (`api::site.site`)

Central configuration entity for each site/brand.

**Fields:**
```json
{
  "key": "string (unique, lowercase, max 50)",
  "name": "string (max 100)",
  "domains": "json array",
  "description": "text (max 500)",
  "config": "json object",
  "logo": "media (image)",
  "brand_colors": {
    "primary": "#000000",
    "secondary": "#ffffff",
    "accent": "#007bff"
  },
  "meta_defaults": {
    "meta_title_suffix": "",
    "meta_description": "",
    "og_image": "",
    "twitter_handle": ""
  },
  "active": "boolean (default: true)",
  "blog_posts": "relation (oneToMany)"
}
```

**Current Sites:**
- **realestateabroad** (ID: 1) - realestateabroad.com
- **onlinecasinobonus** (ID: 2) - onlinecasinobonus.one

### 2. News Article (`api::news-article.news-article`)

General news content for any site. Uses **enumeration** for multi-site.

**Fields:**
```json
{
  "title": "string (required, max 200)",
  "slug": "uid (from title, unique)",
  "excerpt": "text (required, max 300)",
  "content": "richtext (required, markdown)",
  "category": "enum [New Bonuses, Regulation, Market News, Innovation, Trends, Industry Analysis]",
  "publishedDate": "datetime (required)",
  "lastUpdated": "datetime (optional)",
  "readTime": "string (default: '5 min', max 10)",
  "site": "enum [onlinecasinobonus, realestateabroad] (required)",
  "status": "enum [draft, published] (default: draft)",
  "featuredImage": "media (image, optional)",
  "metaTitle": "string (max 60)",
  "metaDescription": "text (max 160)",
  "metaKeywords": "string",
  "canonicalUrl": "string"
}
```

**Multi-site field:** `site` (enumeration)

### 3. Blog Post (`api::blog-post.blog-post`)

Blog content with full site relation. Uses **relation** for multi-site.

**Fields:**
```json
{
  "title": "string (required, max 255)",
  "slug": "uid (from title, unique)",
  "content": "richtext (required, markdown)",
  "excerpt": "text (max 500)",
  "cover_image": "media (image, optional, backwards compatibility)",
  "featuredImage": "media (image, optional)",
  "author_name": "string (default: 'Real Estate Abroad Team', max 100)",
  "category": "enum [104 categories - see below]",
  "reading_time": "integer (default: 5, min: 1)",
  "meta_title": "string (max 70)",
  "meta_description": "text (max 160)",
  "keywords": "json",
  "featured": "boolean (default: false)",
  "type": "enum [post, news] (default: post)",
  "site": "relation (manyToOne to api::site.site, required)"
}
```

**Categories (104 total):**
- **Property Types (9):** real-estate-news, commercial-real-estate-news, residential-real-estate-news, luxury-real-estate-news, industrial-real-estate-news, logistics-real-estate-news, office-market-news, retail-real-estate-news, data-center-real-estate-news
- **Investment & Finance (5):** real-estate-investing-news, real-estate-development-news, real-estate-financing-news, real-estate-mortgage-news, emerging-markets
- **Industry & Analysis (9):** macro-economic-analysis, policy-regulation, real-estate-technology-news, proptech-sustainability, real-estate-ai-news, tokenized-real-estate-news, real-estate-commissions-news, real-estate-commission-lawsuit-news, ubs-global-real-estate-bubble-index-news
- **Regional (45):** 18 European countries, 3 North America, 10 Asia, 10 Middle East & Africa, 6 Latin America, 1 Oceania
- **City-Specific (35):** Athens, Atlanta, Austin, Bangkok, Barcelona, Bay Area, Berlin, Calgary, Chicago, Dallas, Houston, Istanbul, Las Vegas, Lisbon, Los Angeles, Mexico City, Miami, Montreal, Moscow, Munich, NYC, Osaka, Prague, Riyadh, San Diego, San Francisco, São Paulo, Seattle, Seoul, Tokyo, Vienna, Zurich, etc.

**Multi-site field:** `site` (relation)

**Note on Images:**
- `featuredImage` is the primary image field (new)
- `cover_image` is maintained for backwards compatibility with existing frontend
- Both fields are automatically populated by image automation scripts

## 🚀 Development Setup

### Prerequisites

- **Node.js**: v20.19.4 (required by Strapi v4.15.5)
- **nvm** (Node Version Manager): For version switching

### Installation

```bash
# Clone repository
git clone https://github.com/gorlomi-enzo/realestateabroad-cms.git
cd realestateabroad-cms

# Install dependencies with Node 20
./install-with-node20.sh
```

### Start Development Server

```bash
# Option 1: Using helper script (recommended)
./develop-with-node20.sh

# Option 2: Using START_STRAPI.sh
./START_STRAPI.sh

# Option 3: Manual nvm
nvm use 20
npm run develop
```

**Admin Panel:** http://localhost:1337/admin

### Helper Scripts

| Script | Purpose |
|--------|---------|
| `install-with-node20.sh` | Install dependencies with Node 20 |
| `develop-with-node20.sh` | Start dev server with Node 20 |
| `START_STRAPI.sh` | Universal startup script |
| `create-site.js` | Create new site entries via API |
| `scripts/fetch-blog-images.js` | Auto-fetch images from Unsplash for blog posts (with rate limit handling) |
| `scripts/fetch-and-upload-images.js` | Fetch images for casino news articles |
| `scripts/fix-existing-blog-images.js` | Fix cover_image field for posts with featuredImage |
| `scripts/check-blog-progress.sh` | Monitor background image fetch progress |
| `scripts/init-uploads-dir.js` | Initialize uploads directory on server startup |

## 🌍 Production

**Base URL:** https://realestateabroad-cms.onrender.com

**Endpoints:**
- Admin: https://realestateabroad-cms.onrender.com/admin
- News Articles API: https://realestateabroad-cms.onrender.com/api/news-articles
- Blog Posts API: https://realestateabroad-cms.onrender.com/api/blog-posts
- Sites API: https://realestateabroad-cms.onrender.com/api/sites

**Platform:** Render.com
**Repository:** https://github.com/gorlomi-enzo/realestateabroad-cms
**Database:** SQLite (development), PostgreSQL (production)
**Storage:** Render Persistent Disk (1GB at `/opt/render/project/data`) for uploads

### Environment Variables

```env
# Required for frontend integration
STRAPI_API_URL=https://realestateabroad-cms.onrender.com
STRAPI_API_TOKEN=5b91ed393e6c1b1d4b107aec115505245f1cc19a921970a57b263e983220c9f9f3c30d96eae8bda7067b34c86cd61c55ddff80e837d0f611561c5729199afc7c9422cb9b0a8401872cbf381ff3e8f451453851dd27d78d3dffd794d443742b2df359f1f8ed8ce0d1655b1980f1c98acb27827911306b63db2f3cb1adcca0c9a4
```

## 📖 API Usage

### Public Permissions

All read operations are public (no authentication required):
- ✅ `find` - Get multiple entries
- ✅ `findOne` - Get single entry by ID or slug

### Filtering by Site

#### News Articles (Enumeration)

```bash
# Get all onlinecasinobonus news
curl "https://realestateabroad-cms.onrender.com/api/news-articles?filters[site][$eq]=onlinecasinobonus&filters[status][$eq]=published"

# Get by slug
curl "https://realestateabroad-cms.onrender.com/api/news-articles?filters[slug][$eq]=your-article-slug&filters[site][$eq]=onlinecasinobonus"

# Get realestateabroad news
curl "https://realestateabroad-cms.onrender.com/api/news-articles?filters[site][$eq]=realestateabroad"
```

#### Blog Posts (Relation)

```bash
# Get all realestateabroad blog posts
curl "https://realestateabroad-cms.onrender.com/api/blog-posts?filters[site][id][$eq]=1&populate=site"

# Get by slug with site data
curl "https://realestateabroad-cms.onrender.com/api/blog-posts?filters[slug][$eq]=your-post-slug&populate=site"
```

#### Sites

```bash
# Get all sites
curl "https://realestateabroad-cms.onrender.com/api/sites"

# Get onlinecasinobonus site
curl "https://realestateabroad-cms.onrender.com/api/sites?filters[key][$eq]=onlinecasinobonus"
```

### Advanced Queries

#### Pagination
```bash
curl "https://realestateabroad-cms.onrender.com/api/news-articles?pagination[page]=1&pagination[pageSize]=10"
```

#### Sorting
```bash
# Latest first
curl "https://realestateabroad-cms.onrender.com/api/news-articles?sort=publishedDate:desc"
```

#### Multiple Filters
```bash
curl "https://realestateabroad-cms.onrender.com/api/news-articles?filters[site][$eq]=onlinecasinobonus&filters[status][$eq]=published&filters[category][$eq]=New%20Bonuses&sort=publishedDate:desc"
```

#### Populate Relations
```bash
# Get blog posts with full site data
curl "https://realestateabroad-cms.onrender.com/api/blog-posts?populate=site"

# Get specific fields
curl "https://realestateabroad-cms.onrender.com/api/blog-posts?populate[site][fields][0]=name&populate[site][fields][1]=key"
```

## 🎯 Quick Start Guide

### Creating Content

#### For onlinecasinobonus.one (Casino News)

1. Navigate to: https://realestateabroad-cms.onrender.com/admin/content-manager/collectionType/api::news-article.news-article
2. Click "Create new entry"
3. Fill in all fields
4. **Set `site` = `onlinecasinobonus`** ⚠️
5. Set `status` = `published`
6. Upload featured image (optional)
7. Click "Save" and "Publish"

#### For realestateabroad.com (Blog Posts)

**Option 1: Blog Post (with full site relation)**
1. Navigate to: https://realestateabroad-cms.onrender.com/admin/content-manager/collectionType/api::blog-post.blog-post
2. Click "Create new entry"
3. Fill in all fields
4. **Select `site` = realestateabroad (ID: 1)** ⚠️
5. Publish

**Option 2: News Article (with site enumeration)**
1. Navigate to: https://realestateabroad-cms.onrender.com/admin/content-manager/collectionType/api::news-article.news-article
2. Click "Create new entry"
3. **Set `site` = `realestateabroad`** ⚠️
4. Publish

### Creating a New Site

Use the `create-site.js` script:

```javascript
// Edit create-site.js with your site details
const siteData = {
  key: 'yoursite',
  name: 'Your Site Name',
  domains: ['yoursite.com'],
  description: 'Site description',
  brand_colors: {
    primary: '#1e40af',
    secondary: '#fbbf24',
    accent: '#10b981'
  },
  meta_defaults: {
    meta_title_suffix: ' | Your Site',
    meta_description: 'Default meta description',
    og_image: '',
    twitter_handle: ''
  },
  active: true
};

// Run script
node create-site.js
```

Then update these files:
1. Add site key to `/src/api/news-article/content-types/news-article/schema.json` (site enum)
2. Commit and deploy changes

## 🛠️ Deployment

### Deploy to Production

```bash
# 1. Commit changes
git add .
git commit -m "Your commit message"

# 2. Push to GitHub
git push origin main

# 3. Render auto-deploys from main branch
# Monitor: https://dashboard.render.com
```

### Manual Deploy on Render

1. Go to https://dashboard.render.com
2. Find service: `realestateabroad-cms`
3. Click "Manual Deploy" → "Deploy latest commit"

### Clear Cache & Rebuild

If admin panel shows errors after schema changes:

1. Go to Render Dashboard
2. Click "Manual Deploy" → "Clear build cache & deploy"

## 🐛 Troubleshooting

### Admin Panel Error: "Cannot read properties of undefined (reading 'pluginOptions')"

**Cause:** Admin cache has references to deleted collections or outdated schema

**Solutions:**
1. Wait for Render deployment to complete (2-5 minutes)
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Clear browser cache and cookies
4. Manual deploy with cache clear on Render

### Node Version Issues

**Error:** `better-sqlite3` compilation fails

**Fix:** Ensure you're using Node 20:
```bash
nvm use 20
node --version  # Should show v20.19.4
```

### Git Lock File Issues

**Error:** `fatal: Unable to create '.git/index.lock': File exists`

**Fix:**
```bash
rm -f .git/index.lock
git status
```

### Featured Images Not Displaying (404 Errors)

**Cause:** Render uses ephemeral storage - uploaded files are deleted on every deployment

**Solution:** Persistent disk storage has been configured
- Images are stored at `/opt/render/project/data/uploads`
- Persistent disk configuration in `render.yaml` (1GB)
- Custom middleware serves files from persistent storage
- Directory automatically created on server startup via `scripts/init-uploads-dir.js`

**Image Fields:**
- `featuredImage` - Primary image field (new)
- `cover_image` - Backwards compatibility field
- Both fields automatically populated by automation scripts

## 🖼️ Automated Image Management

### Unsplash Integration

The CMS includes automated scripts to fetch relevant images from Unsplash and attach them to blog posts and news articles.

**Features:**
- Smart keyword extraction based on article titles (countries, cities, topics)
- Automatic rate limit handling (50 requests/hour)
- Batch processing with automatic pause/resume
- Populates both `featuredImage` and `cover_image` fields
- Progress monitoring and logging

**Scripts:**

#### `scripts/fetch-blog-images.js`
Fetches images for all Real Estate Abroad blog posts (173 total).

```bash
# Run in background with logging
nohup node scripts/fetch-blog-images.js > /tmp/blog-images-fetch.log 2>&1 &

# Monitor progress
./scripts/check-blog-progress.sh

# View full log
tail -f /tmp/blog-images-fetch.log
```

**Features:**
- Processes all blog posts with pagination support
- Skips posts that already have images
- Smart keyword extraction (countries: Spain, Dubai, etc.; topics: office, luxury, commercial)
- Auto-waits 1 hour when hitting rate limits
- Resumes automatically after rate limit reset

#### `scripts/fetch-and-upload-images.js`
Fetches images for casino news articles (onlinecasinobonus.one).

```bash
node scripts/fetch-and-upload-images.js
```

#### `scripts/fix-existing-blog-images.js`
Updates `cover_image` field for posts that have `featuredImage` but missing `cover_image`.

```bash
node scripts/fix-existing-blog-images.js
```

**Rate Limits:**
- Unsplash API: 50 requests per hour
- Scripts automatically handle rate limits with hourly pauses
- Estimated time for 173 posts: ~4-5 hours (automatic)

**Unsplash API Key:**
Stored in scripts. Required for fetching images.

## 📚 Documentation Files

- `CLAUDE.md` (this file) - Complete multi-site setup guide
- `IMPLEMENTATION_SUMMARY.md` - Implementation history and current state
- `TROUBLESHOOTING.md` - Common errors and solutions
- `STRAPI_SETUP.md` (in bonus-comparison-main) - Original implementation plan
- `RENDER_DISK_SETUP.md` - Guide for persistent disk configuration

## 🔐 Security

### API Permissions

**Public (no auth):**
- `find` and `findOne` for all content types

**Protected (requires auth):**
- `create`, `update`, `delete` for all content types

**Bootstrap Permissions:**
Configured in `/src/index.js` - runs on every server start to ensure correct permissions.

### API Token

Stored in environment variable `STRAPI_API_TOKEN`. Required for:
- Creating/updating/deleting content via API
- Running automated scripts (like `create-site.js`)

## 📊 Schema Location

All content type schemas are stored in:
```
/src/api/{content-type}/content-types/{singular-name}/schema.json
```

Example:
- Site: `/src/api/site/content-types/site/schema.json`
- News Article: `/src/api/news-article/content-types/news-article/schema.json`
- Blog Post: `/src/api/blog-post/content-types/blog-post/schema.json`

## 🎨 Admin Panel Direct Links

- **News Articles:** https://realestateabroad-cms.onrender.com/admin/content-manager/collectionType/api::news-article.news-article
- **Blog Posts:** https://realestateabroad-cms.onrender.com/admin/content-manager/collectionType/api::blog-post.blog-post
- **Sites:** https://realestateabroad-cms.onrender.com/admin/content-manager/collectionType/api::site.site

---

**Version:** v1.1
**Last Updated:** November 13, 2025
**Status:** ✅ Production Ready
**Multi-Site Support:** ✅ Active (realestateabroad.com + onlinecasinobonus.one)

## 🆕 Recent Updates (v1.1)

**Storage & Images:**
- ✅ Fixed 404 image errors with Render Persistent Disk (1GB)
- ✅ Custom middleware for serving files from persistent storage
- ✅ Automated image fetching from Unsplash with smart rate limiting
- ✅ Dual image field support (`featuredImage` + `cover_image`)

**Content Schema:**
- ✅ Expanded blog-post categories from 7 to 104 (property types, regions, cities)
- ✅ Increased meta_title max length from 60 to 70 characters
- ✅ Added comprehensive real estate category taxonomy

**Automation:**
- ✅ Background image fetching scripts with progress monitoring
- ✅ Automatic rate limit handling (50 requests/hour from Unsplash)
- ✅ Smart keyword extraction for relevant image searches
- ✅ Batch processing with auto-resume capability
