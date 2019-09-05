import { IBplusInternalNode, IBplusLeafNode, Interval, FlatInterval } from '../src/internal';
import { expect } from 'chai';
import 'mocha';

describe('Time Splits', () => {

    let alpha: number = 0.2;

    let root: IBplusInternalNode<FlatInterval> =
        new IBplusInternalNode<FlatInterval>(4, null);
    root.insert(new FlatInterval(2, 6), alpha);
    root.insert(new FlatInterval(3, 46), alpha);
    root.insert(new FlatInterval(6, 10), alpha);
    root.insert(new FlatInterval(8, 11), alpha);
    root.insert(new FlatInterval(12, 14), alpha);
    const splitInterval = new FlatInterval(4, 58);
    root.insert(splitInterval, alpha); //The one that triggers the timeSplit

    /**
     * Example presented in the IB+ tree article
     */
    it('pick split point correctly', () => {
        let leaf: IBplusLeafNode<FlatInterval> =
            new IBplusLeafNode<FlatInterval>(6,
                null,
                [2, 3, 4, 6, 8, 12],
                [6, 46, 10, 58, 11, 14]
            );
        expect(leaf.pickSplitPoint(alpha)).to.equal(5);

        // Case used in test below
        let leaf2: IBplusLeafNode<FlatInterval> =
            new IBplusLeafNode<FlatInterval>(6,
                null,
                [2, 3, 4],
                [6, 46, 58]
            );
        expect(leaf2.pickSplitPoint(alpha)).to.equal(1);
    });

    it('time split correctly', () => {
        let [child0, child1] = root.getChildren();

        expect(child0.getChildren().length).to.equal(3);
        expect(child1.getChildren().length).to.equal(4);

        expect(child0.getMax()).to.equal(46);
        expect(child1.getMax()).to.equal(58);

        let createdChild: Interval<FlatInterval> = child1.getChildren()[3];
        expect(createdChild.getLowerBound()).to.equal(47);
        expect(createdChild.getUpperBound()).to.equal(58);

        let alteredChild: Interval<FlatInterval> = child0.getChildren()[2];
        expect(alteredChild.getLowerBound()).to.equal(4);
        expect(alteredChild.getUpperBound()).to.equal(46);
    });

    it('time splits but returns original intervals', () => {
        let search = Array.from(root.allRangeSearch(new FlatInterval(0, 60)))

        expect(search.length).to.equal(6)
        expect(search.includes(splitInterval)).to.be.true;
    });

});
