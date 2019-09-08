import { Interval, FlatInterval } from './internal'

/**
 * Interval that stores other Intervals.
 * Used to store the original Intervals when data splits occur.
 */
export class CompoundInterval<T extends FlatInterval> extends Interval<T> {

    private originalInterval: Interval<T>;

    constructor(val1: number, val2: number, originalInterval: Interval<T>) {
        super(val1, val2);
        this.originalInterval = originalInterval;
    }

    equals(int: Interval<T>): boolean {
        return this.upperBound == int.getUpperBound() &&
            this.lowerBound == int.getLowerBound();
    }

    getOriginalInterval(): T {
        return this.originalInterval.getOriginalInterval();
    }

}