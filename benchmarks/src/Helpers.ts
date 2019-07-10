import { appendFileSync } from "fs";
import { Suite } from "benchmark";
import { getOutputPath } from './Settings'


const secToMilisec: number = 1000;

const prettyStats = (result: Suite) => {
    console.log(`${String(result)}:\n` +
        ` * Mean: ${result.stats.mean * secToMilisec}ms\n` +
        ` * Standard Deviation: ${result.stats.deviation * secToMilisec}ms\n`);
}

const logToFile = (result: Suite) => {
    appendFileSync(getOutputPath(),
        `${result.name} ${result.stats.mean * secToMilisec}\n`);
}

export const addBenchmarkLogsAndRun = (benchmark: Suite) => {
    // add listeners
    benchmark.on('cycle', function (event) {
        prettyStats(event.target);
        logToFile(event.target);
    })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name') + '\n\n');
        })
        .run({ 'async': false });
}