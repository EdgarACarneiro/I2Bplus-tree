import { IBplusInternalNode, Interval } from './internal';
import { FlatInterval } from './FlatInterval';

/**
 * Class implementation of a Interval B+-Tree.
 * This is the class the user will be importing and using, so it works as an user interface for the IB+-tree
 * 
 * Based on Article: https://pdfs.semanticscholar.org/1343/91e2537a8a9db15a1b5cce2ef66aa3352506.pdf
 * B+tree where each node is augmented with the same kind of information as in the binary Interval-trees.
 */
export class IBplusTree {

    private root: IBplusInternalNode;

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

        this.root = new IBplusInternalNode(order);
    }

    insert(int: Interval): void {
        this.root.insert(int, this.alpha);

        while (!this.root.isRoot())
            this.root = this.root.getParent();
    }

    delete(int: Interval): void {
        this.root.delete(int);

        if (this.root.isChildNewRoot())
            // It is forcibly of type IBPlusInternalNode
            this.root = <IBplusInternalNode>this.root.getChildren()[0];
    }

    rangeDelete(lowerBound: number, upperBound: number): void {
        this.root.rangeDelete(lowerBound, upperBound);

        while (this.root.isChildNewRoot())
            // It is forcibly of type IBPlusInternalNode
            this.root = <IBplusInternalNode>this.root.getChildren()[0];
    }

    loneRangeSearch(int: Interval): FlatInterval | null {
        return this.root.loneRangeSearch(int);
    }

    allRangeSearch(int: Interval): Set<FlatInterval> {
        return this.root.allRangeSearch(int);
    }
}