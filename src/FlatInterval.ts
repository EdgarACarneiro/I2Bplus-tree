import { Interval } from "./Interval";

/**
 * Interval that stores data instead of other Intervals
 */
export class FlatInterval extends Interval {

    /**
     * Data stored by this Interval.
     */
    private data: any; //TODO: The data valid in an Interval is stored here. Need to specify type

    /**
     * Get the data stored by this Interval
     */
    getData(): any {
        return this.data;
    }

    /**
     * Set the data stored by this Interval
     * 
     * @param data new data value
     */
    setData(data: any) {
        this.data = data;
    }

    equals(int: Interval): boolean {
        return this.upperBound == int.getUpperBound() &&
            this.lowerBound == int.getLowerBound() &&
            this.data == int.getData();
    }

    getOriginalInterval(): FlatInterval {
        return this;
    }

}