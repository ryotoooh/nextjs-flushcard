import { ShuffleService } from '../shuffle-service';
import { RandomGenerator } from '../random-generator';

/**
 * Fisher-Yates shuffle implementation
 * Provides unbiased shuffling algorithm
 */
export class FisherYatesShuffleService<T> implements ShuffleService<T> {
  constructor(private randomGenerator: RandomGenerator) {}

  /**
   * Creates a new shuffled array without modifying the original
   * @param array Original array
   * @returns New shuffled array
   */
  shuffle(array: T[]): T[] {
    // Create a copy to avoid mutating the original array
    const shuffled = [...array];
    return this.shuffleInPlace(shuffled);
  }

  /**
   * Shuffles array in place using Fisher-Yates algorithm
   * @param array Array to shuffle
   * @returns Same array reference
   */
  shuffleInPlace(array: T[]): T[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random index between 0 and i (inclusive)
      const randomIndex = this.randomGenerator.nextInt(0, i + 1);
      
      // Swap elements
      const temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    
    return array;
  }
}
