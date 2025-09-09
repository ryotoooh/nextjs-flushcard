# Next.js Flashcard App

A Next.js flashcard application for studying vocabulary words with Google Sheets integration.

## Features

- 📚 Google Sheets integration for word data
- 🎴 Interactive flashcards with navigation
- 👁️ Show/hide answers functionality
- 📊 Level tracking for words
- 📱 Responsive design

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Google Sheets API**
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Sheets API
   - Create API key or service account credentials

3. **Configure environment variables**
   ```bash
   cp env.sample .env.local
   ```
   Edit `.env.local` with your Google Sheets configuration.

4. **Run development server**
   ```bash
   npm run dev
   ```

## Data Structure

Google Sheet columns: Word, Meaning, Example, Level, LastReviewed

## Architecture

The app uses a service-based architecture with dependency inversion:

- `WordService` interface for data access
- Multiple implementations: GoogleSheets, Database, JSON
- Factory pattern for service creation

```typescript
import { createWordService } from './services/word-service-factory';
const wordService = createWordService();
const words = await wordService.getAllWords();
```

## API

- `GET /api/words` - Fetches word data
