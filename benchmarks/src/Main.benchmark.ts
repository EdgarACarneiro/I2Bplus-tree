import { readdirSync, readFileSync, existsSync, mkdirSync, writeFile, appendFileSync } from "fs";
import { FlatInterval, Interval } from '../../src';
import { getDatasetsDir, getOutputDir, getOutputPath } from './Settings'
import { run as runTreeInsertion } from './TreeInsertion.benchmark'
import { run as runInsertion } from './Insertion.benchmark'
import { run as runDeletion } from './Deletion.benchmark'
import { run as runSearch } from './Search.benchmark'


const datasetsDir = getDatasetsDir();

const getIntervals = (filename: string): Array<Interval<FlatInterval>> => {
    let intervals: Array<Interval<FlatInterval>> =
        readFileSync(`${datasetsDir}/${filename}`)
            .toString()
            .split("\n")
            .map((line: string) => line.split(" "))
            .map((vals: string[]) =>
                new FlatInterval(parseInt(vals[0]), parseInt(vals[1]))
            );

    return intervals;
};

// Although reading twice from memory takes more,
// it is a better approach than saving all trees on memory
const datasetNames: Array<string> =
    readdirSync(datasetsDir)
        .toString()
        .split(",")
        .filter((filename: string) => filename.includes(".csv"))
        .sort((ds1: string, ds2: string) => getIntervals(ds1).length - getIntervals(ds2).length);

// Making sure output file exists
if (!existsSync(getOutputDir()))
    mkdirSync(getOutputDir());
writeFile(getOutputPath(), '',
    err => console.log(err ? err : "The file was saved!")
);

// Performing benchmarking tests on all datasets
for (let name of datasetNames) {
    const dataset: Array<Interval<FlatInterval>> =
        getIntervals(name);

    console.log(`::: Dataset ${name} with ${dataset.length} intervals :::`);
    appendFileSync(getOutputPath(), `${dataset.length}\n`);

    runTreeInsertion(dataset);
    runInsertion(dataset);
    runDeletion(dataset);
    runSearch(dataset);
}