// Mendix SDK enumeration export script
import { MendixPlatformClient } from 'mendixplatformsdk';
import { domainmodels } from 'mendixmodelsdk';
import { enumerations } from 'mendixmodelsdk';
import * as fs from 'fs';

// Type alias for easier access
type EnumerationValue = enumerations.EnumerationValue;

interface EnumRow {
  EnumName: string;
  ValueName: string;
  Caption: string;
  LanguageCode: string;
}

async function exportEnumerations(
  projectId: string,
  outputFile: string = 'exported_enums.csv',
  moduleName?: string  // Optional: filter by module name
) {
  // Create a Platform SDK client. This will automatically read
  // your Personal Access Token from the environment variable MENDIX_TOKEN.
  const client = new MendixPlatformClient();
  
  console.log('Getting app...');
  const app = client.getApp(projectId);
  
  console.log('Creating temporary working copy...');
  const workingCopy = await app.createTemporaryWorkingCopy('main');

  console.log('Loading model...');
  const model = workingCopy.openModel();
  
  console.log('Loading all enumerations...');
  const allEnums = (await model).allEnumerations();
  
  // Load each enumeration
  for (const enumeration of allEnums) {
    await enumeration.load();
  }

  const rows: EnumRow[] = [];

  // Iterate through all enumerations
  for (const enumeration of allEnums) {
    const enumName = enumeration.name;
    
    // qualifiedName is in format "ModuleName.EnumerationName"
    const qualifiedName = enumeration.qualifiedName;
    const enumModuleName = qualifiedName ? qualifiedName.split('.')[0] : 'Unknown';
    
    // Filter by module if specified
    if (moduleName && enumModuleName !== moduleName) {
      console.log(`Skipping enumeration: ${enumModuleName}.${enumName} (not in module '${moduleName}')`);
      continue;
    }
    
    console.log(`Processing enumeration: ${enumModuleName}.${enumName}`);
    
    // Get all values in this enumeration
    for (const enumValue of enumeration.values) {
      const valueName = enumValue.name;
      
      // Access caption property (available after enumeration is loaded)
      // Cast to concrete type to access the caption property
      const valueAsConcrete = enumValue as EnumerationValue;
      const caption = valueAsConcrete.caption;
      
      if (caption && caption.translations && caption.translations.length > 0) {
        for (const translation of caption.translations) {
          rows.push({
            EnumName: enumName,
            ValueName: valueName,
            Caption: translation.text,
            LanguageCode: translation.languageCode
          });
        }
      } else {
        // No translations, use value name as caption
        rows.push({
          EnumName: enumName,
          ValueName: valueName,
          Caption: valueName,
          LanguageCode: 'en_US'
        });
      }
    }
  }

  // Convert to CSV
  const csvHeader = 'EnumName,ValueName,Caption,LanguageCode\n';
  const csvRows = rows.map(row => 
    `${escapeCsv(row.EnumName)},${escapeCsv(row.ValueName)},${escapeCsv(row.Caption)},${escapeCsv(row.LanguageCode)}`
  ).join('\n');
  
  const csvContent = csvHeader + csvRows;
  fs.writeFileSync(outputFile, csvContent, 'utf-8');
  
  console.log(`\n✓ Exported ${rows.length} enumeration values to ${outputFile}`);
  console.log(`  Found ${new Set(rows.map(r => r.EnumName)).size} enumerations`);
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Usage example:
// Set environment variable: export MENDIX_TOKEN='your-personal-access-token'
// Export all enumerations: exportEnumerations('project-id', 'output.csv')
// Export from specific module: exportEnumerations('project-id', 'output.csv', 'MyModule')
//   .catch(console.error);

export { exportEnumerations };