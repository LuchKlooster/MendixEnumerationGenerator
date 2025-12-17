// Generated Mendix SDK enumeration creation code
import { enumerations, texts } from 'mendixmodelsdk';
import { MendixPlatformClient } from 'mendixplatformsdk';

async function createEnumerations(
  projectId: string,
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

  console.log('Getting domain model...');
  const domainModel = loadedModel.allDomainModels()[0];
  await domainModel.load();

  console.log('Getting module (enumerations must be created in module)...');
  const module = domainModel.containerAsModule;

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
  const translation_status_Active_fr_FR = texts.Translation.createIn(caption_status_Active);
  translation_status_Active_fr_FR.languageCode = 'fr_FR';
  translation_status_Active_fr_FR.text = 'Actif';
  const translation_status_Active_es_ES = texts.Translation.createIn(caption_status_Active);
  translation_status_Active_es_ES.languageCode = 'es_ES';
  translation_status_Active_es_ES.text = 'Activo';

  const status_Inactive = enumerations.EnumerationValue.createIn(statusEnum);
  status_Inactive.name = 'Inactive';
  const caption_status_Inactive = texts.Text.createInEnumerationValueUnderCaption(status_Inactive);
  const translation_status_Inactive_en_US = texts.Translation.createIn(caption_status_Inactive);
  translation_status_Inactive_en_US.languageCode = 'en_US';
  translation_status_Inactive_en_US.text = 'Inactive';
  const translation_status_Inactive_fr_FR = texts.Translation.createIn(caption_status_Inactive);
  translation_status_Inactive_fr_FR.languageCode = 'fr_FR';
  translation_status_Inactive_fr_FR.text = 'Inactif';
  const translation_status_Inactive_es_ES = texts.Translation.createIn(caption_status_Inactive);
  translation_status_Inactive_es_ES.languageCode = 'es_ES';
  translation_status_Inactive_es_ES.text = 'Inactivo';

  const status_Pending = enumerations.EnumerationValue.createIn(statusEnum);
  status_Pending.name = 'Pending';
  const caption_status_Pending = texts.Text.createInEnumerationValueUnderCaption(status_Pending);
  const translation_status_Pending_en_US = texts.Translation.createIn(caption_status_Pending);
  translation_status_Pending_en_US.languageCode = 'en_US';
  translation_status_Pending_en_US.text = 'Pending Approval';
  const translation_status_Pending_fr_FR = texts.Translation.createIn(caption_status_Pending);
  translation_status_Pending_fr_FR.languageCode = 'fr_FR';
  translation_status_Pending_fr_FR.text = 'En attente d'approbation';
  const translation_status_Pending_es_ES = texts.Translation.createIn(caption_status_Pending);
  translation_status_Pending_es_ES.languageCode = 'es_ES';
  translation_status_Pending_es_ES.text = 'Pendiente de aprobación';


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
  const translation_priority_Low_fr_FR = texts.Translation.createIn(caption_priority_Low);
  translation_priority_Low_fr_FR.languageCode = 'fr_FR';
  translation_priority_Low_fr_FR.text = 'Priorité Basse';
  const translation_priority_Low_es_ES = texts.Translation.createIn(caption_priority_Low);
  translation_priority_Low_es_ES.languageCode = 'es_ES';
  translation_priority_Low_es_ES.text = 'Prioridad Baja';

  const priority_Medium = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_Medium.name = 'Medium';
  const caption_priority_Medium = texts.Text.createInEnumerationValueUnderCaption(priority_Medium);
  const translation_priority_Medium_en_US = texts.Translation.createIn(caption_priority_Medium);
  translation_priority_Medium_en_US.languageCode = 'en_US';
  translation_priority_Medium_en_US.text = 'Medium Priority';
  const translation_priority_Medium_fr_FR = texts.Translation.createIn(caption_priority_Medium);
  translation_priority_Medium_fr_FR.languageCode = 'fr_FR';
  translation_priority_Medium_fr_FR.text = 'Priorité Moyenne';
  const translation_priority_Medium_es_ES = texts.Translation.createIn(caption_priority_Medium);
  translation_priority_Medium_es_ES.languageCode = 'es_ES';
  translation_priority_Medium_es_ES.text = 'Prioridad Media';

  const priority_High = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_High.name = 'High';
  const caption_priority_High = texts.Text.createInEnumerationValueUnderCaption(priority_High);
  const translation_priority_High_en_US = texts.Translation.createIn(caption_priority_High);
  translation_priority_High_en_US.languageCode = 'en_US';
  translation_priority_High_en_US.text = 'High Priority';
  const translation_priority_High_fr_FR = texts.Translation.createIn(caption_priority_High);
  translation_priority_High_fr_FR.languageCode = 'fr_FR';
  translation_priority_High_fr_FR.text = 'Priorité Haute';
  const translation_priority_High_es_ES = texts.Translation.createIn(caption_priority_High);
  translation_priority_High_es_ES.languageCode = 'es_ES';
  translation_priority_High_es_ES.text = 'Prioridad Alta';

  const priority_Critical = enumerations.EnumerationValue.createIn(priorityEnum);
  priority_Critical.name = 'Critical';
  const caption_priority_Critical = texts.Text.createInEnumerationValueUnderCaption(priority_Critical);
  const translation_priority_Critical_en_US = texts.Translation.createIn(caption_priority_Critical);
  translation_priority_Critical_en_US.languageCode = 'en_US';
  translation_priority_Critical_en_US.text = 'Critical Priority';
  const translation_priority_Critical_fr_FR = texts.Translation.createIn(caption_priority_Critical);
  translation_priority_Critical_fr_FR.languageCode = 'fr_FR';
  translation_priority_Critical_fr_FR.text = 'Priorité Critique';
  const translation_priority_Critical_es_ES = texts.Translation.createIn(caption_priority_Critical);
  translation_priority_Critical_es_ES.languageCode = 'es_ES';
  translation_priority_Critical_es_ES.text = 'Prioridad Crítica';


  // Create OrderStatus enumeration
  const orderstatusEnum = enumerations.Enumeration.createIn(module);
  orderstatusEnum.name = 'OrderStatus';
  orderstatusEnum.documentation = 'Auto-generated enumeration';

  const orderstatus_New = enumerations.EnumerationValue.createIn(orderstatusEnum);
  orderstatus_New.name = 'New';
  const caption_orderstatus_New = texts.Text.createInEnumerationValueUnderCaption(orderstatus_New);
  const translation_orderstatus_New_en_US = texts.Translation.createIn(caption_orderstatus_New);
  translation_orderstatus_New_en_US.languageCode = 'en_US';
  translation_orderstatus_New_en_US.text = 'New Order';
  const translation_orderstatus_New_fr_FR = texts.Translation.createIn(caption_orderstatus_New);
  translation_orderstatus_New_fr_FR.languageCode = 'fr_FR';
  translation_orderstatus_New_fr_FR.text = 'Nouvelle Commande';

  const orderstatus_Processing = enumerations.EnumerationValue.createIn(orderstatusEnum);
  orderstatus_Processing.name = 'Processing';
  const caption_orderstatus_Processing = texts.Text.createInEnumerationValueUnderCaption(orderstatus_Processing);
  const translation_orderstatus_Processing_en_US = texts.Translation.createIn(caption_orderstatus_Processing);
  translation_orderstatus_Processing_en_US.languageCode = 'en_US';
  translation_orderstatus_Processing_en_US.text = 'Processing';
  const translation_orderstatus_Processing_fr_FR = texts.Translation.createIn(caption_orderstatus_Processing);
  translation_orderstatus_Processing_fr_FR.languageCode = 'fr_FR';
  translation_orderstatus_Processing_fr_FR.text = 'En traitement';

  const orderstatus_Shipped = enumerations.EnumerationValue.createIn(orderstatusEnum);
  orderstatus_Shipped.name = 'Shipped';
  const caption_orderstatus_Shipped = texts.Text.createInEnumerationValueUnderCaption(orderstatus_Shipped);
  const translation_orderstatus_Shipped_en_US = texts.Translation.createIn(caption_orderstatus_Shipped);
  translation_orderstatus_Shipped_en_US.languageCode = 'en_US';
  translation_orderstatus_Shipped_en_US.text = 'Shipped';
  const translation_orderstatus_Shipped_fr_FR = texts.Translation.createIn(caption_orderstatus_Shipped);
  translation_orderstatus_Shipped_fr_FR.languageCode = 'fr_FR';
  translation_orderstatus_Shipped_fr_FR.text = 'Expédié';

  const orderstatus_Delivered = enumerations.EnumerationValue.createIn(orderstatusEnum);
  orderstatus_Delivered.name = 'Delivered';
  const caption_orderstatus_Delivered = texts.Text.createInEnumerationValueUnderCaption(orderstatus_Delivered);
  const translation_orderstatus_Delivered_en_US = texts.Translation.createIn(caption_orderstatus_Delivered);
  translation_orderstatus_Delivered_en_US.languageCode = 'en_US';
  translation_orderstatus_Delivered_en_US.text = 'Delivered';
  const translation_orderstatus_Delivered_fr_FR = texts.Translation.createIn(caption_orderstatus_Delivered);
  translation_orderstatus_Delivered_fr_FR.languageCode = 'fr_FR';
  translation_orderstatus_Delivered_fr_FR.text = 'Livré';

  const orderstatus_Cancelled = enumerations.EnumerationValue.createIn(orderstatusEnum);
  orderstatus_Cancelled.name = 'Cancelled';
  const caption_orderstatus_Cancelled = texts.Text.createInEnumerationValueUnderCaption(orderstatus_Cancelled);
  const translation_orderstatus_Cancelled_en_US = texts.Translation.createIn(caption_orderstatus_Cancelled);
  translation_orderstatus_Cancelled_en_US.languageCode = 'en_US';
  translation_orderstatus_Cancelled_en_US.text = 'Cancelled';
  const translation_orderstatus_Cancelled_fr_FR = texts.Translation.createIn(caption_orderstatus_Cancelled);
  translation_orderstatus_Cancelled_fr_FR.languageCode = 'fr_FR';
  translation_orderstatus_Cancelled_fr_FR.text = 'Annulé';


  // Create UserRole enumeration
  const userroleEnum = enumerations.Enumeration.createIn(module);
  userroleEnum.name = 'UserRole';
  userroleEnum.documentation = 'Auto-generated enumeration';

  const userrole_Admin = enumerations.EnumerationValue.createIn(userroleEnum);
  userrole_Admin.name = 'Admin';
  const caption_userrole_Admin = texts.Text.createInEnumerationValueUnderCaption(userrole_Admin);
  const translation_userrole_Admin_en_US = texts.Translation.createIn(caption_userrole_Admin);
  translation_userrole_Admin_en_US.languageCode = 'en_US';
  translation_userrole_Admin_en_US.text = 'Administrator';
  const translation_userrole_Admin_fr_FR = texts.Translation.createIn(caption_userrole_Admin);
  translation_userrole_Admin_fr_FR.languageCode = 'fr_FR';
  translation_userrole_Admin_fr_FR.text = 'Administrateur';

  const userrole_Manager = enumerations.EnumerationValue.createIn(userroleEnum);
  userrole_Manager.name = 'Manager';
  const caption_userrole_Manager = texts.Text.createInEnumerationValueUnderCaption(userrole_Manager);
  const translation_userrole_Manager_en_US = texts.Translation.createIn(caption_userrole_Manager);
  translation_userrole_Manager_en_US.languageCode = 'en_US';
  translation_userrole_Manager_en_US.text = 'Manager';
  const translation_userrole_Manager_fr_FR = texts.Translation.createIn(caption_userrole_Manager);
  translation_userrole_Manager_fr_FR.languageCode = 'fr_FR';
  translation_userrole_Manager_fr_FR.text = 'Responsable';

  const userrole_User = enumerations.EnumerationValue.createIn(userroleEnum);
  userrole_User.name = 'User';
  const caption_userrole_User = texts.Text.createInEnumerationValueUnderCaption(userrole_User);
  const translation_userrole_User_en_US = texts.Translation.createIn(caption_userrole_User);
  translation_userrole_User_en_US.languageCode = 'en_US';
  translation_userrole_User_en_US.text = 'Standard User';
  const translation_userrole_User_fr_FR = texts.Translation.createIn(caption_userrole_User);
  translation_userrole_User_fr_FR.languageCode = 'fr_FR';
  translation_userrole_User_fr_FR.text = 'Utilisateur Standard';

  const userrole_Guest = enumerations.EnumerationValue.createIn(userroleEnum);
  userrole_Guest.name = 'Guest';
  const caption_userrole_Guest = texts.Text.createInEnumerationValueUnderCaption(userrole_Guest);
  const translation_userrole_Guest_en_US = texts.Translation.createIn(caption_userrole_Guest);
  translation_userrole_Guest_en_US.languageCode = 'en_US';
  translation_userrole_Guest_en_US.text = 'Guest User';
  const translation_userrole_Guest_fr_FR = texts.Translation.createIn(caption_userrole_Guest);
  translation_userrole_Guest_fr_FR.languageCode = 'fr_FR';
  translation_userrole_Guest_fr_FR.text = 'Utilisateur Invité';

  console.log('Committing changes...');
  await workingCopy.commitToRepository('main');

  console.log('✓ Enumerations created successfully');
}

// Usage example:
// Set environment variable: export MENDIX_TOKEN='your-personal-access-token'
// createEnumerations('project-id').catch(console.error);

export { createEnumerations };