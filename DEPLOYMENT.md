# GitHub Pages Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it (e.g., `portfolio-website` or `mohamed-rodani-portfolio`)
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license (we already have files)
6. Click **Create repository**

## Step 2: Push Your Code to GitHub

Run these commands in your terminal (from the project directory):

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

Your site will be live at:
- `https://YOUR_USERNAME.github.io/REPO_NAME`

## Step 4: Set Up Custom Domain (Optional)

If you own `mohamedrodani.com`:

1. In your repository, go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `mohamedrodani.com`
3. Click **Save**
4. GitHub will create a `CNAME` file automatically
5. In your domain registrar (where you bought the domain), add these DNS records:
   - **Type**: `A`
   - **Name**: `@`
   - **Value**: `185.199.108.153`
   - **TTL**: `3600` (or default)
   
   Add 3 more A records with these IPs:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   OR use a CNAME record:
   - **Type**: `CNAME`
   - **Name**: `@` (or `www`)
   - **Value**: `YOUR_USERNAME.github.io`
   - **TTL**: `3600`

6. Wait 10-60 minutes for DNS to propagate
7. Update `index.html` line 16 with your custom domain URL

## Step 5: Update HTML with Your Domain

After deployment, update line 16 in `index.html`:
- If using GitHub Pages default: `https://YOUR_USERNAME.github.io/REPO_NAME`
- If using custom domain: `https://mohamedrodani.com`

## Future Updates

To update your website:
```bash
git add .
git commit -m "Update website"
git push
```

Changes will be live in 1-2 minutes!

