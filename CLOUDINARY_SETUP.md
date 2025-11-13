# Cloudinary Setup Guide for Strapi CMS

## 🎯 Problem Solved

**Issue:** Uploaded images disappeared on Render after every deployment because Render uses ephemeral storage.

**Solution:** Use Cloudinary (free cloud storage) to permanently store all uploaded media files.

## 📋 Prerequisites

- Cloudinary account (free tier is sufficient)
- Access to Render dashboard
- Access to Strapi admin panel

## 🚀 Setup Instructions

### Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a **free account**
3. After signup, go to Dashboard: https://console.cloudinary.com/
4. You'll see your credentials:
   - **Cloud Name** (e.g., `dxxxxxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `xxxxxxxxxxxxxxxxxxx-xxxxxxxxx`)

### Step 2: Configure Environment Variables on Render

1. Go to https://dashboard.render.com
2. Find your service: `realestateabroad-cms`
3. Click **Environment** tab
4. Add these **3 new environment variables**:

   ```
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   ```

5. Click **Save Changes**

### Step 3: Deploy Changes

The code has already been configured to use Cloudinary in production:
- ✅ `@strapi/provider-upload-cloudinary` package installed
- ✅ `config/plugins.js` updated to use Cloudinary when `NODE_ENV=production`

After adding environment variables on Render:
1. Render will automatically trigger a new deployment
2. Wait 2-5 minutes for deployment to complete
3. Check deployment logs for "Deploy succeeded"

### Step 4: Re-upload Images via Strapi Admin

**IMPORTANT:** Existing image metadata is in the database, but files need to be re-uploaded to Cloudinary.

1. Go to: https://realestateabroad-cms.onrender.com/admin
2. Navigate to: **Media Library**
3. Select all images you want to keep
4. **Delete them** (this only removes broken references)
5. Upload images again:
   - Click **Add new assets**
   - Upload your images (they'll now go to Cloudinary)
6. Attach images to articles:
   - Go to **News Articles** or **Blog Posts**
   - Edit each article
   - Click the **Featured Image** field
   - Select image from media library
   - **Save & Publish**

### Step 5: Verify Setup

1. Upload a test image via admin panel
2. Check Cloudinary dashboard - image should appear in Media Library
3. Check article on frontend - image should display
4. Deploy again to verify images persist after deployment

## 🔍 How to Find Your Images

Your uploaded images should be visible at:
- **Cloudinary Dashboard:** https://console.cloudinary.com/console/media_library
- **Image URLs will look like:** `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/...`

## 🎨 Configuration Details

### What Changed

**`config/plugins.js`:**
```javascript
upload: {
  config: {
    provider: env('NODE_ENV') === 'production' ? 'cloudinary' : 'local',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
  },
}
```

**`package.json`:**
- Added: `@strapi/provider-upload-cloudinary`

## 📊 Cloudinary Free Tier Limits

- **Storage:** 25GB
- **Bandwidth:** 25GB/month
- **Transformations:** 25 credits/month
- **Images:** Unlimited

**More than enough for your CMS!**

## ⚠️ Important Notes

1. **Local Development:** Still uses local storage (`public/uploads/`)
2. **Production (Render):** Uses Cloudinary automatically
3. **Database Migration:** Image metadata stays in database, only storage location changes
4. **Existing Articles:** Need to re-attach images after re-uploading to Cloudinary

## 🐛 Troubleshooting

### Images still not showing after setup?

**Check:**
1. Environment variables set correctly on Render ✅
2. Deployment completed without errors ✅
3. Images re-uploaded via admin panel ✅
4. Images attached to articles and published ✅

### How to verify Cloudinary is working?

1. Go to Strapi admin panel
2. Upload a test image
3. Check Cloudinary dashboard - it should appear there
4. Check the image URL in the database - it should start with `https://res.cloudinary.com/`

### Error: "Failed to upload file"?

- **Check** environment variables are correct
- **Check** Cloudinary API key has upload permissions
- **Check** deployment logs for errors

## 📚 Additional Resources

- [Cloudinary Strapi Integration Docs](https://docs.strapi.io/dev-docs/providers#cloudinary)
- [Cloudinary Dashboard](https://console.cloudinary.com/)
- [Cloudinary Pricing](https://cloudinary.com/pricing)

---

**Status:** ✅ Ready to deploy
**Version:** v1.0
**Last Updated:** November 13, 2025
