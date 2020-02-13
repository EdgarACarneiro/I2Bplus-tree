import {
    IBplusNode,
    IBplusInternalNode,
    Interval,
    CompoundInterval,
    FlatInterval
} from './internal';

export class IBplusLeafNode<T extends FlatInterval> extends IBplusNode<T> {

    /**
     * Sibling Leaf Node that substituted this node, upon the
     * occurrence of a removal that triggered a merge.
     */
    private substSibling: IBplusLeafNode<T> = null;

    constructor(order: number = 4,
        parent: IBplusInternalNode<T> = null,
        keys: Array<number> = [],
        maximums: Array<number> = [],
        private children: Array<Interval<T>> = []) {
        super(order, parent, keys, maximums);
    }

    getChildren(): Array<Interval<T>> {
        return this.children;
    }

    /**
     * Recursively get the node currently replacing this node.
     * 
     * @returns the substitution sibling if exists, null otherwise
     */
    getSubstituteSibling(): IBplusLeafNode<T> {
        return this.substSibling;
    }

    exists(int: T): boolean {
        for (const child of this.children)
            if (child.getOriginalInterval().equals(int))
                return true;

        return false;
    }

    search(int: FlatInterval): Set<T> {
        const intervals: Set<T> = new Set();

        for (const child of this.children) {
            const originInt: T = child.getOriginalInterval();

            if (originInt.equals(int))
                intervals.add(originInt);
        }

        return intervals;
    }

    loneRangeSearch(int: FlatInterval): T | null {
        for (const child of this.children)
            if (child.intersect(int))
                return child.getOriginalInterval();

        return null;
    }

    allRangeSearch(int: FlatInterval) {
        const intervals: Set<T> = new Set();

        for (const child of this.children)
            if (child.intersect(int))
                intervals.add(child.getOriginalInterval());

        return intervals;
    }

    containedRangeSearch(int: FlatInterval) {
        const intervals: Set<T> = new Set();

        for (const child of this.children)
            if (int.contains(child))
                intervals.add(child.getOriginalInterval());

        return intervals;
    }

    findInsertNode(int: Interval<T>): IBplusLeafNode<T> {
        return this;
    }

    /**
     * Add the given interval to this leaf data structures.
     * 
     * @param int The interval to be added
     */
    addInterval(int: Interval<T>): void {
        let i: number = 0;
        for (; i < this.keys.length; ++i)
            if (int.getLowerBound() < this.keys[i])
                break;

        this.keys.splice(i, 0, int.getLowerBound());
        this.maximums.splice(i, 0, int.getUpperBound());
        this.children.splice(i, 0, int);
    }

    split(int: Interval<T>): IBplusLeafNode<T> {
        //Need special care on binary trees
        let divIdx: number = Math.ceil(this.order / 2);
        let sibSize: number = this.order - divIdx;

        // Divide keys, maximums and children by this node and its sibling
        let sibling: IBplusLeafNode<T> = new IBplusLeafNode<T>(
            this.order,
            this.parent,
            this.keys.splice(divIdx, sibSize),
            this.maximums.splice(divIdx, sibSize),
            this.children.splice(divIdx, sibSize)
        );
        let rs: IBplusNode<T> = this.getRightSibling();
        if (rs != null) rs.setLeftSibling(sibling);
        sibling.setRightSibling(rs);

        sibling.setLeftSibling(this);
        this.setRightSibling(sibling);

        this.parent.updateWithNewNode(this, sibling);

        // Inserting the interval in the respective node
        const insertionLeaf: IBplusLeafNode<T>
            = sibling.keys[0] < int.getLowerBound() ? sibling : this;

        insertionLeaf.addInterval(int);
        return insertionLeaf;
    }

    findInterval(int: Interval<T>): [IBplusLeafNode<T>, number] | null {
        for (let i: number = 0; i < this.keys.length; ++i)
            if (this.children[i].equals(int))
                return [this, i];
        return null;
    }

    findIntervalsInRange(int: Interval<T> | FlatInterval): Array<[IBplusLeafNode<T>, Interval<T>]> {
        let res: Array<[IBplusLeafNode<T>, Interval<T>]> = [];

        for (let child of this.children)
            if (int.contains(child))
                res.push([this, child]);

        return res;
    }

    protected setChildParentOnBorrow(newChild: Interval<T>, insertId: number): void {
        // Child is Interval, it does not store parent information
        this.children.splice(insertId, 0, newChild);
    }

    protected setChildrenParentOnMerge(newParent: IBplusNode<T>): void {
        // Children are Intervals, they do not store parent information
    }

    protected setSubstitutionNode(sibling: IBplusNode<T>): void {
        // Sibling on merge is forcefully a IBplusLeafNode
        this.substSibling = <IBplusLeafNode<T>>sibling;
    }

    isChildNewRoot(): boolean {
        return false; // A Leaf can never be a root
    }

    /**
     * Time split intervals into smaller nodes in order to have better querying performance.
     * 
     * @param rootNode the node were the insertions will happen
     * @param alpha parameter to adjust space/ query_time tradeoff.
     * See more regarding alpha in IBplusTree's constructor's documentation.
     */
    timeSplit(rootNode: IBplusNode<T>, alpha: number): void {
        if (this.isUnderflow())
            return;

        // Array containing the Intervals that will need to be inserted in the end (time split intervals)
        let newInsertions: Array<Interval<T>> = [];

        if (this.getRightSibling() != null) {
            let splitIdx: number = this.pickSplitPoint(alpha);

            if (this.maximums[splitIdx] == this.getMax())
                return;
            else
                for (let i: number = 0; i < this.keys.length; ++i) {
                    if (this.maximums[i] > this.maximums[splitIdx]) {

                        // Creating new Interval
                        newInsertions.push(
                            new CompoundInterval(this.maximums[splitIdx] + 1, this.maximums[i], this.children[i])
                        );

                        //Updating the split Interval
                        this.children[i] = new CompoundInterval(
                            this.children[i].getLowerBound(), this.maximums[splitIdx], this.children[i]
                        );

                        this.maximums[i] = this.maximums[splitIdx];
                    }
                }
        }

        // Inserting the generated intervals and saving them to the resultant array
        for (let interval of newInsertions)
            rootNode.insert(interval, alpha);
    }

    /**
     * Algorithm which takes a leaf node as input and returns the index to the
     * interval whose end point is the best split point (with the minimum cost).
     * 
     * @param alpha parameter to adjust space/ query_time tradeoff.
     * See more regarding alpha in IbplusTree's constructor's documentation.
     */
    pickSplitPoint(alpha: number): number {
        let maxbegin: number = Math.max(...this.keys);
        let endlist: Array<number> = this.maximums.map(el => el < maxbegin ? maxbegin : el);

        let cutcost: Array<number> = [];
        for (let i: number = 0; i < endlist.length; ++i)
            cutcost.push(endlist.map(el => Math.abs(endlist[i] - el)).reduce((acc, val) => acc + val)); // Doing it like this since formula ain't working
        // cutcost.push(cutcost[i - 1] + (2 * i - endlist.length) * (endlist[i] - endlist[i - 1]));

        let mincost: number = Math.min(...cutcost);
        let numsplit: Array<number> = [];
        for (let endval of endlist)
            numsplit.push(this.maximums.map(el => el > endval ? 1 : 0).reduce((acc, val) => acc + val, 0));

        let finalCost: Array<number> = cutcost.map((el, idx) => el + mincost * alpha * numsplit[idx]);

        let finalCostIdx: number = Math.min(...finalCost.filter((_, idx) => this.maximums[idx] > maxbegin));
        return finalCost.indexOf(finalCostIdx);
    }

    asString(acc: string = "", depth: number = 0): string {
        // Adding tabs according to depth
        let tabs: string = "";
        for (let i: number = 0; i < depth; ++i)
            tabs += '\t';

        for (let interval of this.children)
            acc += `${tabs}- [${interval.getLowerBound()}, ${interval.getUpperBound()}]\n`;

        return acc;
    }
}