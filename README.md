# Naiem Ur Rahman Riyad - Portfolio

A modern, responsive portfolio website showcasing data science projects and skills.

## 🚀 Features

- Responsive design for all devices
- Interactive project showcase with filtering
- Contact form with email integration
- Smooth animations and modern UI
- Dark theme with custom cursor effects

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js with Express (local development)
- **Deployment:** Vercel (serverless functions)
- **Email:** Nodemailer with Gmail SMTP

## 📧 Contact Form Setup

The contact form uses Gmail SMTP to send emails. For security, it uses environment variables.

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the App Password (not your regular password) in environment variables

### Environment Variables

Create a `.env` file in the root directory:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_TO=your-receiving-email@gmail.com
```

For Vercel deployment, add these as environment variables in your Vercel dashboard.

## 🚀 Deployment to Vercel

### Option 1: Automatic Deployment (Recommended)

1. **Connect to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **Set Environment Variables:**
   - Go to your Vercel dashboard
   - Project Settings → Environment Variables
   - Add the three email variables from above

3. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

## 🔧 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your email credentials

3. **Run locally:**
   ```bash
   npm run dev  # Development with auto-reload
   # or
   npm start    # Production mode
   ```

4. **Open in browser:**
   - http://localhost:3000

## 📁 Project Structure

```
portfolio/
├── api/                    # Vercel serverless functions
│   └── contact.js         # Contact form API
├── public/                # Static files
│   ├── index.html        # Main HTML
│   ├── assets/
│   │   ├── style.css    # Styles
│   │   ├── main.js     # JavaScript
│   │   └── projects.json # Project data
├── server/               # Local Express server (dev only)
│   ├── server.js
│   └── routes/
├── vercel.json          # Vercel configuration
├── package.json
└── .env.example        # Environment template
```

## 🎨 Customization

- **Projects:** Edit `public/assets/projects.json`
- **Styling:** Modify `public/assets/style.css`
- **Content:** Update `public/index.html`
- **Email Template:** Modify `api/contact.js`

## 📞 Support

If the contact form doesn't work after deployment:

1. Check Vercel function logs for errors
2. Verify environment variables are set correctly
3. Ensure Gmail App Password is valid
4. Check spam folder for test emails

## 📄 License

© 2025 Naiem Ur Rahman Riyad. All rights reserved.