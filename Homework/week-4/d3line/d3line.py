# script.py
#
# Computer Science
# D3line
#
# Script to convert a tsv file to JSON
#
# Sanne Strikkers
# 11170816

import csv, sys, json

def writeToFile(data_list, city):
    # convert the list to JSON format
    json_str = json.dumps(data_list, sort_keys=True, indent=4, ensure_ascii=False)
    
    # write to file
    jsonfile = 'd3line%s.json' %city
    with open(jsonfile, 'w') as f:
        try:
            f.write(json_str)
        except csv.Error as e:
            sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

# open tsv file and read it into a dictionary
tsvfile = 'd3line_weather.tsv'
with open(tsvfile, 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    # ignore first line
    next(reader, None)
    try:
        mydict = list(reader)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))
        
# format the dictionary to a list of key-value pairs
data_list_schiphol = []
data_list_bilt = []
data_list_maastricht = []

for index in range(len(mydict)):
    # split information into variables
    city = mydict[index][0]
    date = mydict[index][1]
    avgTemp = mydict[index][2]
    minTemp = mydict[index][3]
    maxTemp = mydict[index][4]
    
    # convert the date to yyyy-mm-dd instead of yyyymmdd
    year = date[0:4]
    year += "-"
    month = date[4:6]
    month += "-"
    day = date[6:8]
    date = year + month + day
    
    # set the cities (numbers) to a real name
    if city == "240":
        city = "Schiphol"
        # append the variables to a dictionary
        data_list_schiphol.append({"city": city, "date": date, "avgTemp": avgTemp, "minTemp": minTemp, "maxTemp": maxTemp})
    elif city == "260":
        city = "De Bilt"
        # append the variables to a dictionary
        data_list_bilt.append({"city": city, "date": date, "avgTemp": avgTemp, "minTemp": minTemp, "maxTemp": maxTemp})
    elif city == "380":
        city = "Maastricht"
        # append the variables to a dictionary
        data_list_maastricht.append({"city": city, "date": date, "avgTemp": avgTemp, "minTemp": minTemp, "maxTemp": maxTemp})

# writing seperate files
writeToFile(data_list_schiphol, "Schiphol")
writeToFile(data_list_bilt, "Bilt")
writeToFile(data_list_maastricht, "Maastricht")
        

