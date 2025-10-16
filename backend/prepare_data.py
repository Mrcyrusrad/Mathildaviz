import pandas as pd
import json

# Example data: CPI vs Student Income over time
data = {
    "year": [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    "cpi_index": [100, 102, 104, 108, 113, 118, 122],
    "student_income": [100, 101, 101, 102, 103, 104, 104]
}

df = pd.DataFrame(data)
output_path = "data/example_data.json"
df.to_json(output_path, orient="records")

print(f"✅ Data saved to {output_path}")
