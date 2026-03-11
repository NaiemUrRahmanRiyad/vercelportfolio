# 🔧 Contact Form Troubleshooting Guide

## Problem: "Message not sent - please try again"

This error typically means one of these issues:

---

## ✅ Step 1: Verify Environment Variables in Netlify

**CRITICAL:** Your environment variables MUST be set before the function can work.

1. Go to your Netlify site dashboard
2. **Site Settings** → **Build & Deploy** → **Environment**
3. Check that ALL THREE variables are present:

| Variable | Should be | Example |
|----------|-----------|---------|
| `EMAIL_USER` | Your Gmail | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 chars) | `bcde fghi jklm nopq` |
| `EMAIL_TO` | Recipient email | `your-email@gmail.com` |

❌ **If any are missing:** Add them now and redeploy

---

## ✅ Step 2: Verify Your Gmail App Password

You **MUST use a Gmail App Password**, NOT your regular Gmail password.

### Get App Password:

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Turn on **2-Step Verification** (if not already enabled)
4. Find **App passwords** section
5. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or your device)
6. Google generates a 16-character password
7. Copy the password (remove any spaces)

### Common Problem:

❌ Using your regular Gmail password → **Won't work!**
✅ Using Gmail App Password → **Works!**

---

## ✅ Step 3: Redeploy After Env Variables

After adding environment variables, you MUST redeploy:

1. Go to **Deployments** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for it to complete (usually 1-2 minutes)

The function needs to restart with the new env vars!

---

## ✅ Step 4: Check Netlify Function Logs

See what the server is actually saying:

1. Go to your Netlify dashboard
2. **Site Settings** → **Functions**
3. Click **contact** function
4. Check the logs for errors

Common errors you might see:

| Error | Cause | Solution |
|-------|-------|----------|
| `Missing environment variables` | Env vars not set | Go to Step 1 above |
| `Invalid login` | Wrong Gmail credentials | Check app password spelling |
| `All fields are required` | Form validation failed | Fill all form fields |

---

## ✅ Step 5: Test Locally First

Test your credentials locally before troubleshooting in production:

```bash
# Install Netlify CLI if you haven't
npm install -g netlify-cli

# Create .env file with your credentials
# (Copy from .env.example and fill in values)
copy .env.example .env

# Edit .env with your actual Gmail credentials:
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-16-char-app-password
# EMAIL_TO=your-email@gmail.com

# Run local dev server with functions
netlify dev

# Open http://localhost:8888 and test the form
```

If it works locally, your credentials are correct. Then the issue is likely in Netlify env setup.

---

## ✅ Step 6: Clear Browser Cache

Sometimes browsers cache the old function. Clear cache and try again:

1. **Hard refresh:** Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. Or use **Chrome DevTools:**
   - F12 → Application → Clear site data
3. Reload and test form again

---

## ✅ Step 7: Check Browser Console for Errors

1. Visit your portfolio site
2. Press **F12** or **Right-click → Inspect**
3. Go to **Console** tab
4. Fill and submit the contact form
5. Look for error messages in red

Common browser errors:

```javascript
// Error 1: CORS issue
// Solution: Browser can't reach function, check netlify.toml CORS settings

// Error 2: 500 Server Error
// Solution: Function crashed, check Netlify Function logs

// Error 3: Network error
// Solution: Check internet connection or Netlify status
```

---

## 🆘 If Still Not Working

Run this checklist:

- [ ] All 3 environment variables set in Netlify
- [ ] Variables have NO extra spaces or quotes
- [ ] Using 16-character Gmail **App Password** (not regular password)
- [ ] Redeployed after adding env variables
- [ ] 2-Step Verification is ON in Google Account
- [ ] Tested locally with `netlify dev` first
- [ ] Cleared browser cache
- [ ] Checked Netlify Function logs for specific errors
- [ ] Form fields are all filled (name, email, message)
- [ ] Email format is valid (has @ and domain)

---

## 📝 Email Credential Checklist

```
EMAIL_USER: ✓ (Gmail address, e.g., john@gmail.com)
EMAIL_PASS: ✓ (16-char app password from Google)
EMAIL_TO: ✓ (Where emails should arrive, can be same as EMAIL_USER)
```

All three must be:
- ✓ Present (not blank)
- ✓ Correct spelling
- ✓ No extra spaces
- ✓ Not wrapped in quotes

---

## 🎯 Quick Action Plan

### If you just set env variables:
1. Go to Netlify Deployments
2. Click "Trigger deploy"
3. Wait 2 minutes
4. Test form again

### If you changed your Gmail email or password:
1. Update EMAIL_USER and/or EMAIL_PASS in Netlify
2. Regenerate Gmail app password if needed
3. Redeploy
4. Test again

### If nothing works:
1. Test locally: `netlify dev`
2. Check Netlify Function logs
3. Verify Gmail credentials are correct
4. Check browser console (F12)

---

## 📞 Support Resources

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Gmail App Passwords](https://myaccount.google.com/apppasswords)
- [Netlify Status](https://www.netlify.com/status/)

---

## ✨ Once It Works

You should receive an email like this:

```
Subject: Portfolio Contact: Message from [Visitor Name]

From: [Visitor Email]
Message: [Visitor's Message]
[Timestamp]
```

The email will come to your EMAIL_TO address within seconds! 🎉
