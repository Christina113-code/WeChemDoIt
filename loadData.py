import pandas as pd

# Load the uploaded CSV file
csv_path = "./PubChemElements_all.csv"
df = pd.read_csv(csv_path)

# Show the first few rows to understand the structure
df.head()
# Convert the entire DataFrame to JSON format
json_data = df.to_json(orient="records", indent=2)

with open("data.json", "w") as file: 
    file.write(json_data)
print("File created")


