import { Interval } from './Interval';

/**
 * Interval that stores data instead of other Intervals
 */
export class FlatInterval extends Interval<FlatInterval> {

    equals<T extends FlatInterval>(int: Interval<T>): boolean {
        return this.upperBound == int.getUpperBound() &&
            this.lowerBound == int.getLowerBound();
    }

    getOriginalInterval(): this {
        return this;
    }

}