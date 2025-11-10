# News Articles Collection Setup Instructions

Strapi is now running in development mode at: **http://localhost:1337/admin**

## Step 1: Create news-articles Collection Type

1. Open http://localhost:1337/admin in your browser
2. Log in with your admin credentials (or create an admin account if prompted)
3. Navigate to **Content-Type Builder** in the left sidebar
4. Click **Create new collection type**

### Collection Configuration
- Display name: `News Article`
- API ID (singular): `news-article`
- API ID (plural): `news-articles`
- Click **Continue**

### Add Fields

#### 1. Title (Text)
- Name: `title`
- Type: Text (short)
- Advanced settings:
  - ✅ Required
  - Max length: 200

#### 2. Slug (UID)
- Name: `slug`
- Type: UID
- Attached field: Select `title`
- Advanced settings:
  - ✅ Required
  - ✅ Unique

#### 3. Excerpt (Long Text)
- Name: `excerpt`
- Type: Text (long)
- Advanced settings:
  - ✅ Required
  - Max length: 300

#### 4. Content (Rich Text)
- Name: `content`
- Type: Rich text (Markdown)
- Advanced settings:
  - ✅ Required

#### 5. Category (Enumeration)
- Name: `category`
- Type: Enumeration
- Values (add each one):
  - `New Bonuses`
  - `Regulation`
  - `Market News`
  - `Innovation`
  - `Trends`
  - `Industry Analysis`
- Advanced settings:
  - ✅ Required

#### 6. Published Date (DateTime)
- Name: `publishedDate`
- Type: Date (with time)
- Advanced settings:
  - ✅ Required

#### 7. Last Updated (DateTime)
- Name: `lastUpdated`
- Type: Date (with time)
- Advanced settings:
  - ❌ Not required

#### 8. Read Time (Text)
- Name: `readTime`
- Type: Text (short)
- Advanced settings:
  - ✅ Required
  - Default value: `5 min`
  - Max length: 10

#### 9. Site (Enumeration) - CRITICAL FOR MULTI-SITE
- Name: `site`
- Type: Enumeration
- Values:
  - `onlinecasinobonus`
  - `realestateabroad`
- Advanced settings:
  - ✅ Required
  - Default value: `onlinecasinobonus`

#### 10. Status (Enumeration)
- Name: `status`
- Type: Enumeration
- Values:
  - `draft`
  - `published`
- Advanced settings:
  - ✅ Required
  - Default value: `draft`

#### 11. Featured Image (Media)
- Name: `featuredImage`
- Type: Media (Single)
- Advanced settings:
  - ❌ Not required
  - Allowed types: Images only

#### 12. SEO Component (Optional but Recommended)

First, create the SEO component:
1. Click **Create new component**
2. Category: `seo`
3. Name: `SEO`
4. Add these fields to the component:
   - `metaTitle` (Text, max 60 chars)
   - `metaDescription` (Text long, max 160 chars)
   - `metaKeywords` (Text)
   - `canonicalUrl` (Text)

Then add to news-articles:
- Name: `seo`
- Type: Component (not repeatable)
- Select component: `seo.SEO`
- Advanced settings:
  - ❌ Not required

### Save and Restart

1. Click **Save** to create the collection type
2. Strapi will automatically restart
3. Wait for restart to complete (about 10 seconds)

---

## Step 2: Configure API Permissions

1. Go to **Settings** (left sidebar, bottom)
2. Click **Roles** under "Users & Permissions Plugin"
3. Select **Public** role
4. Find `news-articles` in the permissions list
5. Enable these permissions:
   - ✅ `find` (get all articles)
   - ✅ `findOne` (get single article)
6. Click **Save**

**Important:** Do NOT enable `create`, `update`, or `delete` for Public role.

---

## Step 3: Verify Setup

1. Go to **Content Manager** in the left sidebar
2. You should see:
   - Blog Posts (existing)
   - News Articles (new)
   - Sites (existing)

---

## Step 4: Test Creating a News Article

1. Click **Content Manager** > **News Articles**
2. Click **Create new entry**
3. Fill in test data:
   - Title: "Test News Article"
   - Slug: Will auto-generate
   - Excerpt: "This is a test article"
   - Content: "Test content here"
   - Category: Select any
   - Published Date: Select current date/time
   - Read Time: "5 min"
   - Site: Select `onlinecasinobonus` or `realestateabroad`
   - Status: Select `published`
4. Click **Save**
5. Click **Publish**

---

## Step 5: Test API Access

Once you've created a test article, verify API access:

```bash
# Test the news-articles API endpoint
curl http://localhost:1337/api/news-articles

# Test filtering by site
curl "http://localhost:1337/api/news-articles?filters[site][\$eq]=onlinecasinobonus"

# Test getting a single article by slug
curl "http://localhost:1337/api/news-articles?filters[slug][\$eq]=test-news-article"
```

You should see JSON responses with your test data.

---

## Multi-Site Filtering Guide

### For onlinecasinobonus.one:
```
GET /api/news-articles?filters[site][$eq]=onlinecasinobonus&filters[status][$eq]=published
```

### For realestateabroad.com:
```
GET /api/news-articles?filters[site][$eq]=realestateabroad&filters[status][$eq]=published
```

This ensures complete content isolation between sites.

---

## Next Steps

After completing the above steps:

1. Stop the development server (Ctrl+C)
2. Build for production: `npm run build`
3. Start in production mode: `npm start`

Or if you're deploying to Render/production, commit and push the changes.

---

**Note:** Keep the development server running while making changes in the admin UI. Strapi will auto-restart when you save collection type changes.
