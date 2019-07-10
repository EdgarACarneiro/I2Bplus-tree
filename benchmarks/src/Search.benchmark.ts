import { IBplusTree, Interval } from '../../src/internal';
import { addBenchmarkLogsAndRun } from "./Helpers";
import { getOrders, getAlphas } from './Settings';
import { Suite } from "benchmark";


let iterator: number = 0;

const createTree = (intervals: Array<Interval>, order: number, alpha: number): [IBplusTree, Array<Interval>] => {
    let tree = new IBplusTree(order, alpha);
    let searchInts: Array<Interval> = [];

    for (let i = 0; i < intervals.length; ++i)
        tree.insert(intervals[i]);

    for (let i = 2; i < 102; ++i)
        searchInts.push(intervals[Math.floor(intervals.length / i)]);

    return [tree, searchInts];
};

const rangeSearchTest = (dataset: Array<Interval>, alpha: number) => {
    let tree: IBplusTree;
    let searchInts: Array<Interval>;

    let suite = (new Suite).on('start cycle', function (event) {
        [tree, searchInts] = createTree(dataset, getOrders()[iterator], alpha);
        iterator += 1;
    });

    for (let order of getOrders())
        suite = suite.add(`RS_o${order}_a${alpha}#test`, () => {
            for (let int of searchInts)
                tree.allRangeSearch(int);
        });

    addBenchmarkLogsAndRun(suite);
}

export const run = (dataset: Array<Interval>) => {
    for (let alpha of getAlphas())
        rangeSearchTest(dataset, alpha);
};
