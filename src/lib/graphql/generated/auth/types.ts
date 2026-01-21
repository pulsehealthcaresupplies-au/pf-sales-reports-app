export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: string; output: string; }
  Decimal: { input: any; output: any; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  addressLine1: Maybe<Scalars['String']['output']>;
  addressLine2: Maybe<Scalars['String']['output']>;
  addressType: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  isDefault: Maybe<Scalars['Boolean']['output']>;
  label: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  zipCode: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type AdminAuthPayload = {
  __typename?: 'AdminAuthPayload';
  accessToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: AdminUser;
};

export type AdminLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUser = AuthUser & {
  __typename?: 'AdminUser';
  canManageOrders: Scalars['Boolean']['output'];
  canManageProducts: Scalars['Boolean']['output'];
  canManageUsers: Scalars['Boolean']['output'];
  canViewAnalytics: Scalars['Boolean']['output'];
  department: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  scope: AuthScope;
  username: Scalars['String']['output'];
};

export type AppName =
  | 'ADMIN'
  | 'B2B_B2C'
  | 'PICKER'
  | 'WAREHOUSE'
  | '%future added value';

export type AuthMethod =
  | 'API_KEY'
  | 'JWT_TOKEN'
  | 'OAUTH2'
  | 'SESSION_COOKIE'
  | '%future added value';

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Maybe<Scalars['String']['output']>;
  error: Maybe<Scalars['String']['output']>;
  expiresAt: Maybe<Scalars['Float']['output']>;
  expiresIn: Maybe<Scalars['Int']['output']>;
  hashPhrase: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token: Maybe<Scalars['String']['output']>;
  user: Maybe<User>;
};

export type AuthScope =
  | 'ADMIN'
  | 'B2B'
  | 'B2C'
  | 'PICKER'
  | 'WAREHOUSE'
  | '%future added value';

export type AuthUser = {
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions: Array<Scalars['String']['output']>;
  scope: AuthScope;
};

export type B2BAuthPayload = {
  __typename?: 'B2BAuthPayload';
  accessToken: Scalars['String']['output'];
  company: Company;
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: B2BUser;
};

export type B2BLoginInput = {
  companyCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type B2BRegisterInput = {
  address: AddressInput;
  businessRegistration?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  contactPerson: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  taxId?: InputMaybe<Scalars['String']['input']>;
};

export type B2BType =
  | 'DOCTOR'
  | 'SUPPLIER'
  | '%future added value';

export type B2BUser = AuthUser & {
  __typename?: 'B2BUser';
  accountManager: Maybe<Scalars['String']['output']>;
  businessRegistration: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  creditLimit: Maybe<Scalars['Decimal']['output']>;
  discountRate: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paymentTerms: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  scope: AuthScope;
  taxId: Maybe<Scalars['String']['output']>;
  tier: Maybe<Scalars['String']['output']>;
};

export type B2CAuthPayload = {
  __typename?: 'B2CAuthPayload';
  accessToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: B2CUser;
};

export type B2CLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type B2CRegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type B2CUser = AuthUser & {
  __typename?: 'B2CUser';
  email: Scalars['String']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Maybe<Scalars['String']['output']>;
  loyaltyPoints: Maybe<Scalars['Int']['output']>;
  membershipTier: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
  scope: AuthScope;
};

export type Brand = {
  __typename?: 'Brand';
  averageRating: Maybe<Scalars['Float']['output']>;
  countryOfOrigin: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Maybe<User>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  logo: Maybe<Scalars['String']['output']>;
  logoType: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  productCount: Scalars['Int']['output'];
  reviewCount: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Maybe<User>;
  website: Maybe<Scalars['String']['output']>;
};

export type BrandListResponse = {
  __typename?: 'BrandListResponse';
  items: Array<Brand>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type BrandOption = {
  __typename?: 'BrandOption';
  id: Scalars['ID']['output'];
  isActive: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  slug: Maybe<Scalars['String']['output']>;
};

export type BulkUpdateError = {
  __typename?: 'BulkUpdateError';
  error: Scalars['String']['output'];
  itemId: Maybe<Scalars['ID']['output']>;
};

export type BulkUpdateInventoryResponse = {
  __typename?: 'BulkUpdateInventoryResponse';
  errors: Array<BulkUpdateError>;
  errorsCount: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  updatedCount: Scalars['Int']['output'];
  updatedItems: Array<InventoryItem>;
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
  subtotal: Scalars['Decimal']['output'];
  tax: Scalars['Decimal']['output'];
  taxAmount: Scalars['Decimal']['output'];
  total: Scalars['Decimal']['output'];
  totalAmount: Scalars['Decimal']['output'];
  totalItems: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  totalPrice: Scalars['Decimal']['output'];
  unitPrice: Scalars['Decimal']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  childrenCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Maybe<User>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  fullPath: Scalars['String']['output'];
  icon: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  metaDescription: Maybe<Scalars['String']['output']>;
  metaTitle: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent: Maybe<Category>;
  parentId: Maybe<Scalars['ID']['output']>;
  productCount: Scalars['Int']['output'];
  seoKeywords: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  sortOrder: Maybe<Scalars['Int']['output']>;
  totalProductCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Maybe<User>;
};

export type CategoryListResponse = {
  __typename?: 'CategoryListResponse';
  items: Array<Category>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type CategoryOption = {
  __typename?: 'CategoryOption';
  childrenCount: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId: Maybe<Scalars['ID']['output']>;
  parentName: Maybe<Scalars['String']['output']>;
};

export type Company = {
  __typename?: 'Company';
  abn: Maybe<Scalars['String']['output']>;
  availableCredit: Maybe<Scalars['Decimal']['output']>;
  billingAddress: Maybe<Address>;
  contactEmail: Scalars['String']['output'];
  contactPhone: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creditLimit: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  paymentTerms: Maybe<Scalars['String']['output']>;
  shippingAddress: Maybe<Address>;
};

export type CreditRequest = {
  __typename?: 'CreditRequest';
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  currentLimit: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  reason: Scalars['String']['output'];
  requestedAmount: Scalars['Decimal']['output'];
  status: Scalars['String']['output'];
};

export type CreditRequestResponse = {
  __typename?: 'CreditRequestResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  request: Maybe<CreditRequest>;
  success: Scalars['Boolean']['output'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  lowStockItems: Scalars['Int']['output'];
  pendingOrders: Scalars['Int']['output'];
  recentOrders: Array<RecentOrder>;
  totalInventoryItems: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Decimal']['output'];
  totalWarehouses: Scalars['Int']['output'];
};

export type DoctorVerification = {
  __typename?: 'DoctorVerification';
  doctor: User;
  documents: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  submittedAt: Maybe<Scalars['DateTime']['output']>;
  verifiedAt: Maybe<Scalars['DateTime']['output']>;
  verifiedBy: Maybe<User>;
};

export type DocumentUploadResponse = {
  __typename?: 'DocumentUploadResponse';
  documentUrl: Maybe<Scalars['String']['output']>;
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  createdAt: Scalars['DateTime']['output'];
  errors: Maybe<Array<Scalars['String']['output']>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  service: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type InventoryAdjustmentInput = {
  inventoryItemId?: InputMaybe<Scalars['ID']['input']>;
  newQuantity?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityChange: Scalars['Int']['input'];
  reason: Scalars['String']['input'];
  reference?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type InventoryBulkUpdateInput = {
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['ID']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reorderLevel?: InputMaybe<Scalars['Int']['input']>;
};

export type InventoryConnection = {
  __typename?: 'InventoryConnection';
  edges: Array<InventoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type InventoryEdge = {
  __typename?: 'InventoryEdge';
  cursor: Scalars['String']['output'];
  node: InventoryItem;
};

export type InventoryFileImportResponse = {
  __typename?: 'InventoryFileImportResponse';
  errors: Maybe<Array<Scalars['String']['output']>>;
  importId: Maybe<Scalars['ID']['output']>;
  message: Scalars['String']['output'];
  processed: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  summary: Maybe<InventoryImportSummary>;
  totalRows: Maybe<Scalars['Int']['output']>;
  warnings: Maybe<Array<Scalars['String']['output']>>;
};

export type InventoryImportSummary = {
  __typename?: 'InventoryImportSummary';
  created: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  processed: Scalars['Int']['output'];
  totalRows: Scalars['Int']['output'];
  updated: Scalars['Int']['output'];
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  availableQuantity: Scalars['Int']['output'];
  averageCost: Maybe<Scalars['Decimal']['output']>;
  batchNumber: Maybe<Scalars['String']['output']>;
  costPrice: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expirationDate: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isLowStock: Scalars['Boolean']['output'];
  isOutOfStock: Scalars['Boolean']['output'];
  lastCountedAt: Maybe<Scalars['DateTime']['output']>;
  lastMovementAt: Maybe<Scalars['DateTime']['output']>;
  lastRestockedAt: Maybe<Scalars['DateTime']['output']>;
  lastUpdated: Maybe<Scalars['DateTime']['output']>;
  location: Maybe<WarehouseLocation>;
  locationCode: Maybe<Scalars['String']['output']>;
  locationName: Maybe<Scalars['String']['output']>;
  lowStockThreshold: Maybe<Scalars['Int']['output']>;
  manufacturingDate: Maybe<Scalars['DateTime']['output']>;
  maxStockLevel: Maybe<Scalars['Int']['output']>;
  notes: Maybe<Scalars['String']['output']>;
  product: Product;
  productName: Scalars['String']['output'];
  productSku: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  reorderLevel: Scalars['Int']['output'];
  reorderQuantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  stockStatus: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  warehouse: Warehouse;
  warehouseName: Scalars['String']['output'];
};

export type InventoryItemInput = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  manufacturingDate?: InputMaybe<Scalars['DateTime']['input']>;
  maxStockLevel?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  reorderLevel?: InputMaybe<Scalars['Int']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type InventoryItemListResponse = {
  __typename?: 'InventoryItemListResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  results: Array<InventoryItem>;
  totalPages: Scalars['Int']['output'];
};

export type InventoryItemResponse = {
  __typename?: 'InventoryItemResponse';
  error: Maybe<Scalars['String']['output']>;
  inventoryItem: Maybe<InventoryItem>;
  success: Scalars['Boolean']['output'];
};

export type InventoryItemUpdateInput = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  manufacturingDate?: InputMaybe<Scalars['DateTime']['input']>;
  maxStockLevel?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reorderLevel?: InputMaybe<Scalars['Int']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationType =
  | 'BIN'
  | 'CAGE'
  | 'COOLER'
  | 'FLOOR'
  | 'FREEZER'
  | 'OTHER'
  | 'PALLET'
  | 'RACK'
  | 'SHELF'
  | '%future added value';

export type LowStockAlert = {
  __typename?: 'LowStockAlert';
  id: Scalars['ID']['output'];
  lastMovementAt: Maybe<Scalars['DateTime']['output']>;
  location: Maybe<Scalars['String']['output']>;
  priority: StockAlertPriority;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  reorderLevel: Scalars['Int']['output'];
  shortage: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

export type LowStockAlertsResponse = {
  __typename?: 'LowStockAlertsResponse';
  alerts: Array<LowStockAlert>;
  count: Scalars['Int']['output'];
  criticalCount: Scalars['Int']['output'];
  highCount: Scalars['Int']['output'];
  lowCount: Scalars['Int']['output'];
  mediumCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty: Maybe<Scalars['String']['output']>;
  adminForgotPassword: Scalars['Boolean']['output'];
  adminLogin: Maybe<AdminAuthPayload>;
  adminLogout: Scalars['Boolean']['output'];
  adminRefreshToken: Maybe<AdminAuthPayload>;
  adminResetPassword: Scalars['Boolean']['output'];
  b2bForgotPassword: Scalars['Boolean']['output'];
  b2bLogin: Maybe<B2BAuthPayload>;
  b2bLogout: Scalars['Boolean']['output'];
  b2bRefreshToken: Maybe<B2BAuthPayload>;
  b2bRegister: Maybe<B2BAuthPayload>;
  b2bResetPassword: Scalars['Boolean']['output'];
  b2cForgotPassword: Scalars['Boolean']['output'];
  b2cLogin: Maybe<B2CAuthPayload>;
  b2cLogout: Scalars['Boolean']['output'];
  b2cRefreshToken: Maybe<B2CAuthPayload>;
  b2cRegister: Maybe<B2CAuthPayload>;
  b2cResetPassword: Scalars['Boolean']['output'];
  changePassword: SuccessResponse;
  forgotPassword: SuccessResponse;
  login: AuthResponse;
  logout: SuccessResponse;
  pickerForgotPassword: Scalars['Boolean']['output'];
  pickerLogin: Maybe<PickerAuthPayload>;
  pickerLogout: Scalars['Boolean']['output'];
  pickerRefreshToken: Maybe<PickerAuthPayload>;
  pickerResetPassword: Scalars['Boolean']['output'];
  priceQuote: PriceQuoteResponse;
  refreshToken: AuthResponse;
  register: AuthResponse;
  registerB2B: AuthResponse;
  registerB2C: AuthResponse;
  requestCreditIncrease: CreditRequestResponse;
  resetPassword: SuccessResponse;
  sendOTP: SuccessResponse;
  updateUserPaymentMethod: UpdateUserResponse;
  updateUserWarehouse: UpdateUserResponse;
  updateVerificationStatus: VerificationStatusResponse;
  uploadVerificationDocument: DocumentUploadResponse;
  validatePickerCredentials: Maybe<ValidatePickerCredentialsPayload>;
  verifyOTP: SuccessResponse;
  verifyResetToken: Scalars['Boolean']['output'];
  warehouseForgotPassword: Scalars['Boolean']['output'];
  warehouseLogin: Maybe<WarehouseAuthPayload>;
  warehouseLogout: Scalars['Boolean']['output'];
  warehouseRefreshToken: Maybe<WarehouseAuthPayload>;
  warehouseResetPassword: Scalars['Boolean']['output'];
};


export type MutationAdminForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationAdminLoginArgs = {
  input: AdminLoginInput;
};


export type MutationAdminRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationAdminResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationB2bForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationB2bLoginArgs = {
  input: B2BLoginInput;
};


export type MutationB2bRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationB2bRegisterArgs = {
  input: B2BRegisterInput;
};


export type MutationB2bResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationB2cForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationB2cLoginArgs = {
  input: B2CLoginInput;
};


export type MutationB2cRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationB2cRegisterArgs = {
  input: B2CRegisterInput;
};


export type MutationB2cResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  app?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogoutArgs = {
  allDevices?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPickerForgotPasswordArgs = {
  username: Scalars['String']['input'];
  warehouseCode: Scalars['String']['input'];
};


export type MutationPickerLoginArgs = {
  input: PickerLoginInput;
};


export type MutationPickerRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationPickerResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationPriceQuoteArgs = {
  input: PriceQuoteInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterB2BArgs = {
  b2bType: Scalars['String']['input'];
  clinicAddress?: InputMaybe<AddressInput>;
  clinicEmail?: InputMaybe<Scalars['String']['input']>;
  clinicName?: InputMaybe<Scalars['String']['input']>;
  clinicPhone?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterB2CArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRequestCreditIncreaseArgs = {
  amount: Scalars['Decimal']['input'];
  reason: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendOtpArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserPaymentMethodArgs = {
  paymentMethodId: Scalars['ID']['input'];
};


export type MutationUpdateUserWarehouseArgs = {
  warehouseId: Scalars['ID']['input'];
};


export type MutationUpdateVerificationStatusArgs = {
  notes?: InputMaybe<Scalars['String']['input']>;
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUploadVerificationDocumentArgs = {
  documentType: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationValidatePickerCredentialsArgs = {
  input: PickerCredentialsInput;
};


export type MutationVerifyOtpArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyResetTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationWarehouseForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationWarehouseLoginArgs = {
  input: WarehouseLoginInput;
};


export type MutationWarehouseRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationWarehouseResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  deliveredAt: Maybe<Scalars['DateTime']['output']>;
  failedAt: Maybe<Scalars['DateTime']['output']>;
  failureReason: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  metadata: Maybe<Scalars['JSON']['output']>;
  notificationType: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  readAt: Maybe<Scalars['DateTime']['output']>;
  recipientEmail: Maybe<Scalars['String']['output']>;
  recipientPhone: Maybe<Scalars['String']['output']>;
  sentAt: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  subject: Maybe<Scalars['String']['output']>;
  templateData: Maybe<Scalars['JSON']['output']>;
  templateName: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: Maybe<User>;
};

export type NotificationListResponse = {
  __typename?: 'NotificationListResponse';
  items: Array<Notification>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  unreadCount: Maybe<Scalars['Int']['output']>;
};

export type NotificationPriority =
  | 'HIGH'
  | 'LOW'
  | 'NORMAL'
  | 'URGENT'
  | '%future added value';

export type Order = {
  __typename?: 'Order';
  billingAddress: Address;
  cancelledAt: Maybe<Scalars['DateTime']['output']>;
  cancelledReason: Maybe<Scalars['String']['output']>;
  confirmedAt: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Maybe<User>;
  customerNotes: Maybe<Scalars['String']['output']>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  deliveredDate: Maybe<Scalars['DateTime']['output']>;
  discountAmount: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  internalNotes: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  itemCount: Maybe<Scalars['Int']['output']>;
  items: Array<OrderItem>;
  orderNumber: Scalars['String']['output'];
  paymentDate: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethodType>;
  paymentReference: Maybe<Scalars['String']['output']>;
  paymentStatus: PaymentStatus;
  prescribingDoctor: Maybe<Scalars['String']['output']>;
  prescriptionDate: Maybe<Scalars['Date']['output']>;
  prescriptionFile: Maybe<Scalars['String']['output']>;
  prescriptionNumber: Maybe<Scalars['String']['output']>;
  requiresPrescription: Maybe<Scalars['Boolean']['output']>;
  shippedDate: Maybe<Scalars['DateTime']['output']>;
  shippingAddress: Address;
  shippingAmount: Scalars['Decimal']['output'];
  shippingMethod: Maybe<Scalars['String']['output']>;
  status: OrderStatus;
  subtotal: Scalars['Decimal']['output'];
  taxAmount: Scalars['Decimal']['output'];
  total: Maybe<Scalars['Decimal']['output']>;
  totalAmount: Scalars['Decimal']['output'];
  trackingNumber: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Maybe<User>;
  user: User;
  warehouse: Maybe<Warehouse>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  edges: Array<OrderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String']['output'];
  node: Order;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  batchNumber: Maybe<Scalars['String']['output']>;
  cancelledQuantity: Maybe<Scalars['Int']['output']>;
  cancelledReason: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  discountAmount: Maybe<Scalars['Decimal']['output']>;
  discountPercentage: Maybe<Scalars['Decimal']['output']>;
  expirationDate: Maybe<Scalars['Date']['output']>;
  fulfilledQuantity: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image: Maybe<Scalars['String']['output']>;
  isCancelled: Maybe<Scalars['Boolean']['output']>;
  isFulfilled: Scalars['Boolean']['output'];
  order: Order;
  prescriptionVerified: Maybe<Scalars['Boolean']['output']>;
  product: Product;
  productDescription: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  productSku: Scalars['String']['output'];
  productVariant: Maybe<ProductVariant>;
  quantity: Scalars['Int']['output'];
  requiresPrescription: Maybe<Scalars['Boolean']['output']>;
  status: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Decimal']['output'];
  unitPrice: Scalars['Decimal']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type OrderItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  unitPrice?: InputMaybe<Scalars['Decimal']['input']>;
};

export type OrderStatus =
  | 'CANCELLED'
  | 'CONFIRMED'
  | 'DELIVERED'
  | 'PACKED'
  | 'PENDING'
  | 'PICKED'
  | 'PROCESSING'
  | 'READY_FOR_PICKUP'
  | 'REFUNDED'
  | 'RETURNED'
  | 'SHIPPED'
  | '%future added value';

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  method: Maybe<Scalars['String']['output']>;
  orderId: Scalars['ID']['output'];
  status: PaymentStatus;
  transactionId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentCategory =
  | 'STRIPE'
  | '%future added value';

export type PaymentGatewayType =
  | 'STRIPE'
  | '%future added value';

export type PaymentMethodCode =
  | 'STRIPE'
  | '%future added value';

export type PaymentMethodType = {
  __typename?: 'PaymentMethodType';
  code: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  displayName: Maybe<Scalars['String']['output']>;
  displayOrder: Maybe<Scalars['Int']['output']>;
  frontendConfig: Maybe<Scalars['JSON']['output']>;
  gatewayType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAvailableForB2B: Maybe<Scalars['Boolean']['output']>;
  isAvailableForB2C: Maybe<Scalars['Boolean']['output']>;
  maximumAmount: Maybe<Scalars['Decimal']['output']>;
  metadata: Maybe<Scalars['JSON']['output']>;
  minimumAmount: Maybe<Scalars['Decimal']['output']>;
  name: Scalars['String']['output'];
  processingFeeFixed: Maybe<Scalars['Decimal']['output']>;
  processingFeeRate: Maybe<Scalars['Decimal']['output']>;
  requiresProcessing: Maybe<Scalars['Boolean']['output']>;
  requiresVerification: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  payment: Maybe<Payment>;
  status: Maybe<PaymentStatus>;
  success: Scalars['Boolean']['output'];
  transactionId: Maybe<Scalars['String']['output']>;
};

export type PaymentStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'PAID'
  | 'PARTIALLY_PAID'
  | 'PARTIALLY_REFUNDED'
  | 'PENDING'
  | 'REFUNDED'
  | '%future added value';

export type PickTaskPriority =
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM'
  | 'NORMAL'
  | 'URGENT'
  | '%future added value';

export type PickTaskStatus =
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PENDING'
  | '%future added value';

export type PickerAuthPayload = {
  __typename?: 'PickerAuthPayload';
  accessToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: PickerUser;
  warehouse: Warehouse;
};

export type PickerCredentialsInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type PickerLoginInput = {
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
  warehouseCode: Scalars['String']['input'];
};

export type PickerUser = AuthUser & {
  __typename?: 'PickerUser';
  activePickingTasks: Scalars['Int']['output'];
  assignedWarehouse: Maybe<Warehouse>;
  completedToday: Scalars['Int']['output'];
  efficiency: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  scope: AuthScope;
  username: Scalars['String']['output'];
};

export type PriceQuote = {
  __typename?: 'PriceQuote';
  id: Scalars['ID']['output'];
  items: Array<QuoteItem>;
  notes: Maybe<Scalars['String']['output']>;
  subtotal: Scalars['Decimal']['output'];
  tax: Scalars['Decimal']['output'];
  total: Scalars['Decimal']['output'];
  validUntil: Scalars['DateTime']['output'];
};

export type PriceQuoteInput = {
  deliveryDate?: InputMaybe<Scalars['String']['input']>;
  items: Array<QuoteItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type PriceQuoteResponse = {
  __typename?: 'PriceQuoteResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  quote: Maybe<PriceQuote>;
  success: Scalars['Boolean']['output'];
};

export type PriorityNotificationCount = {
  __typename?: 'PriorityNotificationCount';
  high: Scalars['Int']['output'];
  low: Scalars['Int']['output'];
  medium: Scalars['Int']['output'];
  normal: Scalars['Int']['output'];
  urgent: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  allowBackorder: Maybe<Scalars['Boolean']['output']>;
  averageRating: Maybe<Scalars['Float']['output']>;
  barcode: Maybe<Scalars['String']['output']>;
  barcodeCarton: Maybe<Scalars['String']['output']>;
  barcodeInner: Maybe<Scalars['String']['output']>;
  batchNumber: Maybe<Scalars['String']['output']>;
  brand: Maybe<Brand>;
  category: Maybe<Category>;
  compareAtPrice: Maybe<Scalars['Decimal']['output']>;
  controlledSubstance: Maybe<Scalars['Boolean']['output']>;
  costPrice: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  createdBy: Maybe<User>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  dimensionsHeight: Maybe<Scalars['Decimal']['output']>;
  dimensionsLength: Maybe<Scalars['Decimal']['output']>;
  dimensionsWidth: Maybe<Scalars['Decimal']['output']>;
  expirationDate: Maybe<Scalars['Date']['output']>;
  fdaApproved: Maybe<Scalars['Boolean']['output']>;
  fdaNumber: Maybe<Scalars['String']['output']>;
  features: Maybe<Scalars['JSON']['output']>;
  functionalName: Maybe<Scalars['String']['output']>;
  gpcCode: Maybe<Scalars['String']['output']>;
  gpcDescription: Maybe<Scalars['String']['output']>;
  gtin: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isDigital: Maybe<Scalars['Boolean']['output']>;
  isFeatured: Maybe<Scalars['Boolean']['output']>;
  isPointOfSale: Maybe<Scalars['Boolean']['output']>;
  isTaxable: Maybe<Scalars['Boolean']['output']>;
  lowStockThreshold: Maybe<Scalars['Int']['output']>;
  metaDescription: Maybe<Scalars['String']['output']>;
  metaTitle: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  netContent: Maybe<Scalars['String']['output']>;
  packagingLevel: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  productType: Maybe<Scalars['String']['output']>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  quantityInStock: Maybe<Scalars['Int']['output']>;
  relatedProducts: Maybe<Array<Product>>;
  requiresPrescription: Maybe<Scalars['Boolean']['output']>;
  requiresShipping: Maybe<Scalars['Boolean']['output']>;
  reviewCount: Maybe<Scalars['Int']['output']>;
  reviews: Maybe<Array<Review>>;
  seoKeywords: Maybe<Scalars['String']['output']>;
  shortDescription: Maybe<Scalars['String']['output']>;
  sku: Scalars['String']['output'];
  slug: Maybe<Scalars['String']['output']>;
  specifications: Maybe<Scalars['JSON']['output']>;
  status: Scalars['String']['output'];
  subBrand: Maybe<Scalars['String']['output']>;
  tags: Maybe<Array<Scalars['String']['output']>>;
  trackInventory: Maybe<Scalars['Boolean']['output']>;
  unitOfMeasure: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  updatedBy: Maybe<User>;
  variant: Maybe<Scalars['String']['output']>;
  variants: Maybe<Array<ProductVariant>>;
  videoUrl: Maybe<Scalars['String']['output']>;
  weight: Maybe<Scalars['Decimal']['output']>;
};


export type ProductRelatedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges: Array<ProductEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  altText: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isPrimary: Scalars['Boolean']['output'];
  large: Maybe<Scalars['String']['output']>;
  medium: Maybe<Scalars['String']['output']>;
  product: Product;
  small: Maybe<Scalars['String']['output']>;
  sortOrder: Maybe<Scalars['Int']['output']>;
  thumbnail: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  items: Array<Product>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ProductReview = {
  __typename?: 'ProductReview';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isApproved: Scalars['Boolean']['output'];
  isVerifiedPurchase: Scalars['Boolean']['output'];
  product: Product;
  rating: Scalars['Int']['output'];
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ProductSortBy =
  | 'CREATED_AT'
  | 'NAME'
  | 'POPULARITY'
  | 'PRICE'
  | 'RATING'
  | 'RELEVANCE'
  | 'STOCK'
  | '%future added value';

export type ProductVariant = {
  __typename?: 'ProductVariant';
  attributes: Maybe<Scalars['JSON']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Maybe<Scalars['String']['output']>;
  price: Maybe<Scalars['Decimal']['output']>;
  priceAdjustment: Maybe<Scalars['Decimal']['output']>;
  product: Product;
  quantity: Maybe<Scalars['Int']['output']>;
  quantityInStock: Maybe<Scalars['Int']['output']>;
  sku: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _empty: Maybe<Scalars['String']['output']>;
  availableCredit: Maybe<Scalars['Decimal']['output']>;
  companyOrders: Array<Order>;
  getVerificationStatus: Maybe<DoctorVerification>;
  health: Maybe<HealthStatus>;
  me: Maybe<User>;
  myCompany: Maybe<Company>;
};


export type QueryCompanyOrdersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
};

export type QuoteItem = {
  __typename?: 'QuoteItem';
  product: Product;
  quantity: Scalars['Int']['output'];
  total: Scalars['Decimal']['output'];
  unitPrice: Scalars['Decimal']['output'];
};

export type QuoteItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type RecentOrder = {
  __typename?: 'RecentOrder';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  orderNumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalAmount: Scalars['Decimal']['output'];
};

export type RefundResponse = {
  __typename?: 'RefundResponse';
  amount: Maybe<Scalars['Float']['output']>;
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  refundId: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  transactionId: Maybe<Scalars['String']['output']>;
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  helpfulVotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isVerifiedPurchase: Scalars['Boolean']['output'];
  rating: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type SortOrder =
  | 'ASC'
  | 'DESC'
  | '%future added value';

export type StockAlertPriority =
  | 'CRITICAL'
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM'
  | '%future added value';

export type Subscription = {
  __typename?: 'Subscription';
  _empty: Maybe<Scalars['String']['output']>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  b2bType: Maybe<B2BType>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  creditBalance: Maybe<Scalars['Decimal']['output']>;
  creditLimit: Maybe<Scalars['Decimal']['output']>;
  creditPeriodDays: Maybe<Scalars['Int']['output']>;
  dateJoined: Maybe<Scalars['DateTime']['output']>;
  defaultPaymentMethod: Maybe<PaymentMethodType>;
  email: Scalars['String']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  fullName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  isProfileComplete: Maybe<Scalars['Boolean']['output']>;
  isStaff: Maybe<Scalars['Boolean']['output']>;
  isSuperuser: Maybe<Scalars['Boolean']['output']>;
  lastLoginAt: Maybe<Scalars['DateTime']['output']>;
  lastName: Maybe<Scalars['String']['output']>;
  permissions: Maybe<Array<Scalars['String']['output']>>;
  phone: Maybe<Scalars['String']['output']>;
  role: Maybe<UserRole>;
  roles: Maybe<Array<UserRole>>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userType: Maybe<Scalars['String']['output']>;
  username: Maybe<Scalars['String']['output']>;
  warehouse: Maybe<Warehouse>;
  warehouseAssignments: Maybe<Array<UserWarehouseAssignment>>;
  warehouses: Maybe<Array<Warehouse>>;
};

export type UserRole =
  | 'ADMIN'
  | 'B2B_CUSTOMER'
  | 'B2C_CUSTOMER'
  | 'CUSTOMER'
  | 'DOCTOR'
  | 'FINANCE_ADMIN'
  | 'PICKER'
  | 'SALES_TEAM'
  | 'SUPER_ADMIN'
  | 'SUPER_USER'
  | 'SUPPLIER'
  | 'WAREHOUSE_ADMIN'
  | 'WAREHOUSE_MANAGER'
  | '%future added value';

export type UserWarehouseAssignment = {
  __typename?: 'UserWarehouseAssignment';
  assignedAt: Scalars['DateTime']['output'];
  assignedBy: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  notes: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  warehouse: Warehouse;
};

export type ValidatePickerCredentialsPayload = {
  __typename?: 'ValidatePickerCredentialsPayload';
  error: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: Maybe<PickerUser>;
  warehouses: Maybe<Array<Warehouse>>;
};

export type VerificationStatusResponse = {
  __typename?: 'VerificationStatusResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  verification: Maybe<DoctorVerification>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address: Maybe<Address>;
  capacity: Maybe<Scalars['Int']['output']>;
  code: Maybe<Scalars['String']['output']>;
  contactEmail: Maybe<Scalars['String']['output']>;
  contactPhone: Maybe<Scalars['String']['output']>;
  controlledSubstanceLicensed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Maybe<User>;
  currentUtilization: Scalars['Float']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  email: Maybe<Scalars['String']['output']>;
  hasColdStorage: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  inventory: Maybe<Array<InventoryItem>>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPrimary: Scalars['Boolean']['output'];
  manager: Maybe<User>;
  managerEmail: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes: Maybe<Scalars['String']['output']>;
  operatingHours: Maybe<Scalars['JSON']['output']>;
  pharmacyLicensed: Scalars['Boolean']['output'];
  phone: Maybe<Scalars['String']['output']>;
  settings: Maybe<WarehouseSettings>;
  status: Maybe<Scalars['String']['output']>;
  temperatureControlled: Scalars['Boolean']['output'];
  timezone: Scalars['String']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  updatedBy: Maybe<User>;
  warehouseType: WarehouseType;
  zones: Array<WarehouseZone>;
};

export type WarehouseAuthPayload = {
  __typename?: 'WarehouseAuthPayload';
  accessToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: WarehouseUser;
  warehouse: Warehouse;
};

export type WarehouseListResponse = {
  __typename?: 'WarehouseListResponse';
  items: Array<Warehouse>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type WarehouseLocation = {
  __typename?: 'WarehouseLocation';
  aisle: Maybe<Scalars['String']['output']>;
  barcode: Maybe<Scalars['String']['output']>;
  bin: Maybe<Scalars['String']['output']>;
  capacity: Maybe<Scalars['Int']['output']>;
  code: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  currentQuantity: Scalars['Int']['output'];
  currentUtilization: Scalars['Float']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isReserved: Scalars['Boolean']['output'];
  locationType: LocationType;
  name: Maybe<Scalars['String']['output']>;
  reservedFor: Maybe<Scalars['ID']['output']>;
  reservedUntil: Maybe<Scalars['String']['output']>;
  shelf: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  zone: Scalars['ID']['output'];
};

export type WarehouseLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  warehouseCode: Scalars['String']['input'];
};

export type WarehouseResponse = {
  __typename?: 'WarehouseResponse';
  error: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  warehouse: Maybe<Warehouse>;
};

export type WarehouseSettings = {
  __typename?: 'WarehouseSettings';
  autoAssignOrders: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  defaultPickerPriority: Scalars['String']['output'];
  emailNotificationsEnabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  notificationRecipients: Array<Scalars['String']['output']>;
  paymentGatewayApiKey: Maybe<Scalars['String']['output']>;
  paymentGatewayConfig: Maybe<Scalars['JSON']['output']>;
  paymentGatewayEnabled: Scalars['Boolean']['output'];
  paymentGatewayProvider: Maybe<Scalars['String']['output']>;
  paymentGatewaySecretKey: Maybe<Scalars['String']['output']>;
  paymentGatewayWebhookSecret: Maybe<Scalars['String']['output']>;
  settingsData: Maybe<Scalars['JSON']['output']>;
  smsNotificationsEnabled: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  warehouse: Warehouse;
};

export type WarehouseStatus =
  | 'ACTIVE'
  | 'CLOSED'
  | 'INACTIVE'
  | 'MAINTENANCE'
  | '%future added value';

export type WarehouseType =
  | 'COLD_STORAGE'
  | 'DISTRIBUTION'
  | 'HOSPITAL'
  | 'MAIN'
  | 'OTHER'
  | 'PHARMACY'
  | 'REGIONAL'
  | '%future added value';

export type WarehouseUser = AuthUser & {
  __typename?: 'WarehouseUser';
  canManageInventory: Scalars['Boolean']['output'];
  canManageShipments: Scalars['Boolean']['output'];
  canViewReports: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  scope: AuthScope;
  username: Scalars['String']['output'];
  warehouse: Warehouse;
};

export type WarehouseZone = {
  __typename?: 'WarehouseZone';
  accessLevel: Maybe<Scalars['String']['output']>;
  capacity: Maybe<Scalars['Int']['output']>;
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  currentUtilization: Scalars['Float']['output'];
  description: Maybe<Scalars['String']['output']>;
  humidityMax: Maybe<Scalars['Float']['output']>;
  humidityMin: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  locations: Array<WarehouseLocation>;
  name: Scalars['String']['output'];
  requiresSpecialAccess: Scalars['Boolean']['output'];
  temperatureMax: Maybe<Scalars['Float']['output']>;
  temperatureMin: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['String']['output'];
  warehouse: Scalars['ID']['output'];
  zoneType: ZoneType;
};

export type ZoneResponse = {
  __typename?: 'ZoneResponse';
  error: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  zone: Maybe<WarehouseZone>;
};

export type ZoneType =
  | 'COLD'
  | 'CONTROLLED'
  | 'FROZEN'
  | 'GENERAL'
  | 'HAZARDOUS'
  | 'OTHER'
  | 'QUARANTINE'
  | 'RECEIVING'
  | 'RETURNS'
  | 'SHIPPING'
  | 'STAGING'
  | '%future added value';

export type LoginMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  app?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string | null, refreshToken: string | null, expiresAt: number | null, user: { __typename?: 'User', id: string, email: string, phone: string | null, username: string | null, firstName: string | null, lastName: string | null, role: UserRole | null } | null } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string | null, refreshToken: string | null, expiresAt: number | null, user: { __typename?: 'User', id: string, email: string, phone: string | null, username: string | null, firstName: string | null, lastName: string | null, role: UserRole | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'SuccessResponse', success: boolean, message: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, username: string | null, firstName: string | null, lastName: string | null, role: UserRole | null, isActive: boolean, createdAt: string | null, updatedAt: string | null } | null };
