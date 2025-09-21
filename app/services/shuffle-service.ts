/**
 * Shuffle service interface for dependency inversion
 * Defines contract for shuffling operations
 */
export interface ShuffleService<T> {
  /**
   * Shuffles an array using Fisher-Yates algorithm
   * @param array Array to shuffle
   * @returns New shuffled array (original array is not modified)
   */
  shuffle(array: T[]): T[];
  
  /**
   * Shuffles an array in place using Fisher-Yates algorithm
   * @param array Array to shuffle (will be modified)
   * @returns The same array reference (for chaining)
   */
  shuffleInPlace(array: T[]): T[];
}
