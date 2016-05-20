import csv, sys, json

# creating json files
def createJson(data_list, sub):
    # convert the list to JSON format
    json_str = json.dumps(data_list, indent = 4, ensure_ascii=False)

    jsonfile = 'D3LinkedViews%s.json' %sub
    with open(jsonfile, 'w') as f:
        try:
            f.write(json_str)
        except csv.Error as e:
            sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

# searching for the country code
def getCountryCode(country):
    for i in range(len(codedict)):
        if codedict[i][0].lower() == country.lower():
            return codedict[i][1]

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

# format the dictionary to a list of key-value pairs
data_list_population = [] 
data_list_lifeExpectancy = []
data_list_wellBeing = [] 
data_list_ecologicalFootprint = [] 
data_list_hpi = []

for i in range(len(mydict)):
    country = mydict[i][0]
    population = int(mydict[i][5])
    lifeExpectancy = float(mydict[i][1].replace(',','.'))
    wellBeing = float(mydict[i][2].replace(',','.'))
    ecologicalFootprint = float(mydict[i][3].replace(',','.'))
    hpi = float(mydict[i][4].replace(',','.'))
   
    # give values a different fillKey
    if population >= 1000000000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "h10"}})
    elif population >= 200000000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "h9"}})
    elif population >= 100000000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "h8"}})
    elif population >= 75000000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "m7"}})
    elif population >= 50000000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "m6"}})
    elif population >= 2500000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "m5"}})
    elif population >= 1000000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "l4"}})
    elif population >= 500000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "l3"}})
    elif population < 500000:
        data_list_population.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "l2"}})
    
    if lifeExpectancy >= 75:
        data_list_lifeExpectancy.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "lf_good"}})
    elif lifeExpectancy >= 60 and lifeExpectancy < 75:
        data_list_lifeExpectancy.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "lf_middle"}})
    elif lifeExpectancy < 60:
        data_list_lifeExpectancy.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "lf_poor"}})
        
    if wellBeing >= 6.2:
        data_list_wellBeing.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "wb_good"}})
    elif wellBeing >= 4.8 and wellBeing < 6.2:
        data_list_wellBeing.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "wb_middle"}})
    elif wellBeing < 4.8:
        data_list_wellBeing.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "wb_poor"}})
       
    if ecologicalFootprint <= 1.78:
        data_list_ecologicalFootprint.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "ef_good"}})
    elif ecologicalFootprint > 1.78 and ecologicalFootprint < 3.56:
        data_list_ecologicalFootprint.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "ef_middle"}})
    elif ecologicalFootprint >= 3.56 and ecologicalFootprint < 7.12:
        data_list_ecologicalFootprint.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "ef_poor"}})
    elif ecologicalFootprint > 7.12:
        data_list_ecologicalFootprint.append({getCountryCode(mydict[i][0]): {"country": country, "population": population, "lifeExpectancy": lifeExpectancy, "wellBeing": wellBeing, "ecologicalFootprint": ecologicalFootprint, "hpi": hpi, "fillKey": "ef_deep_red"}})

createJson(data_list_population, "_pop")
createJson(data_list_lifeExpectancy, "_lf")
createJson(data_list_wellBeing, "_wb")
createJson(data_list_ecologicalFootprint, "_ef")
