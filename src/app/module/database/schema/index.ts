import { RoleSchema } from './RoleSchema';
import { ClientErrorSchema } from './ClientErrorSchema';
import { StoreSchema } from './StoreSchema';
import { ProductSchema } from './ProductSchema';
import { NotificationSchema } from './NotificationSchema';
import { EstateSchema } from './EstateSchema';

// Import schema

// Export for migration. in the indexedDB service
export const Schemas = [
  StoreSchema,
  ProductSchema,
  NotificationSchema,
  EstateSchema,
  ClientErrorSchema,
  RoleSchema
]

