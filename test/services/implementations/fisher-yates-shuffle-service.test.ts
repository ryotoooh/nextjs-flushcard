import { describe, it, expect, beforeEach } from 'vitest';
import { FisherYatesShuffleService } from '../../../app/services/implementations/fisher-yates-shuffle-service';
import { MockRandomGenerator } from './mock-random-generator';

describe('FisherYatesShuffleService', () => {
  let mockRandomGenerator: MockRandomGenerator;
  let shuffleService: FisherYatesShuffleService<number>;

  beforeEach(() => {
    mockRandomGenerator = new MockRandomGenerator();
    shuffleService = new FisherYatesShuffleService(mockRandomGenerator);
  });

  describe('shuffle', () => {
    it('should return a new array without modifying the original', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const shuffled = shuffleService.shuffle(originalArray);
      
      expect(shuffled).not.toBe(originalArray);
      expect(originalArray).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an array with the same elements', () => {
      // Set some random values to avoid undefined issues
      mockRandomGenerator.setValues([0.1, 0.3, 0.7, 0.2, 0.5]);
      
      const originalArray = [1, 2, 3, 4, 5];
      const shuffled = shuffleService.shuffle(originalArray);
      
      expect(shuffled).toHaveLength(originalArray.length);
      expect(shuffled.sort()).toEqual(originalArray.sort());
    });

    it('should produce predictable results with mock random generator', () => {
      // Set predictable random values for Fisher-Yates algorithm
      // For array [1, 2, 3, 4], Fisher-Yates works backwards:
      // i=3: randomIndex = floor(0.1 * 4) = 0, swap [1,2,3,4] -> [4,2,3,1]
      // i=2: randomIndex = floor(0.3 * 3) = 0, swap [4,2,3,1] -> [3,2,4,1]  
      // i=1: randomIndex = floor(0.7 * 2) = 1, swap [3,2,4,1] -> [3,2,4,1] (no change)
      mockRandomGenerator.setValues([0.1, 0.3, 0.7]);
      
      const originalArray = [1, 2, 3, 4];
      const shuffled = shuffleService.shuffle(originalArray);
      
      // With these specific random values, we can predict the result
      expect(shuffled).toEqual([3, 2, 4, 1]);
    });

    it('should handle empty array', () => {
      const originalArray: number[] = [];
      const shuffled = shuffleService.shuffle(originalArray);
      
      expect(shuffled).toEqual([]);
    });

    it('should handle single element array', () => {
      const originalArray = [42];
      const shuffled = shuffleService.shuffle(originalArray);
      
      expect(shuffled).toEqual([42]);
    });
  });

  describe('shuffleInPlace', () => {
    it('should modify the original array', () => {
      const array = [1, 2, 3, 4, 5];
      const result = shuffleService.shuffleInPlace(array);
      
      expect(result).toBe(array);
    });

    it('should preserve all elements', () => {
      // Set some random values to avoid undefined issues
      mockRandomGenerator.setValues([0.1, 0.3, 0.7, 0.2, 0.5]);
      
      const array = [1, 2, 3, 4, 5];
      const originalLength = array.length;
      shuffleService.shuffleInPlace(array);
      
      expect(array).toHaveLength(originalLength);
      expect(array.sort()).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
