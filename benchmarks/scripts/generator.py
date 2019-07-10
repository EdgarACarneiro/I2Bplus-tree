import os

import scipy
import scipy.stats as st

import matplotlib
import matplotlib.pyplot as plt

"""Initial timestamp for datsets intervals"""
START = 0

"""Frequency of Intervals per timestamp"""
INT_FREQ = 10

"""Array containing sizes for the datasets that shall be created"""
SIZES = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000]

"""Mean duration for Intervals, following a Normal Distribution"""
DURATION = 1095

"""Standard Deviation for Intervals duration, following a Normal Distribution"""
STANDARD_DEVIATION = 200

"""The saving_dir for the associated dataset"""
SAVING_DIR = '../datasets'


def create_dir(dir_name: str):
    """Creates a directory wth the given name if it does not exist"""
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)


def save_plot(name: str, location: str):
    """Save the current plt's plot in the saving_directory"""
    plt.savefig('%s/%s.png' % (location, name))


def save_dataset(name: str, dataset: list, location: str):
    """Save the current datasetv in a .csv file"""
    with open("%s/%s.csv" % (location, name), "w+") as fd:
        for [lb, up] in dataset:
            fd.write("%d %d\n" % (lb, up))


def get_interval_end(start: int, duration=DURATION, std=STANDARD_DEVIATION) -> int:
    """Gets the upperbound for the interval starting at 'start'
    following a normal distribution with the above configurations"""
    return start + int(st.norm(duration, std).rvs(1)[0])


def create_dataset_lbs(size, start=START, ifreq=INT_FREQ) -> list:
    """Creates a dataset with the intervals lower bounds,
    following a uniform distribtuion, according to the
    given parameters"""
    return map(lambda el: int(el),
               st.uniform(start, int(size / ifreq)).rvs(size))


def create_histograms(dataset: list, location: list) -> (tuple, tuple):
    """Create and save the histograms referent to the given dataset.
    Creates one with Intervals starting times named 'Start-times' &
    creates another with the Intervals durations named 'Durations"""
    starts = []
    durations = []

    for [start, end] in dataset:
        starts.append(start)
        durations.append(end - start)

    plt.hist(starts, alpha=0.8, bins="rice", label='Start times',
             rwidth=0.8 if len(dataset) < 20000 else 0.6)
    plt.legend(loc='upper right')
    save_plot("Start-times", location)

    plt.clf()

    plt.hist(durations, alpha=0.8,
             label='Durations', color='orange', rwidth=0.8)
    plt.legend(loc='upper right')
    save_plot("Durations", location)

    plt.clf()


create_dir(SAVING_DIR)

# Create dataset for each of the given sizes

for size in SIZES:
    print("::: Creating DataSet %d :::\n\t...\n" % size)

    ds_dir = '%s/%d' % (SAVING_DIR, size)
    create_dir(ds_dir)

    ds = [(start, get_interval_end(start))
          for start in create_dataset_lbs(size)]

    save_dataset(size, ds, ds_dir)
    create_histograms(ds, ds_dir)
