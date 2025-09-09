import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GoogleSheetsWordService } from '../../../app/services/implementations/GoogleSheetsWordService'
import { createWordService } from '../../../app/services/wordServiceFactory'
import { WordData } from '../../../app/types/word'

// Mock googleapis
const mockGet = vi.fn()
const mockSheetsInstance = {
  spreadsheets: {
    values: {
      get: mockGet
    }
  }
}

vi.mock('googleapis', () => ({
  google: {
    auth: {
      GoogleAuth: vi.fn().mockImplementation(() => ({
        credentials: {},
        scopes: []
      }))
    },
    sheets: vi.fn().mockImplementation(() => mockSheetsInstance)
  }
}))

describe('GoogleSheetsWordService', () => {
  let service: GoogleSheetsWordService

  beforeEach(() => {
    // Reset environment variables
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = 'test-spreadsheet-id'
    process.env.GOOGLE_SHEETS_RANGE = 'A1:E1000'
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.com'
    process.env.GOOGLE_PRIVATE_KEY = 'test-private-key'
    
    service = new GoogleSheetsWordService()
    
    // Reset mock
    mockGet.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
    // Clean up environment variables
    delete process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    delete process.env.GOOGLE_SHEETS_RANGE
    delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    delete process.env.GOOGLE_PRIVATE_KEY
    delete process.env.GOOGLE_SHEETS_API_KEY
  })

  describe('constructor', () => {
    it('should initialize with service account authentication when credentials are available', () => {
      expect(service).toBeDefined()
    })

    it('should initialize with API key authentication when service account is not available', () => {
      delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
      delete process.env.GOOGLE_PRIVATE_KEY
      process.env.GOOGLE_SHEETS_API_KEY = 'test-api-key'
      
      expect(() => new GoogleSheetsWordService()).not.toThrow()
    })

    it('should throw error when no authentication is configured', () => {
      delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
      delete process.env.GOOGLE_PRIVATE_KEY
      delete process.env.GOOGLE_SHEETS_API_KEY
      
      expect(() => new GoogleSheetsWordService()).toThrow('Google Sheets authentication is not configured')
    })
  })

  describe('getAllWords', () => {
    it('should return empty array when no data is available', async () => {
      mockGet.mockResolvedValue({
        data: {
          values: []
        }
      })

      const result = await service.getAllWords()
      expect(result).toEqual([])
      expect(mockGet).toHaveBeenCalledWith({
        spreadsheetId: 'test-spreadsheet-id',
        range: 'A1:E1000'
      })
    })

    it('should return empty array when values is null', async () => {
      mockGet.mockResolvedValue({
        data: {
          values: null
        }
      })

      const result = await service.getAllWords()
      expect(result).toEqual([])
    })

    it('should transform and return word data correctly', async () => {
      const mockData = [
        ['Word', 'Meaning', 'Example', 'Level', 'LastReviewed'], // Header row
        ['apple', 'りんご', 'I eat an apple.', 'beginner', '2024-01-01'],
        ['banana', 'バナナ', 'Banana is yellow.', 'beginner', '2024-01-02'],
        ['cherry', 'さくらんぼ', 'Cherry is red.', 'intermediate', '2024-01-03']
      ]

      mockGet.mockResolvedValue({
        data: {
          values: mockData
        }
      })

      const result = await service.getAllWords()
      
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        word: 'apple',
        meaning: 'りんご',
        example: 'I eat an apple.',
        level: 'beginner',
        lastReviewed: '2024-01-01'
      })
      expect(result[1]).toEqual({
        word: 'banana',
        meaning: 'バナナ',
        example: 'Banana is yellow.',
        level: 'beginner',
        lastReviewed: '2024-01-02'
      })
      expect(result[2]).toEqual({
        word: 'cherry',
        meaning: 'さくらんぼ',
        example: 'Cherry is red.',
        level: 'intermediate',
        lastReviewed: '2024-01-03'
      })
    })

    it('should handle missing columns gracefully', async () => {
      const mockData = [
        ['Word', 'Meaning', 'Example', 'Level', 'LastReviewed'], // Header row
        ['apple', 'りんご'], // Missing some columns
        ['banana', 'バナナ', 'Banana is yellow.', 'beginner'] // Missing last column
      ]

      mockGet.mockResolvedValue({
        data: {
          values: mockData
        }
      })

      const result = await service.getAllWords()
      
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        word: 'apple',
        meaning: 'りんご',
        example: '',
        level: '',
        lastReviewed: ''
      })
      expect(result[1]).toEqual({
        word: 'banana',
        meaning: 'バナナ',
        example: 'Banana is yellow.',
        level: 'beginner',
        lastReviewed: ''
      })
    })

    it('should throw error when spreadsheet ID is not configured', async () => {
      delete process.env.GOOGLE_SHEETS_SPREADSHEET_ID
      const serviceWithoutId = new GoogleSheetsWordService()
      
      await expect(serviceWithoutId.getAllWords()).rejects.toThrow('Google Sheets Spreadsheet ID is not configured')
    })

    it('should handle API errors gracefully', async () => {
      mockGet.mockRejectedValue(new Error('API Error'))

      await expect(service.getAllWords()).rejects.toThrow('Failed to fetch data from Google Sheets')
    })
  })

  describe('getWordsByLevel', () => {
    it('should filter words by level correctly', async () => {
      const mockData = [
        ['Word', 'Meaning', 'Example', 'Level', 'LastReviewed'],
        ['apple', 'りんご', 'I eat an apple.', 'beginner', '2024-01-01'],
        ['banana', 'バナナ', 'Banana is yellow.', 'beginner', '2024-01-02'],
        ['cherry', 'さくらんぼ', 'Cherry is red.', 'intermediate', '2024-01-03']
      ]

      mockGet.mockResolvedValue({
        data: {
          values: mockData
        }
      })

      const result = await service.getWordsByLevel('beginner')
      
      expect(result).toHaveLength(2)
      expect(result[0].level).toBe('beginner')
      expect(result[1].level).toBe('beginner')
    })

    it('should return empty array when no words match the level', async () => {
      const mockData = [
        ['Word', 'Meaning', 'Example', 'Level', 'LastReviewed'],
        ['apple', 'りんご', 'I eat an apple.', 'beginner', '2024-01-01']
      ]

      mockGet.mockResolvedValue({
        data: {
          values: mockData
        }
      })

      const result = await service.getWordsByLevel('advanced')
      
      expect(result).toEqual([])
    })
  })

  describe('getWordById', () => {
    it('should return word when found by word name', async () => {
      const mockData = [
        ['Word', 'Meaning', 'Example', 'Level', 'LastReviewed'],
        ['apple', 'りんご', 'I eat an apple.', 'beginner', '2024-01-01'],
        ['banana', 'バナナ', 'Banana is yellow.', 'beginner', '2024-01-02']
      ]

      mockGet.mockResolvedValue({
        data: {
          values: mockData
        }
      })

      const result = await service.getWordById('apple')
      
      expect(result).toEqual({
        word: 'apple',
        meaning: 'りんご',
        example: 'I eat an apple.',
        level: 'beginner',
        lastReviewed: '2024-01-01'
      })
    })

    it('should return null when word is not found', async () => {
      const mockData = [
        ['Word', 'Meaning', 'Example', 'Level', 'LastReviewed'],
        ['apple', 'りんご', 'I eat an apple.', 'beginner', '2024-01-01']
      ]

      mockGet.mockResolvedValue({
        data: {
          values: mockData
        }
      })

      const result = await service.getWordById('orange')
      
      expect(result).toBeNull()
    })
  })
})

describe('createWordService factory function', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set up environment variables for Google Sheets authentication
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.com'
    process.env.GOOGLE_PRIVATE_KEY = 'test-private-key'
  })

  afterEach(() => {
    delete process.env.DATA_SOURCE
  })

  it('should create GoogleSheetsWordService by default', () => {
    const service = createWordService()
    expect(service).toBeInstanceOf(GoogleSheetsWordService)
  })

  it('should create GoogleSheetsWordService when DATA_SOURCE is google-sheets', () => {
    process.env.DATA_SOURCE = 'google-sheets'
    const service = createWordService()
    expect(service).toBeInstanceOf(GoogleSheetsWordService)
  })

  it('should create JsonWordService when DATA_SOURCE is json', async () => {
    process.env.DATA_SOURCE = 'json'
    const { JsonWordService } = await import('../../../app/services/implementations/jsonWordService')
    const service = createWordService()
    expect(service).toBeInstanceOf(JsonWordService)
  })

  it('should create DatabaseWordService when DATA_SOURCE is database', async () => {
    process.env.DATA_SOURCE = 'database'
    const { DatabaseWordService } = await import('../../../app/services/implementations/databaseWordService')
    const service = createWordService()
    expect(service).toBeInstanceOf(DatabaseWordService)
  })
})
