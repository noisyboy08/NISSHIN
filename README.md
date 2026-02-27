# Nisshin — Retro Pop Art Website

A vibrant, long-scrolling single-page website featuring a 1970s/80s retro pop-art aesthetic with "rubber hose" animation style characters. Built with pure HTML, CSS, and JavaScript for a nostalgic, playful design experience.

![Nisshin Retro Pop Art](https://img.shields.io/badge/Style-Retro%20Pop%20Art-FF6B9D?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎨 Features

- **Retro Pop Art Design** - Bold colors, thick outlines, and playful characters
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - CSS animations and transitions throughout
- **Interactive Elements** - Hover effects, scroll animations, and dynamic content
- **Modern Performance** - Lightweight and fast-loading
- **Accessibility** - Semantic HTML and ARIA labels

## 📋 Sections

1. **Sticky Header** - Logo + pill-shaped navigation buttons
2. **Hero ("NISSHIN")** - Layered 3D title with checkerboard floor, clouds, sparkles, and characters
3. **List & Character** - Repeated "NISSHIN" text + duo illustration with meta descriptions
4. **"GOOD NEWS"** - Massive dark text with sun-in-flames character and orange checkerboard floor
5. **"FUNNY TIME"** - Dedicated page with retro browser window design
6. **Gallery** - Dynamic grid showcasing character designs and illustrations
7. **"SUMMER VIBE"** - Large white text with black shadow on checkerboard background
8. **Blog** - Latest posts with modal view functionality
9. **"ENJOY LIFE"** - Multi-colored individual letters with hand character and pink floor
10. **"MULTILINGUAL"** - Typography showcase with filled and outlined text, orbital decorations
11. **Contact** - Contact form with validation
12. **Newsletter** - Email subscription form
13. **Footer** - "THANK YOU" section with characters and checkerboard background

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Design
   ```

2. **Install dependencies** (optional - for local server)
   ```bash
   npm install
   ```

3. **Run local server** (optional)
   ```bash
   npm start
   # Server runs on http://localhost:3000
   ```

   Or simply open `public/index.html` directly in your browser.

### Using Python Server

```bash
cd public
python -m http.server 8080
# Open http://localhost:8080
```

## 🌐 Deploy on Vercel

This project is configured for easy deployment on Vercel.

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts** - Vercel will automatically detect the configuration from `vercel.json`

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your repository**

5. **Configure project settings:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (root)
   - **Build Command:** (leave empty)
   - **Output Directory:** `public`
   - **Install Command:** `npm install` (optional)

6. **Click "Deploy"**

Vercel will automatically:
- Detect the `vercel.json` configuration
- Set the output directory to `public`
- Configure routing for single-page application

### Vercel Configuration

The project includes a `vercel.json` file with the following settings:

```json
{
  "buildCommand": "",
  "outputDirectory": "public",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures:
- Static files are served from the `public` directory
- All routes redirect to `index.html` for SPA routing
- No build step is required (static site)

## 📁 Project Structure

```
Design/
├── public/                 # Main website files
│   ├── index.html         # Main HTML page
│   ├── funny-time.html    # FUNNY TIME dedicated page
│   ├── styles.css         # Complete stylesheet
│   ├── app.js             # JavaScript functionality
│   ├── assets/            # Images and SVG files
│   │   ├── logo.svg
│   │   ├── *.svg          # Character illustrations
│   │   └── *.png          # Image assets
│   ├── layout/            # Layout design images
│   ├── data/              # JSON data files
│   │   ├── projects.json  # Gallery projects data
│   │   └── blog.json      # Blog posts data
│   └── README.md          # Public folder documentation
├── vercel.json            # Vercel deployment configuration
├── package.json           # Node.js dependencies
├── server.js              # Local development server (optional)
└── README.md              # This file
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, CSS custom properties, perspective transforms, animations
- **JavaScript (Vanilla)** - No frameworks, pure JS for interactivity
- **Google Fonts** - Titan One, Peralta, Rubik Mono One, Lilita One, Inter
- **SVG** - Vector graphics for characters and illustrations

## 🎯 Key Features & Functionality

### Animations
- Smooth scroll animations with Intersection Observer
- Floating cloud animations
- Twinkling star effects
- Hover transitions on interactive elements
- Loading screen animation

### Interactive Elements
- Dynamic gallery filtering
- Blog modal with detailed views
- Contact form with validation
- Newsletter subscription
- Mobile-responsive hamburger menu
- Back-to-top button

### Design Elements
- 3D perspective checkerboard floors
- Retro browser window components
- Layered window effects
- Custom scrollbar styling
- CSS-only decorative patterns

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Adding New Content

1. **Gallery Items** - Edit `public/data/projects.json`
2. **Blog Posts** - Edit `public/data/blog.json`
3. **Styles** - Modify `public/styles.css`
4. **Functionality** - Update `public/app.js`

### Customization

- **Colors** - Modify CSS custom properties in `styles.css` (look for `:root` variables)
- **Fonts** - Update Google Fonts import in `index.html`
- **Content** - Edit HTML sections directly

## 📝 Environment Variables

No environment variables are required for this static site.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Nisshin Creative Design**

- Website: [Your Website]
- Email: hello@nisshin.design

## 🙏 Acknowledgments

- Retro pop art design inspiration
- Rubber hose animation style references
- Google Fonts for typography

## 📞 Support

For support, email hello@nisshin.design or open an issue in the repository.

---

**Made with ❤️ and retro vibes**
