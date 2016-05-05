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
    data_list.append({"code": mydict[index][1], "country": mydict[index][0], "population": mydict[index][2]})

# print data_list
   
# convert the list to JSON format
json_str = json.dumps(data_list, ensure_ascii=False)

jsonfile = 'data.json'
with open(jsonfile, 'w') as f:
    try:
        f.write(json_str)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))
