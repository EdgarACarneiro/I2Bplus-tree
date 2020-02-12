import { IBplusNode, IBplusLeafNode, Interval, FlatInterval } from './internal';

export class IBplusInternalNode<T extends FlatInterval> extends IBplusNode<T> {

    constructor(order: number = 4,
        parent: IBplusInternalNode<T> = null,
        keys: Array<number> = [],
        maximums: Array<number> = [],
        private children: Array<IBplusNode<T>> = []) {
        super(order, parent, keys, maximums);

        for (const child of this.children)
            child.setParent(this);
    }

    getChildren(): Array<IBplusNode<T>> {
        return this.children;
    }

    setChildren(children: Array<IBplusNode<T>>): void {
        this.children = children;
    }

    /**
     * Updates the current node structures, when a new maximum appears in a child node.
     * 
     * @param node the child
     */
    updateMax(node: IBplusNode<T>): void {
        let newMax: number = node.getMax();
        let prevMax: number = this.getMax();

        this.maximums[this.children.indexOf(node)] = newMax;

        if (newMax > prevMax && !this.isRoot())
            this.parent.updateMax(this);
    }

    /**
     * Updates the current node structures, when a new minimum key appears in a child node.
     * 
     * @param node the child
     */
    updateMin(node: IBplusNode<T>): void {
        let newMin: number = node.getMinKey();
        let prevMin: number = this.getMinKey();

        this.keys[this.children.indexOf(node)] = newMin;

        if (newMin < prevMin && !this.isRoot())
            this.parent.updateMin(this);
    }

    exists(int: T): boolean {
        for (let i: number = 0; i < this.keys.length; ++i)
            if ((new FlatInterval(this.keys[i], this.maximums[i])).contains(int))
                if (this.children[i].exists(int))
                    return true;

        return false;
    }

    search(int: FlatInterval): Set<T> {
        const intervals: Set<T> = new Set();

        for (let i = 0; i < this.keys.length; ++i)
            if (Interval.containsWithValues(
                [this.keys[i], this.maximums[i]], [int.getLowerBound(), int.getUpperBound()])) {
                const iterator = this.children[i].search(int).values();

                for (let next = iterator.next(); next.done !== true; next = iterator.next())
                    intervals.add(next.value);
            }

        return intervals;
    }

    loneRangeSearch(int: FlatInterval) {
        for (let i: number = 0; i < this.keys.length; ++i)
            if (Interval.intersectsWithValues(
                [int.getLowerBound(), int.getUpperBound()], [this.keys[i], this.maximums[i]]))
                return this.children[i].loneRangeSearch(int)

        return null;
    }

    allRangeSearch(int: FlatInterval) {
        const intervals: Set<T> = new Set();

        for (let i = 0; i < this.keys.length; ++i)
            if (Interval.intersectsWithValues(
                [int.getLowerBound(), int.getUpperBound()], [this.keys[i], this.maximums[i]])) {
                const iterator = this.children[i].allRangeSearch(int).values();

                for (let next = iterator.next(); next.done !== true; next = iterator.next())
                    intervals.add(next.value);
            }

        return intervals;
    }

    containedRangeSearch(int: FlatInterval) {
        const intervals: Set<T> = new Set();

        for (let i = 0; i < this.keys.length; ++i)
            if (Interval.intersectsWithValues(
                [int.getLowerBound(), int.getUpperBound()], [this.keys[i], this.maximums[i]])) {
                const iterator = this.children[i].containedRangeSearch(int).values();

                for (let next = iterator.next(); next.done !== true; next = iterator.next())
                    intervals.add(next.value);
            }

        return intervals;
    }

    findInsertNode(int: Interval<T>): IBplusLeafNode<T> | null {
        if (this.children.length == 0)
            return null;

        for (let i = 0; i < this.keys.length; ++i)
            if (int.getLowerBound() < this.keys[i])
                return this.children[i > 0 ? i - 1 : i].findInsertNode(int);

        return this.children[this.keys.length - 1].findInsertNode(int); // The biggest
    }

    /**
     * When a split ocurred in a child of this node, the node structures must be updated.
     * Updates maximum and key of previous node and adds the newly created node to this node children.
     * 
     * @param original The node that was split
     * @param newNode The node that was created
     */
    updateWithNewNode(original: IBplusNode<T>, newNode: IBplusNode<T>): void {
        let originalIdx: number = this.children.indexOf(original);
        this.maximums[originalIdx] = original.getMax();

        this.children.splice(originalIdx + 1, 0, newNode);
        this.keys.splice(originalIdx + 1, 0, newNode.getMinKey());
        this.maximums.splice(originalIdx + 1, 0, newNode.getMax());

        // Might be momentarily violating B+-trees order invariant
        if (this.keys.length > this.order)
            this.split();
    }

    split(): IBplusLeafNode<T> {
        // If this is root, create a new root
        if (this.parent == null)
            this.parent = new IBplusInternalNode(
                this.order,
                null,
                [this.getMinKey()],
                [this.getMax()],
                [this]
            );

        let divIdx: number = Math.ceil(this.keys.length / 2)
        let sibSize: number = this.order + 1 - divIdx; //Need +1 because of the invariant violation

        // Divide keys, maximums and children by this node and its sibling
        let sibling: IBplusInternalNode<T> = new IBplusInternalNode<T>(
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

        // When called in IBplusInternalNode, the split method is not handling direct insertions
        // hence, its return value is irrelevant
        return null;
    }

    findInterval(int: Interval<T>): [IBplusLeafNode<T>, number] | null {
        let res: [IBplusLeafNode<T>, number] = null;

        for (let i = 0; i < this.keys.length && res == null; ++i)
            if (Interval.containsWithValues(
                [this.keys[i], this.maximums[i]], [int.getLowerBound(), int.getUpperBound()]))
                res = this.children[i].findInterval(int);

        return res;
    }

    findIntervalsInRange(int: Interval<T> | FlatInterval): Array<[IBplusLeafNode<T>, Interval<T>]> {
        let res: Array<[IBplusLeafNode<T>, Interval<T>]> = [];

        for (let i = 0; i < this.keys.length; ++i)
            if (Interval.intersectsWithValues(
                [this.keys[i], this.maximums[i]], [int.getLowerBound(), int.getUpperBound()]))
                res.push(...this.children[i].findIntervalsInRange(int));

        return res;
    }

    /**
     * Deletes a given interval if it exists in one of the tree's (that have this node as root) leafs.
     * The tree self-balances on deletion.
     * 
     * @param int The interval to be deleted
     */
    delete(int: Interval<T>): void {
        let found: [IBplusLeafNode<T>, number] = this.findInterval(int);

        if (found != null)
            found[0].removeChild(found[1]);
    }

    /**
     * Deletes all the interval contained in a given range.
     * The tree self-balances on deletion.
     * 
     * @param lowerBound the range's lower bound
     * @param upperBound the range's upper bound
     */
    rangeDelete(lowerBound: number, upperBound: number): void {
        let foundInts: Array<[IBplusLeafNode<T>, Interval<T>]> =
            this.findIntervalsInRange(
                new FlatInterval(lowerBound, upperBound)
            );


        for (let [leaf, int] of foundInts) {
            // Recursively get the leaf currently substituting this leaf
            let sibling: IBplusLeafNode<T> = leaf.getSubstituteSibling();
            while (sibling) {
                leaf = sibling;
                sibling = sibling.getSubstituteSibling();
            }

            let childIdx: number = leaf.getChildren().indexOf(int);
            if (childIdx < 0)
                // Previous removals triggered borrows that moved the child
                if (leaf.getLeftSibling() && int.getLowerBound() <= leaf.getMinKey())
                    // Sent to left sibling leaf
                    leaf = <IBplusLeafNode<T>>leaf.getLeftSibling();
                else if (leaf.getRightSibling() && int.getLowerBound() > leaf.getMinKey())
                    // Sent to right sibling leaf
                    leaf = <IBplusLeafNode<T>>leaf.getRightSibling();
                else
                    throw Error('Unable to find child in range remove.');

            leaf.removeChild(leaf.getChildren().indexOf(int));
        }
    }

    protected setChildParentOnBorrow(newChild: IBplusNode<T>, insertId: number): void {
        this.children.splice(insertId, 0, newChild);
        newChild.setParent(this);
    }

    protected setChildrenParentOnMerge(newParent: IBplusInternalNode<T>): void {
        for (const child of this.children)
            child.setParent(newParent);
    }

    protected setSubstitutionNode(node: IBplusNode<T>): void {
        // No interest in saving substitution node in Internal Nodes
    }

    isChildNewRoot(): boolean {
        if (!this.isRoot() || this.children.length > 1)
            return false;

        return this.children[0] instanceof IBplusInternalNode &&
            this.children[0].getLeftSibling() == null &&
            this.children[0].getRightSibling() == null;
    }


    asString(acc: string = "", depth: number = 0): string {
        // Adding tabs according to depth
        let tabs: string = "";
        for (let i: number = 0; i < depth; ++i)
            tabs += '\t';

        acc += `${tabs}- Keys |`;
        for (let key of this.keys)
            acc += `${key}|`;

        acc += `\n${tabs}  Maxs |`;
        for (let max of this.maximums)
            acc += `${max}|`;
        acc += "\n";

        for (let child of this.children)
            acc = child.asString(acc, depth + 1);

        return acc;
    }
}