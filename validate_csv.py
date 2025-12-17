#!/usr/bin/env python3
"""
Validate CSV file format for Mendix enumeration import
Checks for common issues before attempting to generate Mendix SDK code
"""
import csv
import sys
from pathlib import Path
from collections import defaultdict

def validate_csv(csv_file):
    """Validate CSV file format and content"""
    
    errors = []
    warnings = []
    stats = {
        'total_rows': 0,
        'enumerations': set(),
        'values': defaultdict(set),
        'languages': set()
    }
    
    # Track duplicates
    seen_translations = {}  # (enum, value, lang) -> row_num
    
    # Check file exists
    if not Path(csv_file).exists():
        errors.append(f"File not found: {csv_file}")
        return errors, warnings, stats
    
    # Check file extension
    if not csv_file.lower().endswith('.csv'):
        warnings.append(f"File does not have .csv extension: {csv_file}")
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            # Check required columns
            required_columns = {'EnumName', 'ValueName', 'Caption', 'LanguageCode'}
            if reader.fieldnames:
                missing_columns = required_columns - set(reader.fieldnames)
                if missing_columns:
                    errors.append(f"Missing required columns: {', '.join(missing_columns)}")
                    return errors, warnings, stats
            else:
                errors.append("CSV file appears to be empty or has no header")
                return errors, warnings, stats
            
            # Validate each row
            for row_num, row in enumerate(reader, start=2):  # Start at 2 (header is row 1)
                stats['total_rows'] += 1
                
                # Check for empty required fields
                enum_name = row.get('EnumName', '').strip()
                value_name = row.get('ValueName', '').strip()
                caption = row.get('Caption', '').strip()
                language_code = row.get('LanguageCode', 'en_US').strip()
                
                if not enum_name:
                    errors.append(f"Row {row_num}: EnumName is empty")
                if not value_name:
                    errors.append(f"Row {row_num}: ValueName is empty")
                if not caption:
                    warnings.append(f"Row {row_num}: Caption is empty (will use ValueName)")
                
                # Check for invalid characters in names
                if enum_name and not is_valid_identifier(enum_name):
                    warnings.append(f"Row {row_num}: EnumName '{enum_name}' contains invalid characters for an identifier")
                if value_name and not is_valid_identifier(value_name):
                    warnings.append(f"Row {row_num}: ValueName '{value_name}' contains invalid characters for an identifier")
                
                # Collect statistics
                if enum_name:
                    stats['enumerations'].add(enum_name)
                    stats['values'][enum_name].add(value_name)
                if language_code:
                    stats['languages'].add(language_code)
                
                # Check for duplicate translations
                translation_key = (enum_name, value_name, language_code)
                if translation_key in seen_translations:
                    prev_row = seen_translations[translation_key]
                    warnings.append(f"Row {row_num}: Duplicate translation for {enum_name}.{value_name} ({language_code}) - first defined at row {prev_row}. Last value will be used.")
                else:
                    seen_translations[translation_key] = row_num
                
                # Check language code format
                if language_code and not is_valid_language_code(language_code):
                    warnings.append(f"Row {row_num}: Unusual language code format '{language_code}'")
    
    except UnicodeDecodeError:
        errors.append("File encoding error. Please ensure file is UTF-8 encoded")
    except Exception as e:
        errors.append(f"Error reading file: {str(e)}")
    
    return errors, warnings, stats

def is_valid_identifier(name):
    """Check if name is a valid identifier (alphanumeric + underscore, starts with letter)"""
    if not name:
        return False
    if not name[0].isalpha() and name[0] != '_':
        return False
    return all(c.isalnum() or c == '_' for c in name)

def is_valid_language_code(code):
    """Check if language code follows common pattern (e.g., en_US, fr_FR)"""
    if not code:
        return False
    parts = code.split('_')
    if len(parts) != 2:
        return False
    return (len(parts[0]) == 2 and parts[0].isalpha() and 
            len(parts[1]) == 2 and parts[1].isalpha())

def print_report(errors, warnings, stats):
    """Print validation report"""
    
    print("\n" + "="*70)
    print("CSV VALIDATION REPORT")
    print("="*70)
    
    # Summary
    print(f"\n📊 Statistics:")
    print(f"   Total rows: {stats['total_rows']}")
    print(f"   Enumerations: {len(stats['enumerations'])}")
    if stats['enumerations']:
        print(f"   - {', '.join(sorted(stats['enumerations']))}")
    
    total_values = sum(len(values) for values in stats['values'].values())
    print(f"   Total values: {total_values}")
    
    print(f"   Languages: {len(stats['languages'])}")
    if stats['languages']:
        print(f"   - {', '.join(sorted(stats['languages']))}")
    
    # Errors
    if errors:
        print(f"\n❌ Errors ({len(errors)}):")
        for error in errors:
            print(f"   • {error}")
    else:
        print("\n✅ No errors found!")
    
    # Warnings
    if warnings:
        print(f"\n⚠️  Warnings ({len(warnings)}):")
        for warning in warnings:
            print(f"   • {warning}")
    else:
        print("\n✅ No warnings!")
    
    # Enumeration details
    if stats['values'] and not errors:
        print("\n📋 Enumeration Details:")
        for enum_name in sorted(stats['enumerations']):
            values = stats['values'][enum_name]
            print(f"   {enum_name}: {len(values)} values")
            for value in sorted(values):
                print(f"      - {value}")
    
    print("\n" + "="*70)
    
    # Final verdict
    if errors:
        print("\n❌ Validation FAILED - Please fix errors before importing")
        return False
    elif warnings:
        print("\n⚠️  Validation PASSED with warnings - Review warnings before importing")
        return True
    else:
        print("\n✅ Validation PASSED - File is ready for import!")
        return True

def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_csv.py <csv_file>")
        print("\nValidates CSV file format for Mendix enumeration import")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    
    print(f"Validating: {csv_file}")
    
    errors, warnings, stats = validate_csv(csv_file)
    success = print_report(errors, warnings, stats)
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
