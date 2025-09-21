import { RandomGenerator } from '../random-generator';

/**
 * Math.random() based random generator implementation
 * Used in production environment
 */
export class MathRandomGenerator implements RandomGenerator {
  nextInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  nextFloat(): number {
    return Math.random();
  }
}
