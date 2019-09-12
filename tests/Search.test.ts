import { IBplusTree, FlatInterval } from '../src/internal';
import { expect } from 'chai';
import 'mocha';

describe('Search', () => {

    it('Verify if Interval exists in tree', () => {
        // With Order 4
        let tree: IBplusTree<FlatInterval> = new IBplusTree<FlatInterval>(4, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13));
        tree.insert(new FlatInterval(14, 17));
        tree.insert(new FlatInterval(20, 32));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(13, 3));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));
        tree.insert(new FlatInterval(22, 24));
        tree.insert(new FlatInterval(23, 24));
        tree.insert(new FlatInterval(19, 41));


        expect(tree.exists(new FlatInterval(15, 30))).to.be.true;
        expect(tree.exists(new FlatInterval(4, 5))).to.be.false;
        tree.delete(new FlatInterval(15, 30));
        expect(tree.exists(new FlatInterval(15, 30))).to.be.false;
    });


    it('Search for all Intervals with equal limits', () => {
        // With Order 4
        let tree: IBplusTree<FlatInterval> = new IBplusTree<FlatInterval>(4, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(14, 17));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(13, 3));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));
        tree.insert(new FlatInterval(22, 24));
        tree.insert(new FlatInterval(23, 24));
        tree.insert(new FlatInterval(19, 41));
        tree.insert(new FlatInterval(4, 22));

        expect(Array.from(tree.search(2, 3))).to.deep.equal(
            [new FlatInterval(2, 3), new FlatInterval(2, 3)]);
        expect(Array.from(tree.search(4, 22))).to.deep.equal(
            [new FlatInterval(4, 22), new FlatInterval(4, 22)]);
        expect(Array.from(tree.search(26, 31))).to.deep.equal(
            [new FlatInterval(26, 31)]);
        expect(Array.from(tree.search(26, 33))).to.deep.equal([]);

        tree.delete(new FlatInterval(26, 31));
        expect(Array.from(tree.search(26, 31))).to.deep.equal([]);
    });

    it('Lone Search', () => {
        // With Order 4
        let tree: IBplusTree<FlatInterval> = new IBplusTree<FlatInterval>(4, 0);
        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13));
        tree.insert(new FlatInterval(14, 17));
        tree.insert(new FlatInterval(20, 32));
        tree.insert(new FlatInterval(26, 41));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(13, 3));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));
        tree.insert(new FlatInterval(22, 24));
        tree.insert(new FlatInterval(23, 24));
        tree.insert(new FlatInterval(19, 41));

        expect(tree.loneRangeSearch(0, 100)).to.deep.equal(new FlatInterval(2, 3));
        expect(tree.loneRangeSearch(14, 15)).to.deep.equal(new FlatInterval(4, 22));
        expect(tree.loneRangeSearch(13, 20)).to.deep.equal(new FlatInterval(3, 13));
        expect(tree.loneRangeSearch(23, 24)).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(27, 38)).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(0, 2)).to.deep.equal(new FlatInterval(2, 3));
        tree.delete(new FlatInterval(2, 3));
        expect(tree.loneRangeSearch(0, 2)).to.deep.equal(null);

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

        expect(tree.loneRangeSearch(0, 100)).to.deep.equal(new FlatInterval(2, 3));
        expect(tree.loneRangeSearch(14, 15)).to.deep.equal(new FlatInterval(4, 22));
        expect(tree.loneRangeSearch(13, 20)).to.deep.equal(new FlatInterval(3, 13));
        expect(tree.loneRangeSearch(23, 24)).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(27, 38)).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(-30, -2)).to.deep.equal(null);
    });

    it('Range Search', () => {
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
        expect(tree.allRangeSearch(0, 15).size).to.equal(7);
        expect(tree.allRangeSearch(12, 39).size).to.equal(11);

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

        expect(tree.allRangeSearch(0, 100).size).to.equal(13);
        expect(tree.allRangeSearch(0, 15).size).to.equal(7);
        expect(tree.allRangeSearch(12, 39).size).to.equal(11);
    });

    it('Contained Range Search', () => {
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

        expect(tree.containedRangeSearch(0, 100).size).to.equal(13);
        expect(tree.containedRangeSearch(0, 15).size).to.equal(4);
        expect(tree.containedRangeSearch(12, 39).size).to.equal(6);

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

        expect(tree.containedRangeSearch(0, 100).size).to.equal(13);
        expect(tree.containedRangeSearch(0, 15).size).to.equal(4);
        expect(tree.containedRangeSearch(12, 39).size).to.equal(6);
    });
});
