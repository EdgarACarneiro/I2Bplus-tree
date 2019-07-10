/**
 * Directory containing the datasets used for the benchmarking tests
 */
const DATASETS_DIR: string = 'benchmarks/datasets';
/**
 * Output directory for the benchmarking logs
 */
const OUTPUT_DIR: string = 'benchmarks/results';
/**
 * Output file, in the afore mentioned output directory, for the logs
 */
const OUTPUT_FILE: string = 'logs.csv'
/**
 * Possible tree orders for the benchmarking tests
 */
const ORDERS: Array<number> = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90];
/**
 * Possible alphas for time splitting in the trees used in benchmarking
 */
const ALPHAS: Array<number> = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];


export const getDatasetsDir = (): string => DATASETS_DIR;

export const getOutputDir = (): string => OUTPUT_DIR;

export const getOutputPath = (): string => `${OUTPUT_DIR}/${OUTPUT_FILE}`;

export const getOrders = (): Array<number> => ORDERS;

export const getAlphas = (): Array<number> => ALPHAS;