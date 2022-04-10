import json

newList = []

with open('all_countries.json', 'r+') as f:
    data = json.load(f)
    for country in list(data):
        newList.append(country)


    print(newList)

with open('movies.json', 'r+') as f:
    data = json.load(f)

    for country in newList:
        try:
            country["movies"] = data[country["name"]]
        except:
            country["movies"] = []
        

with open("new.json", "w") as outfile:
    json.dump(newList, outfile, indent=4)
