# Benchmarking

# Index
* [Benchmarking - Data Generation](#Benchmarking---Data-Generation)
* [Benchmarking Tests](#Benchmarking-Tests)
* [Plotting Benchmarking data](#Plotting-Benchmarking-data)
* [Result Analysis](#Result-Analysis)
* [Conclusions](#Conclusions)


# Benchmarking - Data Generation

For generating data for the benchmarking tests the script `/benchmark/scripts/generator.py` was developed. To run the script, one must run the following commands in a terminal containing `python3`:

* In Mac/ Linux:
```shell
python3  -m venv venv
. venv/bin/activate
pip install _U -r requirements.txt
python3 generator.py
```

* Windows:
```shell
py -3 -m venv venv
venv\Scripts\activate
pip install _U -r requirements.txt
py -3 generator.py
```

In the end you can deactivate the virtual environment by running:
```shell
deactivate
```

One can customize the script settings by changing the value of the constants in the first few lines:
```python
"""Initial timestamp for datasets intervals"""
START = 0

"""Frequency of Intervals per timestamp"""
INT_FREQ = 10

"""Array containing sizes for the datasets that shall be created"""
SIZES = [200, 1000, 5000, 20000, 100000, 500000]

"""Mean duration for Intervals, following a Normal Distribution"""
DURATION = 7

"""Standard Deviation for Intervals duration, following a Normal Distribution"""
STANDARD_DEVIATION = 2

"""The saving_dir for the associated dataset"""
SAVING_DIR = 'datasets'
```

For the following benchmarking tests mentioned below, there were constructed two sets of datasets:
* __Set SI__: Dataset set with small intervals  (_duration avg. 7 & sd. 2, meaning duration 1 week & sd 2 days_).
* __Set BI__: Dataset set with big intervals (_duration avg. 1095 & sd. 200, meaning duration 4 years & sd 250 days_).

| Dataset Size | **SI** Start times Distribution | **SI** Duration Distribution | **BI** Start times Distribution | **BI** Duration Distribution |
|:-:|:-:|:-:|:-:|:-:|
| 1k | ![Start-times](https://user-images.githubusercontent.com/22712373/57218974-a4d78c80-6fee-11e9-8ef5-0954cacf4c86.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57218973-a4d78c80-6fee-11e9-97dd-61325fd7f916.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609819-8c73ee80-7567-11e9-869d-2240850892c5.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609817-8c73ee80-7567-11e9-9548-01d2d0ab2601.png) |
| 2k | ![Start-times](https://user-images.githubusercontent.com/22712373/57218974-a4d78c80-6fee-11e9-8ef5-0954cacf4c86.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57218973-a4d78c80-6fee-11e9-97dd-61325fd7f916.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609838-9564c000-7567-11e9-9e66-86cbced7d3a3.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609837-9564c000-7567-11e9-9bd7-1217e2d3c2c0.png) |
| 4k | ![Start-times](https://user-images.githubusercontent.com/22712373/57218992-b02ab800-6fee-11e9-997d-d4bbcd11316c.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57218991-b02ab800-6fee-11e9-89ff-f0c48ac692e0.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609849-9b5aa100-7567-11e9-8983-a554238d7a53.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609848-9ac20a80-7567-11e9-9312-86954fc68d08.png) |
| 8k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219004-b6209900-6fee-11e9-8a52-2c58e7b227e4.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219002-b6209900-6fee-11e9-849a-ccc808f5146d.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609875-a3b2dc00-7567-11e9-8ca4-b7ffd74d470d.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609874-a3b2dc00-7567-11e9-9856-e5ceb632544f.png) |
| 16k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219013-bcaf1080-6fee-11e9-88e0-5612152f9730.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219012-bcaf1080-6fee-11e9-9e17-d41357e20004.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609891-ac0b1700-7567-11e9-9cf8-7540f06cc964.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609889-ac0b1700-7567-11e9-9c84-eb33a0774296.png) |
| 32k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219038-cb95c300-6fee-11e9-8700-2497306d4110.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219037-cb95c300-6fee-11e9-8779-e6850e704627.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609897-b1686180-7567-11e9-960c-9087fbce4e03.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609896-b0cfcb00-7567-11e9-83a6-80591a388c1e.png) |
| 64k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219045-d2243a80-6fee-11e9-86a5-3e6a2c1730e4.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219044-d2243a80-6fee-11e9-8731-60e7653db2b1.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609912-b6c5ac00-7567-11e9-8e48-178187b44bfd.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609911-b6c5ac00-7567-11e9-9638-c535239f3bf6.png) |
| 128k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219052-d7818500-6fee-11e9-810a-0c90e321723d.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219051-d6e8ee80-6fee-11e9-9710-455d380c098b.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609922-bd542380-7567-11e9-9223-b0f3e86bdbd7.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609921-bd542380-7567-11e9-9e87-2b8974fadee9.png) |
| 256k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219065-de0ffc80-6fee-11e9-82dc-721574c4d4ad.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219064-de0ffc80-6fee-11e9-9b98-799652c58e07.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609932-c3e29b00-7567-11e9-944d-172512106413.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609931-c3e29b00-7567-11e9-883e-9723e8e31f48.png) |
| 512k | ![Start-times](https://user-images.githubusercontent.com/22712373/57219077-e5cfa100-6fee-11e9-99a1-13b424293ea6.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57219075-e5cfa100-6fee-11e9-8361-f1aa359a1cad.png) | ![Start-times](https://user-images.githubusercontent.com/22712373/57609944-ca711280-7567-11e9-9f2b-3f24aa43d96a.png) | ![Durations](https://user-images.githubusercontent.com/22712373/57609942-ca711280-7567-11e9-98a9-435a4b333502.png) |

---

# Benchmarking Tests

The benchmarking tests are in the `/benchmark/src` folder. For the benchmarking tests, [Benchmark.js](https://benchmarkjs.com) was used.


__Important:__ Notice that all the tests are being run in an __node environment__, hence not having the overheads that will exist when running the same code on the web / browsers. In fact, one can even state that the current running environment represents a __best-case scenario__, which explains the performance obtained in the benchmarking tests - some operations are done in __micro seconds__.

Tests were developed for the 3 basic operations:
 * __TreeInsertion__ (`/benchmark/src/TreeInsertion.benchmark.ts`)
 * __Insertion__ (`/benchmark/src/Insertion.benchmark.ts`)
 * __Deletion__ (`/benchmark/src/Deletion.benchmark.ts`)
 * __Search__ (`/benchmark/src/Search.benchmark.ts`)

The __tree insertion test__ consists of evaluating the average time it takes to construct the totality of the tree.
The __insertion test__ consists of evaluating the average time it takes to insert 100 randomly chosen intervals on the tree.
The __deletion test__ consists of evaluating the average time it takes to delete 100 randomly chosen leafs on the tree.
The __search test__ consists of evaluating the average time it takes to find all the leafs belonging to 100 randomly chosen intervals (_range search_).

One can execute the benchmarking tests by running `npm run benchmark`. This script will run the code that is present in the file `/benchmark/src/Main.benchmark.ts` that will then run the afore mentioned four type of tests using the configurations present in the file `/benchmark/src/Settings.ts`. 

The fist few lines of the file `/benchmark/src/Settings.ts` are the ones that can be customised by the User running the benchmarking tests. An example of a possible configuration, and the one that is used in the following tests, is:
```js
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
const ORDERS: Array<number> = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70 ,80, 90];
/**
 * Possible alphas for time splitting in the trees used in benchmarking
 */
const ALPHAS: Array<number> = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
```

The benchmarking tests will be run for all the datasets present in the `DATASETS_DIR` (a dataset is a file ending with `.csv`). For each dataset, the 4 tests will be run. Each of this tests will run with all the possible combinations of orders and alphas. In the example given, assuming the dataset folder contained 10 datasets, this would result in a total of `10 * 4 * 13 * 8 = 4160` run tests.

Once again, remember that the __order__ parameter represents the number of children a tree node can have. The __alpha__ is a parameter (0 < alpha < 1) which can be tuned to adjust space(hence update cost)/query_time tradeoff. Higher values will lead to fewer splits and hence less storage expansion, but also to worse query efficiency. Smaller values will lead to better query efficiency, but increase storage requirements and update costs (due to reinsertion of split parts).

After running the tests, an output file with the name `OUTPUT_FILE` will be created in the `OUTPUT_DIR` containing the logs resultant of the tests run. An example of an output file may be:
```
4000
...
8000
T_o5_a0#test 7.715955785714289
T_o10_a0#test 6.528876020348837
T_o15_a0#test 6.293901711076816
T_o20_a0#test 6.419059926724137
T_o25_a0#test 6.440492803160922
T_o30_a0#test 6.512482162790698
T_o35_a0#test 6.717141266566264
T_o40_a0#test 6.878969333841462
T_o50_a0#test 7.497806471088434
T_o60_a0#test 7.713156775261324
T_o70_a0#test 8.235505113172541
T_o80_a0#test 8.731448806910567
T_o90_a0#test 8.77118017871486
T_o5_a0.1#test 8.068022996383363
T_o10_a0.1#test 6.952732094135804
...
I...
D...
RS...
...
```
In the output file, we have, for each dataset (e.g. _4000_ & _8000_), the run tests, where for each test, we have its name (_\_T\_o5\_a0#test\__) and the average time it took to complete the test (_7.715955785714289_) in mili seconds. The test name is representative of its configuration. For example, _\_T\_o5\_a0#test\__ represents a Tree Insertion (_T_) with order 5 (_o5_) and alpha value of 0 (_a0_). According to the type of test, the test name may also begin with _I_ (Insertion), _D_ (Deletion) and _RS_ (Range Search).

---

# Plotting Benchmarking data

After running the tests, one can extract knowledge from the output logs by running the python script defined in `plotter.py`. This is the script responsible for transforming the logs data into graphical plots that have actual valuable information to the User. To do so, one must run the following commands in a terminal containing `python3`, using the virtual environment created in section [Data Generation](#data-generation):

* In Mac/ Linux:
```shell
. venv/bin/activate
python3 plotter.py
```

* Windows:
```shell
venv\Scripts\activate
py -3 plotter.py
```

In the end you can deactivate the virtual environment by running:
```shell
deactivate
```

The directory where the images containing the plots will be saved and the input file are defined in the `plotter.py` file, in the first lines:
```python
ap.add_argument('-i', '--input', type=str,
                default='results/logs.csv', help='Input file containing the logs')
ap.add_argument('-o', '--output', type=str,
                default='plots', help='Output directory for the plots')
```

One can override the parameters using the command line, as in:
```shell
python3 plotter.py -i logs.csv -o plot_dir
```

---

# Result Analysis

* # Dataset SI

## Order

In the following matrix, each column represents a basic operation and each line represents the datasets where the tests were applied.

| Dataset Size | Tree Insertion | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|:-:|
| 1k | ![1000 T var order](https://user-images.githubusercontent.com/22712373/59507893-4bdbfd80-8ea4-11e9-92d6-92e0a2c6e7f1.png) | ![1000 I var order](https://user-images.githubusercontent.com/22712373/59507889-4b436700-8ea4-11e9-830e-3a0ec61e832e.png) | ![1000 RS var order](https://user-images.githubusercontent.com/22712373/59507891-4bdbfd80-8ea4-11e9-9e08-a66f1f6e06ca.png) | ![1000 D var order](https://user-images.githubusercontent.com/22712373/59507887-4b436700-8ea4-11e9-9776-d5fec9e55658.png) |
| 2k | ![2000 T var order](https://user-images.githubusercontent.com/22712373/59507901-4d0d2a80-8ea4-11e9-9064-a211e89a4bd4.png) | ![2000 I var order](https://user-images.githubusercontent.com/22712373/59507897-4d0d2a80-8ea4-11e9-9efd-f34bfb895a23.png) | ![2000 RS var order](https://user-images.githubusercontent.com/22712373/59507899-4d0d2a80-8ea4-11e9-8857-fb8b9c074215.png) | ![2000 D var order](https://user-images.githubusercontent.com/22712373/59507895-4c749400-8ea4-11e9-8783-52daea288f2c.png) |
| 4k | ![4000 T var order](https://user-images.githubusercontent.com/22712373/59507910-4e3e5780-8ea4-11e9-9890-0a2721168797.png) | ![4000 I var order](https://user-images.githubusercontent.com/22712373/59507905-4da5c100-8ea4-11e9-9d71-c1c6a2ff4cf1.png) | ![4000 RS var order](https://user-images.githubusercontent.com/22712373/59507907-4e3e5780-8ea4-11e9-9779-349ec230010f.png) | ![4000 D var order](https://user-images.githubusercontent.com/22712373/59507903-4da5c100-8ea4-11e9-8507-141986645968.png) |
| 8k | ![8000 T var order](https://user-images.githubusercontent.com/22712373/59507918-4f6f8480-8ea4-11e9-9ef7-ca9289772b11.png) | ![8000 I var order](https://user-images.githubusercontent.com/22712373/59507914-4ed6ee00-8ea4-11e9-932b-a86deeda7646.png) | ![8000 RS var order](https://user-images.githubusercontent.com/22712373/59507916-4ed6ee00-8ea4-11e9-8e4c-2f3cc9f880bd.png) | ![8000 D var order](https://user-images.githubusercontent.com/22712373/59507912-4ed6ee00-8ea4-11e9-8e13-3f31b5c5520b.png) |
| 16k | ![16000 T var order](https://user-images.githubusercontent.com/22712373/59507927-50a0b180-8ea4-11e9-97b9-d1719023b509.png) | ![16000 I var order](https://user-images.githubusercontent.com/22712373/59507922-50081b00-8ea4-11e9-8d89-7afab3079a03.png) | ![16000 RS var order](https://user-images.githubusercontent.com/22712373/59507925-50081b00-8ea4-11e9-898f-766db834a378.png) | ![16000 D var order](https://user-images.githubusercontent.com/22712373/59507920-4f6f8480-8ea4-11e9-91d1-b9c72a052658.png) |
| 32k | ![32000 T var order](https://user-images.githubusercontent.com/22712373/59507937-51d1de80-8ea4-11e9-9d21-ae5033da3c46.png) | ![32000 I var order](https://user-images.githubusercontent.com/22712373/59507932-51394800-8ea4-11e9-8800-aaf4430c4ab5.png) | ![32000 RS var order](https://user-images.githubusercontent.com/22712373/59507935-51d1de80-8ea4-11e9-923d-8b06bf63c451.png) | ![32000 D var order](https://user-images.githubusercontent.com/22712373/59507930-51394800-8ea4-11e9-9336-aeca6c2bd511.png) |
| 64k | ![64000 T var order](https://user-images.githubusercontent.com/22712373/59507947-539ba200-8ea4-11e9-9090-a95f86e44bcb.png) | ![64000 I var order](https://user-images.githubusercontent.com/22712373/59507941-526a7500-8ea4-11e9-94dc-37c0f4907fce.png) | ![64000 RS var order](https://user-images.githubusercontent.com/22712373/59507944-53030b80-8ea4-11e9-8f6a-d1bad20c0c0b.png) | ![64000 D var order](https://user-images.githubusercontent.com/22712373/59507939-526a7500-8ea4-11e9-913c-dae1831423a6.png) |
| 128k | ![128000 T var order](https://user-images.githubusercontent.com/22712373/59507955-54cccf00-8ea4-11e9-9739-67cfa6b2df8f.png) | ![128000 I var order](https://user-images.githubusercontent.com/22712373/59507951-54343880-8ea4-11e9-94d0-6f243069c19a.png) | ![128000 RS var order](https://user-images.githubusercontent.com/22712373/59507953-54cccf00-8ea4-11e9-987c-97328ed11f6a.png) | ![128000 D var order](https://user-images.githubusercontent.com/22712373/59507949-539ba200-8ea4-11e9-831c-92452bbdd8cb.png) |
| 256k | ![256000 T var order](https://user-images.githubusercontent.com/22712373/59507966-56969280-8ea4-11e9-9519-f7175b4e0559.png) | ![256000 I var order](https://user-images.githubusercontent.com/22712373/59507961-55656580-8ea4-11e9-8622-5c5469712b3d.png) | ![256000 RS var order](https://user-images.githubusercontent.com/22712373/59507963-55fdfc00-8ea4-11e9-9707-27c7cd3d7bb6.png) | ![256000 D var order](https://user-images.githubusercontent.com/22712373/59507957-55656580-8ea4-11e9-90b3-027511e94aad.png) |
| 512k | ![512000 T var order](https://user-images.githubusercontent.com/22712373/59507979-58605600-8ea4-11e9-9bb1-0f95a8576eee.png) | ![512000 I var order](https://user-images.githubusercontent.com/22712373/59507971-572f2900-8ea4-11e9-9415-8641199b2d4f.png) | ![512000 RS var order](https://user-images.githubusercontent.com/22712373/59507974-57c7bf80-8ea4-11e9-8f92-4b24e5272da7.png) | ![512000 D var order](https://user-images.githubusercontent.com/22712373/59507968-572f2900-8ea4-11e9-9e34-cff14a6ae99f.png) |


By the analysis of the above matrix one can see that there is clearly a pattern on __tree insertions__: independent of data set size, the tree with __alpha zero__ will always be the faster, which is comprehensible since no time splits & consequent re-insertions will happen. What is important to notice is the curve that takes shape on all insertions, clearly stating that the order values around the ___[10, 25]___ gama will perform better (up to almost twice as better) than the other order values. It is also interesting to notice that in smaller datasets smaller orders from that gama perform better. For larger datasets bigger orders from the same gama have better performance.

It is not possible to draw any strong conclusion from neither the __deletions__, __insertions__ nor the __searches__ experiments, since all tests are performed in timely fashion in the __scale of dozens of microseconds__. One can state that for smaller datasets, the tree with _alpha zero_ is faster than the remaining, meaning that the overhead introduced to create and manage time splits does not pay off. However, for larger datasets we can see that all alphas have similar performance, with the _alpha zero_ tending to under-perform when compared to the remaining alphas as the data set size increases. Additionally, it is possible to conclude that the alpha values belonging to the afore mentioned gama seem to frequently perform at least has well as the remaining alphas.

It is also important to highlight that when the intervals have characteristics similar to the ones used in the _SI dataset_ - small intervals -, __a tree without time splits can have similar performance to the trees with time splits__.

Concluding, for the remaining _SI dataset_ analysis and for a matter of legibility, we will play close attention to the benchmarking tests with __order__ belonging to the __[10, 25] gama__.

## Alphas

In the following matrix, each column represents a basic operation, and each line represents the datasets where the tests were applied.

| Dataset Size | Tree Insertion | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|:-:|
| 1k | ![1000 T var alpha](https://user-images.githubusercontent.com/22712373/59507892-4bdbfd80-8ea4-11e9-832c-8d441711f7ea.png) | ![1000 I var alpha](https://user-images.githubusercontent.com/22712373/59507888-4b436700-8ea4-11e9-8d87-4cdd4e3bf92d.png) | ![1000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507890-4bdbfd80-8ea4-11e9-93e2-12a3967d6d95.png) | ![1000 D var alpha](https://user-images.githubusercontent.com/22712373/59507885-4aaad080-8ea4-11e9-9627-f172c55e7e22.png) |
| 2k | ![2000 T var alpha](https://user-images.githubusercontent.com/22712373/59507900-4d0d2a80-8ea4-11e9-9fa4-003c0bd2c640.png) | ![2000 I var alpha](https://user-images.githubusercontent.com/22712373/59507896-4c749400-8ea4-11e9-8cbb-1f6840631404.png) | ![2000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507898-4d0d2a80-8ea4-11e9-8e77-135bc2879409.png) | ![2000 D var alpha](https://user-images.githubusercontent.com/22712373/59507894-4c749400-8ea4-11e9-9c36-8fdea9ce17b3.png) |
| 4k | ![4000 T var alpha](https://user-images.githubusercontent.com/22712373/59507908-4e3e5780-8ea4-11e9-8225-100d4deeb9d0.png) | ![4000 I var alpha](https://user-images.githubusercontent.com/22712373/59507904-4da5c100-8ea4-11e9-991c-ac8c380a8224.png) | ![4000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507906-4da5c100-8ea4-11e9-963c-48f041e2b7ff.png) | ![4000 D var alpha](https://user-images.githubusercontent.com/22712373/59507902-4da5c100-8ea4-11e9-9f13-6e364350790e.png) |
| 8k | ![8000 T var alpha](https://user-images.githubusercontent.com/22712373/59507917-4f6f8480-8ea4-11e9-83aa-7021277501a8.png) | ![8000 I var alpha](https://user-images.githubusercontent.com/22712373/59507913-4ed6ee00-8ea4-11e9-90a2-32dc5b23b2f9.png) | ![8000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507915-4ed6ee00-8ea4-11e9-8917-1183fb6ed967.png) | ![8000 D var alpha](https://user-images.githubusercontent.com/22712373/59507911-4e3e5780-8ea4-11e9-83a9-95e6a0ba173a.png) |
| 16k | ![16000 T var alpha](https://user-images.githubusercontent.com/22712373/59507926-50a0b180-8ea4-11e9-9922-1f67e4eb7764.png) | ![16000 I var alpha](https://user-images.githubusercontent.com/22712373/59507921-50081b00-8ea4-11e9-946d-b08f985dd8ca.png) | ![16000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507923-50081b00-8ea4-11e9-9d18-b7ec070469ec.png) | ![16000 D var alpha](https://user-images.githubusercontent.com/22712373/59507919-4f6f8480-8ea4-11e9-86ee-f42cf5e83dfe.png) |
| 32k | ![32000 T var alpha](https://user-images.githubusercontent.com/22712373/59507936-51d1de80-8ea4-11e9-878e-922c85011ca3.png) | ![32000 I var alpha](https://user-images.githubusercontent.com/22712373/59507931-51394800-8ea4-11e9-8988-0940570ca173.png) | ![32000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507933-51394800-8ea4-11e9-98fc-47d403cb72a6.png) | ![32000 D var alpha](https://user-images.githubusercontent.com/22712373/59507929-50a0b180-8ea4-11e9-8754-28ff7c476b03.png) |
| 64k | ![64000 T var alpha](https://user-images.githubusercontent.com/22712373/59507945-53030b80-8ea4-11e9-8827-e5aeb90edace.png) | ![64000 I var alpha](https://user-images.githubusercontent.com/22712373/59507940-526a7500-8ea4-11e9-80f6-269fd092bedd.png) | ![64000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507942-53030b80-8ea4-11e9-8804-a8feb615ced0.png) | ![64000 D var alpha](https://user-images.githubusercontent.com/22712373/59507938-526a7500-8ea4-11e9-9b7a-18562dbbb78b.png) |
| 128k | ![128000 T var alpha](https://user-images.githubusercontent.com/22712373/59507954-54cccf00-8ea4-11e9-8035-97c915980353.png) | ![128000 I var alpha](https://user-images.githubusercontent.com/22712373/59507950-539ba200-8ea4-11e9-90cf-6a64609026c4.png) | ![128000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507952-54343880-8ea4-11e9-86bf-ec093b572f5a.png) | ![128000 D var alpha](https://user-images.githubusercontent.com/22712373/59507948-539ba200-8ea4-11e9-9aa3-394ac9ab7d64.png) |
| 256k | ![256000 T var alpha](https://user-images.githubusercontent.com/22712373/59507965-56969280-8ea4-11e9-9aa7-2814eaadb241.png) | ![256000 I var alpha](https://user-images.githubusercontent.com/22712373/59507958-55656580-8ea4-11e9-8bb1-1a88bfbec958.png) | ![256000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507962-55fdfc00-8ea4-11e9-973e-aaecc9adda81.png) | ![256000 D var alpha](https://user-images.githubusercontent.com/22712373/59507956-54cccf00-8ea4-11e9-816c-757e68f4ddbf.png) |
| 512k | ![512000 T var alpha](https://user-images.githubusercontent.com/22712373/59507976-57c7bf80-8ea4-11e9-9c1c-7499b31bed89.png) | ![512000 I var alpha](https://user-images.githubusercontent.com/22712373/59507969-572f2900-8ea4-11e9-8242-40f00de22a6a.png) | ![512000 RS var alpha](https://user-images.githubusercontent.com/22712373/59507973-57c7bf80-8ea4-11e9-9172-6941fe77c689.png) | ![512000 D var alpha](https://user-images.githubusercontent.com/22712373/59507967-572f2900-8ea4-11e9-9b13-72a75c677c02.png) |

By the analysis of the previous matrix one can again confirm that __tree insertions__ with _alpha zero_ are faster (no time splits are done) in the smaller datasets, with the basic operations also being faster (time splits overhead does not pay off, as seen before).

However, for the bigger datasets we can see that given a certain order, __tree insertions__ seem to perform __independently of the alpha chosen__. We can observe that the order choice seems to have more impact in the tree insertion. We can also state that for smaller datasets __orders 10 & 15__ perform better and for larger ones __orders 20 & 25__ perform better.

Regarding __insertions__, the alphas performance is __very similar__ (micro seconds order) but for the afore mentioned orders, __median values of alpha, such as 0.2, 0.3 and 0.4__ seem to perform slightly better.

Regarding __searches__ and __deletions__, as a consequence of not having time splits, _alpha zero_ will perform worse than the other options. Regarding the remaining alphas, their performance is __very similar__ (micro seconds order) but for the afore mentioned orders, __median values of alpha, such as 0.3 and 0.4__ seem to perform slightly better.

Therefore, for the remaining tests and for a matter of legibility, only benchmarking tests with __alphas__ belonging to the interval ___[0.2, 0.4]_ will be displayed__.

## Big-O Notation

For this phase the __Tree Insertion test won't be considered__ since iterating through all intervals to insert them in the tree is done in linear complexity, meaning the test progression over dataset size can not be evaluated.

In the following table, each column represents a basic operation and each line a different alpha value.

| Alpha | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|
| 0.2 | ![I var dataset a0 2](https://user-images.githubusercontent.com/22712373/59978902-2b651f00-95d9-11e9-9067-ef1988ac3e76.png) | ![RS var dataset a0 2](https://user-images.githubusercontent.com/22712373/59978909-2c964c00-95d9-11e9-90b4-85d7c305d9fe.png) | ![D var dataset a0 2](https://user-images.githubusercontent.com/22712373/59978895-2a33f200-95d9-11e9-9fd9-3f8d41ff4b0e.png) |
| 0.3 | ![I var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978903-2b651f00-95d9-11e9-84d5-751d4c05cdcb.png) | ![RS var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978910-2c964c00-95d9-11e9-8666-015a62eb67cb.png) | ![D var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978896-2acc8880-95d9-11e9-8cad-287bb8426110.png) |
| 0.4 | ![I var dataset a0 4](https://user-images.githubusercontent.com/22712373/59978904-2bfdb580-95d9-11e9-86da-d3ff95783e69.png) | ![RS var dataset a0 4](https://user-images.githubusercontent.com/22712373/59978911-2c964c00-95d9-11e9-8caf-3f765e80f07e.png) | ![D var dataset a0 4](https://user-images.githubusercontent.com/22712373/59978897-2acc8880-95d9-11e9-9ab1-5a71d095ffdc.png) |


As we can see by the analysis of the plots, the __search and delete__ clearly tend to __O(log n)__ performance.

Regarding the __insertions__ it is not so transparent as its behavior is erratic. However, we can say with confidence that from the 3 basic operations insertion is the fastest one, in the test datasets. Its complexity has resemblance to __O(1)__ since in some cases, as seen in the matrix, insertion in a _dataset X_ and a _dataset Y_ 128 times larger than _X_ takes the same time (_variation of 0.02 micro seconds_). However more experiences are needed in other to clearly identify the operation complexity.

One should also take the results with skepticism since in the __micro seconds order minor OS internal processes can impact the performance greatly__.

* # Dataset BI

## Order

In the following matrix, each column represents a basic operation and each line represents the datasets where the tests were applied.

| Dataset Size | Tree Insertion | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|:-:|
| 1k | ![1000 T var order](https://user-images.githubusercontent.com/22712373/59975380-897d0c80-95af-11e9-8a56-603779ae5d9c.png) | ![1000 I var order](https://user-images.githubusercontent.com/22712373/59975376-88e47600-95af-11e9-845d-c2f90fbc6808.png) | ![1000 RS var order](https://user-images.githubusercontent.com/22712373/59975378-88e47600-95af-11e9-9c02-5bcfe170c0ed.png) |  ![1000 D var order](https://user-images.githubusercontent.com/22712373/59975374-88e47600-95af-11e9-889f-3c4acd18bbdd.png) |
| 2k | ![2000 T var order](https://user-images.githubusercontent.com/22712373/59975388-8a15a300-95af-11e9-95f6-03239a35a223.png) | ![2000 I var order](https://user-images.githubusercontent.com/22712373/59975384-8a15a300-95af-11e9-850c-5cc7350380f4.png) | ![2000 RS var order](https://user-images.githubusercontent.com/22712373/59975386-8a15a300-95af-11e9-9cb4-925de9d41a8b.png) | ![2000 D var order](https://user-images.githubusercontent.com/22712373/59975382-897d0c80-95af-11e9-9acb-c1f9d2a20cee.png) |
| 4k | ![4000 T var order](https://user-images.githubusercontent.com/22712373/59975396-8b46d000-95af-11e9-9909-74bc5adf7541.png) | ![4000 I var order](https://user-images.githubusercontent.com/22712373/59975392-8aae3980-95af-11e9-8051-4f3aefdfdbe0.png) | ![4000 RS var order](https://user-images.githubusercontent.com/22712373/59975394-8b46d000-95af-11e9-98f8-86580160ea28.png) | ![4000 D var order](https://user-images.githubusercontent.com/22712373/59975390-8aae3980-95af-11e9-9c51-8eb8e42827b4.png) |
| 8k | ![8000 T var order](https://user-images.githubusercontent.com/22712373/59975404-8c77fd00-95af-11e9-8fd2-53999f092a9c.png) | ![8000 I var order](https://user-images.githubusercontent.com/22712373/59975400-8bdf6680-95af-11e9-9b0d-a472b740a679.png) | ![8000 RS var order](https://user-images.githubusercontent.com/22712373/59975402-8bdf6680-95af-11e9-91cd-5b662520fd5f.png) | ![8000 D var order](https://user-images.githubusercontent.com/22712373/59975398-8bdf6680-95af-11e9-8c02-7534eeb5b87c.png) |
| 16k | ![16000 T var order](https://user-images.githubusercontent.com/22712373/59975412-8d109380-95af-11e9-91f0-e6960453deab.png) | ![16000 I var order](https://user-images.githubusercontent.com/22712373/59975408-8d109380-95af-11e9-8ced-a7924a83551e.png) | ![16000 RS var order](https://user-images.githubusercontent.com/22712373/59975410-8d109380-95af-11e9-80f9-b2fd3b683d0f.png) | ![16000 D var order](https://user-images.githubusercontent.com/22712373/59975406-8c77fd00-95af-11e9-976d-494a4bad6a94.png) |
| 32k | ![32000 T var order](https://user-images.githubusercontent.com/22712373/59975421-8e41c080-95af-11e9-87a0-1cbecd53dd23.png) | ![32000 I var order](https://user-images.githubusercontent.com/22712373/59975416-8e41c080-95af-11e9-8242-48f3c1fc9049.png) | ![32000 RS var order](https://user-images.githubusercontent.com/22712373/59975419-8e41c080-95af-11e9-9822-5583dd53c8c3.png) | ![32000 D var order](https://user-images.githubusercontent.com/22712373/59975414-8da92a00-95af-11e9-8dad-fb1da5955428.png) |
| 64k | ![64000 T var order](https://user-images.githubusercontent.com/22712373/59975429-8f72ed80-95af-11e9-9157-c6cf9b66ec9b.png) | ![64000 I var order](https://user-images.githubusercontent.com/22712373/59975425-8eda5700-95af-11e9-9b52-3e8964e64092.png) | ![64000 RS var order](https://user-images.githubusercontent.com/22712373/59975427-8f72ed80-95af-11e9-956e-280775c06dd2.png) | ![64000 D var order](https://user-images.githubusercontent.com/22712373/59975423-8eda5700-95af-11e9-9c97-1eeaa9bab068.png) |
| 128k | ![128000 T var order](https://user-images.githubusercontent.com/22712373/59975437-90a41a80-95af-11e9-930b-995473ab9c1f.png) | ![128000 I var order](https://user-images.githubusercontent.com/22712373/59975433-900b8400-95af-11e9-9839-362c6fce4c60.png) | ![128000 RS var order](https://user-images.githubusercontent.com/22712373/59975435-900b8400-95af-11e9-917d-4fe68ff95112.png) | ![128000 D var order](https://user-images.githubusercontent.com/22712373/59975431-900b8400-95af-11e9-9d02-e84e06639469.png) |
| 256k | ![256000 T var order](https://user-images.githubusercontent.com/22712373/59975446-91d54780-95af-11e9-9966-edda38da40e5.png) | ![256000 I var order](https://user-images.githubusercontent.com/22712373/59975442-913cb100-95af-11e9-9e66-93e2018fe04f.png) | ![256000 RS var order](https://user-images.githubusercontent.com/22712373/59975444-913cb100-95af-11e9-9e01-c8a5998f5737.png) | ![256000 D var order](https://user-images.githubusercontent.com/22712373/59975439-90a41a80-95af-11e9-9b26-fb3b571bda16.png) |
| 512k | ![512000 T var order](https://user-images.githubusercontent.com/22712373/59975455-93067480-95af-11e9-9ba3-0a4b9270a45e.png) | ![512000 I var order](https://user-images.githubusercontent.com/22712373/59975450-926dde00-95af-11e9-9226-144aabe26004.png) | ![512000 RS var order](https://user-images.githubusercontent.com/22712373/59975453-926dde00-95af-11e9-8572-f7fa9a074e90.png) | ![512000 D var order](https://user-images.githubusercontent.com/22712373/59975448-91d54780-95af-11e9-9540-9625b36452ed.png) |


__Similar to the conclusion obtained in the _SI dataset___, by the analysis of the above matrix one can see that there is clearly a pattern on __tree insertions__: independent of data set size, the tree with __alpha zero__ will, once again, always be the faster, which is comprehensible since no time splits & consequent re-insertions will happen. What is important to notice is the curve that takes shape on all insertions, clearly stating that the order values around the ___[10, 25]___ gama will perform better (up to almost twice as better) than the other order values. It is also interesting to notice that in smaller datasets smaller orders from that gama perform better. For larger datasets bigger orders from the same gama have better performance.

Again, __similar to the conclusion obtained in the _SI dataset___, it is not possible to draw any strong conclusion from neither the __deletions__, __insertions__ nor the __searches__ experiments, since all tests are performed in timely fashion in the __scale of dozens of microseconds__. One can state that for smaller datasets, the tree with _alpha zero_ is faster than the remaining, meaning that the overhead introduced to create and manage time splits does not pay off. However, for larger datasets we can see that all alphas have very similar performance. One can also observe that in __insertions__, independently of the data set size the insertion seems to take always the same amount of time, between __0.20 and 0.20 and 0.25 micro seconds__.

It is also important to highlight that when the intervals have characteristics similar to the ones used in the _BI dataset_ - big and varied intervals -, __a tree without time splits can have similar performance to the trees with time splits__.

Concluding, for the remaining _BI dataset_ analysis and for a matter of legibility, we will play close attention to the benchmarking tests with __order__ belonging to the __[10, 25] gama__.

## Alphas

In the following matrix, each column represents a basic operation, and each line represents the datasets where the tests were applied.

| Dataset Size | Tree Insertion | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|:-:|
| 1k | ![1000 T var alpha](https://user-images.githubusercontent.com/22712373/59975379-897d0c80-95af-11e9-8621-251d3a343aa3.png) | ![1000 I var alpha](https://user-images.githubusercontent.com/22712373/59975375-88e47600-95af-11e9-856e-0fea5eafdff0.png) | ![1000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975377-88e47600-95af-11e9-8825-ae8ea8f13758.png) | ![1000 D var alpha](https://user-images.githubusercontent.com/22712373/59975373-884bdf80-95af-11e9-9532-c8ac3221735d.png) |
| 2k | ![2000 T var alpha](https://user-images.githubusercontent.com/22712373/59975387-8a15a300-95af-11e9-88a0-5f4464f6993c.png) | ![2000 I var alpha](https://user-images.githubusercontent.com/22712373/59975383-897d0c80-95af-11e9-95da-e191c8468570.png) | ![2000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975385-8a15a300-95af-11e9-8b36-c3a934dbdec5.png) | ![2000 D var alpha](https://user-images.githubusercontent.com/22712373/59975381-897d0c80-95af-11e9-91c7-976d6c9ce6fb.png) |
| 4k | ![4000 T var alpha](https://user-images.githubusercontent.com/22712373/59975395-8b46d000-95af-11e9-94b6-9d47cdadb4b3.png) | ![4000 I var alpha](https://user-images.githubusercontent.com/22712373/59975391-8aae3980-95af-11e9-8a91-46b6dfd4747a.png) | ![4000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975393-8aae3980-95af-11e9-8ed4-10a76a319c36.png) | ![4000 D var alpha](https://user-images.githubusercontent.com/22712373/59975389-8aae3980-95af-11e9-83dc-57856ebd131d.png) |
| 8k | ![8000 T var alpha](https://user-images.githubusercontent.com/22712373/59975403-8c77fd00-95af-11e9-981a-7c054a719eb8.png) | ![8000 I var alpha](https://user-images.githubusercontent.com/22712373/59975399-8bdf6680-95af-11e9-95f3-1033fac6dddf.png) | ![8000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975401-8bdf6680-95af-11e9-8fc6-a03a90e33d18.png) | ![8000 D var alpha](https://user-images.githubusercontent.com/22712373/59975397-8b46d000-95af-11e9-92de-3dd5dd290f24.png) |
| 16k | ![16000 T var alpha](https://user-images.githubusercontent.com/22712373/59975411-8d109380-95af-11e9-8e05-c312fad7ecfa.png) | ![16000 I var alpha](https://user-images.githubusercontent.com/22712373/59975407-8c77fd00-95af-11e9-9ac1-4444a7de9dcd.png) | ![16000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975409-8d109380-95af-11e9-84fb-c68ba92593d7.png) | ![16000 D var alpha](https://user-images.githubusercontent.com/22712373/59975405-8c77fd00-95af-11e9-81d8-0a7a0c54b30c.png) |
| 32k | ![32000 T var alpha](https://user-images.githubusercontent.com/22712373/59975420-8e41c080-95af-11e9-8501-76267fd56607.png) | ![32000 I var alpha](https://user-images.githubusercontent.com/22712373/59975415-8da92a00-95af-11e9-81e7-aa44086cea36.png) | ![32000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975417-8e41c080-95af-11e9-94ec-dce50192ef87.png) | ![32000 D var alpha](https://user-images.githubusercontent.com/22712373/59975413-8da92a00-95af-11e9-9d1e-5f2a394aba04.png) |
| 64k | ![64000 T var alpha](https://user-images.githubusercontent.com/22712373/59975428-8f72ed80-95af-11e9-8da5-7d800a987e28.png) | ![64000 I var alpha](https://user-images.githubusercontent.com/22712373/59975424-8eda5700-95af-11e9-9e5d-b717283211b1.png) | ![64000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975426-8f72ed80-95af-11e9-95ad-4e1954748456.png) | ![64000 D var alpha](https://user-images.githubusercontent.com/22712373/59975422-8eda5700-95af-11e9-9e96-bc0e116cdd82.png) |
| 128k | ![128000 T var alpha](https://user-images.githubusercontent.com/22712373/59975436-90a41a80-95af-11e9-9677-44ba1e03e81c.png) | ![128000 I var alpha](https://user-images.githubusercontent.com/22712373/59975432-900b8400-95af-11e9-9dd2-a5cc37b5199a.png) | ![128000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975434-900b8400-95af-11e9-8926-899dad4895f5.png) | ![128000 D var alpha](https://user-images.githubusercontent.com/22712373/59975430-8f72ed80-95af-11e9-918f-62ab7e5ddf37.png) |
| 256k | ![256000 T var alpha](https://user-images.githubusercontent.com/22712373/59975445-91d54780-95af-11e9-8efe-af151fad17f3.png) | ![256000 I var alpha](https://user-images.githubusercontent.com/22712373/59975441-913cb100-95af-11e9-8d88-09119080b67a.png) | ![256000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975443-913cb100-95af-11e9-8b5e-248a77722a7e.png) | ![256000 D var alpha](https://user-images.githubusercontent.com/22712373/59975438-90a41a80-95af-11e9-8417-929488aeff79.png) |
| 512k | ![512000 T var alpha](https://user-images.githubusercontent.com/22712373/59975454-93067480-95af-11e9-8ad9-fed4bed11763.png) | ![512000 I var alpha](https://user-images.githubusercontent.com/22712373/59975449-91d54780-95af-11e9-8c23-9ae4f3c26d42.png) | ![512000 RS var alpha](https://user-images.githubusercontent.com/22712373/59975451-926dde00-95af-11e9-8336-cdf69c475557.png) | ![512000 D var alpha](https://user-images.githubusercontent.com/22712373/59975447-91d54780-95af-11e9-9542-fabaa1ccd79d.png) |

__Similar to the conclusion drawn in the _SI dataset___, by the analysis of the previous matrix one can again confirm that __tree insertions__ with _alpha zero_ are faster (no time splits are done) in the smaller datasets, with the basic operations also being faster (time splits overhead does not pay off, as seen before).

Again, __similar to the conclusion drawn in the _SI dataset___, for the bigger datasets we can see that given a certain order, __tree insertions__ seem to perform __independently of the alpha chosen__. We can observe that the order choice seems to have more impact in the tree insertion. We can also state that for smaller datasets __orders 10 & 15__ perform better and for larger ones __orders 20 & 25__ perform better.

Regarding __insertions__, __searches__ and __deletions__, ___alpha zero_ is able to surprisingly maintain a competitive performance__ when compared ot the remaining alphas. Regarding the remaining alphas, their performance is __very similar__ (micro seconds order) but for the afore mentioned orders, __median values of alpha, such as 0.3 and 0.4__ seem to perform at least as well as any other alpha value, so they are a valid choice for the alpha values.

Therefore, for the remaining tests and for a matter of legibility, only benchmarking tests with __alphas__ belonging to the interval ___[0.2, 0.4]_ will be displayed__, as well as the special value of __alpha zero__.

## Big-O Notation

Once again, for this phase the __Tree Insertion test won't be considered__ since iterating through all intervals to insert them in the tree is done in linear complexity, meaning the test progression over dataset size can not be evaluated.

In the following table, each column represents a basic operation and each line a different alpha value.

| Alpha | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|
| 0 | ![I var dataset a0](https://user-images.githubusercontent.com/22712373/59979075-bc88c580-95da-11e9-8cef-75ed2b935036.png) | ![RS var dataset a0](https://user-images.githubusercontent.com/22712373/59979076-bc88c580-95da-11e9-8238-4f1385e9a767.png) | ![D var dataset a0](https://user-images.githubusercontent.com/22712373/59979074-bc88c580-95da-11e9-9b42-45d20b7bb5aa.png) |
| 0.2 | ![I var dataset a0 2](https://user-images.githubusercontent.com/22712373/59978856-d5907700-95d8-11e9-84d6-e9e3478a85a3.png) | ![RS var dataset a0 2](https://user-images.githubusercontent.com/22712373/59978863-d6c1a400-95d8-11e9-911d-6a3a4754957f.png) | ![D var dataset a0 2](https://user-images.githubusercontent.com/22712373/59978849-d4f7e080-95d8-11e9-8e2a-313399c4271e.png) |
| 0.3 | ![I var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978857-d6290d80-95d8-11e9-84d7-a7ae134ef59a.png) | ![RS var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978864-d6c1a400-95d8-11e9-83c1-a883d863f544.png) | ![D var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978850-d4f7e080-95d8-11e9-85ab-990a2a24b113.png) |
| 0.4 | ![I var dataset a0 4](https://user-images.githubusercontent.com/22712373/59978858-d6290d80-95d8-11e9-90a3-412cbcceb00f.png) | ![RS var dataset a0 4](https://user-images.githubusercontent.com/22712373/59978865-d6c1a400-95d8-11e9-8ef5-bdea80946743.png) | ![D var dataset a0 4](https://user-images.githubusercontent.com/22712373/59978851-d4f7e080-95d8-11e9-9ce6-8100e25c7cc7.png) |

As we can see by the analysis of the plots, the __search and delete__ clearly tend to __O(log n)__ performance.

Regarding the __insertions__ it is not so transparent as its behavior is erratic. However, we can say with confidence that from the 3 basic operations insertion is the fastest one, in the test datasets. Its complexity has resemblance to __O(1)__ since in some cases, as seen in the matrix, insertion in a _dataset X_ and a _dataset Y_ 128 times larger than _X_ takes the same time (_variation of 0.02 micro seconds, as seen before_). However more experiences are needed in other to clearly identify the operation complexity.

One should also take the results with skepticism since in the __micro seconds order minor OS internal processes can impact the performance greatly__.

* # Small Intervals (SI) vs Big Intervals (BI)

In the following table, each column represents a basic operation and each line a different alpha value. Each element of the table presents a comparison of the sames tests in the _SI dataset_ and the _BI dataset_. The plot lines whose name starts with `SI_` are referent to the _SI dataset_ while the ones starting with `BI_` refer to the _BI dataset_.

| Alpha | Insertion | Range Search | Deletion |
|:-:|:-:|:-:|:-:|
| 0.2 | ![I var dataset a0 2](https://user-images.githubusercontent.com/22712373/59979173-032aef80-95dc-11e9-8f3c-b9cf5e0ca59a.png) | ![RS var dataset a0 2](https://user-images.githubusercontent.com/22712373/59979176-032aef80-95dc-11e9-801e-e9fc241ee060.png) | ![D var dataset a0 2](https://user-images.githubusercontent.com/22712373/59979170-02925900-95dc-11e9-9569-ffa1eacc426d.png) |
| 0.3 | ![I var dataset a0 3](https://user-images.githubusercontent.com/22712373/59979174-032aef80-95dc-11e9-864e-9929331957c9.png) | ![RS var dataset a0 3](https://user-images.githubusercontent.com/22712373/59979177-032aef80-95dc-11e9-9cf0-1d841ce73919.png) | ![D var dataset a0 3](https://user-images.githubusercontent.com/22712373/59979171-02925900-95dc-11e9-8551-38b768c331d5.png) |
| 0.4 | ![I var dataset a0 4](https://user-images.githubusercontent.com/22712373/59979175-032aef80-95dc-11e9-9157-901ac14aeb28.png) | ![RS var dataset a0 4](https://user-images.githubusercontent.com/22712373/59979178-03c38600-95dc-11e9-8b72-62464b1f6798.png) | ![D var dataset a0 4](https://user-images.githubusercontent.com/22712373/59979172-02925900-95dc-11e9-80a5-8346e7f07667.png) |


By the analysis of the plots we can state that independently of the dataset size or the type and variety of intervals used, __insertions__ will have the previously referred ___constant performance___, always taking between __0.17 & 0.20 microseconds__.

Regarding __range search__, one can observe that the type and variety of intervals used has a major impact on the operation performance. We can see that the in the _BI dataset_ the range search performance is approximately 50 times slower than the _SI dataset_ performance. A plausible justification is that the usage of time-splits in the _BI dataset_ will make much more partitions than the usage of time-splits in the _SI dataset_, therefore increasing the number of nodes being indexed and searched greatly.

Similarly to range search, __deletion__ performance also suffers with the increase of the variety and size of the stored intervals. However, the impact caused is much smaller when compared to range search, since the deletion performance in the _Bi dataset_ is approximately 4 times slower than the _SI dataset performance_.

---

# Conclusions

* By the benchmarking analysis the tree seems to have great performance (__micro seconds order__) but be aware that the tests are run in a 'best-case scenario environment'. Additionally, outliers and variances can be found since in the micro seconds order minor OS internal processes can impact the performance greatly.
* __Order choice__ has a much stronger impact on performance than does the __alpha choice__.
* __Orders__ belonging to the lower gama __[10, 25]__ seem to be the ones performing better. However, inside that same gama, lower values perform better in smaller datasets and bigger values perform better in bigger datasets.
* __Alphas__ belonging to the median gama __[0.2, 0.4]__ seem to be the ones performing better.
* When the Intervals being stored in the tree have a small duration, __alpha 0__ is able to outperform the remaining alphas in smaller datasets, as the overheard of handling time-splits doesn't pay off.
* __Search__ and __Deletion__ perform in __O(log n)__.
* __Insertions__ do not follow a clear _Big-O Notation_ but can be stated to be the fastest operation in the given test datasets. Its complexity seems to resemblance __O(1)__ but more studies are needed in order to verify it.
* __Insertions__ are not impacted by the type of Intervals being inserted.
* __Search__ and __Deletion__ are impacted by the type of Intervals being used. Intervals that are bigger and more varied decrease performance. The __search__ operation is far more dependent of the Intervals topology than the __delete__ operation, as it was verified that search got up to 50 times slower, while deletion only got up to 4 times slower. 
