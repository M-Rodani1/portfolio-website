# Portfolio Website - Updated Version

## Changes Made

### Critical Fixes
1. **Fixed broken script tag** - The closing `</body></html>` tags were missing
2. **Fixed video format** - Converted `.mov` to `.mp4` (H.264) for universal browser support
3. **Fixed asset filenames** - Removed spaces from filenames (now use underscores)
4. **Fixed BERT accuracy claim** - Changed "100% test accuracy" to "87% test accuracy" to match your confusion matrix
5. **Fixed email link** - Replaced obfuscated Cloudflare link with placeholder `mailto:your.email@example.com`

### New Assets Created
- `favicon.png` (64x64) - Purple "MR" initials
- `favicon-32.png` (32x32)
- `favicon-16.png` (16x16)
- `apple-touch-icon.png` (180x180) - For iOS home screen
- `demo_heat_pump_video.mp4` - Converted from .mov (5.2MB vs 19.5MB original)

### Content Improvements
1. **Tightened hero description** - More concise, removed redundancy
2. **Enhanced Experience entries** - WCIT and Tesco now have bullet points like the Diverse AI Hackathon
3. **Updated BERT project description** - Now highlights the class imbalance improvement (28.6% → 85.7% negative recall)

### Code Quality Improvements
1. **Added focus-visible styles** - Better keyboard navigation accessibility
2. **Added SVG sprite definitions** - Ready for icon deduplication (optional refactor)
3. **Removed TODO comments** - Cleaner codebase
4. **Updated og:url** - Changed placeholder to `mohamedrodani.com`

---

## Things You Still Need To Do

### Required
- [ ] **Add your email** - Replace `your.email@example.com` in the contact section with your actual email
- [ ] **Upload your CV** - Save as `assets/Mohamed_Rodani_CV.pdf`
- [ ] **Update og:url** - Change `mohamedrodani.com` to your actual domain when deployed

### Recommended
- [ ] **Replace stock neural network image** - Use an actual output from one of your projects instead
- [ ] **Add more detail to WCIT/Tesco entries** - What specifically did you build? What technologies?
- [ ] **Consider adding a profile photo** - Adds personality and trust
- [ ] **Add live demo links** - Link to Streamlit apps, notebooks where applicable

---

## File Structure
```
portfolio-website/
├── index.html
├── styles.css
├── script.js
├── CHANGES.md
└── assets/
    ├── favicon.png
    ├── favicon-16.png
    ├── favicon-32.png
    ├── apple-touch-icon.png
    ├── bert_confusion_matrix.png
    ├── heat-pump.png
    ├── neural_networks_image.webp
    └── demo_heat_pump_video.mp4
```

---

## Deployment Notes
When deploying (GitHub Pages, Vercel, Netlify, etc.):
1. Update the `og:url` meta tag with your actual URL
2. Test the video playback on mobile devices
3. Verify all links work (GitHub repos, LinkedIn, email)
