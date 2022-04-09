import json

newList = []

with open('movies.json', 'r+') as f:
    data = json.load(f)
    for country in list(data):
        newList.append({
            "country": country,
            "movies": data[country]
        })

    print(newList)

with open("newJson.json", "w") as outfile:
    json.dump(newList, outfile, indent=4)
