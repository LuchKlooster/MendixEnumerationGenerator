#!/usr/bin/env python3
import csv
import json
import sys
from pathlib import Path

def sanitize_identifier(name):
    """Convert a name to a valid JavaScript identifier"""
    # Replace invalid characters with underscores
    sanitized = ''.join(c if c.isalnum() or c == '_' else '_' for c in name)
    # Ensure it doesn't start with a number
    if sanitized and sanitized[0].isdigit():
        sanitized = 'n' + sanitized
    # If it starts with underscore followed by number, prefix with 'n'
    if sanitized and sanitized.startswith('_') and len(sanitized) > 1 and sanitized[1].isdigit():
        sanitized = 'n' + sanitized
    # Remove consecutive underscores
    while '__' in sanitized:
        sanitized = sanitized.replace('__', '_')
    # Remove leading/trailing underscores
    sanitized = sanitized.strip('_')
    return sanitized if sanitized else 'value'

def escape_string(text):
    """Escape a string for use in JavaScript/TypeScript code"""
    # Escape backslashes first
    text = text.replace('\\', '\\\\')
    # Escape single quotes
    text = text.replace("'", "\\'")
    # Escape newlines
    text = text.replace('\n', '\\n')
    text = text.replace('\r', '\\r')
    return text

def generate_mendix_enum_code(csv_file):
    """Generate Mendix SDK TypeScript code for creating enumerations from CSV"""
    
    enums = {}
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            enum_name = row['EnumName'].strip()
            value_name = row['ValueName'].strip()
            caption = row.get('Caption', value_name).strip()
            language_code = row.get('LanguageCode', 'en_US').strip()
            
            if enum_name not in enums:
                enums[enum_name] = {}
            
            if value_name not in enums[enum_name]:
                enums[enum_name][value_name] = {}
            
            # Use dict to automatically deduplicate by language_code (last wins)
            enums[enum_name][value_name][language_code] = {
                'caption': caption,
                'language_code': language_code
            }
    
    # Generate TypeScript code for Mendix SDK
    ts_code = []
    ts_code.append("// Generated Mendix SDK enumeration creation code")
    ts_code.append("import { enumerations, texts } from 'mendixmodelsdk';")
    ts_code.append("import { MendixPlatformClient } from 'mendixplatformsdk';")
    ts_code.append("")
    ts_code.append("async function createEnumerations(")
    ts_code.append("  projectId: string,")
    ts_code.append("  moduleName: string = 'MyFirstModule',  // Specify target module name")
    ts_code.append(") {")
    ts_code.append("  // Create a Platform SDK client. This will automatically read")
    ts_code.append("  // your Personal Access Token from the environment variable MENDIX_TOKEN.")
    ts_code.append("  const client = new MendixPlatformClient();")
    ts_code.append("")
    ts_code.append("  console.log('Getting app...');")
    ts_code.append("  const app = client.getApp(projectId);")
    ts_code.append("")
    ts_code.append("  console.log('Creating temporary working copy...');")
    ts_code.append("  const workingCopy = await app.createTemporaryWorkingCopy('main');")
    ts_code.append("")
    ts_code.append("  console.log('Loading model...');")
    ts_code.append("  const model = workingCopy.openModel();")
    ts_code.append("  const loadedModel = await model;")
    ts_code.append("")
    ts_code.append("  console.log(`Finding or creating module: ${moduleName}...`);")
    ts_code.append("  let module = loadedModel.allModules().find(m => m.name === moduleName);")
    ts_code.append("  ")
    ts_code.append("  if (!module) {")
    ts_code.append("    console.log(`Module '${moduleName}' not found, creating it...`);")
    ts_code.append("    const projects = await import('mendixmodelsdk').then(m => m.projects);")
    ts_code.append("    module = projects.Module.createIn(loadedModel.root);")
    ts_code.append("    module.name = moduleName;")
    ts_code.append("    // Create domain model for the new module")
    ts_code.append("    const domainmodels = await import('mendixmodelsdk').then(m => m.domainmodels);")
    ts_code.append("    const domainModel = domainmodels.DomainModel.createIn(module);")
    ts_code.append("  }")
    ts_code.append("")
    ts_code.append("  console.log(`Using module: ${module.name}`);")
    ts_code.append("  console.log('Creating enumerations...');")
    ts_code.append("")
    
    for enum_name, values in enums.items():
        enum_var = sanitize_identifier(enum_name.lower())
        ts_code.append(f"\n  // Create {enum_name} enumeration")
        ts_code.append(f"  const {enum_var}Enum = enumerations.Enumeration.createIn(module);")
        ts_code.append(f"  {enum_var}Enum.name = '{enum_name}';")
        ts_code.append(f"  {enum_var}Enum.documentation = 'Auto-generated enumeration';")
        ts_code.append("")
        
        for value_name, translations in values.items():
            value_var = sanitize_identifier(value_name)
            ts_code.append(f"  const {enum_var}_{value_var} = enumerations.EnumerationValue.createIn({enum_var}Enum);")
            ts_code.append(f"  {enum_var}_{value_var}.name = '{escape_string(value_name)}';")
            
            ts_code.append(f"  const caption_{enum_var}_{value_var} = texts.Text.createInEnumerationValueUnderCaption({enum_var}_{value_var});")
            
            for translation in translations.values():
                lang_var = sanitize_identifier(translation['language_code'])
                ts_code.append(f"  const translation_{enum_var}_{value_var}_{lang_var} = texts.Translation.createIn(caption_{enum_var}_{value_var});")
                ts_code.append(f"  translation_{enum_var}_{value_var}_{lang_var}.languageCode = '{escape_string(translation['language_code'])}';")
                ts_code.append(f"  translation_{enum_var}_{value_var}_{lang_var}.text = '{escape_string(translation['caption'])}';")
            ts_code.append("")
    
    ts_code.append("  console.log('Committing changes...');")
    ts_code.append("  await model.flushChanges();")
    ts_code.append("  await workingCopy.commitToRepository('main');")
    ts_code.append("")
    ts_code.append("  console.log('✓ Enumerations created successfully');")
    ts_code.append("}")
    ts_code.append("")
    ts_code.append("// Usage example:")
    ts_code.append("// Set environment variable: export MENDIX_TOKEN='your-personal-access-token'")
    ts_code.append("// createEnumerations('project-id', 'MyModule').catch(console.error);")
    ts_code.append("// Or use default module: createEnumerations('project-id').catch(console.error);")
    ts_code.append("")
    ts_code.append("export { createEnumerations };")
    
    return '\n'.join(ts_code)

def main():
    if len(sys.argv) != 2:
        print("Usage: python generate_mendix_enums.py <csv_file>")
        print("\nCSV format:")
        print("EnumName,ValueName,Caption,LanguageCode")
        print("Status,Active,Active,en_US")
        print("Status,Active,Actif,fr_FR")
        print("Status,Inactive,Inactive,en_US")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    
    if not Path(csv_file).exists():
        print(f"Error: File '{csv_file}' not found")
        sys.exit(1)
    
    try:
        ts_code = generate_mendix_enum_code(csv_file)
        
        output_file = Path(csv_file).stem + '_mendix_enums.ts'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(ts_code)
        
        print(f"✓ Mendix SDK code generated: {output_file}")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
