# Mendix Enumeration Generator

Generate Mendix SDK TypeScript code to create enumerations from CSV files, and export existing enumerations back to CSV format.

## Features

✅ [**Import**](#import-enumerations): Create Mendix enumerations from CSV files  
✅ [**Export**](#exporting-enumerations-from-mendix): Extract existing enumerations from Mendix projects to CSV  
✅ **Multi-language**: Support for multiple translations per enumeration value  
✅ [**Round-trip**](#round-trip-workflow): Export from one project, modify, and import to another

## Index

- [Mendix Enumeration Generator](#mendix-enumeration-generator)
  - [Features](#features)
  - [Index](#index)
  - [Requirements](#requirements)
  - [Import Enumerations](#import-enumerations)
  - [CSV Format](#csv-format)
    - [Required Columns](#required-columns)
    - [Example CSV with Multiple Languages](#example-csv-with-multiple-languages)
    - [Common Language Codes](#common-language-codes)
  - [Output](#output)
  - [CSV Validation](#csv-validation)
  - [Using the Generated Code](#using-the-generated-code)
  - [Complete Mendix SDK Example](#complete-mendix-sdk-example)
  - [Tips](#tips)
  - [Alternatives to CSV](#alternatives-to-csv)
    - [JSON Format](#json-format)
    - [Excel Format](#excel-format)
  - [Exporting Enumerations from Mendix](#exporting-enumerations-from-mendix)
    - [Step 1: Generate the Export Script](#step-1-generate-the-export-script)
    - [Step 2: Use the Export Function](#step-2-use-the-export-function)
    - [Step 3: Run Your Export Script](#step-3-run-your-export-script)
    - [Export Output Format](#export-output-format)
    - [Complete Export Example](#complete-export-example)
  - [Round-Trip Workflow](#round-trip-workflow)

## Requirements

- SDK How-tos <https://docs.mendix.com/apidocs-mxsdk/mxsdk/sdk-howtos/>
- Valid Mendix API credentials (Personal Access Token)
- Mendix SDK installed in your project
- TS-Node installed <https://www.npmjs.com/package/ts-node>
- Python 3.6+ installed <https://www.python.org/>
  
  ```typescript
  `
  **Getting your Personal Access Token:**
  
  1. Go to the Mendix Developer Portal
  2. Navigate to your profile settings
  3. Generate a Personal Access Token
  4. Copy the token and set it as the `MENDIX_TOKEN` environment variable
  `
  ```

## Import Enumerations

1. **Prepare your CSV file** with this format:

   ```csv
   EnumName,ValueName,Caption,LanguageCode
   Status,Active,Active,en_US
   Status,Active,Actif,fr_FR
   Status,Inactive,Inactive,en_US
   Priority,High,High Priority,en_US
   Priority,Low,Low Priority,en_US
   ```

2. **Validate your CSV** (optional but recommended):

   ```bash
   python validate_csv.py your_enums.csv
   ```

3. **Run the generator:**

   ```bash
   python generate_mendix_enums.py your_enums.csv
   ```
  
    The script generates a typescript file to be used in the next steps.
    The filemane is `<csv-file-name>_mendix_enums.ts`

4. **Prepare your import script**

    - Use `example_import.ts` as your template.
    - Replace `<your_filename_from_step3>` with filename of output file of step 3.
    - Fill in `<your_projectid>` with the AppId of the app you want to import the enums in.
    - Optinally replace `MyEnumerations` with the module name you want to generate the enums in.

5. **Use the generated code** in your Mendix SDK project

      First, set your Personal Access Token as an environment variable:

      ```bash
      export MENDIX_TOKEN='your-personal-access-token'
      ```

## CSV Format

### Required Columns

- **EnumName**: Name of the enumeration (e.g., "Status", "Priority")
- **ValueName**: Internal value name (e.g., "Active", "Inactive")
- **Caption**: Display text shown to users (e.g., "Active Status", "Low Priority")
- **LanguageCode**: Language code for the translation (e.g., "en_US", "fr_FR", "es_ES")

### Example CSV with Multiple Languages

```csv
EnumName,ValueName,Caption,LanguageCode
Status,Active,Active,en_US
Status,Active,Actif,fr_FR
Status,Active,Activo,es_ES
Status,Inactive,Inactive,en_US
Status,Inactive,Inactif,fr_FR
Priority,Low,Low Priority,en_US
Priority,Low,Priorité Basse,fr_FR
Priority,High,High Priority,en_US
Priority,High,Priorité Haute,fr_FR
```

**Note:** You can define multiple translations for the same value by repeating the EnumName and ValueName with different LanguageCode and Caption values.

### Common Language Codes

- `en_US` - English (United States)
- `en_GB` - English (United Kingdom)
- `fr_FR` - French (France)
- `es_ES` - Spanish (Spain)
- `de_DE` - German (Germany)
- `nl_NL` - Dutch (Netherlands)
- `pt_PT` - Portuguese (Portugal)
- `it_IT` - Italian (Italy)
- `ja_JP` - Japanese (Japan)
- `zh_CN` - Chinese (Simplified)
- `ar_SA` - Arabic (Saudi Arabia)

## Output

The script generates a TypeScript file with Mendix SDK code that:

- Creates all enumerations from your CSV
- Sets up enumeration values with proper names
- Configures captions with translations (en_US by default)

## CSV Validation

Before importing, validate your CSV file:

```bash
python validate_csv.py your_enums.csv
```

The validator checks:

- ✅ Required columns present (EnumName, ValueName, Caption, LanguageCode)
- ✅ No empty required fields
- ✅ Valid identifier names (no spaces, special characters)
- ✅ Proper language code format (e.g., en_US, fr_FR)
- 📊 Statistics on enumerations, values, and languages

**Example output:**

``` text
📊 Statistics:
   Total rows: 39
   Enumerations: 4
   - OrderStatus, Priority, Status, UserRole
   Total values: 16
   Languages: 3
   - en_US, es_ES, fr_FR

✅ Validation PASSED - File is ready for import!
```

## Using the Generated Code

The generated code is a complete standalone script that handles the entire import workflow.

**Simple usage:**

```typescript
import { createEnumerations } from './your_file_mendix_enums';

// Set environment variable: export MENDIX_TOKEN='your-personal-access-token'

// Specify target module (will be created if it doesn't exist):
await createEnumerations('your-project-id', 'MyEnumerations');

// Or use default module (MyFirstModule):
await createEnumerations('your-project-id');
```

The `createEnumerations` function automatically:

- Creates a Mendix Platform SDK client
- Opens a temporary working copy
- **Finds or creates the specified module**
- Creates all enumerations with translations in that module
- Commits the changes to the repository

## Complete Mendix SDK Example

```typescript
import { createEnumerations } from './enumerations_template_mendix_enums';

async function main() {
  // Set environment variable: export MENDIX_TOKEN='your-personal-access-token'
  const projectId = 'your-project-id';
  const moduleName = 'MyEnumerations';  // Target module (created if doesn't exist)
  
  try {
    await createEnumerations(projectId, moduleName);
    console.log('✓ Enumerations imported successfully!');
  } catch (error) {
    console.error('Import failed:', error);
  }
}

main();
```

**Prepare your import script:**

- Use import-script.ts as your template.

**Module Selection:**

- Specify a module name: `createEnumerations(projectId, 'MyModule')`
- Use default (MyFirstModule): `createEnumerations(projectId)`
- If module doesn't exist, it will be created automatically

**Run it:**

```bash
export MENDIX_TOKEN='your-personal-access-token'
npx ts-node your-export-script.ts
```

## Tips

- Use clear, descriptive ValueNames (these become identifiers in code)
- Make Captions user-friendly (these are shown in the UI)
- Add multiple rows with the same EnumName/ValueName but different LanguageCode for translations
- The CSV can contain multiple enumerations in a single file
- If LanguageCode is omitted, it defaults to `en_US`

## Alternatives to CSV

If you prefer JSON or Excel:

### JSON Format

```json
[
  {
    "EnumName": "Status",
    "ValueName": "Active",
    "Caption": "Active",
    "LanguageCode": "en_US"
  },
  {
    "EnumName": "Status",
    "ValueName": "Active",
    "Caption": "Actif",
    "LanguageCode": "fr_FR"
  },
  {
    "EnumName": "Status",
    "ValueName": "Inactive",
    "Caption": "Inactive",
    "LanguageCode": "en_US"
  }
]
```

Modify the script to use `json.load()` instead of `csv.DictReader()`.

### Excel Format

Save your data as CSV from Excel, or modify the script to use:

```python
import pandas as pd
df = pd.read_excel('enums.xlsx')
```

---
---

## Exporting Enumerations from Mendix

### Step 1: Generate the Export Script

```bash
python generate_export_script.py
```

This creates `export_mendix_enums.ts` - a TypeScript module for exporting enumerations.

### Step 2: Use the Export Function

First, set your Personal Access Token as an environment variable:

```bash
export MENDIX_TOKEN='your-personal-access-token'
```

Then create a script in your Mendix SDK project.

- Use `example_export.ts` as your template.
- Fill in `<your_projectid>` with the AppId of the app you want to import the enums in.
- Replace `MyEnumerations` with the module name you want to export the enums of or comment line 9 if you want to export all enums of the app. In that case also comment lines 17 to 21 and uncomment line 24.  


### Step 3: Run Your Export Script

```bash
npx ts-node your-export-script.ts
```

The script will:

- Connect to your Mendix project
- Extract all enumerations from all domain models
- Include all translations for each value
- Output a CSV file in the same format used for imports

### Export Output Format

The exported CSV has the same format as the import CSV:

```csv
EnumName,ValueName,Caption,LanguageCode
Status,Active,Active,en_US
Status,Active,Actif,fr_FR
Status,Inactive,Inactive,en_US
```

### Complete Export Example

See `example_export.ts` for a full working example:

```typescript
import { exportEnumerations } from './export_mendix_enums';

async function main() {
  // Make sure MENDIX_TOKEN environment variable is set
  await exportEnumerations(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',  // Project ID
    'my_enumerations.csv'
  );
  console.log('Export complete!');
}

main().catch(console.error);
```

**Run it:**

```bash
export MENDIX_TOKEN='your-personal-access-token'
npx ts-node your-export-script.ts
```

---

## Round-Trip Workflow

1. **Export** from source project:

   ```bash
   export MENDIX_TOKEN='your-token'
   npx ts-node export-script.ts
   # Creates exported_enums.csv
   ```

2. **Modify** the CSV if needed:
   - Edit translations
   - Add new values
   - Remove unwanted enumerations

3. **Import** to target project:

   ```bash
   python generate_mendix_enums.py exported_enums.csv
   # Creates TypeScript import code
   ```

4. **Apply** the changes in target project

---
