import { FlatInterval } from './FlatInterval';

/**
 * Class to implement a numeric interval [a, b].
 * Using an abstract class to implement the Composite design pattern.
 */
export abstract class Interval<T extends FlatInterval> {

    /**
     * This interval's lower bound
     */
    protected lowerBound: number;

    /**
     * This interval's lower bound
     */
    protected upperBound: number;

    /**
     * Interval constructor.
     * Receives the two limits used to create an Interval, no matter the order given.
     * 
     * @param val1 One of the interval's limit
     * @param val2 The other interval's limit
     */
    constructor(val1: number, val2: number) {
        if (val1 <= val2) {
            this.lowerBound = val1;
            this.upperBound = val2;
        } else {
            this.upperBound = val1;
            this.lowerBound = val2;
        }
    }


    /**
     * Verify if the first interval contains the second one.
     * 
     * @param param0 The first interval
     * @param param1 The second interval
     * @returns true if it contains, false otherwise.
     */
    static containsWithValues([lb1, ub1]: [number, number], [lb2, ub2]: [number, number]): boolean {
        return ub1 >= ub2 && lb1 <= lb2;
    }

    /**
     * Verify if the first interval intersetcs the second one.
     * 
     * @param param0 The first interval
     * @param param1 The second interval
     * @returns true if it intersects, false otherwise.
     */
    static intersectsWithValues([lb1, ub1]: [number, number], [lb2, ub2]: [number, number]): boolean {
        return !(lb2 > ub1 || ub2 < lb1);
    }

    /**
     * Get this node's lower bound
     * 
     * @returns the lower bound
     */
    getLowerBound(): number {
        return this.lowerBound;
    }

    /**
     * Get this node's upper bound
     * 
     * @returns the upper bound
     */
    getUpperBound(): number {
        return this.upperBound;
    }

    /**
     * If this interval is bigger than the one given return positive,
     * if inferior negative and equal return zero.
     * 
     * @param int The interval to compare with
     * @returns positive if this interval is bigger, 0 upon equality
     * and negative if inferior.
     */
    sort(int: Interval<T>): number {
        return this.upperBound - int.getLowerBound()
    }

    /**
     * Checks if two interval intersect each other.
     * Necessary the '| FlatInterval'  because of some supposed problem with ts.
     * For more info check the issue: https://github.com/Microsoft/TypeScript/issues/28154
     * 
     * @param int The interval to check intersection
     * @returns true upon intersection, false otherwise
     */
    intersect(int: Interval<T> | FlatInterval): boolean {
        return Interval.intersectsWithValues(
            [this.lowerBound, this.upperBound],
            [int.getLowerBound(), int.getUpperBound()])
    }

    /**
     * Verify if this Interval contains the given interval.
     * Necessary the '| FlatInterval'  because of some supposed problem with ts.
     * For more info check the issue: https://github.com/Microsoft/TypeScript/issues/28154
     * 
     * @param int the interval that might be contained
     * @returns true if this interval contains the given interval, false otherwise.
     */
    contains(int: Interval<T> | FlatInterval): boolean {
        return Interval.containsWithValues(
            [this.lowerBound, this.upperBound],
            [int.getLowerBound(), int.getUpperBound()])
    }

    /**
     * Compares two intervals and checks if they are equal.
     * 
     * @param int the interval to compare with
     * @returns true upon equality, false otherwise
     */
    abstract equals(int: Interval<T>): boolean;

    /**
     * Get the original Interval, in case splits happened.
     * 
     * @return the original interval.
     */
    abstract getOriginalInterval(): T;
}