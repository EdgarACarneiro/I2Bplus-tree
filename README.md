# Interval B+ tree implementation

[![BCH compliance](https://bettercodehub.com/edge/badge/EdgarACarneiro/IBplusTree?branch=master&token=c449d489bdfdd5280d12b3886c2bbfe9b8bdcc28)](https://bettercodehub.com/)
[![Build Status](https://travis-ci.com/EdgarACarneiro/IBplusTree.svg?token=J52cxsfW92GANe4gUJgy&branch=master)](https://travis-ci.com/EdgarACarneiro/IBplusTree)

The __Interval B+ tree__ is a valid-time indexing structure, first introduced by [Bozkaya and Ozsoyoglu](https://www.researchgate.net/publication/221465339_Indexing_Valid_Time_Intervals). This structure performs all operations (insertion, search and deletion) with logarithmic performance (_O (log n)_).

| Insertion | Range Search | Deletion |
|:-:|:-:|:-:|
| ![I var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978857-d6290d80-95d8-11e9-84d7-a7ae134ef59a.png) | ![RS var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978864-d6c1a400-95d8-11e9-83c1-a883d863f544.png) | ![D var dataset a0 3](https://user-images.githubusercontent.com/22712373/59978850-d4f7e080-95d8-11e9-85ab-990a2a24b113.png) |

For an in-depth analysis of parameter tunning, such as the tree's order or the time-splits alpha value, check the [benchmarks folder](https://github.com/EdgarACarneiro/IBplusTree/tree/master/benchmarks).

# Usage

To suit the _IBplusTree_ to your needs, implement a class that __extend the [FlatInterval](https://github.com/EdgarACarneiro/IBplusTree/blob/master/src/FlatInterval.ts)__ class, defining the information that will be on leaves there. Notice that you might also want to override the equals, since you might want the extra information being stored in the Intervals to be used in comparisons.


# Important Considerations

For faster implementation and to simplify the deletion algorithm, and since the complexity does not seem to suffer from it, pointers to the left and right siblings in each layer of the tree were added. 

In a B+ tree normally there are only pointers in the Leafs to the right sibling. 

In the deletion algorithm one needs the left/ right sibling for borrows and merges. With inexistent left / right sibling pointers (that are very easy to maintain) one needs to travel to the siblings through the common ancestor (which in some cases implies travelling to the root and back again).

# Npm usage

