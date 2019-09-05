import { IBplusTree, Interval, FlatInterval } from '../../src';
import { addBenchmarkLogsAndRun } from "./Helpers";
import { getOrders, getAlphas } from './Settings';
import { Suite } from "benchmark";


let iterator: number = 0;

const createTree = (intervals: Array<Interval<FlatInterval>>, order: number, alpha: number):
    [IBplusTree<FlatInterval>, Array<Interval<FlatInterval>>] => {
    let tree = new IBplusTree(order, alpha);
    let delInts: Array<Interval<FlatInterval>> = [];
    let divider: number = Math.floor(intervals.length / 100);

    for (let i = 0; i < intervals.length; ++i) {
        let intArr = tree.insert(intervals[i]);

        if (!(i % divider))
            delInts.push(intervals[i]);
    }

    return [tree, delInts];
};

const deletionTest = (dataset: Array<Interval<FlatInterval>>, alpha: number) => {
    let tree: IBplusTree<FlatInterval>;
    let delInts: Array<Interval<FlatInterval>>;

    let suite = (new Suite).on('start cycle', function (event) {
        [tree, delInts] = createTree(dataset, getOrders()[iterator], alpha);
        iterator += 1;
    });

    for (let order of getOrders())
        suite = suite.add(`D_o${order}_a${alpha}#test`, () => {
            for (let int of delInts)
                tree.delete(int);
        });

    addBenchmarkLogsAndRun(suite);
}

export const run = (dataset: Array<Interval<FlatInterval>>) => {
    for (let alpha of getAlphas())
        deletionTest(dataset, alpha);
};
