import { IBplusTree, Interval } from '../../src/internal';
import { addBenchmarkLogsAndRun } from "./Helpers";
import { getOrders, getAlphas } from './Settings';
import { Suite } from "benchmark";


let tree: IBplusTree;

const insertAllInts = (intervals: Array<Interval>, order: number, alpha: number) => {
    tree = new IBplusTree(order, alpha);

    for (let int of intervals)
        tree.insert(int);
};

const treeInsertionTest = (dataset: Array<Interval>, alpha: number) => {
    let suite = new Suite;

    for (let order of getOrders())
        suite = suite.add(`T_o${order}_a${alpha}#test`, () => {
            insertAllInts(dataset, order, alpha);
        })

    addBenchmarkLogsAndRun(suite);
};

export const run = (dataset: Array<Interval>) => {
    for (let alpha of getAlphas())
        treeInsertionTest(dataset, alpha);
};