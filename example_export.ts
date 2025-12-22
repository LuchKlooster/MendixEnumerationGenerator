//     
//      ███  ███  ███
//      ███▄▄███▄▄███
//       ███████████
//       ████▀▀▀████     Complete example: Export enumerations from Mendix project
//       ████   ████
//     ███████████████
//     CONVENT SYSTEMS
//
import { exportEnumerations } from './export_mendix_enums';

async function main() {
  // Configuration
  const config = {
    projectId: 'bd47684d-ba29-4fa6-8eb4-3a890a06404d',  // Also known as App ID
    outputFile: 'DutchMunicipalities_enums.csv',
    moduleName: 'DutchMunicipalities'  // Filter by module name, comment this line to export all modules
  };

  try {
    console.log('Starting enumeration export...');
    console.log('Note: Make sure MENDIX_TOKEN environment variable is set');
    
    // Export from specific module only
    await exportEnumerations(
      config.projectId,
      config.outputFile,
      config.moduleName
    );
    
    // Or export all enumerations from all modules:
    // await exportEnumerations(config.projectId, config.outputFile);
    
    console.log('\n✓ Export completed successfully!');
    console.log(`  Output file: ${config.outputFile}`);
    console.log('\nYou can now use this CSV file with generate_mendix_enums.py');
    console.log('to import enumerations into another project.');
    
  } catch (error) {
    console.error('Error exporting enumerations:', error);
    console.error('\nMake sure:');
    console.error('1. MENDIX_TOKEN environment variable is set');
    console.error('2. Your Personal Access Token has the correct permissions');
    console.error('3. The project ID is correct');
    process.exit(1);
  }
}

// Run the export
main();
