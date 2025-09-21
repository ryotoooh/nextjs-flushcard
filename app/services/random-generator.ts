// Random generator interface for dependency inversion
export interface RandomGenerator {
  /**
   * Generates a random integer between min (inclusive) and max (exclusive)
   * @param min Minimum value (inclusive)
   * @param max Maximum value (exclusive)
   * @returns Random integer
   */
  nextInt(min: number, max: number): number;
  
  /**
   * Generates a random float between 0 (inclusive) and 1 (exclusive)
   * @returns Random float
   */
  nextFloat(): number;
}
