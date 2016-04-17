import csv, sys, json

# open csv file and read it into a dictionary
csvfile = 'population.csv'
with open(csvfile, 'rb') as f:
    reader = csv.reader(f, delimiter=';')
    try:
        mydict = dict(reader)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

# format the dictionary to a list of key-value pairs
data_list = []
for key in mydict:
    data_list.append({"country": key, "data": mydict[key]})

# convert the list to JSON format
json_str = json.dumps(data_list, ensure_ascii=False)
