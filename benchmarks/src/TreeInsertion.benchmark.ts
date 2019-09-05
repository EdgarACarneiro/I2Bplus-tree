import { IBplusTree, Interval, FlatInterval } from '../../src';
import { addBenchmarkLogsAndRun } from "./Helpers";
import { getOrders, getAlphas } from './Settings';
import { Suite } from "benchmark";


let tree: IBplusTree<FlatInterval>;

const insertAllInts = (intervals: Array<Interval<FlatInterval>>, order: number, alpha: number) => {
    tree = new IBplusTree(order, alpha);

    for (let int of intervals)
        tree.insert(int);
};

const treeInsertionTest = (dataset: Array<Interval<FlatInterval>>, alpha: number) => {
    let suite = new Suite;

    for (let order of getOrders())
        suite = suite.add(`T_o${order}_a${alpha}#test`, () => {
            insertAllInts(dataset, order, alpha);
        })

    addBenchmarkLogsAndRun(suite);
};

export const run = (dataset: Array<Interval<FlatInterval>>) => {
    for (let alpha of getAlphas())
        treeInsertionTest(dataset, alpha);
};