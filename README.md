<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1w3j23o8uNm_kc3HYv2OCvyatJZIQRAK0

## Security Notes
**IMPORTANT**: Never commit your `.env.local` or any API keys to version control. The repository comes with a `.env.example` file that you should use as a template.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase and Gemini API keys in `.env.local`
3. Run the app:
   `npm run dev`
