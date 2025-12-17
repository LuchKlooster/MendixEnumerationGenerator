// Complete example: Import enumerations into Mendix project
import { createEnumerations } from './<your_filename_from_step3>';

async function main() {
  // Make sure MENDIX_TOKEN environment variable is set
  const projectId = '<your-project-id>';  // Also known as App ID
  const moduleName = 'MyEnumerations';  // Optional: specify target module

  try {
    console.log('Starting enumeration import...');
    console.log('Note: Make sure MENDIX_TOKEN environment variable is set\n');

    // The createEnumerations function handles everything:
    // - Creates client and working copy
    // - Finds or creates the target module
    // - Creates all enumerations in that module
    // - Commits the changes

    // With custom module name:
    await createEnumerations(projectId, moduleName);

    // Or use default module (MyFirstModule):
    // await createEnumerations(projectId);

    console.log('\n✓ Import completed successfully!');
    console.log('Enumerations have been added to your Mendix project.');

  } catch (error) {
    console.error('Error importing enumerations:', error);
    console.error('\nMake sure:');
    console.error('1. MENDIX_TOKEN environment variable is set');
    console.error('2. Your Personal Access Token has the correct permissions');
    console.error('3. The project ID is correct');
    process.exit(1);
  }
}

// Run the import
main();
