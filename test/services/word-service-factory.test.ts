import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createWordService } from '../../app/services/word-service-factory'
import { GoogleSheetsWordService } from '../../app/services/implementations/google-sheets-word-service'

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
    const { JsonWordService } = await import('../../app/services/implementations/json-word-service')
    const service = createWordService()
    expect(service).toBeInstanceOf(JsonWordService)
  })

  it('should create DatabaseWordService when DATA_SOURCE is database', async () => {
    process.env.DATA_SOURCE = 'database'
    const { DatabaseWordService } = await import('../../app/services/implementations/database-word-service')
    const service = createWordService()
    expect(service).toBeInstanceOf(DatabaseWordService)
  })
})
