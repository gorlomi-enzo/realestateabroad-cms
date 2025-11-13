# Render Persistent Disk Storage Setup

## 🎯 Problem Solved

**Issue:** Uploaded images disappeared after every deployment because Render uses ephemeral storage (temporary files deleted on redeploy).

**Solution:** Configure Render's Persistent Disk ($1/month) to permanently store uploaded media files.

## 📋 What Was Configured

The following files have been updated to use Render's persistent disk:

1. ✅ `render.yaml` - Added disk mount configuration
2. ✅ `config/plugins.js` - Configured upload settings
3. ✅ `config/middlewares.js` - Added custom middleware for serving files
4. ✅ `src/middlewares/persistent-uploads.js` - Custom middleware to serve from `/opt/render/project/data`
5. ✅ `config/env/production/plugins.js` - Production-specific upload config
6. ✅ `config/env/production/server.js` - Production server configuration
7. ✅ Removed Cloudinary package (no longer needed)

## 🚀 Manual Setup Required on Render

**IMPORTANT:** The code is ready, but you need to manually enable the persistent disk in Render dashboard.

### Step 1: Enable Persistent Disk

1. Go to: https://dashboard.render.com
2. Find your service: **realestateabroad-cms**
3. Click: **Settings** tab (or **Disks** if visible in left sidebar)
4. Scroll to: **Disks** section
5. Click: **Add Disk**
6. Configure:
   - **Name:** `strapi-uploads`
   - **Mount Path:** `/opt/render/project/data`
   - **Size:** `1 GB` (costs $1/month)
7. Click: **Save**

### Step 2: Wait for Deployment

- Render will automatically redeploy with the disk attached
- Deployment takes **3-5 minutes**
- Check deployment status at: https://dashboard.render.com

### Step 3: Re-upload Images

After deployment completes:

1. Go to: https://realestateabroad-cms.onrender.com/admin
2. Navigate to: **Media Library**
3. **Delete old broken image entries** (they have no files)
4. **Upload images fresh**:
   - Click **Add new assets**
   - Upload your images
   - They'll be stored on persistent disk at `/opt/render/project/data/uploads/`
5. **Attach images to articles**:
   - Go to **News Articles** or **Blog Posts**
   - Edit each article
   - Select **Featured Image** field
   - Choose image from media library
   - Click **Save & Publish**

### Step 4: Verify Setup

1. Upload a test image
2. Note the image URL (should be: `https://realestateabroad-cms.onrender.com/uploads/filename.jpg`)
3. Trigger a manual deployment (to test persistence)
4. After redeploy completes, verify image URL still works
5. If image still accessible after redeploy = ✅ **Success!**

## 💰 Cost Breakdown

- **1GB Disk:** $1/month
- **Storage capacity:** ~1,000 images (at 1MB average)
- **Bandwidth:** Unlimited (included with Render plan)
- **Scalability:** Can upgrade to 10GB if needed

## 🔍 How It Works

### Production (Render)
```
Upload → /opt/render/project/data/uploads/
Serve  → https://your-cms.com/uploads/
Storage → Persistent disk (survives deployments)
```

### Development (Local)
```
Upload → ./public/uploads/
Serve  → http://localhost:1337/uploads/
Storage → Local filesystem
```

## 📊 Technical Details

### Disk Configuration (`render.yaml`)
```yaml
disks:
  - name: strapi-uploads
    mountPath: /opt/render/project/data
    sizeGB: 1
```

### Upload Path
- **Production:** `/opt/render/project/data/uploads/`
- **Development:** `./public/uploads/`

### Image URLs
- Base URL: `https://realestateabroad-cms.onrender.com`
- Upload path: `/uploads/`
- Example: `https://realestateabroad-cms.onrender.com/uploads/hero-image-123.jpg`

## ⚠️ Important Notes

1. **Disk must be manually enabled** in Render dashboard (code alone won't create it)
2. **Existing images in database** will still reference old broken paths
3. **Must re-upload all images** after disk is enabled
4. **Disk persists across deployments** - images won't disappear anymore
5. **$1/month charge** starts immediately when disk is enabled

## 🐛 Troubleshooting

### Images still returning 404 after setup?

**Checklist:**
- ✅ Disk enabled in Render dashboard?
- ✅ Deployment completed successfully?
- ✅ Images re-uploaded via admin panel?
- ✅ Featured images attached to articles?
- ✅ Articles published?

### How to verify disk is working?

```bash
# Check if disk is mounted (via Render shell)
ls -la /opt/render/project/data/

# Should show:
# drwxr-xr-x uploads/
```

### Disk full? Need more space?

1. Go to Render dashboard → Your service → Disks
2. Click disk name → Resize
3. Increase to 2GB, 5GB, or 10GB
4. Cost scales: $1/GB/month

### Accidentally deleted images?

- ❌ No automatic backups on persistent disk
- ✅ Consider manual backup workflow if images are critical
- ✅ Or use Cloudinary instead (has built-in backups)

## 🔄 Alternative: Switch to Cloudinary

If $1/month is not acceptable or you need more features:

1. Cloudinary offers 25GB free storage
2. Includes CDN, transformations, backups
3. Requires account setup + environment variables
4. Let me know if you want to switch back!

## 📚 Additional Resources

- [Render Persistent Disks Documentation](https://render.com/docs/disks)
- [Strapi Upload Plugin Documentation](https://docs.strapi.io/dev-docs/plugins/upload)
- [Render Pricing](https://render.com/pricing)

---

**Status:** ✅ Code deployed, waiting for manual disk enablement
**Cost:** $1/month for 1GB
**Next Step:** Enable disk in Render dashboard
**Version:** v1.0
**Last Updated:** November 13, 2025
