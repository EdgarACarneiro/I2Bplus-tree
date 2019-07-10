import argparse
import re
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import os


ap = argparse.ArgumentParser()
ap.add_argument('-i', '--input', type=str,
                default='../results/logs.csv', help='Input file containing the logs')
ap.add_argument('-o', '--output', type=str,
                default='../plots', help='Output directory for the plots')

args = vars(ap.parse_args())

SAVING_DIR = args['output']

sns.set()


def print_datasets(datasets: dict) -> None:
    for size, dataset in datasets.items():
        print(size)
        for name, time in dataset.items():
            print('\t' + name + ': ' + str(time))


def getParameterDomain(parameter: str, dataset: dict) -> dict:
    """Get the possible values for a given parameter ('o' or 'a')"""
    results = re.findall(
        re.compile(
            parameter + r"(.[\d.]*)"
        ), str(dataset)
    )

    # Dictionary first to avoid duplicates
    return sorted(list({match for match in results}))


def extract(regex: str, data: dict) -> (list, list):
    """Extracts data from one dataset according to the given regex.
    Returns a pair (domain, values).
    The 1st capturing group of the regex must be the varying parameter
    and the second the value."""
    results = re.findall(re.compile(regex), str(data))
    domain = []
    values = []

    for match in results:
        domain.append(float(match[0]))
        values.append(float(match[1]))

    return (domain, values)


def extract_all(regex: str, data: dict) -> (list, list):
    """Extracts data from all the datasets according to the given regex.
    Returns a pair (domain, values), where domain will be the dataset's size.
    Assumes regex only gets one element per dataset.
    The 1st caputring group of the regex must be the value."""
    domain = []
    values = []

    for length, dataset in data.items():
        domain.append(length)
        values.append(
            float(re.findall(
                re.compile(regex), str(dataset)
            )[0])
        )

    return (domain, values)


def create_plot(title: str, xlabel: str, ylabel: str, domain: list, *data):
    """Creates and Saves a 'Spagetti plot' with the given title, horizontal
    label, vertical label, domain and functions (name and values) presented
    in the data array. Plot saved to constant SAVING_DIR/plot_name"""
    agg_data = {'x': domain}
    agg_data.update({fn[0]: fn[1]
                     for fn
                     in data})
    df = pd.DataFrame(agg_data)

    plt.clf()
    sns.set_palette("RdYlBu", len(data))

    # multiple line plot
    for column in df.drop('x', axis=1):
        plt.plot(df['x'], df[column], marker='.',
                 linewidth=1, alpha=1, label=column)

    plt.legend(loc=4, ncol=2)
    plt.title(title, loc='left',
              fontsize=12, fontweight=0, color='black')
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.gca().set_ylim(bottom=0)

    if not os.path.exists(SAVING_DIR):
        os.makedirs(SAVING_DIR)
    plt.savefig(SAVING_DIR + '/' + title + '.png')


def create_plot_parameter(title: str,
                          xlabel: str,
                          ylabel: str,
                          regexes: (str, str),
                          name: str,
                          parameter_domain: list,
                          dataset: dict,
                          ext_all=False):
    """Creates all possible functions according to a given
    parameter and the plot domain. Then it calls the create_plot
    with the adequate parameters."""
    functions = []
    var_domain = None

    for val in parameter_domain:
        # for ds_type in ["BI_", "SI_"]:  # For testing different type of datasets
        regex = regexes[0] + val + regexes[1]  # Add ds_type

        # 1st iteration
        if var_domain == None:
            var_domain = extract_all(regex, dataset)[0]\
                if ext_all else extract(regex, dataset)[0]

        functions.append((
            name + val,  # Add ds_type
            extract_all(regex, dataset)[1]
            if ext_all else extract(regex, dataset)[1]
        ))

    create_plot(title, xlabel, ylabel, var_domain, *functions)


datasets = {}
with open(args['input'], 'r') as file:
    curr_dataset = {}
    curr_name = 0

    for line in file:
        data = line.strip().split(' ')

        if len(data) == 2:
            curr_dataset[data[0]] = float(data[1])

        elif len(data) == 1:
            if not curr_name == 0:
                datasets[curr_name] = curr_dataset

            curr_name = int(data[0])
            curr_dataset = {}

        else:
            raise Exception('Tryng to parse unexpected data.')

    # Adding dataset that was processed when file ended
    datasets[curr_name] = curr_dataset

# print_datasets(datasets)
first_key = next(iter(datasets))

# ['10', '15', '20', '25']
orders = getParameterDomain('o', datasets[first_key])
# ['0', '0.2', '0.3', '0.4']
alphas = getParameterDomain('a', datasets[first_key])

type_tests = ['T', 'I', 'D', 'RS']

for test in type_tests:
    for name, dataset in datasets.items():
        create_plot_parameter("%s %s var alpha" % (str(name), test),
                              "alpha",
                              "time (ms)",
                              ("%s_o" % test,
                               r"_a(.[\d.]*)#test': (.[\d.]*)"),
                              '%s o' % test,
                              orders,
                              dataset)
        create_plot_parameter("%s %s var order" % (str(name), test),
                              "order",
                              "time (ms)",
                              (test + r"_o(.\d*)_a",
                               r"#test': (.[\d.]*)"),
                              '%s a' % test,
                              alphas,
                              dataset)

    for order in orders:
        create_plot_parameter("%s var dataset o%s" % (test, order),
                              "dataset size",
                              "time (ms)",
                              ("%s_o%s_a" % (test, order),
                               r"#test': (.[\d.]*)"),
                              '%s o%s a' % (test, order),
                              alphas,
                              datasets,
                              True)

    for alpha in alphas:
        create_plot_parameter("%s var dataset a%s" % (test, alpha),
                              "dataset size",
                              "time (ms)",
                              ("%s_o" % test, "_a%s" % alpha +
                               r"#test': (.[\d.]*)"),
                              '%s a%so' % (test, alpha),
                              orders,
                              datasets,
                              True)
