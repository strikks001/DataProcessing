import csv, sys, json

# open tsv file and read it into a dictionary
tsvfile = 'D3LinkedViews.tsv'
country_codes = 'country_codes.tsv'
with open(tsvfile, 'r') as f, open(country_codes, 'r') as c:
    reader = csv.reader(f, delimiter='\t')
    reader2 = csv.reader(c, delimiter='\t')
    # ignore first line
    next(reader, None)
    next(reader2, None)
    try:
        mydict = list(reader)
        codedict = list(reader2)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

def getCountryCode(country):
    for i in range(len(codedict)):
        if codedict[i][0].lower() == country.lower():
            return codedict[i][1]

# format the dictionary to a list of key-value pairs
data_list = []  
for i in range(len(mydict)):
    data_list.append({getCountryCode(mydict[i][0]): {"country": mydict[i][0], "population": mydict[i][5], "lifeExpectancy": mydict[i][1], "wellBeing": mydict[i][2], "ecologicalFootprint": mydict[i][3], "hpi": mydict[i][4], "fillKey": ""}})

# convert the list to JSON format
json_str = json.dumps(data_list, indent = 4, ensure_ascii=False)

jsonfile = 'D3LinkedViews.json'
with open(jsonfile, 'w') as f:
    try:
        f.write(json_str)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))