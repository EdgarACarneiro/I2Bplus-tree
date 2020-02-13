import { IBplusInternalNode, IBplusLeafNode, Interval, FlatInterval, IBplusTree } from '../src/internal';
import { expect } from 'chai';
import 'mocha';

describe('Utils', () => {

    it('IB Tree Printing', () => {
        const tree: IBplusTree<FlatInterval> = new IBplusTree(2);

        tree.insert(new FlatInterval(4, 22));
        tree.insert(new FlatInterval(6, 11));
        tree.insert(new FlatInterval(10, 13));
        tree.insert(new FlatInterval(2, 3));
        tree.insert(new FlatInterval(3, 13));
        tree.insert(new FlatInterval(26, 31));
        tree.insert(new FlatInterval(15, 30));

        expect(tree.asString()).to.equal( 
            "- Keys |2|26|\n  Maxs |30|31|\n\t- Keys |2|6|\n\t  Maxs |22|30|\n\t\t- Keys |2|4|\n\t\t  Maxs |13|22|\n\t\t\t- [2, 3]\n\t\t\t- [3, 13]\n\t\t\t- [4, 22]\n\t\t- Keys |6|10|\n\t\t  Maxs |11|30|\n\t\t\t- [6, 11]\n\t\t\t- [10, 13]\n\t\t\t- [15, 30]\n\t- Keys |26|\n\t  Maxs |31|\n\t\t- Keys |26|\n\t\t  Maxs |31|\n\t\t\t- [26, 31]\n"
        );
    });
});
