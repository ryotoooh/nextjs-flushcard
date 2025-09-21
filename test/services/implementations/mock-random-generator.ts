import { RandomGenerator } from '../../../app/services/random-generator';

/**
 * Mock random generator for testing
 * Returns predictable values for consistent test results
 */
export class MockRandomGenerator implements RandomGenerator {
  private values: number[] = [];
  private currentIndex = 0;

  constructor(values: number[] = []) {
    this.values = values;
  }

  /**
   * Set predefined values for testing
   * @param values Array of predefined random values
   */
  setValues(values: number[]): void {
    this.values = values;
    this.currentIndex = 0;
  }

  nextInt(min: number, max: number): number {
    const value = this.nextFloat();
    return Math.floor(value * (max - min)) + min;
  }

  nextFloat(): number {
    if (this.currentIndex >= this.values.length) {
      // If we run out of predefined values, cycle through them
      this.currentIndex = 0;
    }
    return this.values[this.currentIndex++];
  }
}
