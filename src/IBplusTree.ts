import { IBplusInternalNode, Interval, FlatInterval } from './internal';

/**
 * Class implementation of a Interval B+-Tree.
 * This is the class the user will be importing and using, so it works as an user interface for the IB+-tree
 * 
 * Based on Article: https://pdfs.semanticscholar.org/1343/91e2537a8a9db15a1b5cce2ef66aa3352506.pdf
 * B+tree where each node is augmented with the same kind of information as in the binary Interval-trees.
 */
export class IBplusTree<T extends FlatInterval> {

    private root: IBplusInternalNode<T>;

    /**
     * IBplusTree Constructor.
     * Alpha is a parameter (0 < alpha < 1) which can be tuned to adjust space(hence update cost)/query_time tradeoff.
     * Higher values will lead to fewer splits and hence less storage expansion, but also to worse query efficiency.
     * Smaller values will lead to better query efficiency, but increase storage requirements and update costs (due to
     * reinsertion of split parts).
     * 
     * @param order The tree's maximum number of children per node.
     * @param alpha If alpha is inferior to 0 time splits are not used, and otherwise they are (see consideration regarding
     * alpha above).
     */
    constructor(order: number, private alpha: number = 0) {
        if (order < 2)
            throw new Error('IB+ tree must have order >= 2');
        if (alpha >= 1)
            throw new Error('Alpha can either be negative or a value belonging to ]0, 1[');

        this.root = new IBplusInternalNode<T>(order);
    }

    /**
     * Insert the given Interval in the tree
     * 
     * @param int The interval to be inserted
     */
    insert(int: T): void {
        this.root.insert(int, this.alpha);

        while (!this.root.isRoot())
            this.root = this.root.getParent();
    }

    /**
     * Delete the given Interval from the tree
     * 
     * @param int The Interval to be removed
     */
    delete(int: T): void {
        this.root.delete(int);

        if (this.root.isChildNewRoot())
            // It is forcibly of type IBPlusInternalNode
            this.root = <IBplusInternalNode<T>>this.root.getChildren()[0];
    }

    /**
     * Destroy all intervals stored in the tree that are fully
     * contained in the given bounds.
     * 
     * @param lowerBound The range query lower bound
     * @param upperBound The range query upper bound
     */
    rangeDelete(lowerBound: number, upperBound: number): void {
        this.root.rangeDelete(lowerBound, upperBound);

        while (this.root.isChildNewRoot())
            // It is forcibly of type IBPlusInternalNode
            this.root = <IBplusInternalNode<T>>this.root.getChildren()[0];
    }

    /**
     * Verify if the given interval exists in the tree.
     * 
     * @param interval the interval to be searched
     * @returns the object if exists, null otherwise.
     */
    exists(interval: T): boolean {
        return this.root.exists(interval);
    }

    /**
     * Get all intervals stored in the tree with equal bounds to the given ones.
     * 
     * @param lowerBound The interval query lower bound
     * @param upperBound The interval query upper bound
     * @returns Array of found intervals.
     */
    search(lowerBound: number, upperBound: number): Set<T> {
        return this.root.search(new FlatInterval(lowerBound, upperBound));
    }

    /**
     * Gets the Interval with the lowest bound that intersects the
     * given interval.
     * 
     * @param lowerBound The interval query lower bound
     * @param upperBound The interval query upper bound
     * @returns the FlatInterval that was found, null if none intersected.
     */
    loneRangeSearch(lowerBound: number, upperBound: number): T | null {
        return this.root.loneRangeSearch(new FlatInterval(lowerBound, upperBound));
    }

    /**
     * Find all intervals stored in the tree that intersect the given range.
     * 
     * @param lowerBound The range query lower bound
     * @param upperBound The range query upper bound
     * @returns  Set of intervals that intersect the range
     */
    allRangeSearch(lowerBound: number, upperBound: number): Set<T> {
        return this.root.allRangeSearch(new FlatInterval(lowerBound, upperBound));
    }

    /**
     * Find all intervals stored in the tree that are contained in the given range.
     * 
     * @param lowerBound The range query lower bound
     * @param upperBound The range query upper bound
     * @returns  Set of intervals that are contained in the range
     */
    containedRangeSearch(lowerBound: number, upperBound: number): Set<T> {
        return this.root.containedRangeSearch(new FlatInterval(lowerBound, upperBound));
    }

    /**
     * Represents the current tree as a string.
     * Useful for printing purposes.
     * 
     * @returns the root as a string
     */
    asString(): string {
        return this.root.asString();
    }
}