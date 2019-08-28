import { IBplusTree, FlatInterval } from '../src/internal';
import { expect } from 'chai';
import 'mocha';

describe('Search', () => {
    it('Lone Search', () => {
        // With Order 4
        let tree: IBplusTree = new IBplusTree(4, 0);
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

        expect(tree.loneRangeSearch(new FlatInterval(0, 100))).to.deep.equal(new FlatInterval(2, 3));
        expect(tree.loneRangeSearch(new FlatInterval(14, 15))).to.deep.equal(new FlatInterval(4, 22));
        expect(tree.loneRangeSearch(new FlatInterval(13, 20))).to.deep.equal(new FlatInterval(3, 13));
        expect(tree.loneRangeSearch(new FlatInterval(23, 24))).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(new FlatInterval(27, 38))).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(new FlatInterval(0, 2))).to.deep.equal(new FlatInterval(2, 3));
        tree.delete(new FlatInterval(2, 3));
        expect(tree.loneRangeSearch(new FlatInterval(0, 2))).to.deep.equal(null);

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

        expect(tree.loneRangeSearch(new FlatInterval(0, 100))).to.deep.equal(new FlatInterval(2, 3));
        expect(tree.loneRangeSearch(new FlatInterval(14, 15))).to.deep.equal(new FlatInterval(4, 22));
        expect(tree.loneRangeSearch(new FlatInterval(13, 20))).to.deep.equal(new FlatInterval(3, 13));
        expect(tree.loneRangeSearch(new FlatInterval(23, 24))).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(new FlatInterval(27, 38))).to.deep.equal(new FlatInterval(15, 30));
        expect(tree.loneRangeSearch(new FlatInterval(-30, -2))).to.deep.equal(null);
    });

    it('Range Search', () => {
        // With Order 4
        let tree: IBplusTree = new IBplusTree(4, 0);
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

        expect(tree.allRangeSearch(new FlatInterval(0, 100)).size).to.equal(13);
        expect(tree.allRangeSearch(new FlatInterval(0, 15)).size).to.equal(7);
        expect(tree.allRangeSearch(new FlatInterval(12, 39)).size).to.equal(11);

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

        expect(tree.allRangeSearch(new FlatInterval(0, 100)).size).to.equal(13);
        expect(tree.allRangeSearch(new FlatInterval(0, 15)).size).to.equal(7);
        expect(tree.allRangeSearch(new FlatInterval(12, 39)).size).to.equal(11);
    });
});
