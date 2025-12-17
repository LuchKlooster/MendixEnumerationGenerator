// Generated Mendix SDK enumeration creation code
import { enumerations, texts } from 'mendixmodelsdk';
import { MendixPlatformClient } from 'mendixplatformsdk';

async function createEnumerations(
  projectId: string,
  moduleName: string = 'MyFirstModule',  // Specify target module name
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
  const loadedModel = await model;

  console.log(`Finding or creating module: ${moduleName}...`);
  let module = loadedModel.allModules().find(m => m.name === moduleName);
  
  if (!module) {
    console.log(`Module '${moduleName}' not found, creating it...`);
    const projects = await import('mendixmodelsdk').then(m => m.projects);
    module = projects.Module.createIn(loadedModel.root);
    module.name = moduleName;
    // Create domain model for the new module
    const domainmodels = await import('mendixmodelsdk').then(m => m.domainmodels);
    const domainModel = domainmodels.DomainModel.createIn(module);
  }

  console.log(`Using module: ${module.name}`);
  console.log('Creating enumerations...');


  // Create Status enumeration
  const statusEnum = enumerations.Enumeration.createIn(module);
  statusEnum.name = 'Status';
  statusEnum.documentation = 'Auto-generated enumeration';

  const status_Active = enumerations.EnumerationValue.createIn(statusEnum);
  status_Active.name = 'Active';
  const caption_status_Active = texts.Text.createInEnumerationValueUnderCaption(status_Active);
  const translation_status_Active_en_US = texts.Translation.createIn(caption_status_Active);
  translation_status_Active_en_US.languageCode = 'en_US';
  translation_status_Active_en_US.text = 'Active';

  const status_Inactive = enumerations.EnumerationValue.createIn(statusEnum);
  status_Inactive.name = 'Inactive';
  const caption_status_Inactive = texts.Text.createInEnumerationValueUnderCaption(status_Inactive);
  const translation_status_Inactive_en_US = texts.Translation.createIn(caption_status_Inactive);
  translation_status_Inactive_en_US.languageCode = 'en_US';
  translation_status_Inactive_en_US.text = 'Inactive';

  const status_Pending = enumerations.EnumerationValue.createIn(statusEnum);
  status_Pending.name = 'Pending';
  const caption_status_Pending = texts.Text.createInEnumerationValueUnderCaption(status_Pending);
  const translation_status_Pending_en_US = texts.Translation.createIn(caption_status_Pending);
  translation_status_Pending_en_US.languageCode = 'en_US';
  translation_status_Pending_en_US.text = 'Pending Approval';


  // Create Priority enumeration
  const priorityEnum = enumerations.Enumeration.createIn(module);
  priorityEnum.name = 'Priority';
  priorityEnum.documentation = 'Auto-generated enumeration';

  const priority_Low = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_Low.name = 'Low';
  const caption_priority_Low = texts.Text.createInEnumerationValueUnderCaption(priority_Low);
  const translation_priority_Low_en_US = texts.Translation.createIn(caption_priority_Low);
  translation_priority_Low_en_US.languageCode = 'en_US';
  translation_priority_Low_en_US.text = 'Low Priority';

  const priority_Medium = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_Medium.name = 'Medium';
  const caption_priority_Medium = texts.Text.createInEnumerationValueUnderCaption(priority_Medium);
  const translation_priority_Medium_en_US = texts.Translation.createIn(caption_priority_Medium);
  translation_priority_Medium_en_US.languageCode = 'en_US';
  translation_priority_Medium_en_US.text = 'Medium Priority';

  const priority_High = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_High.name = 'High';
  const caption_priority_High = texts.Text.createInEnumerationValueUnderCaption(priority_High);
  const translation_priority_High_en_US = texts.Translation.createIn(caption_priority_High);
  translation_priority_High_en_US.languageCode = 'en_US';
  translation_priority_High_en_US.text = 'High Priority';

  const priority_Critical = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_Critical.name = 'Critical';
  const caption_priority_Critical = texts.Text.createInEnumerationValueUnderCaption(priority_Critical);
  const translation_priority_Critical_en_US = texts.Translation.createIn(caption_priority_Critical);
  translation_priority_Critical_en_US.languageCode = 'en_US';
  translation_priority_Critical_en_US.text = 'Critical Priority';

  console.log('Committing changes...');
  await workingCopy.commitToRepository('main');

  console.log('✓ Enumerations created successfully');
}

// Usage example:
// Set environment variable: export MENDIX_TOKEN='your-personal-access-token'
// createEnumerations('project-id', 'MyModule').catch(console.error);
// Or use default module: createEnumerations('project-id').catch(console.error);

export { createEnumerations };