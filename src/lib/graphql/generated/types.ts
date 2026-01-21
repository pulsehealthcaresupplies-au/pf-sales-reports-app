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
  Decimal: { input: string; output: string; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
  UUID: { input: string; output: string; }
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

export type AnalyticsPeriod =
  | 'CUSTOM'
  | 'DAILY'
  | 'MONTHLY'
  | 'WEEKLY'
  | 'YEARLY'
  | '%future added value';

export type AnalyticsProductPerformance = {
  __typename?: 'AnalyticsProductPerformance';
  orderCount: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  totalQuantity: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type AnalyticsRevenueReport = {
  __typename?: 'AnalyticsRevenueReport';
  averageOrderValue: Scalars['Float']['output'];
  breakdown: Array<RevenueBreakdown>;
  endDate: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  startDate: Scalars['String']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type AnalyticsSummaryResponse = {
  __typename?: 'AnalyticsSummaryResponse';
  endDate: Scalars['DateTime']['output'];
  fromCache: Scalars['Boolean']['output'];
  mostPurchased: Array<TopProduct>;
  overallStats: Maybe<OverallStats>;
  period: AnalyticsPeriod;
  role: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  topProducts: Array<TopProduct>;
  topSearches: Array<TopSearch>;
  warehouseStats: Maybe<WarehouseStats>;
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

export type B2BUserCredit = {
  __typename?: 'B2BUserCredit';
  availableCredit: Scalars['Decimal']['output'];
  b2bType: Maybe<B2BType>;
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  warehouse: Maybe<Warehouse>;
};

export type B2BUsersCreditResponse = {
  __typename?: 'B2BUsersCreditResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  users: Array<B2BUserCredit>;
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

export type BrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
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

export type CategorySales = {
  __typename?: 'CategorySales';
  categoryName: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
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

export type CreateOrderInput = {
  billingAddress: AddressInput;
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  items: Array<OrderItemInput>;
  paymentMethodId?: InputMaybe<Scalars['ID']['input']>;
  prescriptionNumber?: InputMaybe<Scalars['String']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  shippingAddress: AddressInput;
  shippingMethod?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  sku: Scalars['String']['input'];
};

export type CreateShipmentInput = {
  carrier: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  trackingUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreditActiveSummary = {
  __typename?: 'CreditActiveSummary';
  count: Scalars['Int']['output'];
  totalAvailableCredit: Scalars['Float']['output'];
  totalCreditBalance: Scalars['Float']['output'];
  totalCreditLimit: Scalars['Float']['output'];
};

export type CreditDashboardSummary = {
  __typename?: 'CreditDashboardSummary';
  active: CreditActiveSummary;
  dueSoon: CreditDueSoonSummary;
  overdue: CreditOverdueSummary;
  pendingApproval: CreditPendingSummary;
};

export type CreditDueSoonSummary = {
  __typename?: 'CreditDueSoonSummary';
  count: Scalars['Int']['output'];
  daysAhead: Scalars['Int']['output'];
  totalAmount: Scalars['Float']['output'];
};

export type CreditInfo = {
  __typename?: 'CreditInfo';
  availableCredit: Scalars['Decimal']['output'];
  b2bType: Maybe<B2BType>;
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
};

export type CreditInfoResponse = {
  __typename?: 'CreditInfoResponse';
  availableCredit: Scalars['Decimal']['output'];
  b2bType: Maybe<B2BType>;
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  error: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreditOverdueSummary = {
  __typename?: 'CreditOverdueSummary';
  count: Scalars['Int']['output'];
  totalAmount: Scalars['Float']['output'];
};

export type CreditPendingSummary = {
  __typename?: 'CreditPendingSummary';
  count: Scalars['Int']['output'];
};

export type CreditReport = {
  __typename?: 'CreditReport';
  dueSoonCustomers: Array<DueSoonCustomer>;
  overdueCustomers: Array<OverdueCustomer>;
  summary: CreditSummary;
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

export type CreditSummary = {
  __typename?: 'CreditSummary';
  totalAccounts: Scalars['Int']['output'];
  totalAvailableCredit: Scalars['Float']['output'];
  totalCreditBalance: Scalars['Float']['output'];
  totalCreditLimit: Scalars['Float']['output'];
  utilizationRate: Scalars['Float']['output'];
};

export type CustomerReport = {
  __typename?: 'CustomerReport';
  period: CustomerReportPeriod;
  summary: CustomerSummary;
  topCustomers: Array<TopCustomer>;
};

export type CustomerReportPeriod = {
  __typename?: 'CustomerReportPeriod';
  endDate: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
};

export type CustomerSummary = {
  __typename?: 'CustomerSummary';
  averageLifetimeValue: Scalars['Float']['output'];
  averageOrdersPerCustomer: Scalars['Float']['output'];
  newCustomers: Scalars['Int']['output'];
  totalCustomers: Scalars['Int']['output'];
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

export type DueSoonCustomer = {
  __typename?: 'DueSoonCustomer';
  accountId: Scalars['ID']['output'];
  creditBalance: Scalars['Float']['output'];
  daysUntilDue: Scalars['Int']['output'];
  userEmail: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userName: Scalars['String']['output'];
};

export type DueSoonCustomersResponse = {
  __typename?: 'DueSoonCustomersResponse';
  count: Scalars['Int']['output'];
  customers: Array<DueSoonCustomer>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
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

export type InventoryItemReport = {
  __typename?: 'InventoryItemReport';
  availableStock: Scalars['Int']['output'];
  currentStock: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  reservedStock: Maybe<Scalars['Int']['output']>;
  sku: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalValue: Maybe<Scalars['Float']['output']>;
  unitCost: Maybe<Scalars['Float']['output']>;
};

export type InventoryReport = {
  __typename?: 'InventoryReport';
  endDate: Maybe<Scalars['String']['output']>;
  items: Maybe<Array<InventoryItemReport>>;
  startDate: Maybe<Scalars['String']['output']>;
  summary: Maybe<InventorySummary>;
  warehouseId: Maybe<Scalars['ID']['output']>;
  warehouseName: Maybe<Scalars['String']['output']>;
};

export type InventorySummary = {
  __typename?: 'InventorySummary';
  lowStockItems: Maybe<Scalars['Int']['output']>;
  outOfStockItems: Maybe<Scalars['Int']['output']>;
  totalItems: Maybe<Scalars['Int']['output']>;
  totalValue: Maybe<Scalars['Float']['output']>;
};

export type MostPurchasedResponse = {
  __typename?: 'MostPurchasedResponse';
  endDate: Scalars['DateTime']['output'];
  mostPurchased: Array<TopProduct>;
  period: AnalyticsPeriod;
  sortBy: SortBy;
  startDate: Scalars['DateTime']['output'];
};

export type MovementReport = {
  __typename?: 'MovementReport';
  movements: Maybe<Array<StockMovement>>;
  summary: Maybe<MovementSummary>;
};

export type MovementSummary = {
  __typename?: 'MovementSummary';
  adjustments: Maybe<Scalars['Int']['output']>;
  stockIn: Maybe<Scalars['Int']['output']>;
  stockOut: Maybe<Scalars['Int']['output']>;
  totalMovements: Maybe<Scalars['Int']['output']>;
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
  cancelOrder: OrderResponse;
  changePassword: SuccessResponse;
  clearWishlist: WishlistResponse;
  createShipment: Shipment;
  forgotPassword: SuccessResponse;
  login: AuthResponse;
  logout: SuccessResponse;
  packOrder: OrderResponse;
  pickerForgotPassword: Scalars['Boolean']['output'];
  pickerLogin: Maybe<PickerAuthPayload>;
  pickerLogout: Scalars['Boolean']['output'];
  pickerRefreshToken: Maybe<PickerAuthPayload>;
  pickerResetPassword: Scalars['Boolean']['output'];
  priceQuote: PriceQuoteResponse;
  printShippingLabel: Shipment;
  refreshToken: AuthResponse;
  register: AuthResponse;
  registerB2B: AuthResponse;
  registerB2C: AuthResponse;
  requestCreditIncrease: CreditRequestResponse;
  resetPassword: SuccessResponse;
  sendOTP: SuccessResponse;
  shipOrder: OrderResponse;
  startMockPayment: PaymentResponse;
  updateCreditLimit: UpdateCreditResponse;
  updateCreditPeriod: UpdateCreditResponse;
  updateOrderStatus: OrderResponse;
  updateShipment: Shipment;
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


export type MutationCancelOrderArgs = {
  orderId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
};


export type MutationCreateShipmentArgs = {
  input: CreateShipmentInput;
  orderId: Scalars['ID']['input'];
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


export type MutationPackOrderArgs = {
  orderId: Scalars['ID']['input'];
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


export type MutationPrintShippingLabelArgs = {
  orderId: Scalars['ID']['input'];
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


export type MutationShipOrderArgs = {
  input: ShipOrderInput;
  orderId: Scalars['ID']['input'];
};


export type MutationStartMockPaymentArgs = {
  orderId: Scalars['ID']['input'];
};


export type MutationUpdateCreditLimitArgs = {
  creditLimit: Scalars['Decimal']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCreditPeriodArgs = {
  creditPeriodDays: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateOrderStatusArgs = {
  input: UpdateOrderStatusInput;
  orderId: Scalars['ID']['input'];
};


export type MutationUpdateShipmentArgs = {
  id: Scalars['ID']['input'];
  input: CreateShipmentInput;
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
  userEmail: Maybe<Scalars['String']['output']>;
  warehouse: Maybe<Warehouse>;
  warehouseName: Maybe<Scalars['String']['output']>;
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

export type OrderInput = {
  billingAddress: AddressInput;
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  items: Array<OrderItemInput>;
  paymentMethodId?: InputMaybe<Scalars['ID']['input']>;
  prescriptionNumber?: InputMaybe<Scalars['String']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  shippingAddress: AddressInput;
  shippingMethod?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
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

export type OrderResponse = {
  __typename?: 'OrderResponse';
  cancellationReason: Maybe<Scalars['String']['output']>;
  cancelledAt: Maybe<Scalars['DateTime']['output']>;
  customer: Maybe<User>;
  error: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  message: Maybe<Scalars['String']['output']>;
  order: Maybe<Order>;
  orderNumber: Maybe<Scalars['String']['output']>;
  status: Maybe<OrderStatus>;
  statusHistory: Maybe<Array<OrderStatusHistory>>;
  success: Scalars['Boolean']['output'];
  totalAmount: Maybe<Scalars['Decimal']['output']>;
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

export type OrderStatusHistory = {
  __typename?: 'OrderStatusHistory';
  changedBy: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  newStatus: OrderStatus;
  notes: Maybe<Scalars['String']['output']>;
  oldStatus: Maybe<OrderStatus>;
  order: Scalars['ID']['output'];
  reason: Maybe<Scalars['String']['output']>;
};

export type OrdersAggregationResponse = {
  __typename?: 'OrdersAggregationResponse';
  count: Scalars['Int']['output'];
  data: Array<TimeAggregationData>;
  endDate: Maybe<Scalars['String']['output']>;
  period: Scalars['String']['output'];
  startDate: Maybe<Scalars['String']['output']>;
};

export type OrdersByStatusData = {
  __typename?: 'OrdersByStatusData';
  count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type OrdersByStatusResponse = {
  __typename?: 'OrdersByStatusResponse';
  count: Scalars['Int']['output'];
  data: Array<OrdersByStatusData>;
};

export type OrdersByWarehouseData = {
  __typename?: 'OrdersByWarehouseData';
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

export type OrdersByWarehouseResponse = {
  __typename?: 'OrdersByWarehouseResponse';
  count: Scalars['Int']['output'];
  data: Array<OrdersByWarehouseData>;
};

export type OverallStats = {
  __typename?: 'OverallStats';
  activeWarehouses: Scalars['Int']['output'];
  averageOrderValue: Scalars['Float']['output'];
  totalItemsSold: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  uniqueProducts: Scalars['Int']['output'];
};

export type OverdueCustomer = {
  __typename?: 'OverdueCustomer';
  accountId: Scalars['ID']['output'];
  creditBalance: Scalars['Float']['output'];
  daysOverdue: Scalars['Int']['output'];
  userEmail: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userName: Scalars['String']['output'];
};

export type OverdueCustomersResponse = {
  __typename?: 'OverdueCustomersResponse';
  count: Scalars['Int']['output'];
  customers: Array<OverdueCustomer>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

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

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  code: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  displayName: Maybe<Scalars['String']['output']>;
  displayOrder: Maybe<Scalars['Int']['output']>;
  feeFlat: Maybe<Scalars['Decimal']['output']>;
  feePercentage: Maybe<Scalars['Float']['output']>;
  frontendConfig: Maybe<Scalars['JSON']['output']>;
  gatewayType: Maybe<PaymentGatewayType>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAvailableForB2B: Maybe<Scalars['Boolean']['output']>;
  isAvailableForB2C: Maybe<Scalars['Boolean']['output']>;
  maximumAmount: Maybe<Scalars['Float']['output']>;
  metadata: Maybe<Scalars['JSON']['output']>;
  minimumAmount: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  processingFeeFixed: Maybe<Scalars['Float']['output']>;
  processingFeeRate: Maybe<Scalars['Float']['output']>;
  provider: Maybe<Scalars['String']['output']>;
  requiresProcessing: Maybe<Scalars['Boolean']['output']>;
  requiresVerification: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentMethodCode =
  | 'STRIPE'
  | '%future added value';

export type PaymentMethodConnection = {
  __typename?: 'PaymentMethodConnection';
  count: Scalars['Int']['output'];
  results: Array<PaymentMethod>;
};

export type PaymentMethodRevenue = {
  __typename?: 'PaymentMethodRevenue';
  orderCount: Scalars['Int']['output'];
  paymentMethod: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

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

export type PeriodRevenue = {
  __typename?: 'PeriodRevenue';
  orderCount: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

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

export type ProductImportResponse = {
  __typename?: 'ProductImportResponse';
  errors: Maybe<Array<Scalars['String']['output']>>;
  importId: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  summary: Maybe<ProductImportSummary>;
  warnings: Maybe<Array<Scalars['String']['output']>>;
};

export type ProductImportSummary = {
  __typename?: 'ProductImportSummary';
  created: Scalars['Int']['output'];
  errorsCount: Scalars['Int']['output'];
  skipped: Scalars['Int']['output'];
  totalRows: Scalars['Int']['output'];
  updated: Scalars['Int']['output'];
};

export type ProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  sku: Scalars['String']['input'];
};

export type ProductList = {
  __typename?: 'ProductList';
  items: Array<Product>;
  page: Scalars['Int']['output'];
  pages: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  items: Array<Product>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ProductPerformance = {
  __typename?: 'ProductPerformance';
  averagePrice: Scalars['Float']['output'];
  categoryName: Maybe<Scalars['String']['output']>;
  orderCount: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  quantitySold: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
};

export type ProductPerformanceReport = {
  __typename?: 'ProductPerformanceReport';
  period: ProductReportPeriod;
  products: Array<ProductPerformance>;
};

export type ProductReportPeriod = {
  __typename?: 'ProductReportPeriod';
  endDate: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  product: Maybe<Product>;
  success: Scalars['Boolean']['output'];
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

export type ProductSales = {
  __typename?: 'ProductSales';
  orderCount: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  quantitySold: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
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

export type ProfitHistoryItem = {
  __typename?: 'ProfitHistoryItem';
  cost: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  margin: Scalars['Float']['output'];
  profit: Scalars['Float']['output'];
  revenue: Scalars['Float']['output'];
};

export type ProfitReport = {
  __typename?: 'ProfitReport';
  history: Array<ProfitHistoryItem>;
  period: Maybe<ReportPeriod>;
  summary: ProfitSummary;
};

export type ProfitSummary = {
  __typename?: 'ProfitSummary';
  averageMargin: Scalars['Float']['output'];
  grossProfit: Scalars['Float']['output'];
  totalCost: Scalars['Float']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty: Maybe<Scalars['String']['output']>;
  analyticsRevenueReport: AnalyticsRevenueReport;
  analyticsSummary: AnalyticsSummaryResponse;
  availableCredit: Maybe<Scalars['Decimal']['output']>;
  b2bUsersCredit: B2BUsersCreditResponse;
  cart: Maybe<Cart>;
  categoryTree: Array<Category>;
  companyOrders: Array<Order>;
  creditReport: Maybe<CreditReport>;
  creditSummary: Maybe<CreditDashboardSummary>;
  customerReport: Maybe<CustomerReport>;
  customerTopSearches: Array<SearchTerm>;
  dueSoonCustomers: DueSoonCustomersResponse;
  getVerificationStatus: Maybe<DoctorVerification>;
  health: Maybe<HealthStatus>;
  inventoryReport: InventoryReport;
  me: Maybe<User>;
  mostPurchased: MostPurchasedResponse;
  movementsReport: MovementReport;
  myCompany: Maybe<Company>;
  myCreditInfo: CreditInfoResponse;
  myOrders: Array<Order>;
  myWishlist: Array<Product>;
  order: Maybe<Order>;
  orderShipments: Array<Shipment>;
  orderStatusHistory: Array<OrderStatusHistory>;
  orders: Array<Order>;
  ordersAggregation: OrdersAggregationResponse;
  ordersByStatus: OrdersByStatusResponse;
  ordersByWarehouse: OrdersByWarehouseResponse;
  overdueCustomers: OverdueCustomersResponse;
  paymentMethod: Maybe<PaymentMethod>;
  paymentMethods: PaymentMethodConnection;
  product: Maybe<Product>;
  productBySlug: Maybe<Product>;
  productPerformance: Array<AnalyticsProductPerformance>;
  productPerformanceReport: Maybe<ProductPerformanceReport>;
  products: Array<Product>;
  productsPaginated: ProductConnection;
  profitReport: Maybe<ProfitReport>;
  revenueAggregation: RevenueAggregationResponse;
  revenueByPaymentMethod: RevenueByPaymentMethodResponse;
  salesReport: Maybe<SalesReport>;
  search: SearchResult;
  searchAutosuggest: SearchAutosuggestResponse;
  searchProducts: Array<Product>;
  searchSuggestions: SearchSuggestionsResponse;
  shipment: Maybe<Shipment>;
  shipments: Array<Shipment>;
  topProducts: TopProductsResponse;
  topSearches: TopSearchesResponse;
  userActivityReport: UserActivityReport;
  userSignupsAggregation: UserSignupsAggregationResponse;
  warehouseStats: WarehouseStatsResponse;
  wishlist: Maybe<Wishlist>;
};


export type QueryAnalyticsRevenueReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAnalyticsSummaryArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<AnalyticsPeriod>;
  role?: InputMaybe<UserRole>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  useCache?: InputMaybe<Scalars['Boolean']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryB2bUsersCreditArgs = {
  b2bType?: InputMaybe<B2BType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompanyOrdersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
};


export type QueryCreditReportArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  includeDueSoon?: InputMaybe<Scalars['Boolean']['input']>;
  includeOverdue?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCreditSummaryArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  daysAhead?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCustomerReportArgs = {
  customerType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomerTopSearchesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDueSoonCustomersArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  days?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInventoryReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMostPurchasedArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<AnalyticsPeriod>;
  sortBy?: InputMaybe<SortBy>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  useCache?: InputMaybe<Scalars['Boolean']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMovementsReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMyOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderShipmentsArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryOrderStatusHistoryArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paymentStatus?: InputMaybe<PaymentStatus>;
  status?: InputMaybe<OrderStatus>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOrdersAggregationArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrdersByStatusArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrdersByWarehouseArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOverdueCustomersArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  daysOverdue?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPaymentMethodArgs = {
  code: PaymentMethodCode;
};


export type QueryPaymentMethodsArgs = {
  gatewayType?: InputMaybe<PaymentGatewayType>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductPerformanceArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductPerformanceReportArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  brand?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SortOrder>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  personalize?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ProductSortBy>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProductsPaginatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Decimal']['input']>;
  minPrice?: InputMaybe<Scalars['Decimal']['input']>;
  orderBy?: InputMaybe<SortOrder>;
  personalize?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ProductSortBy>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProfitReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRevenueAggregationArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRevenueByPaymentMethodArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySalesReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchArgs = {
  q: Scalars['String']['input'];
};


export type QuerySearchAutosuggestArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  type?: InputMaybe<SearchType>;
};


export type QuerySearchProductsArgs = {
  query: Scalars['String']['input'];
};


export type QuerySearchSuggestionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShipmentsArgs = {
  orderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ShipmentStatus>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTopProductsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<AnalyticsPeriod>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  useCache?: InputMaybe<Scalars['Boolean']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTopSearchesArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<AnalyticsPeriod>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  useCache?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserActivityReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserSignupsAggregationArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWarehouseStatsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<AnalyticsPeriod>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  useCache?: InputMaybe<Scalars['Boolean']['input']>;
  warehouseId: Scalars['ID']['input'];
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

export type RefundResponse = {
  __typename?: 'RefundResponse';
  amount: Maybe<Scalars['Float']['output']>;
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  refundId: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  transactionId: Maybe<Scalars['String']['output']>;
};

export type ReportPeriod = {
  __typename?: 'ReportPeriod';
  endDate: Scalars['String']['output'];
  groupBy: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
};

export type RevenueAggregationResponse = {
  __typename?: 'RevenueAggregationResponse';
  count: Scalars['Int']['output'];
  data: Array<TimeAggregationData>;
  endDate: Maybe<Scalars['String']['output']>;
  period: Scalars['String']['output'];
  startDate: Maybe<Scalars['String']['output']>;
};

export type RevenueBreakdown = {
  __typename?: 'RevenueBreakdown';
  date: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
};

export type RevenueByPaymentMethodData = {
  __typename?: 'RevenueByPaymentMethodData';
  orderCount: Scalars['Int']['output'];
  paymentMethod: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

export type RevenueByPaymentMethodResponse = {
  __typename?: 'RevenueByPaymentMethodResponse';
  count: Scalars['Int']['output'];
  data: Array<RevenueByPaymentMethodData>;
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

export type SalesReport = {
  __typename?: 'SalesReport';
  period: ReportPeriod;
  revenueByPaymentMethod: Array<PaymentMethodRevenue>;
  revenueByPeriod: Array<PeriodRevenue>;
  revenueByStatus: Array<StatusRevenue>;
  revenueByWarehouse: Array<WarehouseRevenue>;
  summary: SalesSummary;
  topCategories: Array<CategorySales>;
  topProducts: Array<ProductSales>;
};

export type SalesSummary = {
  __typename?: 'SalesSummary';
  averageOrderValue: Scalars['Float']['output'];
  completedOrders: Scalars['Int']['output'];
  completedRevenue: Scalars['Float']['output'];
  conversionRate: Scalars['Float']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type SearchAutosuggestResponse = {
  __typename?: 'SearchAutosuggestResponse';
  query: Scalars['String']['output'];
  suggestions: Array<Scalars['String']['output']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  count: Scalars['Int']['output'];
  query: Scalars['String']['output'];
  results: Array<Product>;
  source: Scalars['String']['output'];
};

export type SearchSuggestion = {
  __typename?: 'SearchSuggestion';
  category: Maybe<Scalars['String']['output']>;
  link: Maybe<Scalars['String']['output']>;
  searchLink: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type SearchSuggestionsResponse = {
  __typename?: 'SearchSuggestionsResponse';
  hasMore: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  suggestions: Array<SearchSuggestion>;
  totalCount: Maybe<Scalars['Int']['output']>;
};

export type SearchTerm = {
  __typename?: 'SearchTerm';
  count: Scalars['Int']['output'];
  term: Scalars['String']['output'];
};

export type SearchType =
  | 'CATEGORIES'
  | 'ORDERS'
  | 'PRODUCTS'
  | '%future added value';

export type ShipOrderInput = {
  carrier: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  trackingUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Shipment = {
  __typename?: 'Shipment';
  actualDelivery: Maybe<Scalars['DateTime']['output']>;
  carrier: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Maybe<User>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  estimatedDelivery: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  labelPrinted: Scalars['Boolean']['output'];
  labelPrintedAt: Maybe<Scalars['DateTime']['output']>;
  lastTrackingUpdate: Maybe<Scalars['DateTime']['output']>;
  notes: Maybe<Scalars['String']['output']>;
  order: Order;
  packedAt: Maybe<Scalars['DateTime']['output']>;
  packedBy: Maybe<User>;
  serviceType: Maybe<Scalars['String']['output']>;
  shippedDate: Maybe<Scalars['DateTime']['output']>;
  shippingAddress: Maybe<Address>;
  status: ShipmentStatus;
  trackingData: Maybe<Scalars['JSON']['output']>;
  trackingNumber: Maybe<Scalars['String']['output']>;
  trackingUrl: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Maybe<User>;
};

export type ShipmentStatus =
  | 'DELIVERED'
  | 'FAILED_DELIVERY'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'PACKED'
  | 'PREPARING'
  | 'RETURNED'
  | 'SHIPPED'
  | '%future added value';

export type SortBy =
  | 'QUANTITY'
  | 'REVENUE'
  | '%future added value';

export type SortOrder =
  | 'ASC'
  | 'DESC'
  | '%future added value';

export type StatusCount = {
  __typename?: 'StatusCount';
  count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type StatusRevenue = {
  __typename?: 'StatusRevenue';
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type StockMovement = {
  __typename?: 'StockMovement';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  movementType: Scalars['String']['output'];
  newStock: Maybe<Scalars['Int']['output']>;
  previousStock: Maybe<Scalars['Int']['output']>;
  product: Maybe<Product>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  reason: Maybe<Scalars['String']['output']>;
  reference: Maybe<Scalars['String']['output']>;
  sku: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty: Maybe<Scalars['String']['output']>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type TimeAggregationData = {
  __typename?: 'TimeAggregationData';
  averageOrderValue: Maybe<Scalars['Float']['output']>;
  date: Scalars['String']['output'];
  orderCount: Maybe<Scalars['Int']['output']>;
  revenue: Maybe<Scalars['Float']['output']>;
  timestamp: Maybe<Scalars['Int']['output']>;
  userCount: Maybe<Scalars['Int']['output']>;
};

export type TopCustomer = {
  __typename?: 'TopCustomer';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type TopProduct = {
  __typename?: 'TopProduct';
  orderCount: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  productPrice: Scalars['Float']['output'];
  productSku: Scalars['String']['output'];
  totalQuantity: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type TopProductsResponse = {
  __typename?: 'TopProductsResponse';
  endDate: Scalars['DateTime']['output'];
  period: AnalyticsPeriod;
  startDate: Scalars['DateTime']['output'];
  topProducts: Array<TopProduct>;
};

export type TopSearch = {
  __typename?: 'TopSearch';
  count: Scalars['Int']['output'];
  term: Scalars['String']['output'];
  uniqueUsers: Scalars['Int']['output'];
};

export type TopSearchesResponse = {
  __typename?: 'TopSearchesResponse';
  endDate: Scalars['DateTime']['output'];
  period: AnalyticsPeriod;
  startDate: Scalars['DateTime']['output'];
  topSearches: Array<TopSearch>;
};

export type UpdateCreditResponse = {
  __typename?: 'UpdateCreditResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: Maybe<User>;
};

export type UpdateOrderStatusInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: OrderStatus;
};

export type UpdateProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
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

export type UserActivityReport = {
  __typename?: 'UserActivityReport';
  activeUsers: Scalars['Int']['output'];
  activityRate: Scalars['Float']['output'];
  endDate: Scalars['String']['output'];
  newUsers: Scalars['Int']['output'];
  startDate: Scalars['String']['output'];
  totalUsers: Scalars['Int']['output'];
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

export type UserSignupsAggregationResponse = {
  __typename?: 'UserSignupsAggregationResponse';
  count: Scalars['Int']['output'];
  data: Array<TimeAggregationData>;
  endDate: Maybe<Scalars['String']['output']>;
  period: Scalars['String']['output'];
  startDate: Maybe<Scalars['String']['output']>;
};

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
  code: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Maybe<User>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  status: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  updatedBy: Maybe<User>;
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

export type WarehouseLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  warehouseCode: Scalars['String']['input'];
};

export type WarehouseRevenue = {
  __typename?: 'WarehouseRevenue';
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

export type WarehouseStats = {
  __typename?: 'WarehouseStats';
  ordersByStatus: Array<StatusCount>;
  totalItemsSold: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  uniqueProducts: Scalars['Int']['output'];
};

export type WarehouseStatsResponse = {
  __typename?: 'WarehouseStatsResponse';
  calculatedAt: Maybe<Scalars['DateTime']['output']>;
  endDate: Scalars['DateTime']['output'];
  fromCache: Scalars['Boolean']['output'];
  lowStockCount: Maybe<Scalars['Int']['output']>;
  ordersByStatus: Array<StatusCount>;
  outOfStockCount: Maybe<Scalars['Int']['output']>;
  pendingReceiving: Maybe<Scalars['Int']['output']>;
  pendingTransfers: Maybe<Scalars['Int']['output']>;
  period: AnalyticsPeriod;
  startDate: Scalars['DateTime']['output'];
  totalItemsSold: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalProducts: Maybe<Scalars['Int']['output']>;
  totalRevenue: Scalars['Float']['output'];
  totalStock: Maybe<Scalars['Int']['output']>;
  turnoverRate: Maybe<Scalars['Float']['output']>;
  uniqueProducts: Scalars['Int']['output'];
  utilizationRate: Maybe<Scalars['Float']['output']>;
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

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

export type Wishlist = {
  __typename?: 'Wishlist';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<WishlistItem>;
  totalItems: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type WishlistItem = {
  __typename?: 'WishlistItem';
  addedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes: Maybe<Scalars['String']['output']>;
  product: Product;
};

export type WishlistResponse = {
  __typename?: 'WishlistResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  wishlist: Maybe<Wishlist>;
};

export type GetSalesReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSalesReportQuery = { __typename?: 'Query', salesReport: { __typename?: 'SalesReport', period: { __typename?: 'ReportPeriod', startDate: string, endDate: string, groupBy: string }, summary: { __typename?: 'SalesSummary', totalOrders: number, totalRevenue: number, completedOrders: number, completedRevenue: number, averageOrderValue: number, conversionRate: number }, revenueByPeriod: Array<{ __typename?: 'PeriodRevenue', period: string, revenue: number, orderCount: number }>, revenueByStatus: Array<{ __typename?: 'StatusRevenue', status: string, revenue: number, orderCount: number }>, revenueByPaymentMethod: Array<{ __typename?: 'PaymentMethodRevenue', paymentMethod: string, revenue: number, orderCount: number }>, revenueByWarehouse: Array<{ __typename?: 'WarehouseRevenue', warehouseId: string, warehouseName: string, revenue: number, orderCount: number }>, topProducts: Array<{ __typename?: 'ProductSales', productId: string, productName: string, sku: string, revenue: number, quantitySold: number, orderCount: number }>, topCategories: Array<{ __typename?: 'CategorySales', categoryName: string, revenue: number, orderCount: number }> } | null };

export type GetCustomerReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  customerType?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCustomerReportQuery = { __typename?: 'Query', customerReport: { __typename?: 'CustomerReport', period: { __typename?: 'CustomerReportPeriod', startDate: string, endDate: string }, summary: { __typename?: 'CustomerSummary', totalCustomers: number, newCustomers: number, averageLifetimeValue: number, averageOrdersPerCustomer: number }, topCustomers: Array<{ __typename?: 'TopCustomer', userId: string, email: string, name: string, revenue: number, orderCount: number }> } | null };

export type GetProductPerformanceReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductPerformanceReportQuery = { __typename?: 'Query', productPerformanceReport: { __typename?: 'ProductPerformanceReport', period: { __typename?: 'ProductReportPeriod', startDate: string, endDate: string }, products: Array<{ __typename?: 'ProductPerformance', productId: string, productName: string, sku: string, categoryName: string | null, revenue: number, quantitySold: number, orderCount: number, averagePrice: number }> } | null };

export type GetCreditReportQueryVariables = Exact<{
  creditType?: InputMaybe<Scalars['String']['input']>;
  includeOverdue?: InputMaybe<Scalars['Boolean']['input']>;
  includeDueSoon?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetCreditReportQuery = { __typename?: 'Query', creditReport: { __typename?: 'CreditReport', summary: { __typename?: 'CreditSummary', totalAccounts: number, totalCreditLimit: number, totalCreditBalance: number, totalAvailableCredit: number, utilizationRate: number }, overdueCustomers: Array<{ __typename?: 'OverdueCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysOverdue: number }>, dueSoonCustomers: Array<{ __typename?: 'DueSoonCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysUntilDue: number }> } | null };

export type GetOverdueCustomersQueryVariables = Exact<{
  daysOverdue?: InputMaybe<Scalars['Int']['input']>;
  creditType?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetOverdueCustomersQuery = { __typename?: 'Query', overdueCustomers: { __typename?: 'OverdueCustomersResponse', count: number, totalCount: number, page: number, pageSize: number, customers: Array<{ __typename?: 'OverdueCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysOverdue: number }> } };

export type GetDueSoonCustomersQueryVariables = Exact<{
  days?: InputMaybe<Scalars['Int']['input']>;
  creditType?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDueSoonCustomersQuery = { __typename?: 'Query', dueSoonCustomers: { __typename?: 'DueSoonCustomersResponse', count: number, totalCount: number, page: number, pageSize: number, customers: Array<{ __typename?: 'DueSoonCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysUntilDue: number }> } };

export type GetCreditSummaryQueryVariables = Exact<{
  creditType?: InputMaybe<Scalars['String']['input']>;
  daysAhead?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCreditSummaryQuery = { __typename?: 'Query', creditSummary: { __typename?: 'CreditDashboardSummary', overdue: { __typename?: 'CreditOverdueSummary', count: number, totalAmount: number }, dueSoon: { __typename?: 'CreditDueSoonSummary', count: number, totalAmount: number, daysAhead: number }, pendingApproval: { __typename?: 'CreditPendingSummary', count: number }, active: { __typename?: 'CreditActiveSummary', count: number, totalCreditLimit: number, totalCreditBalance: number, totalAvailableCredit: number } } | null };
