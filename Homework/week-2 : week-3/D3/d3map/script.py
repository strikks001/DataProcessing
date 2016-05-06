#script.py
#
#Computer Science
#Data Processing Part 2
#
#Script to convert a csv file to JSON
#
#Sanne Strikkers
#11170816


import csv, sys, json

# open csv file and read it into a dictionary
csvfile = 'population.csv'
with open(csvfile, 'r') as f:
    reader = csv.reader(f, delimiter=',')
    try:
        mydict = list(reader)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))
        
# format the dictionary to a list of key-value pairs
data_list = []
for index in range(len(mydict)):
    # split information into variables
    population = int(mydict[index][2])
    country = mydict[index][0]
    code = mydict[index][1]
    
    # give values a different fillKey
    if (population >= 1000000):
        data_list.append({code: {"fillKey": "h10", "country": country, "population": population}})
    elif (population >= 200000 and population < 1000000):
        data_list.append({code: {"fillKey": "h9", "country": country, "population": population}})
    elif (population >= 100000 and population < 200000):
        data_list.append({code: {"fillKey": "h8", "country": country, "population": population}})
    elif (population >= 75000 and population < 100000):
        data_list.append({code: {"fillKey": "m7", "country": country, "population": population}})
    elif (population >= 50000 and population < 75000):
        data_list.append({code: {"fillKey": "m6", "country": country, "population": population}})
    elif (population >= 2500 and population < 50000):
        data_list.append({code: {"fillKey": "m5", "country": country, "population": population}})
    elif (population >= 1000 and population < 2500):
        data_list.append({code: {"fillKey": "l4", "country": country, "population": population}})
    elif (population >= 500 and population < 1000):
        data_list.append({code: {"fillKey": "l3", "country": country, "population": population}})
    elif (population < 500):
        data_list.append({code: {"fillKey": "l2", "country": country, "population": population}})
        
# convert the list to JSON format
json_str = json.dumps(data_list, sort_keys=True, indent=4, ensure_ascii=False)

jsonfile = 'data.json'
with open(jsonfile, 'w') as f:
    try:
        f.write(json_str)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

