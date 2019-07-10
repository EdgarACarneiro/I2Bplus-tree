import { IBplusTree, Interval } from '../../src/internal';
import { addBenchmarkLogsAndRun } from "./Helpers";
import { getOrders, getAlphas } from './Settings';
import { Suite } from "benchmark";


let iterator: number = 0;

const createTree = (intervals: Array<Interval>, order: number, alpha: number): [IBplusTree, Array<Interval>] => {
    let tree = new IBplusTree(order, alpha);
    let insInts: Array<Interval> = [];
    let divider: number = Math.floor(intervals.length / 100);

    for (let i = 0; i < intervals.length; ++i) {
        if (!(i % divider))
            insInts.push(intervals[i]);
        else
            tree.insert(intervals[i]);
    }

    return [tree, insInts];
};

const insertionTest = (dataset: Array<Interval>, alpha: number) => {
    let tree: IBplusTree;
    let insInts: Array<Interval>;

    let suite = (new Suite).on('start cycle', function (event) {
        [tree, insInts] = createTree(dataset, getOrders()[iterator], alpha);
        iterator += 1;
    });

    for (let order of getOrders())
        suite = suite.add(`I_o${order}_a${alpha}#test`, () => {
            for (let int of insInts)
                tree.insert(int);
        });

    addBenchmarkLogsAndRun(suite);
};

export const run = (dataset: Array<Interval>) => {
    for (let alpha of getAlphas())
        insertionTest(dataset, alpha);
};