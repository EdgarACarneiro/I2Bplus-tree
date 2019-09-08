import { IBplusTree, IBplusInternalNode, FlatInterval } from '../src/internal';
import { expect } from 'chai';
import 'mocha';

describe('Removals', () => {

    it('Simple Delete (without borrowing or merging)', () => {
        let root: IBplusInternalNode<FlatInterval> =
            new IBplusInternalNode<FlatInterval>(4, null);
        root.insert(new FlatInterval(4, 22), 0);
        root.insert(new FlatInterval(6, 11), 0);
        root.insert(new FlatInterval(10, 13), 0);
        root.insert(new FlatInterval(14, 17), 0);
        root.insert(new FlatInterval(20, 32), 0);
        root.insert(new FlatInterval(26, 41), 0);
        root.insert(new FlatInterval(2, 3), 0);
        root.insert(new FlatInterval(3, 13), 0);
        root.insert(new FlatInterval(26, 31), 0);
        root.insert(new FlatInterval(15, 30), 0);
        root.insert(new FlatInterval(22, 24), 0);
        root.insert(new FlatInterval(23, 24), 0);
        root.insert(new FlatInterval(19, 41), 0);

        let [child0] = root.getChildren();

        expect(child0.getMax()).to.equal(22);
        expect(child0.getMinKey()).to.equal(2);
        expect(child0.getChildren().length).to.equal(4);

        root.delete(new FlatInterval(2, 3));
        root.delete(new FlatInterval(4, 22));

        expect(child0.getMax()).to.equal(13);
        expect(child0.getMinKey()).to.equal(3);
        expect(child0.getChildren().length).to.equal(2);
    });

    it('Delete with Borrowing', () => {
        let root: IBplusInternalNode<FlatInterval> =
            new IBplusInternalNode<FlatInterval>(4, null);
        root.insert(new FlatInterval(4, 22), 0);
        root.insert(new FlatInterval(6, 11), 0);
        root.insert(new FlatInterval(10, 13), 0);
        root.insert(new FlatInterval(14, 17), 0);
        root.insert(new FlatInterval(20, 32), 0);
        root.insert(new FlatInterval(26, 41), 0);
        root.insert(new FlatInterval(2, 3), 0);
        root.insert(new FlatInterval(3, 13), 0);
        root.insert(new FlatInterval(26, 31), 0);
        root.insert(new FlatInterval(15, 30), 0);
        root.insert(new FlatInterval(22, 24), 0);
        root.insert(new FlatInterval(23, 24), 0);
        root.insert(new FlatInterval(19, 41), 0);

        let [child0, child1, child2, child3] = root.getChildren();

        //Left borrowing
        expect(child3.getMax()).to.equal(41);
        expect(child3.getMinKey()).to.equal(26);
        expect(child3.getChildren().length).to.equal(2);
        expect(child2.getChildren().length).to.equal(3);
        let borrowed = child2.getChildren()[2];

        root.delete(new FlatInterval(26, 41));

        expect(child3.getMax()).to.equal(31);
        expect(child3.getMinKey()).to.equal(23);
        expect(child3.getChildren().length).to.equal(2);
        expect(child2.getChildren().length).to.equal(2);
        expect(child3.getChildren()[0]).to.equal(borrowed);

        //Right Borrowing
        expect(child0.getMax()).to.equal(22);
        expect(child0.getMinKey()).to.equal(2);
        expect(child0.getChildren().length).to.equal(4);
        expect(child1.getChildren().length).to.equal(4);
        borrowed = child1.getChildren()[0];

        root.delete(new FlatInterval(2, 3));
        root.delete(new FlatInterval(4, 22));
        root.delete(new FlatInterval(6, 11));

        expect(child0.getMax()).to.equal(13);
        expect(child0.getMinKey()).to.equal(3);
        expect(child0.getChildren().length).to.equal(2);
        expect(child1.getChildren().length).to.equal(3);
        expect(child0.getChildren()[1]).to.equal(borrowed);
    });

    it('Delete with Merging', () => {
        let root: IBplusInternalNode<FlatInterval> =
            new IBplusInternalNode<FlatInterval>(4, null);
        root.insert(new FlatInterval(4, 22), 0);
        root.insert(new FlatInterval(6, 11), 0);
        root.insert(new FlatInterval(10, 13), 0);

        root.insert(new FlatInterval(14, 17), 0);
        root.insert(new FlatInterval(20, 32), 0);
        root.insert(new FlatInterval(26, 41), 0);

        root.insert(new FlatInterval(2, 3), 0);
        root.insert(new FlatInterval(3, 13), 0);
        root.insert(new FlatInterval(26, 31), 0);
        root.insert(new FlatInterval(15, 30), 0);
        root.insert(new FlatInterval(22, 24), 0);
        root.insert(new FlatInterval(23, 24), 0);
        root.insert(new FlatInterval(19, 41), 0);

        expect(root.getChildren().length).to.equal(4);
        let [child0, child1, child2, child3] = root.getChildren();

        expect(child3.getMax()).to.equal(41);
        expect(child3.getMinKey()).to.equal(26);
        expect(child3.getChildren().length).to.equal(2);
        expect(child2.getMax()).to.equal(32);
        expect(child2.getMinKey()).to.equal(20);
        expect(child2.getChildren().length).to.equal(3);

        // Had to borrow one
        root.delete(new FlatInterval(26, 41));

        expect(child3.getMax()).to.equal(31);
        expect(child3.getMinKey()).to.equal(23);
        expect(child3.getChildren().length).to.equal(2);
        expect(child2.getMax()).to.equal(32);
        expect(child2.getMinKey()).to.equal(20);
        expect(child2.getChildren().length).to.equal(2);

        // Merge ocurring
        root.delete(new FlatInterval(23, 24));

        expect(root.getChildren().length).to.equal(3);
        expect(child2.getMax()).to.equal(32);
        expect(child2.getMinKey()).to.equal(20);
        expect(child2.getChildren().length).to.equal(3);
    });

    it('Simple range deletion', () => {
        // With Order 4
        let tree: IBplusTree<FlatInterval> = new IBplusTree<FlatInterval>(4, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13)); // del
        tree.insert(new FlatInterval(14, 17)); // del
        tree.insert(new FlatInterval(20, 32));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(3, 13));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30)); // del
        tree.insert(new FlatInterval(22, 24)); // del
        tree.insert(new FlatInterval(23, 24)); // del
        tree.insert(new FlatInterval(19, 41));

        expect(tree.allRangeSearch(10, 30).size).to.equal(12);
        expect(tree.allRangeSearch(0, 100).size).to.equal(13);

        tree.rangeDelete(10, 30);
        expect(tree.allRangeSearch(10, 30).size).to.equal(7);
        expect(tree.allRangeSearch(0, 100).size).to.equal(8);
        for (let interval of Array.from(tree.allRangeSearch(0, 100)))
            expect(interval.getUpperBound() > 30 || interval.getLowerBound() < 10).to.be.true;

        // With binary making sure there are several levels in the tree
        tree = new IBplusTree(2, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13));
        tree.insert(new FlatInterval(14, 17));
        tree.insert(new FlatInterval(20, 32));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(3, 13));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));
        tree.insert(new FlatInterval(22, 24));
        tree.insert(new FlatInterval(23, 24));
        tree.insert(new FlatInterval(19, 41));

        expect(tree.allRangeSearch(10, 30).size).to.equal(12);
        expect(tree.allRangeSearch(0, 100).size).to.equal(13);

        tree.rangeDelete(10, 30);
        expect(tree.allRangeSearch(10, 30).size).to.equal(7);
        expect(tree.allRangeSearch(0, 100).size).to.equal(8);
        for (let interval of Array.from(tree.allRangeSearch(0, 100)))
            expect(interval.getUpperBound() > 30 || interval.getLowerBound() < 10).to.be.true;
    });

    it('Range deletion with merges and borrows between successive deletions', () => {
        // With Order 4
        let tree: IBplusTree<FlatInterval> = new IBplusTree<FlatInterval>(4, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13));
        tree.insert(new FlatInterval(14, 17));
        tree.insert(new FlatInterval(20, 32));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(3, 13));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));
        tree.insert(new FlatInterval(22, 24));
        tree.insert(new FlatInterval(23, 24));
        tree.insert(new FlatInterval(19, 41));

        expect(tree.allRangeSearch(0, 100).size).to.equal(13);
        tree.rangeDelete(0, 100);
        expect(tree.allRangeSearch(0, 100).size).to.equal(0);

        // With binary making sure there are several levels in the tree
        tree = new IBplusTree<FlatInterval>(2, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13));
        tree.insert(new FlatInterval(14, 17));
        tree.insert(new FlatInterval(20, 32));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(3, 13));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));
        tree.insert(new FlatInterval(22, 24));
        tree.insert(new FlatInterval(23, 24));
        tree.insert(new FlatInterval(19, 41));

        expect(tree.allRangeSearch(0, 100).size).to.equal(13);
        tree.rangeDelete(0, 100);
        expect(tree.allRangeSearch(0, 100).size).to.equal(0);
    });
});
