# Next.js Flashcard App with Google Sheets Integration

This is a [Next.js](https://nextjs.org) flashcard application that integrates with Google Sheets API to display vocabulary words and their meanings. The app allows users to study words with interactive flashcards.

## Features

- 📚 **Google Sheets Integration**: Fetches word data directly from Google Sheets
- 🎴 **Interactive Flashcards**: Navigate through words with Previous/Next buttons
- 👁️ **Show/Hide Answers**: Toggle between word display and full details
- 📊 **Level Tracking**: Display difficulty levels for each word
- 🔄 **Real-time Updates**: Refresh data from Google Sheets
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Data Structure

The app expects a Google Sheet with the following columns:
- **Word**: The vocabulary word to study
- **Meaning**: Definition or translation
- **Example**: Example sentence (optional)
- **Level**: Difficulty level (e.g., Beginner, Intermediate, Advanced)
- **LastReviewed**: Last review date (optional)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Google Sheets API

#### Option A: API Key Authentication (Recommended for public sheets)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Go to "Credentials" and create an API key
5. Restrict the API key to Google Sheets API

#### Option B: Service Account Authentication (Recommended for private sheets)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Go to "Credentials" and create a service account
5. Download the service account JSON key file
6. Share your Google Sheet with the service account email

### 3. Configure Environment Variables

1. Copy `env.sample` to `.env.local`:
   ```bash
   cp env.sample .env.local
   ```

2. Edit `.env.local` and fill in your actual values. See `env.sample` for detailed configuration options.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Navigate**: Use the Previous/Next buttons to move between words
2. **Study**: Click "Show Answer" to reveal the meaning and example
3. **Track Progress**: View the current word number and total count
4. **Refresh Data**: Click "Refresh Data" to reload from Google Sheets

## API Endpoints

- `GET /api/words` - Fetches word data from Google Sheets

## Troubleshooting

### Common Issues

1. **"Google Sheets authentication is not configured"**
   - Make sure you've set up the environment variables correctly
   - Check that your API key or service account credentials are valid

2. **"Google Sheets Spreadsheet ID is not configured"**
   - Ensure `GOOGLE_SHEETS_SPREADSHEET_ID` is set in your `.env.local` file

3. **"Failed to fetch data from Google Sheets"**
   - Verify that the spreadsheet ID is correct
   - Check that the sheet is accessible (public or shared with service account)
   - Ensure the range includes your data (default: A1:E1000)

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheets API setup
3. Ensure your environment variables are correctly configured

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
