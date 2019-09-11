import { IBplusInternalNode, IBplusLeafNode, Interval, FlatInterval, IBplusTree } from '../src/internal';
import { expect } from 'chai';
import 'mocha';

describe('Insertions', () => {

    it('IB Tree Constructor', () => {
        expect(() => new IBplusTree(1, 10)).to.throw();
        expect(() => new IBplusTree(2, 2)).to.throw();

        expect(() => new IBplusTree(2, 0)).not.to.throw();
    });

    it('Insert without splits', () => {
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

        // Root tests
        expect(root.order).to.equal(4);
        expect(root.getMax()).to.equal(41);
        expect(root.getMinKey()).to.equal(2);
        expect(root.getChildren().length).to.equal(4);
        expect(root.getLeftSibling()).to.be.null;
        expect(root.getRightSibling()).to.be.null;
        expect(root.getParent()).to.be.null;
        expect(root.isRoot()).to.be.true;

        let [child0, child1, child2, child3] = root.getChildren();

        // Child 0 tests
        expect(child0.order).to.equal(4);
        expect(child0.getMax()).to.equal(22);
        expect(child0.getMinKey()).to.equal(2);
        expect(child0.getChildren().length).to.equal(4);
        expect(child0.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child0.getLeftSibling()).to.be.null;
        expect(child0.getRightSibling()).to.equal(child1);
        expect(child0.getParent()).to.equal(root);
        expect(child0.isRoot()).to.be.false;

        // Child 1 tests
        expect(child1.order).to.equal(4);
        expect(child1.getMax()).to.equal(41);
        expect(child1.getMinKey()).to.equal(10);
        expect(child1.getChildren().length).to.equal(4);
        expect(child1.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child1.getLeftSibling()).to.equal(child0);
        expect(child1.getRightSibling()).to.equal(child2);
        expect(child1.getParent()).to.equal(root);
        expect(child1.isRoot()).to.be.false;

        // Child 2 tests
        expect(child2.order).to.equal(4);
        expect(child2.getMax()).to.equal(32);
        expect(child2.getMinKey()).to.equal(20);
        expect(child2.getChildren().length).to.equal(3);
        expect(child2.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child2.getLeftSibling()).to.equal(child1);
        expect(child2.getRightSibling()).to.equal(child3);
        expect(child2.getParent()).to.equal(root);
        expect(child2.isRoot()).to.be.false;

        // Child 3 tests
        expect(child3.order).to.equal(4);
        expect(child3.getMax()).to.equal(41);
        expect(child3.getMinKey()).to.equal(26);
        expect(child3.getChildren().length).to.equal(2);
        expect(child3.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child3.getLeftSibling()).to.equal(child2);
        expect(child3.getRightSibling()).to.be.null;
        expect(child3.getParent()).to.equal(root);
        expect(child3.isRoot()).to.be.false;
    });

    /**
     * Binary tree is the best tree to test splits
     */
    it('Insert with splits', () => {
        let root: IBplusInternalNode<FlatInterval> =
            new IBplusInternalNode<FlatInterval>(2, null);
        root.insert(new FlatInterval(4, 22), 0);
        root.insert(new FlatInterval(6, 11), 0);
        root.insert(new FlatInterval(10, 13), 0);
        root.insert(new FlatInterval(2, 3), 0);
        root.insert(new FlatInterval(3, 13), 0);
        root = root.getParent();
        root.insert(new FlatInterval(26, 31), 0);
        root.insert(new FlatInterval(15, 30), 0);
        root = root.getParent();

        // Root tests
        expect(root.order).to.equal(2);
        expect(root.getMax()).to.equal(31);
        expect(root.getMinKey()).to.equal(2);
        expect(root.getChildren().length).to.equal(2);
        expect(root.getLeftSibling()).to.be.null;
        expect(root.getRightSibling()).to.be.null;
        expect(root.getParent()).to.be.null;
        expect(root.isRoot()).to.be.true;

        let [child0, child1] = root.getChildren();

        // Child 0 tests
        expect(child0.order).to.equal(2);
        expect(child0.getMax()).to.equal(30);
        expect(child0.getMinKey()).to.equal(2);
        expect(child0.getChildren().length).to.equal(2);
        expect(child0.getChildren()[0]).to.be.instanceOf(IBplusInternalNode);
        expect(child0.getLeftSibling()).to.be.null;
        expect(child0.getRightSibling()).to.equal(child1);
        expect(child0.getParent()).to.equal(root);
        expect(child0.isRoot()).to.be.false;

        // Child 1 tests
        expect(child1.order).to.equal(2);
        expect(child1.getMax()).to.equal(31);
        expect(child1.getMinKey()).to.equal(26);
        expect(child1.getChildren().length).to.equal(1);
        expect(child1.getChildren()[0]).to.be.instanceOf(IBplusInternalNode);
        expect(child1.getLeftSibling()).to.equal(child0);
        expect(child1.getRightSibling()).to.be.null;
        expect(child1.getParent()).to.equal(root);
        expect(child1.isRoot()).to.be.false;

        let [child00, child01] = child0.getChildren();
        let [child10] = child1.getChildren();

        // Child 00 tests
        expect(child00.order).to.equal(2);
        expect(child00.getMax()).to.equal(22);
        expect(child00.getMinKey()).to.equal(2);
        expect(child00.getChildren().length).to.equal(2);
        expect(child00.getChildren()[0]).to.be.instanceOf(IBplusLeafNode);
        expect(child00.getLeftSibling()).to.equal(null);
        expect(child00.getRightSibling()).to.equal(child01);
        expect(child00.getParent()).to.equal(child0);
        expect(child00.isRoot()).to.be.false;

        // Child 01 tests
        expect(child01.order).to.equal(2);
        expect(child01.getMax()).to.equal(30);
        expect(child01.getMinKey()).to.equal(6);
        expect(child01.getChildren().length).to.equal(2);
        expect(child01.getChildren()[0]).to.be.instanceOf(IBplusLeafNode);
        expect(child01.getLeftSibling()).to.equal(child00);
        expect(child01.getRightSibling()).to.equal(child10);
        expect(child01.getParent()).to.equal(child0);
        expect(child01.isRoot()).to.be.false;

        // Child 10 tests
        expect(child10.order).to.equal(2);
        expect(child10.getMax()).to.equal(31);
        expect(child10.getMinKey()).to.equal(26);
        expect(child10.getChildren().length).to.equal(1);
        expect(child10.getChildren()[0]).to.be.instanceOf(IBplusLeafNode);
        expect(child10.getLeftSibling()).to.equal(child01);
        expect(child10.getRightSibling()).to.be.null;
        expect(child10.getParent()).to.equal(child1);
        expect(child10.isRoot()).to.be.false;

        let [child000, child001] = child00.getChildren();
        let [child010, child011] = child01.getChildren();
        let [child100] = child10.getChildren();

        // Child 000 tests
        expect(child000.order).to.equal(2);
        expect(child000.getMax()).to.equal(13);
        expect(child000.getMinKey()).to.equal(2);
        expect(child000.getChildren().length).to.equal(2);
        expect(child000.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child000.getLeftSibling()).to.be.null;
        expect(child000.getRightSibling()).to.equal(child001);
        expect(child000.getParent()).to.equal(child00);
        expect(child000.isRoot()).to.be.false;

        // Child 001 tests
        expect(child001.order).to.equal(2);
        expect(child001.getMax()).to.equal(22);
        expect(child001.getMinKey()).to.equal(4);
        expect(child001.getChildren().length).to.equal(1);
        expect(child001.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child001.getLeftSibling()).to.equal(child000);
        expect(child001.getRightSibling()).to.equal(child010);
        expect(child001.getParent()).to.equal(child00);
        expect(child001.isRoot()).to.be.false;

        // Child 010 tests
        expect(child010.order).to.equal(2);
        expect(child010.getMax()).to.equal(11);
        expect(child010.getMinKey()).to.equal(6);
        expect(child010.getChildren().length).to.equal(1);
        expect(child010.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child010.getLeftSibling()).to.equal(child001);
        expect(child010.getRightSibling()).to.equal(child011);
        expect(child010.getParent()).to.equal(child01);
        expect(child010.isRoot()).to.be.false;

        // Child 011 tests
        expect(child011.order).to.equal(2);
        expect(child011.getMax()).to.equal(30);
        expect(child011.getMinKey()).to.equal(10);
        expect(child011.getChildren().length).to.equal(2);
        expect(child011.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child011.getLeftSibling()).to.equal(child010);
        expect(child011.getRightSibling()).to.equal(child100);
        expect(child011.getParent()).to.equal(child01);
        expect(child011.isRoot()).to.be.false;

        // Child 100 tests
        expect(child100.order).to.equal(2);
        expect(child100.getMax()).to.equal(31);
        expect(child100.getMinKey()).to.equal(26);
        expect(child100.getChildren().length).to.equal(1);
        expect(child100.getChildren()[0]).to.be.instanceOf(Interval);
        expect(child100.getLeftSibling()).to.equal(child011);
        expect(child100.getRightSibling()).to.be.null;
        expect(child100.getParent()).to.equal(child10);
        expect(child100.isRoot()).to.be.false;
    });

    it ('Insertion that triggers split and inserts on sibling', () => {
        let root: IBplusInternalNode<FlatInterval> =
            new IBplusInternalNode<FlatInterval>(2, null);

        root.insert(new FlatInterval(0, 2), 0);
        root.insert(new FlatInterval(1, -1), 0);
        root.insert(new FlatInterval(4, 5), 0);

        expect(root.getChildren().length).to.equal(2);
        expect(root.getMax()).to.equal(5);
        expect(root.getMinKey()).to.equal(-1);
    });
});
