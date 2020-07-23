# Improved Interval B+ tree implementation (_I2B+ tree_)

[![BCH compliance](https://bettercodehub.com/edge/badge/EdgarACarneiro/I2Bplus-tree?branch=master&token=6eb26f12342d4d3648bf704878204af9fc8d1080)](https://bettercodehub.com/)
[![Build Status](https://travis-ci.com/EdgarACarneiro/I2Bplus-tree.svg?token=J52cxsfW92GANe4gUJgy&branch=master)](https://travis-ci.com/EdgarACarneiro/I2BplusTree)
[![Coverage Status](https://coveralls.io/repos/github/EdgarACarneiro/I2Bplus-tree/badge.svg)](https://coveralls.io/github/EdgarACarneiro/I2Bplus-tree)

The ___Interval B+ tree (IB+ tree)___ is a valid-time indexing structure, first introduced by [Bozkaya and Ozsoyoglu](https://www.researchgate.net/publication/221465339_Indexing_Valid_Time_Intervals). This indexing structure appears as a time-efficient indexing structure for the management of valid-time/ intervals.

In this repository, we present the ___Improved Interval B+ tree (I2B+ tree)___, an indexing structure based on the _IB+ tree_, but with minor structural changes to improve the performance of the deletion operation. For a more detailed analysis of the _I2B+ tree_, refer to the paper published in the [CISTI'2020 Conference](http://www.cisti.eu), available at [__IEEE__](https://ieeexplore.ieee.org/document/9140897).

This structure performs all operations (insertion, search and deletion) with logarithmic performance (_O (log n)_). Documentation is available [here](https://edgaracarneiro.github.io/I2Bplus-tree/).

| Insertion | Range Search | Deletion |
|:-:|:-:|:-:|
| ![I var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978857-d6290d80-95d8-11e9-84d7-a7ae134ef59a.png) | ![RS var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978864-d6c1a400-95d8-11e9-83c1-a883d863f544.png) | ![D var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978850-d4f7e080-95d8-11e9-85ab-990a2a24b113.png) |

For an in-depth analysis of both the parameter tuning (such as the tree's order or the time-splits alpha value) and the conclusions obtained from the performance analysis of the _I2B+ tree_, check the [benchmarks folder](https://github.com/EdgarACarneiro/IBplusTree/tree/master/benchmarks).

# Usage

To suit the _I2BplusTree_ to your needs, implement a class that __extends the [FlatInterval](https://github.com/EdgarACarneiro/IBplusTree/blob/master/src/FlatInterval.ts)__ class, defining the information that will be stored on leaves there. One might also want to override the `equals` method, thus allowing the incorporation of the extra information stored in the Intervals in comparisons.


# Acknowledgements

This work was financed by the ERDF – European Regional Development Fund through the Operational Programme for Competitiveness and Internationalisation - COMPETE 2020 Programme and by National Funds through the Portuguese funding agency, FCT - Fundação para a Ciência e a Tecnologia within project PTDC/CCI-INF/32636/2017 (POCI-01-0145-FEDER-032636).

This work is also part of [MOST](http://most.web.ua.pt).

# Citation

> E. Carneiro, A. V. d. Carvalho and M. A. Oliveira, "I2B+tree: Interval B+ tree variant towards fast indexing of time-dependent data," 2020 15th Iberian Conference on Information Systems and Technologies (CISTI), Sevilla, Spain, 2020, pp. 1-7, doi: 10.23919/CISTI49556.2020.9140897.
