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

export type ActiveUser = {
  __typename?: 'ActiveUser';
  appName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  inactiveMinutes: Scalars['Int']['output'];
  lastActive: Scalars['DateTime']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  sessionCount: Scalars['Int']['output'];
  sessions: Array<UserSession>;
  userId: Scalars['ID']['output'];
};

export type ActivityLog = {
  __typename?: 'ActivityLog';
  action: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['JSON']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  resource: Scalars['String']['output'];
  resourceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ActivityStatus>;
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type ActivityLogConnection = {
  __typename?: 'ActivityLogConnection';
  items: Array<ActivityLog>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ActivityLogFilters = {
  action?: InputMaybe<Scalars['String']['input']>;
  appName?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  entityId?: InputMaybe<Scalars['ID']['input']>;
  entityType?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ActivityStatus>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export enum ActivityStatus {
  Failure = 'FAILURE',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type ActivityUpdateResponse = {
  __typename?: 'ActivityUpdateResponse';
  error?: Maybe<Scalars['String']['output']>;
  lastActive?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Address = {
  __typename?: 'Address';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type AdminAuthPayload = {
  __typename?: 'AdminAuthPayload';
  accessToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: AdminUser;
};

export type AdminFinancialSummary = {
  __typename?: 'AdminFinancialSummary';
  discounts: Scalars['Float']['output'];
  period: PeriodInfo;
  revenueByPaymentMethod: Array<AdminPaymentMethodRevenue>;
  shipping: Scalars['Float']['output'];
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type AdminLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AdminPaymentMethodRevenue = {
  __typename?: 'AdminPaymentMethodRevenue';
  count: Scalars['Int']['output'];
  paymentMethod: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

export type AdminUser = AuthUser & {
  __typename?: 'AdminUser';
  canManageOrders: Scalars['Boolean']['output'];
  canManageProducts: Scalars['Boolean']['output'];
  canManageUsers: Scalars['Boolean']['output'];
  canViewAnalytics: Scalars['Boolean']['output'];
  department?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  scope: AuthScope;
  username: Scalars['String']['output'];
};

export enum AnalyticsPeriod {
  Custom = 'CUSTOM',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

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
  overallStats?: Maybe<OverallStats>;
  period: AnalyticsPeriod;
  role: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  topProducts: Array<TopProduct>;
  topSearches: Array<TopSearch>;
  warehouseStats?: Maybe<WarehouseStats>;
};

export enum AppName {
  Admin = 'ADMIN',
  B2BB2C = 'B2B_B2C',
  Picker = 'PICKER',
  Warehouse = 'WAREHOUSE'
}

export type AssignCreditConfigResponse = {
  __typename?: 'AssignCreditConfigResponse';
  creditLimit?: Maybe<Scalars['Decimal']['output']>;
  creditPeriodDays?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AssignWarehouseInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export enum AuthMethod {
  ApiKey = 'API_KEY',
  JwtToken = 'JWT_TOKEN',
  Oauth2 = 'OAUTH2',
  SessionCookie = 'SESSION_COOKIE'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['Float']['output']>;
  expiresIn?: Maybe<Scalars['Int']['output']>;
  hashPhrase: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum AuthScope {
  Admin = 'ADMIN',
  B2B = 'B2B',
  B2C = 'B2C',
  Picker = 'PICKER',
  Warehouse = 'WAREHOUSE'
}

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
  refreshToken?: Maybe<Scalars['String']['output']>;
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

export enum B2BType {
  Doctor = 'DOCTOR',
  Supplier = 'SUPPLIER'
}

export type B2BUser = AuthUser & {
  __typename?: 'B2BUser';
  accountManager?: Maybe<Scalars['String']['output']>;
  businessRegistration?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  creditLimit?: Maybe<Scalars['Decimal']['output']>;
  discountRate?: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paymentTerms?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  scope: AuthScope;
  taxId?: Maybe<Scalars['String']['output']>;
  tier?: Maybe<Scalars['String']['output']>;
};

export type B2BUserCredit = {
  __typename?: 'B2BUserCredit';
  availableCredit: Scalars['Decimal']['output'];
  b2bType?: Maybe<B2BType>;
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  warehouse?: Maybe<Warehouse>;
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
  refreshToken?: Maybe<Scalars['String']['output']>;
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
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  loyaltyPoints?: Maybe<Scalars['Int']['output']>;
  membershipTier?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  scope: AuthScope;
};

export type Brand = {
  __typename?: 'Brand';
  averageRating?: Maybe<Scalars['Float']['output']>;
  countryOfOrigin?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  logoType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  productCount: Scalars['Int']['output'];
  reviewCount?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<User>;
  website?: Maybe<Scalars['String']['output']>;
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
  isActive?: Maybe<Scalars['Boolean']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  productCount?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type BusinessRule = {
  __typename?: 'BusinessRule';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ruleType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<User>;
  value: Scalars['JSON']['output'];
};

export type BusinessRulesInput = {
  rules: Scalars['JSON']['input'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
  savedForLaterItems?: Maybe<Array<CartItem>>;
  subtotal: Scalars['Decimal']['output'];
  tax: Scalars['Decimal']['output'];
  taxAmount: Scalars['Decimal']['output'];
  total: Scalars['Decimal']['output'];
  totalAmount: Scalars['Decimal']['output'];
  totalItems: Scalars['Int']['output'];
  totals?: Maybe<CartTotals>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: Product;
  quantity: Scalars['Int']['output'];
  savedForLater?: Maybe<Scalars['Boolean']['output']>;
  totalPrice: Scalars['Decimal']['output'];
  unitPrice: Scalars['Decimal']['output'];
  unitPriceAtAdd?: Maybe<Scalars['Decimal']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CartItemAvailability = {
  __typename?: 'CartItemAvailability';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  productId: Scalars['ID']['output'];
};

export type CartSummary = {
  __typename?: 'CartSummary';
  activeItems: Array<CartItem>;
  cart?: Maybe<Cart>;
  itemAvailability: Array<CartItemAvailability>;
  savedForLaterItems: Array<CartItem>;
  totals?: Maybe<CartTotals>;
};

export type CartTotals = {
  __typename?: 'CartTotals';
  amountUntilFreeShipping?: Maybe<Scalars['Decimal']['output']>;
  freeShippingThreshold?: Maybe<Scalars['Decimal']['output']>;
  itemCount: Scalars['Int']['output'];
  minimumOrderMet?: Maybe<Scalars['Boolean']['output']>;
  minimumOrderValue?: Maybe<Scalars['Decimal']['output']>;
  shipping: Scalars['Decimal']['output'];
  subtotal: Scalars['Decimal']['output'];
  tax: Scalars['Decimal']['output'];
  total: Scalars['Decimal']['output'];
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  childrenCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fullPath: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['ID']['output']>;
  parentName?: Maybe<Scalars['String']['output']>;
  productCount: Scalars['Int']['output'];
  seoKeywords?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  sortOrder?: Maybe<Scalars['Int']['output']>;
  totalProductCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<User>;
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  category: Scalars['String']['output'];
  productCount: Scalars['Int']['output'];
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
  childrenCount?: Maybe<Scalars['Int']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  parentName?: Maybe<Scalars['String']['output']>;
  productCount?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type CategorySales = {
  __typename?: 'CategorySales';
  categoryName: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
};

export type Company = {
  __typename?: 'Company';
  abn?: Maybe<Scalars['String']['output']>;
  availableCredit?: Maybe<Scalars['Decimal']['output']>;
  billingAddress?: Maybe<Address>;
  contactEmail: Scalars['String']['output'];
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creditLimit?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  paymentTerms?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Address>;
};

export type CoreSearchSuggestion = {
  __typename?: 'CoreSearchSuggestion';
  category?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  searchLink?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type CoreSearchSuggestionsResponse = {
  __typename?: 'CoreSearchSuggestionsResponse';
  hasMore: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  suggestions: Array<CoreSearchSuggestion>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  applicableApps?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: DiscountType;
  discountValue: Scalars['Decimal']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxDiscountAmount?: Maybe<Scalars['Decimal']['output']>;
  minPurchaseAmount?: Maybe<Scalars['Decimal']['output']>;
  startDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usageLimit?: Maybe<Scalars['Int']['output']>;
  userLimit?: Maybe<Scalars['Int']['output']>;
};

export type CouponFilter = {
  discountType?: InputMaybe<DiscountType>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type CouponListResponse = {
  __typename?: 'CouponListResponse';
  count?: Maybe<Scalars['Int']['output']>;
  results?: Maybe<Array<Maybe<Coupon>>>;
};

export type CouponResponse = {
  __typename?: 'CouponResponse';
  coupon?: Maybe<Coupon>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CouponUsage = {
  __typename?: 'CouponUsage';
  appliedVia: Scalars['String']['output'];
  cartId?: Maybe<Scalars['String']['output']>;
  coupon: Coupon;
  createdAt: Scalars['DateTime']['output'];
  discountAmount: Scalars['Decimal']['output'];
  finalTotal?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderTotal?: Maybe<Scalars['Decimal']['output']>;
  subtotalBeforeDiscount?: Maybe<Scalars['Decimal']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  usedAt: Scalars['DateTime']['output'];
  user: User;
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type CouponUsageCount = {
  __typename?: 'CouponUsageCount';
  coupon: Coupon;
  totalDiscountAmount: Scalars['Decimal']['output'];
  totalOrderValue: Scalars['Decimal']['output'];
  uniqueUsers: Scalars['Int']['output'];
  usageCount: Scalars['Int']['output'];
};

export type CouponUsageListResponse = {
  __typename?: 'CouponUsageListResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  results: Array<CouponUsage>;
  totalPages: Scalars['Int']['output'];
};

export type CouponUsageStats = {
  __typename?: 'CouponUsageStats';
  averageDiscountAmount: Scalars['Decimal']['output'];
  averageOrderValue: Scalars['Decimal']['output'];
  totalDiscountAmount: Scalars['Decimal']['output'];
  totalOrderValue: Scalars['Decimal']['output'];
  totalUsages: Scalars['Int']['output'];
  uniqueUsers: Scalars['Int']['output'];
  usageByDate: Array<DateUsageCount>;
};

export type CreateCouponInput = {
  applicableApps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountType: DiscountType;
  discountValue: Scalars['Decimal']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxDiscountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  minPurchaseAmount?: InputMaybe<Scalars['Decimal']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
  userLimit?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCreditConfigResponse = {
  __typename?: 'CreateCreditConfigResponse';
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  creditType: CreditType;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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
  useCompanyCredit?: InputMaybe<Scalars['Boolean']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateProductInput = {
  allowBackorder?: InputMaybe<Scalars['Boolean']['input']>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  brandId?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  compareAtPrice?: InputMaybe<Scalars['Float']['input']>;
  controlledSubstance?: InputMaybe<Scalars['Boolean']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensionsHeight?: InputMaybe<Scalars['Float']['input']>;
  dimensionsLength?: InputMaybe<Scalars['Float']['input']>;
  dimensionsWidth?: InputMaybe<Scalars['Float']['input']>;
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  fdaApproved?: InputMaybe<Scalars['Boolean']['input']>;
  fdaNumber?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isDigital?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isTaxable?: InputMaybe<Scalars['Boolean']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Int']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productType?: InputMaybe<Scalars['String']['input']>;
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  seoKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  sku: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  specifications?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateShipmentInput = {
  carrier: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  trackingUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  b2bType?: InputMaybe<Scalars['String']['input']>;
  doctorVerification?: InputMaybe<DoctorVerificationInput>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  supplierVerification?: InputMaybe<SupplierVerificationInput>;
  username?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateWarehouseManagerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreditAccountDetail = {
  __typename?: 'CreditAccountDetail';
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  approvedBy?: Maybe<User>;
  autoRenew: Scalars['Boolean']['output'];
  availableCredit: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  creditType: CreditType;
  creditUtilizationPercent: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  isAvailable: Scalars['Boolean']['output'];
  isOverLimit: Scalars['Boolean']['output'];
  lastPaymentDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  status: CreditAccountStatus;
  termsAndConditions?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export enum CreditAccountStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  PendingApproval = 'PENDING_APPROVAL',
  Suspended = 'SUSPENDED'
}

export type CreditAccountsResponse = {
  __typename?: 'CreditAccountsResponse';
  accounts: Array<CreditAccountDetail>;
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
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
  b2bType?: Maybe<B2BType>;
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
};

export type CreditInfoResponse = {
  __typename?: 'CreditInfoResponse';
  availableCredit: Scalars['Decimal']['output'];
  b2bType?: Maybe<B2BType>;
  creditBalance: Scalars['Decimal']['output'];
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  lastPaymentDate?: Maybe<Scalars['DateTime']['output']>;
  nextPaymentDueDate?: Maybe<Scalars['DateTime']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreditLimitRequestDetail = {
  __typename?: 'CreditLimitRequestDetail';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  approvedBy?: Maybe<User>;
  approvedLimit?: Maybe<Scalars['Decimal']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  businessRegistration?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  requestedLimit: Scalars['Decimal']['output'];
  requestedPeriodDays: Scalars['Int']['output'];
  status: CreditRequestStatus;
  taxId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type CreditLimitRequestsResponse = {
  __typename?: 'CreditLimitRequestsResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  requests: Array<CreditLimitRequestDetail>;
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
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  request?: Maybe<CreditLimitRequestDetail>;
  success: Scalars['Boolean']['output'];
};

export enum CreditRequestStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type CreditSummary = {
  __typename?: 'CreditSummary';
  totalAccounts: Scalars['Int']['output'];
  totalAvailableCredit: Scalars['Float']['output'];
  totalCreditBalance: Scalars['Float']['output'];
  totalCreditLimit: Scalars['Float']['output'];
  utilizationRate: Scalars['Float']['output'];
};

export type CreditSystemConfigCreated = {
  __typename?: 'CreditSystemConfigCreated';
  creditType: CreditType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreditSystemConfigListResponse = {
  __typename?: 'CreditSystemConfigListResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  results: Array<CreditSystemConfigType>;
};

export type CreditSystemConfigType = {
  __typename?: 'CreditSystemConfigType';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditLimit: Scalars['Decimal']['output'];
  creditPeriodDays: Scalars['Int']['output'];
  creditType: CreditType;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  termsAndConditions?: Maybe<Scalars['String']['output']>;
};

export type CreditTransaction = {
  __typename?: 'CreditTransaction';
  amount: Scalars['Decimal']['output'];
  balanceAfter: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']['output']>;
  payment?: Maybe<Payment>;
  paymentId?: Maybe<Scalars['ID']['output']>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  transactionType: CreditTransactionType;
};

export enum CreditTransactionType {
  Adjustment = 'ADJUSTMENT',
  Charge = 'CHARGE',
  Payment = 'PAYMENT',
  Refund = 'REFUND'
}

export type CreditTransactionsResponse = {
  __typename?: 'CreditTransactionsResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  transactions: Array<CreditTransaction>;
};

export enum CreditType {
  B2BCustomer = 'B2B_CUSTOMER',
  Doctor = 'DOCTOR',
  Supplier = 'SUPPLIER'
}

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type CustomerOrderAnalytics = {
  __typename?: 'CustomerOrderAnalytics';
  customer: CustomerInfo;
  monthlySpending: Array<MonthlySpendingData>;
  orders: CustomerOrderStats;
  period: PeriodInfo;
  topProducts: Array<CustomerTopProduct>;
  wishlist: WishlistStats;
};

export type CustomerOrderStats = {
  __typename?: 'CustomerOrderStats';
  averageOrderValue: Scalars['Float']['output'];
  byStatus: Array<StatusCount>;
  total: Scalars['Int']['output'];
  totalSpent: Scalars['Float']['output'];
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

export type CustomerTopProduct = {
  __typename?: 'CustomerTopProduct';
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  productSku: Scalars['String']['output'];
  totalQuantity: Scalars['Int']['output'];
  totalSpent: Scalars['Float']['output'];
};

export type DailyPerformanceData = {
  __typename?: 'DailyPerformanceData';
  avgDuration?: Maybe<Scalars['Float']['output']>;
  day: Scalars['String']['output'];
  tasksCompleted: Scalars['Int']['output'];
};

export type DailyRevenue = {
  __typename?: 'DailyRevenue';
  date: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
};

export type DateUsageCount = {
  __typename?: 'DateUsageCount';
  count: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  totalDiscount: Scalars['Decimal']['output'];
};

export enum DiscountType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type DoctorVerification = {
  __typename?: 'DoctorVerification';
  doctor: User;
  documents: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
  verifiedBy?: Maybe<User>;
};

export type DoctorVerificationInput = {
  clinicAddress: AddressInput;
  clinicEmail?: InputMaybe<Scalars['String']['input']>;
  clinicName: Scalars['String']['input'];
  clinicPhone: Scalars['String']['input'];
  contactPerson: Scalars['String']['input'];
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentUploadResponse = {
  __typename?: 'DocumentUploadResponse';
  documentUrl?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
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

export type EnabledPaymentMethodsResponse = {
  __typename?: 'EnabledPaymentMethodsResponse';
  fromCache?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  paymentMethods: Array<StripePaymentMethod>;
  success: Scalars['Boolean']['output'];
  validatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['ID']['output']>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  createdAt: Scalars['DateTime']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  disabledAt?: Maybe<Scalars['DateTime']['output']>;
  enabledAt?: Maybe<Scalars['DateTime']['output']>;
  enabledBy?: Maybe<User>;
  flagType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FeatureFlagResponse = {
  __typename?: 'FeatureFlagResponse';
  error?: Maybe<Scalars['String']['output']>;
  featureFlag?: Maybe<FeatureFlag>;
  success: Scalars['Boolean']['output'];
};

export type FeatureFlagsInput = {
  flags: Scalars['JSON']['input'];
};

export type FulfillmentStats = {
  __typename?: 'FulfillmentStats';
  avgTimeHours?: Maybe<Scalars['Float']['output']>;
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  service: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

/** Result of archiving (deleting) old product import history records. */
export type ImportHistoryArchiveResponse = {
  __typename?: 'ImportHistoryArchiveResponse';
  cutoffDate: Scalars['String']['output'];
  deleted: Scalars['Int']['output'];
  dryRun: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Result of clearing duplicate product import history records. */
export type ImportHistoryCleanupResponse = {
  __typename?: 'ImportHistoryCleanupResponse';
  deleted: Scalars['Int']['output'];
  dryRun: Scalars['Boolean']['output'];
  duplicateHashes: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type InventoryItemReport = {
  __typename?: 'InventoryItemReport';
  availableStock: Scalars['Int']['output'];
  currentStock: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  reservedStock?: Maybe<Scalars['Int']['output']>;
  sku: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalValue?: Maybe<Scalars['Float']['output']>;
  unitCost?: Maybe<Scalars['Float']['output']>;
};

export type InventoryReport = {
  __typename?: 'InventoryReport';
  endDate?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<InventoryItemReport>>;
  startDate?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<InventorySummary>;
  warehouseId?: Maybe<Scalars['ID']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type InventorySummary = {
  __typename?: 'InventorySummary';
  lowStockItems?: Maybe<Scalars['Int']['output']>;
  outOfStockItems?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalValue?: Maybe<Scalars['Float']['output']>;
};

export type MonthlySpendingData = {
  __typename?: 'MonthlySpendingData';
  month: Scalars['String']['output'];
  orderCount: Scalars['Int']['output'];
  totalSpent: Scalars['Float']['output'];
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
  movements?: Maybe<Array<StockMovement>>;
  summary?: Maybe<MovementSummary>;
};

export type MovementSummary = {
  __typename?: 'MovementSummary';
  adjustments?: Maybe<Scalars['Int']['output']>;
  stockIn?: Maybe<Scalars['Int']['output']>;
  stockOut?: Maybe<Scalars['Int']['output']>;
  totalMovements?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: UserResponse;
  adminAssignOrderToWarehouse: OrderResponse;
  adminAssignWarehouseToUser: WarehouseAssignmentResponse;
  adminCancelOrder: OrderResponse;
  adminForgotPassword: Scalars['Boolean']['output'];
  adminLogin?: Maybe<AdminAuthPayload>;
  adminLogout: Scalars['Boolean']['output'];
  adminRefreshToken?: Maybe<AdminAuthPayload>;
  adminRemoveWarehouseAssignment: WarehouseAssignmentResponse;
  adminResetPassword: Scalars['Boolean']['output'];
  adminUpdateOrderStatus: OrderResponse;
  adminUpdateWarehouseAssignment: WarehouseAssignmentResponse;
  approveCreditLimitRequest: CreditRequestResponse;
  approveRefund: RefundResponse;
  b2bForgotPassword: Scalars['Boolean']['output'];
  b2bLogin?: Maybe<B2BAuthPayload>;
  b2bLogout: Scalars['Boolean']['output'];
  b2bRefreshToken?: Maybe<B2BAuthPayload>;
  b2bRegister?: Maybe<B2BAuthPayload>;
  b2bResetPassword: Scalars['Boolean']['output'];
  b2cForgotPassword: Scalars['Boolean']['output'];
  b2cLogin?: Maybe<B2CAuthPayload>;
  b2cLogout: Scalars['Boolean']['output'];
  b2cRefreshToken?: Maybe<B2CAuthPayload>;
  b2cRegister?: Maybe<B2CAuthPayload>;
  b2cResetPassword: Scalars['Boolean']['output'];
  cancelOrder: OrderResponse;
  changePassword: SuccessResponse;
  changeUserRole: UserRoleResponse;
  createPayment: PaymentResponse;
  createPaymentIntent: PaymentIntentResponse;
  createPicker: UserResponse;
  createRefund: RefundResponse;
  createShipment: Shipment;
  createUser: UserResponse;
  createWarehouseManager: UserResponse;
  deactivateUser: UserResponse;
  deleteUser: SuccessResponse;
  deleteWarehouseStripeConfig: SuccessResponse;
  forgotPassword: SuccessResponse;
  login: AuthResponse;
  logout: SuccessResponse;
  packOrder: OrderResponse;
  pickerForgotPassword: Scalars['Boolean']['output'];
  pickerLogin?: Maybe<PickerAuthPayload>;
  pickerLogout: Scalars['Boolean']['output'];
  pickerRefreshToken?: Maybe<PickerAuthPayload>;
  pickerResetPassword: Scalars['Boolean']['output'];
  priceQuote: PriceQuoteResponse;
  printShippingLabel: Shipment;
  refreshToken: AuthResponse;
  register: AuthResponse;
  registerB2B: AuthResponse;
  registerB2C: AuthResponse;
  rejectCreditLimitRequest: CreditRequestResponse;
  rejectRefund: RefundResponse;
  requestCreditIncrease: CreditRequestResponse;
  requestCreditLimitIncrease: CreditRequestResponse;
  requestRefund: RefundResponse;
  resetPassword: SuccessResponse;
  retryRefund: RefundResponse;
  revalidatePaymentMethods: RevalidatePaymentMethodsResponse;
  rootPlaceholder?: Maybe<Scalars['String']['output']>;
  sendOTP: SuccessResponse;
  shipOrder: OrderResponse;
  startMockPayment: PaymentResponse;
  submitB2BVerificationDetails: GenericResponse;
  testWarehouseStripeConnection: StripeConnectionTestResponse;
  toggleFeatureFlag: FeatureFlagResponse;
  toggleUserStatus: UserStatusResponse;
  updateActivity: ActivityUpdateResponse;
  updateCreditAccountStatus: UpdateCreditResponse;
  updateCreditLimit: UpdateCreditResponse;
  updateCreditPeriod: UpdateCreditResponse;
  updateOrderPayment: Order;
  updateOrderStatus: OrderResponse;
  updateProfile: UserResponse;
  updateShipment: Shipment;
  updateSystemSettings: SettingsResponse;
  updateUser: UserResponse;
  updateUserPaymentMethod: UpdateUserResponse;
  updateUserWarehouse: UpdateUserResponse;
  updateVerificationStatus: VerificationStatusResponse;
  updateWarehouseStripeConfig: WarehouseStripeConfigResponse;
  uploadVerificationDocument: DocumentUploadResponse;
  validatePickerCredentials?: Maybe<ValidatePickerCredentialsPayload>;
  validateStripeConfig: StripeValidationResponse;
  validateWarehouseCredentials?: Maybe<ValidateWarehouseCredentialsPayload>;
  verifyOTP: SuccessResponse;
  verifyPaymentStatus: PaymentStatusResponse;
  verifyResetToken: Scalars['Boolean']['output'];
  warehouseForgotPassword: Scalars['Boolean']['output'];
  warehouseLogin?: Maybe<WarehouseAuthPayload>;
  warehouseLogout: Scalars['Boolean']['output'];
  warehouseRefreshToken?: Maybe<WarehouseAuthPayload>;
  warehouseResetPassword: Scalars['Boolean']['output'];
};


export type MutationActivateUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminAssignOrderToWarehouseArgs = {
  orderId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};


export type MutationAdminAssignWarehouseToUserArgs = {
  input: AssignWarehouseInput;
};


export type MutationAdminCancelOrderArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
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


export type MutationAdminRemoveWarehouseAssignmentArgs = {
  assignmentId: Scalars['ID']['input'];
};


export type MutationAdminResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationAdminUpdateOrderStatusArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};


export type MutationAdminUpdateWarehouseAssignmentArgs = {
  assignmentId: Scalars['ID']['input'];
  input: UpdateWarehouseAssignmentInput;
};


export type MutationApproveCreditLimitRequestArgs = {
  approvedLimit?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  requestId: Scalars['ID']['input'];
};


export type MutationApproveRefundArgs = {
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['ID']['input'];
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


export type MutationChangeUserRoleArgs = {
  role: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreatePaymentArgs = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  orderId: Scalars['ID']['input'];
  paymentMethodId: Scalars['ID']['input'];
};


export type MutationCreatePaymentIntentArgs = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  paymentMethodId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreatePickerArgs = {
  input: CreateUserInput;
  warehouseId: Scalars['ID']['input'];
};


export type MutationCreateRefundArgs = {
  amount: Scalars['Float']['input'];
  paymentId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationCreateShipmentArgs = {
  input: CreateShipmentInput;
  orderId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWarehouseManagerArgs = {
  input: CreateUserInput;
  warehouseId: Scalars['ID']['input'];
};


export type MutationDeactivateUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWarehouseStripeConfigArgs = {
  warehouseId: Scalars['ID']['input'];
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
  businessEmail?: InputMaybe<Scalars['String']['input']>;
  businessPhone?: InputMaybe<Scalars['String']['input']>;
  businessRegistration?: InputMaybe<Scalars['String']['input']>;
  clinicAddress?: InputMaybe<AddressInput>;
  clinicEmail?: InputMaybe<Scalars['String']['input']>;
  clinicName?: InputMaybe<Scalars['String']['input']>;
  clinicPhone?: InputMaybe<Scalars['String']['input']>;
  companyAddress?: InputMaybe<AddressInput>;
  companyName?: InputMaybe<Scalars['String']['input']>;
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


export type MutationRejectCreditLimitRequestArgs = {
  rejectionReason: Scalars['String']['input'];
  requestId: Scalars['ID']['input'];
};


export type MutationRejectRefundArgs = {
  internalNotes: Scalars['String']['input'];
  refundId: Scalars['ID']['input'];
};


export type MutationRequestCreditIncreaseArgs = {
  amount: Scalars['Decimal']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRequestCreditLimitIncreaseArgs = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessRegistration?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  requestedLimit: Scalars['Decimal']['input'];
  requestedPeriodDays?: InputMaybe<Scalars['Int']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRequestRefundArgs = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['ID']['input']>;
  paymentId?: InputMaybe<Scalars['ID']['input']>;
  reason: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationRetryRefundArgs = {
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['ID']['input'];
};


export type MutationRevalidatePaymentMethodsArgs = {
  warehouseId: Scalars['ID']['input'];
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


export type MutationSubmitB2BVerificationDetailsArgs = {
  input?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationTestWarehouseStripeConnectionArgs = {
  warehouseId: Scalars['ID']['input'];
};


export type MutationToggleFeatureFlagArgs = {
  enabled: Scalars['Boolean']['input'];
  flagKey: Scalars['String']['input'];
};


export type MutationToggleUserStatusArgs = {
  isActive: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateActivityArgs = {
  appName: Scalars['String']['input'];
  refreshTokenHash?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCreditAccountStatusArgs = {
  notes?: InputMaybe<Scalars['String']['input']>;
  status: CreditAccountStatus;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCreditLimitArgs = {
  creditLimit: Scalars['Decimal']['input'];
  creditPeriodDays?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCreditPeriodArgs = {
  creditPeriodDays: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateOrderPaymentArgs = {
  orderId: Scalars['ID']['input'];
  paymentIntentId: Scalars['ID']['input'];
  paymentReference: Scalars['String']['input'];
};


export type MutationUpdateOrderStatusArgs = {
  input: UpdateOrderStatusInput;
  orderId: Scalars['ID']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateShipmentArgs = {
  id: Scalars['ID']['input'];
  input: CreateShipmentInput;
};


export type MutationUpdateSystemSettingsArgs = {
  input: SystemSettingsInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
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


export type MutationUpdateWarehouseStripeConfigArgs = {
  config: StripePaymentConfigInput;
  warehouseId: Scalars['ID']['input'];
};


export type MutationUploadVerificationDocumentArgs = {
  documentType: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationValidatePickerCredentialsArgs = {
  input: PickerCredentialsInput;
};


export type MutationValidateStripeConfigArgs = {
  config: StripePaymentConfigInput;
};


export type MutationValidateWarehouseCredentialsArgs = {
  input: WarehouseCredentialsInput;
};


export type MutationVerifyOtpArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyPaymentStatusArgs = {
  paymentIntentId: Scalars['ID']['input'];
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
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  notificationType: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  recipientEmail?: Maybe<Scalars['String']['output']>;
  recipientPhone?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  templateData?: Maybe<Scalars['JSON']['output']>;
  templateName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationListResponse = {
  __typename?: 'NotificationListResponse';
  items: Array<Notification>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  unreadCount?: Maybe<Scalars['Int']['output']>;
};

export enum NotificationPriority {
  High = 'HIGH',
  Low = 'LOW',
  Normal = 'NORMAL',
  Urgent = 'URGENT'
}

export type Order = {
  __typename?: 'Order';
  assignedToPickerAt?: Maybe<Scalars['DateTime']['output']>;
  billingAddress: Address;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  cancelledReason?: Maybe<Scalars['String']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  coupon?: Maybe<Coupon>;
  couponApplications?: Maybe<Array<CouponUsage>>;
  couponCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  customerNotes?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deliveredDate?: Maybe<Scalars['DateTime']['output']>;
  discountAmount: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  internalNotes?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  itemCount?: Maybe<Scalars['Int']['output']>;
  items: Array<OrderItem>;
  orderNumber: Scalars['String']['output'];
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethodType>;
  paymentReference?: Maybe<Scalars['String']['output']>;
  paymentStatus: PaymentStatus;
  payments?: Maybe<Array<SecurePaymentDetails>>;
  pickerInfo?: Maybe<Array<OrderPickerInfo>>;
  prescribingDoctor?: Maybe<Scalars['String']['output']>;
  prescriptionDate?: Maybe<Scalars['Date']['output']>;
  prescriptionFile?: Maybe<Scalars['String']['output']>;
  prescriptionNumber?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  requiresPrescription?: Maybe<Scalars['Boolean']['output']>;
  shippedDate?: Maybe<Scalars['DateTime']['output']>;
  shippingAddress: Address;
  shippingAmount: Scalars['Decimal']['output'];
  shippingMethod?: Maybe<Scalars['String']['output']>;
  slaDeadline?: Maybe<Scalars['DateTime']['output']>;
  status: OrderStatus;
  statusHistory?: Maybe<Array<OrderStatusHistory>>;
  subtotal: Scalars['Decimal']['output'];
  taxAmount: Scalars['Decimal']['output'];
  total?: Maybe<Scalars['Decimal']['output']>;
  totalAmount: Scalars['Decimal']['output'];
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<User>;
  user: User;
  userEmail?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Warehouse>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type OrderAnalytics = {
  __typename?: 'OrderAnalytics';
  averageOrderValue: Scalars['Float']['output'];
  ordersByStatus: Array<StatusCount>;
  ordersByWarehouse: Array<WarehouseOrderCount>;
  revenueByDay: Array<DailyRevenue>;
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
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
  useCompanyCredit?: InputMaybe<Scalars['Boolean']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  batchNumber?: Maybe<Scalars['String']['output']>;
  cancelledQuantity?: Maybe<Scalars['Int']['output']>;
  cancelledReason?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  discountAmount?: Maybe<Scalars['Decimal']['output']>;
  discountPercentage?: Maybe<Scalars['Decimal']['output']>;
  expirationDate?: Maybe<Scalars['Date']['output']>;
  fulfilledQuantity?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isCancelled?: Maybe<Scalars['Boolean']['output']>;
  isFulfilled: Scalars['Boolean']['output'];
  order: Order;
  prescriptionVerified?: Maybe<Scalars['Boolean']['output']>;
  product?: Maybe<Product>;
  productDescription?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  productSku: Scalars['String']['output'];
  productVariant?: Maybe<ProductVariant>;
  quantity: Scalars['Int']['output'];
  requiresPrescription?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Decimal']['output'];
  unitPrice: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  unitPrice?: InputMaybe<Scalars['Decimal']['input']>;
};

export type OrderPaymentIntent = {
  __typename?: 'OrderPaymentIntent';
  clientSecret: Scalars['String']['output'];
  paymentIntentId: Scalars['ID']['output'];
  publishableKey: Scalars['String']['output'];
};

export type OrderPickerInfo = {
  __typename?: 'OrderPickerInfo';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedAt?: Maybe<Scalars['String']['output']>;
  assignedBy?: Maybe<User>;
  completedAt?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  picker?: Maybe<OrderPickerUser>;
  priority: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  taskNumber: Scalars['String']['output'];
};

export type OrderPickerUser = {
  __typename?: 'OrderPickerUser';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  customer?: Maybe<User>;
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  paymentIntent?: Maybe<OrderPaymentIntent>;
  status?: Maybe<OrderStatus>;
  statusHistory?: Maybe<Array<OrderStatusHistory>>;
  success: Scalars['Boolean']['output'];
  totalAmount?: Maybe<Scalars['Decimal']['output']>;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Packed = 'PACKED',
  Pending = 'PENDING',
  Picked = 'PICKED',
  PickerAssigned = 'PICKER_ASSIGNED',
  PickingItems = 'PICKING_ITEMS',
  Processing = 'PROCESSING',
  ReadyForPickup = 'READY_FOR_PICKUP',
  Refunded = 'REFUNDED',
  Returned = 'RETURNED',
  Scanned = 'SCANNED',
  Shipped = 'SHIPPED'
}

export type OrderStatusHistory = {
  __typename?: 'OrderStatusHistory';
  changedBy?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  newStatus: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  oldStatus?: Maybe<Scalars['String']['output']>;
  order: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

export type OrdersAggregationResponse = {
  __typename?: 'OrdersAggregationResponse';
  count: Scalars['Int']['output'];
  data: Array<TimeAggregationData>;
  endDate?: Maybe<Scalars['String']['output']>;
  period: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
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
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Decimal']['output'];
  cardBrand?: Maybe<Scalars['String']['output']>;
  cardDisplay?: Maybe<Scalars['String']['output']>;
  cardLastFour?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  gateway?: Maybe<Scalars['String']['output']>;
  gatewayTransactionId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRefundable: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  netAmount?: Maybe<Scalars['Decimal']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderId: Scalars['ID']['output'];
  orderNumber?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<PaymentMethodType>;
  paymentNumber: Scalars['String']['output'];
  paymentType?: Maybe<Scalars['String']['output']>;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  processingFee?: Maybe<Scalars['Decimal']['output']>;
  refundAmount?: Maybe<Scalars['Decimal']['output']>;
  refundableAmount?: Maybe<Scalars['Decimal']['output']>;
  refunds: Array<Refund>;
  status: PaymentStatus;
  stripeChargeId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  stripePaymentMethodId?: Maybe<Scalars['String']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
  transactions: Array<PaymentTransaction>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userEmail?: Maybe<Scalars['String']['output']>;
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['String']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type PaymentAnalyticsBrand = {
  __typename?: 'PaymentAnalyticsBrand';
  avgOrderValue: Scalars['Float']['output'];
  brandId: Scalars['ID']['output'];
  brandName: Scalars['String']['output'];
  totalOrders: Scalars['Int']['output'];
  totalQuantity: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type PaymentAnalyticsCategory = {
  __typename?: 'PaymentAnalyticsCategory';
  avgOrderValue: Scalars['Float']['output'];
  categoryId: Scalars['ID']['output'];
  categoryName: Scalars['String']['output'];
  totalOrders: Scalars['Int']['output'];
  totalQuantity: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type PaymentAnalyticsWarehouse = {
  __typename?: 'PaymentAnalyticsWarehouse';
  avgOrderValue: Scalars['Float']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

export enum PaymentCategory {
  Stripe = 'STRIPE'
}

export type PaymentConnection = {
  __typename?: 'PaymentConnection';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  results: Array<Payment>;
  summary?: Maybe<PaymentSummary>;
  totalPages: Scalars['Int']['output'];
};

export type PaymentFilters = {
  brandId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  orderStatus?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paymentStatus?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export enum PaymentGatewayType {
  Stripe = 'STRIPE'
}

export type PaymentIntentResponse = {
  __typename?: 'PaymentIntentResponse';
  clientSecret?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  paymentIntentId: Scalars['ID']['output'];
  publishableKey: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  code: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  feeFlat?: Maybe<Scalars['Decimal']['output']>;
  feePercentage?: Maybe<Scalars['Float']['output']>;
  frontendConfig?: Maybe<Scalars['JSON']['output']>;
  gatewayType?: Maybe<PaymentGatewayType>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAvailableForB2B?: Maybe<Scalars['Boolean']['output']>;
  isAvailableForB2C?: Maybe<Scalars['Boolean']['output']>;
  maximumAmount?: Maybe<Scalars['Float']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  minimumAmount?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  processingFeeFixed?: Maybe<Scalars['Float']['output']>;
  processingFeeRate?: Maybe<Scalars['Float']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  requiresProcessing?: Maybe<Scalars['Boolean']['output']>;
  requiresVerification?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum PaymentMethodCode {
  Stripe = 'STRIPE'
}

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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  frontendConfig?: Maybe<Scalars['JSON']['output']>;
  gatewayType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAvailableForB2B?: Maybe<Scalars['Boolean']['output']>;
  isAvailableForB2C?: Maybe<Scalars['Boolean']['output']>;
  maximumAmount?: Maybe<Scalars['Decimal']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  minimumAmount?: Maybe<Scalars['Decimal']['output']>;
  name: Scalars['String']['output'];
  processingFeeFixed?: Maybe<Scalars['Decimal']['output']>;
  processingFeeRate?: Maybe<Scalars['Decimal']['output']>;
  requiresProcessing?: Maybe<Scalars['Boolean']['output']>;
  requiresVerification?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  payment?: Maybe<Payment>;
  status?: Maybe<PaymentStatus>;
  success: Scalars['Boolean']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
};

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type PaymentStatusResponse = {
  __typename?: 'PaymentStatusResponse';
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  lastUpdated: Scalars['DateTime']['output'];
  message: Scalars['String']['output'];
  orderId?: Maybe<Scalars['ID']['output']>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  paymentIntentId: Scalars['ID']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PaymentSummary = {
  __typename?: 'PaymentSummary';
  totalAmount: Scalars['Float']['output'];
  totalItems: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
};

export type PaymentTransaction = {
  __typename?: 'PaymentTransaction';
  amount: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  gatewayTransactionId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  payment: Payment;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  transactionType: Scalars['String']['output'];
};

export type PeriodInfo = {
  __typename?: 'PeriodInfo';
  endDate?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
};

export type PeriodRevenue = {
  __typename?: 'PeriodRevenue';
  orderCount: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

export type Permission = {
  __typename?: 'Permission';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum PickTaskPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Normal = 'NORMAL',
  Urgent = 'URGENT'
}

export type PickTaskStats = {
  __typename?: 'PickTaskStats';
  completed: Scalars['Int']['output'];
  completionRate: Scalars['Float']['output'];
  inProgress: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum PickTaskStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type PickerAuthPayload = {
  __typename?: 'PickerAuthPayload';
  accessToken: Scalars['String']['output'];
  availableWarehouses?: Maybe<Array<Warehouse>>;
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: PickerUser;
  warehouse?: Maybe<Warehouse>;
};

export type PickerCredentialsInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type PickerInfo = {
  __typename?: 'PickerInfo';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PickerLoginInput = {
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
  warehouseCode?: InputMaybe<Scalars['String']['input']>;
};

export type PickerPerformance = {
  __typename?: 'PickerPerformance';
  accuracy: Scalars['Float']['output'];
  averageTime: Scalars['Float']['output'];
  picker: User;
  tasksCompleted: Scalars['Int']['output'];
};

export type PickerPerformanceAnalytics = {
  __typename?: 'PickerPerformanceAnalytics';
  dailyPerformance: Array<DailyPerformanceData>;
  performance: PickerPerformanceMetrics;
  period: PeriodInfo;
  picker: PickerInfo;
  tasks: PickerTaskStats;
  tasksByPriority: Array<PriorityCount>;
};

export type PickerPerformanceData = {
  __typename?: 'PickerPerformanceData';
  avgDuration?: Maybe<Scalars['Float']['output']>;
  pickerEmail: Scalars['String']['output'];
  pickerId: Scalars['ID']['output'];
  pickerName: Scalars['String']['output'];
  tasksCompleted: Scalars['Int']['output'];
  totalItemsPicked?: Maybe<Scalars['Int']['output']>;
};

export type PickerPerformanceMetrics = {
  __typename?: 'PickerPerformanceMetrics';
  avgDurationMinutes?: Maybe<Scalars['Float']['output']>;
  itemsPerTask: Scalars['Float']['output'];
  totalItemsPicked: Scalars['Int']['output'];
};

export type PickerTaskStats = {
  __typename?: 'PickerTaskStats';
  completed: Scalars['Int']['output'];
  completionRate: Scalars['Float']['output'];
  inProgress: Scalars['Int']['output'];
  pending: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PickerUser = AuthUser & {
  __typename?: 'PickerUser';
  activePickingTasks: Scalars['Int']['output'];
  assignedWarehouse?: Maybe<Warehouse>;
  completedToday: Scalars['Int']['output'];
  efficiency?: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  scope: AuthScope;
  username: Scalars['String']['output'];
};

export type PriceQuote = {
  __typename?: 'PriceQuote';
  id: Scalars['ID']['output'];
  items: Array<QuoteItem>;
  notes?: Maybe<Scalars['String']['output']>;
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
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<PriceQuote>;
  success: Scalars['Boolean']['output'];
};

export type PriorityCount = {
  __typename?: 'PriorityCount';
  count: Scalars['Int']['output'];
  priority: Scalars['String']['output'];
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
  allowBackorder?: Maybe<Scalars['Boolean']['output']>;
  averageRating?: Maybe<Scalars['Float']['output']>;
  barcode?: Maybe<Scalars['String']['output']>;
  barcodeCarton?: Maybe<Scalars['String']['output']>;
  barcodeInner?: Maybe<Scalars['String']['output']>;
  batchNumber?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Brand>;
  category?: Maybe<Category>;
  compareAtPrice?: Maybe<Scalars['Decimal']['output']>;
  controlledSubstance?: Maybe<Scalars['Boolean']['output']>;
  costPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dimensionsHeight?: Maybe<Scalars['Decimal']['output']>;
  dimensionsLength?: Maybe<Scalars['Decimal']['output']>;
  dimensionsWidth?: Maybe<Scalars['Decimal']['output']>;
  expirationDate?: Maybe<Scalars['Date']['output']>;
  fdaApproved?: Maybe<Scalars['Boolean']['output']>;
  fdaNumber?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Scalars['JSON']['output']>;
  functionalName?: Maybe<Scalars['String']['output']>;
  gpcCode?: Maybe<Scalars['String']['output']>;
  gpcDescription?: Maybe<Scalars['String']['output']>;
  gtin?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isDigital?: Maybe<Scalars['Boolean']['output']>;
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  isPointOfSale?: Maybe<Scalars['Boolean']['output']>;
  isTaxable?: Maybe<Scalars['Boolean']['output']>;
  lowStockThreshold?: Maybe<Scalars['Int']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  netContent?: Maybe<Scalars['String']['output']>;
  packagingLevel?: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  productType?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  quantityInStock?: Maybe<Scalars['Int']['output']>;
  relatedProducts?: Maybe<Array<Product>>;
  requiresPrescription?: Maybe<Scalars['Boolean']['output']>;
  requiresShipping?: Maybe<Scalars['Boolean']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  reviews?: Maybe<Array<Review>>;
  seoKeywords?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  sku: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  specifications?: Maybe<Scalars['JSON']['output']>;
  status: Scalars['String']['output'];
  subBrand?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  trackInventory?: Maybe<Scalars['Boolean']['output']>;
  unitOfMeasure?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<User>;
  variant?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<ProductVariant>>;
  videoUrl?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Decimal']['output']>;
};


export type ProductRelatedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductAnalytics = {
  __typename?: 'ProductAnalytics';
  activeProducts: Scalars['Int']['output'];
  averagePrice: Scalars['Float']['output'];
  categoryDistribution: Array<CategoryCount>;
  inactiveProducts: Scalars['Int']['output'];
  inventoryValue: Scalars['Float']['output'];
  lowStockProducts: Scalars['Int']['output'];
  outOfStockProducts: Scalars['Int']['output'];
  topSellingProducts: Array<ProductSales>;
  totalProducts: Scalars['Int']['output'];
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
  altText?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isPrimary: Scalars['Boolean']['output'];
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  product: Product;
  small?: Maybe<Scalars['String']['output']>;
  sortOrder?: Maybe<Scalars['Int']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductImportResponse = {
  __typename?: 'ProductImportResponse';
  /** True when the same file content was already imported and products were created/updated then. */
  alreadyImported?: Maybe<Scalars['Boolean']['output']>;
  errors?: Maybe<Array<Scalars['String']['output']>>;
  importId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  /** Import history ID of the previous import when alreadyImported is true. */
  previousImportId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  summary?: Maybe<ProductImportSummary>;
  warnings?: Maybe<Array<Scalars['String']['output']>>;
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
  categoryName?: Maybe<Scalars['String']['output']>;
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
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  success: Scalars['Boolean']['output'];
};

export type ProductReview = {
  __typename?: 'ProductReview';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  helpfulCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isApproved: Scalars['Boolean']['output'];
  isVerifiedPurchase: Scalars['Boolean']['output'];
  notHelpfulCount?: Maybe<Scalars['Int']['output']>;
  product: Product;
  rating: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userLocation?: Maybe<Scalars['String']['output']>;
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

export type ProductSearchSuggestion = {
  __typename?: 'ProductSearchSuggestion';
  brand?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  score: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  type: SearchSuggestionType;
  url: Scalars['String']['output'];
};

export enum ProductSortBy {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  Popularity = 'POPULARITY',
  Price = 'PRICE',
  Rating = 'RATING',
  Relevance = 'RELEVANCE',
  Stock = 'STOCK'
}

export type ProductVariant = {
  __typename?: 'ProductVariant';
  attributes?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
  priceAdjustment?: Maybe<Scalars['Decimal']['output']>;
  product: Product;
  quantity?: Maybe<Scalars['Int']['output']>;
  quantityInStock?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  period?: Maybe<ReportPeriod>;
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
  activeSessions: Array<UserSession>;
  activeUsers: Array<ActiveUser>;
  adminFinancialSummary: AdminFinancialSummary;
  adminRefunds: RefundConnection;
  analyticsRevenueReport: AnalyticsRevenueReport;
  analyticsSummary: AnalyticsSummaryResponse;
  availableCredit?: Maybe<Scalars['Decimal']['output']>;
  b2bUsersCredit: B2BUsersCreditResponse;
  businessRules: Array<BusinessRule>;
  cart?: Maybe<Cart>;
  categoryTree: Array<Category>;
  companyOrders: Array<Order>;
  creditAccount?: Maybe<CreditAccountDetail>;
  creditAccounts: CreditAccountsResponse;
  creditLimitRequest?: Maybe<CreditLimitRequestDetail>;
  creditLimitRequests: CreditLimitRequestsResponse;
  creditReport?: Maybe<CreditReport>;
  creditSummary?: Maybe<CreditDashboardSummary>;
  customerOrderAnalytics: CustomerOrderAnalytics;
  customerReport?: Maybe<CustomerReport>;
  customerSpendingTrends: Array<SpendingTrendData>;
  customerTopSearches: Array<SearchTerm>;
  dueSoonCustomers: DueSoonCustomersResponse;
  entityActivityLogs: ActivityLogConnection;
  featureFlags: Array<FeatureFlag>;
  getEnabledPaymentMethods: EnabledPaymentMethodsResponse;
  getStripeConfigSample: StripeConfigSampleResponse;
  getStripePublishableKey: StripePublishableKeyResponse;
  getVerificationStatus?: Maybe<DoctorVerification>;
  getWarehouseStripeConfig: WarehouseStripeConfigResponse;
  health?: Maybe<HealthStatus>;
  inventoryReport: InventoryReport;
  me?: Maybe<User>;
  mostPurchased: MostPurchasedResponse;
  movementsReport: MovementReport;
  myCompany?: Maybe<Company>;
  myCreditInfo: CreditInfoResponse;
  myCreditTransactions: CreditTransactionsResponse;
  myOrders: Array<Order>;
  myWishlist: Array<Product>;
  order?: Maybe<Order>;
  orderShipments: Array<Shipment>;
  orderStatusHistory: Array<OrderStatusHistory>;
  orders: Array<Order>;
  ordersAggregation: OrdersAggregationResponse;
  ordersByStatus: OrdersByStatusResponse;
  ordersByWarehouse: OrdersByWarehouseResponse;
  overdueCustomers: OverdueCustomersResponse;
  payment?: Maybe<Payment>;
  paymentAnalyticsByBrand: Array<PaymentAnalyticsBrand>;
  paymentAnalyticsByCategory: Array<PaymentAnalyticsCategory>;
  paymentAnalyticsByWarehouse: Array<PaymentAnalyticsWarehouse>;
  paymentHistory: Array<Payment>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethods: PaymentMethodConnection;
  payments: PaymentConnection;
  pendingRefunds: RefundConnection;
  permissions: Array<Permission>;
  pickerPerformanceAnalytics: PickerPerformanceAnalytics;
  product?: Maybe<Product>;
  productBySlug?: Maybe<Product>;
  productPerformance: Array<AnalyticsProductPerformance>;
  productPerformanceReport?: Maybe<ProductPerformanceReport>;
  products: Array<Product>;
  productsPaginated: ProductConnection;
  profitReport?: Maybe<ProfitReport>;
  refunds: Array<Refund>;
  revenueAggregation: RevenueAggregationResponse;
  revenueByPaymentMethod: RevenueByPaymentMethodResponse;
  revenueReport: AnalyticsRevenueReport;
  roles: Array<Role>;
  salesReport?: Maybe<SalesReport>;
  salesReportsCreditReport?: Maybe<CreditReport>;
  salesReportsCreditSummary?: Maybe<CreditDashboardSummary>;
  salesReportsCustomerReport?: Maybe<CustomerReport>;
  salesReportsDueSoonCustomers: DueSoonCustomersResponse;
  salesReportsOverdueCustomers: OverdueCustomersResponse;
  salesReportsProductPerformanceReport?: Maybe<ProductPerformanceReport>;
  salesReportsProfitReport?: Maybe<ProfitReport>;
  salesReportsSalesReport?: Maybe<SalesReport>;
  search: SearchResult;
  searchAutosuggest: SearchAutosuggestResponse;
  searchProducts: Array<Product>;
  searchSuggestions: CoreSearchSuggestionsResponse;
  shipment?: Maybe<Shipment>;
  shipments: Array<Shipment>;
  systemSettings: SystemSettings;
  topProducts: TopProductsResponse;
  topSearches: TopSearchesResponse;
  userActivity: ActivityLogConnection;
  userActivityReport: UserActivityReport;
  userPreferences?: Maybe<UserPreferences>;
  userSignupsAggregation: UserSignupsAggregationResponse;
  warehouseInventoryAnalytics: WarehouseInventoryAnalytics;
  warehouseManagerDashboard: WarehouseManagerDashboard;
  warehouseStats: WarehouseStatsResponse;
  wishlist?: Maybe<Wishlist>;
};


export type QueryActiveSessionsArgs = {
  appName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryActiveUsersArgs = {
  appName?: InputMaybe<Scalars['String']['input']>;
  inactivityThresholdMinutes?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminFinancialSummaryArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdminRefundsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<RefundStatus>;
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


export type QueryCreditAccountArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryCreditAccountsArgs = {
  creditType?: InputMaybe<CreditType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<CreditAccountStatus>;
};


export type QueryCreditLimitRequestArgs = {
  requestId: Scalars['ID']['input'];
};


export type QueryCreditLimitRequestsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<CreditRequestStatus>;
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


export type QueryCustomerOrderAnalyticsArgs = {
  customerId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomerReportArgs = {
  customerType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomerSpendingTrendsArgs = {
  customerId?: InputMaybe<Scalars['ID']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
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


export type QueryEntityActivityLogsArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetEnabledPaymentMethodsArgs = {
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetStripePublishableKeyArgs = {
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetWarehouseStripeConfigArgs = {
  warehouseId: Scalars['ID']['input'];
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


export type QueryMyCreditTransactionsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentAnalyticsByBrandArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPaymentAnalyticsByCategoryArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPaymentAnalyticsByWarehouseArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaymentHistoryArgs = {
  orderId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPaymentMethodArgs = {
  code: PaymentMethodCode;
};


export type QueryPaymentMethodsArgs = {
  gatewayType?: InputMaybe<PaymentGatewayType>;
};


export type QueryPaymentsArgs = {
  filters?: InputMaybe<PaymentFilters>;
};


export type QueryPendingRefundsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPickerPerformanceAnalyticsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  pickerId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
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
  wishlistProductIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
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


export type QueryRefundsArgs = {
  paymentId: Scalars['ID']['input'];
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


export type QueryRevenueReportArgs = {
  dateFrom: Scalars['String']['input'];
  dateTo: Scalars['String']['input'];
  groupBy?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySalesReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySalesReportsCreditReportArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  includeDueSoon?: InputMaybe<Scalars['Boolean']['input']>;
  includeOverdue?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySalesReportsCreditSummaryArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  daysAhead?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySalesReportsCustomerReportArgs = {
  customerType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySalesReportsDueSoonCustomersArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  days?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySalesReportsOverdueCustomersArgs = {
  creditType?: InputMaybe<Scalars['String']['input']>;
  daysOverdue?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySalesReportsProductPerformanceReportArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySalesReportsProfitReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySalesReportsSalesReportArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchArgs = {
  q: Scalars['String']['input'];
};


export type QuerySearchAutosuggestArgs = {
  includeTrending?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
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


export type QueryUserActivityArgs = {
  filters?: InputMaybe<ActivityLogFilters>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
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


export type QueryWarehouseInventoryAnalyticsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
};


export type QueryWarehouseManagerDashboardArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
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

export type Refund = {
  __typename?: 'Refund';
  amount: Scalars['Decimal']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  customerNotes?: Maybe<Scalars['String']['output']>;
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  gatewayRefundId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internalNotes?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  order: Order;
  orderNumber: Scalars['String']['output'];
  payment: Payment;
  paymentNumber: Scalars['String']['output'];
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  processedBy?: Maybe<User>;
  processedByEmail?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  refundNumber: Scalars['String']['output'];
  refundType: RefundType;
  requestedAt: Scalars['DateTime']['output'];
  status: RefundStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['String']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type RefundConnection = {
  __typename?: 'RefundConnection';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  results: Array<Refund>;
  totalPages: Scalars['Int']['output'];
};

export type RefundResponse = {
  __typename?: 'RefundResponse';
  amount?: Maybe<Scalars['Float']['output']>;
  autoProcessed?: Maybe<Scalars['Boolean']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  refund?: Maybe<Refund>;
  refundId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
};

export enum RefundStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export enum RefundType {
  Adjustment = 'ADJUSTMENT',
  Chargeback = 'CHARGEBACK',
  Dispute = 'DISPUTE',
  Full = 'FULL',
  Partial = 'PARTIAL'
}

export type ReportPeriod = {
  __typename?: 'ReportPeriod';
  endDate: Scalars['String']['output'];
  groupBy: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
};

export type RevalidatePaymentMethodsResponse = {
  __typename?: 'RevalidatePaymentMethodsResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  paymentMethods: Array<StripePaymentMethod>;
  success: Scalars['Boolean']['output'];
  validatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['ID']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type RevenueAggregationResponse = {
  __typename?: 'RevenueAggregationResponse';
  count: Scalars['Int']['output'];
  data: Array<TimeAggregationData>;
  endDate?: Maybe<Scalars['String']['output']>;
  period: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
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

export type Role = {
  __typename?: 'Role';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  usersCount: Scalars['Int']['output'];
};

export type RoleCount = {
  __typename?: 'RoleCount';
  count: Scalars['Int']['output'];
  role: Scalars['String']['output'];
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
  mostSearched: Array<Scalars['String']['output']>;
  query: Scalars['String']['output'];
  suggestions: Array<ProductSearchSuggestion>;
  trending: Array<Scalars['String']['output']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  count: Scalars['Int']['output'];
  query: Scalars['String']['output'];
  results: Array<Product>;
  source: Scalars['String']['output'];
};

export enum SearchSuggestionType {
  Brand = 'BRAND',
  Category = 'CATEGORY',
  Product = 'PRODUCT'
}

export type SearchTerm = {
  __typename?: 'SearchTerm';
  count: Scalars['Int']['output'];
  term: Scalars['String']['output'];
};

export enum SearchType {
  Categories = 'CATEGORIES',
  Orders = 'ORDERS',
  Products = 'PRODUCTS'
}

export type SecurePaymentDetails = {
  __typename?: 'SecurePaymentDetails';
  amount: Scalars['Decimal']['output'];
  cardBrand?: Maybe<Scalars['String']['output']>;
  cardDisplay?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  gateway?: Maybe<Scalars['String']['output']>;
  gatewayTransactionId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paymentNumber: Scalars['String']['output'];
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  refundAmount?: Maybe<Scalars['Decimal']['output']>;
  refundableAmount?: Maybe<Scalars['Decimal']['output']>;
  refunds: Array<SecureRefundDetails>;
  status: PaymentStatus;
  stripeChargeId?: Maybe<Scalars['String']['output']>;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['String']['output']>;
};

export type SecureRefundDetails = {
  __typename?: 'SecureRefundDetails';
  amount: Scalars['Decimal']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  customerNotes?: Maybe<Scalars['String']['output']>;
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  gatewayRefundId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internalNotes?: Maybe<Scalars['String']['output']>;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  processedByEmail?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  refundNumber: Scalars['String']['output'];
  refundType: RefundType;
  requestedAt: Scalars['DateTime']['output'];
  status: RefundStatus;
};

export type SettingsResponse = {
  __typename?: 'SettingsResponse';
  error?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<SystemSettings>;
  success: Scalars['Boolean']['output'];
};

export type SetupDefaultCreditConfigsResponse = {
  __typename?: 'SetupDefaultCreditConfigsResponse';
  created?: Maybe<Array<CreditSystemConfigCreated>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ShipOrderInput = {
  carrier: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  trackingUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Shipment = {
  __typename?: 'Shipment';
  actualDelivery?: Maybe<Scalars['DateTime']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedDelivery?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  labelPrinted: Scalars['Boolean']['output'];
  labelPrintedAt?: Maybe<Scalars['DateTime']['output']>;
  lastTrackingUpdate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  order: Order;
  packedAt?: Maybe<Scalars['DateTime']['output']>;
  packedBy?: Maybe<User>;
  serviceType?: Maybe<Scalars['String']['output']>;
  shippedDate?: Maybe<Scalars['DateTime']['output']>;
  shippingAddress?: Maybe<Address>;
  status: ShipmentStatus;
  trackingData?: Maybe<Scalars['JSON']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  trackingUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<User>;
};

export enum ShipmentStatus {
  Delivered = 'DELIVERED',
  FailedDelivery = 'FAILED_DELIVERY',
  InTransit = 'IN_TRANSIT',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Packed = 'PACKED',
  Preparing = 'PREPARING',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED'
}

export enum SortBy {
  Quantity = 'QUANTITY',
  Revenue = 'REVENUE'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SpendingTrendData = {
  __typename?: 'SpendingTrendData';
  orderCount: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  totalSpent: Scalars['Float']['output'];
};

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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  movementType: Scalars['String']['output'];
  newStock?: Maybe<Scalars['Int']['output']>;
  previousStock?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Product>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  sku: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type StripeConfigSample = {
  __typename?: 'StripeConfigSample';
  accountId: Scalars['String']['output'];
  apiVersion: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  publishableKey: Scalars['String']['output'];
  secretKey: Scalars['String']['output'];
  webhookSecret: Scalars['String']['output'];
};

export type StripeConfigSampleResponse = {
  __typename?: 'StripeConfigSampleResponse';
  sampleConfig: StripeConfigSample;
  success: Scalars['Boolean']['output'];
};

export type StripeConnectionTestResponse = {
  __typename?: 'StripeConnectionTestResponse';
  config?: Maybe<StripePaymentConfigOutput>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  validationResult?: Maybe<StripeValidationResult>;
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['ID']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type StripePaymentConfigInput = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  apiVersion?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  publishableKey: Scalars['String']['input'];
  secretKey: Scalars['String']['input'];
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
};

export type StripePaymentConfigOutput = {
  __typename?: 'StripePaymentConfigOutput';
  accountId?: Maybe<Scalars['String']['output']>;
  apiVersion: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  publishableKey: Scalars['String']['output'];
};

export type StripePaymentMethod = {
  __typename?: 'StripePaymentMethod';
  enabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type StripePublishableKeyResponse = {
  __typename?: 'StripePublishableKeyResponse';
  message?: Maybe<Scalars['String']['output']>;
  publishableKey: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type StripeValidationResponse = {
  __typename?: 'StripeValidationResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  sampleConfig?: Maybe<StripeConfigSample>;
  success: Scalars['Boolean']['output'];
  validationResult?: Maybe<StripeValidationResult>;
};

export type StripeValidationResult = {
  __typename?: 'StripeValidationResult';
  accountId?: Maybe<Scalars['String']['output']>;
  accountType?: Maybe<Scalars['String']['output']>;
  chargesEnabled?: Maybe<Scalars['Boolean']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  defaultCurrency?: Maybe<Scalars['String']['output']>;
  payoutsEnabled?: Maybe<Scalars['Boolean']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  rootPlaceholder?: Maybe<Scalars['String']['output']>;
  salesReportsCreditReportUpdated: CreditReport;
  salesReportsProductPerformanceUpdated: ProductPerformanceReport;
  salesReportsSalesReportUpdated: SalesReport;
};


export type SubscriptionSalesReportsProductPerformanceUpdatedArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionSalesReportsSalesReportUpdatedArgs = {
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SupplierVerificationInput = {
  businessRegistration?: InputMaybe<Scalars['String']['input']>;
  companyAddress: AddressInput;
  companyEmail?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  companyPhone: Scalars['String']['input'];
  contactPerson: Scalars['String']['input'];
};

export type SystemConfiguration = {
  __typename?: 'SystemConfiguration';
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  dateFormat: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  itemsPerPage: Scalars['Int']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  maintenanceMessage?: Maybe<Scalars['String']['output']>;
  maintenanceMode: Scalars['Boolean']['output'];
  sessionTimeout: Scalars['Int']['output'];
  systemName: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SystemConfigurationInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  dateFormat?: InputMaybe<Scalars['String']['input']>;
  itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
  maintenanceMessage?: InputMaybe<Scalars['String']['input']>;
  maintenanceMode?: InputMaybe<Scalars['Boolean']['input']>;
  sessionTimeout?: InputMaybe<Scalars['Int']['input']>;
  systemName?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type SystemSettings = {
  __typename?: 'SystemSettings';
  allowRegistration: Scalars['Boolean']['output'];
  currency: Scalars['String']['output'];
  maintenanceMode: Scalars['Boolean']['output'];
  requireEmailVerification: Scalars['Boolean']['output'];
  siteName: Scalars['String']['output'];
  siteUrl: Scalars['String']['output'];
  supportEmail: Scalars['String']['output'];
  taxRate: Scalars['Float']['output'];
  timezone: Scalars['String']['output'];
};

export type SystemSettingsInput = {
  allowRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  maintenanceMode?: InputMaybe<Scalars['Boolean']['input']>;
  requireEmailVerification?: InputMaybe<Scalars['Boolean']['input']>;
  siteName?: InputMaybe<Scalars['String']['input']>;
  siteUrl?: InputMaybe<Scalars['String']['input']>;
  supportEmail?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type TimeAggregationData = {
  __typename?: 'TimeAggregationData';
  averageOrderValue?: Maybe<Scalars['Float']['output']>;
  date: Scalars['String']['output'];
  orderCount?: Maybe<Scalars['Int']['output']>;
  revenue?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
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

export type UpdateCouponInput = {
  applicableApps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxDiscountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  minPurchaseAmount?: InputMaybe<Scalars['Decimal']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
  userLimit?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCreditResponse = {
  __typename?: 'UpdateCreditResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UpdateOrderStatusInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: OrderStatus;
};

export type UpdateProductInput = {
  allowBackorder?: InputMaybe<Scalars['Boolean']['input']>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  brandId?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  compareAtPrice?: InputMaybe<Scalars['Float']['input']>;
  controlledSubstance?: InputMaybe<Scalars['Boolean']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensionsHeight?: InputMaybe<Scalars['Float']['input']>;
  dimensionsLength?: InputMaybe<Scalars['Float']['input']>;
  dimensionsWidth?: InputMaybe<Scalars['Float']['input']>;
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  fdaApproved?: InputMaybe<Scalars['Boolean']['input']>;
  fdaNumber?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isDigital?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isTaxable?: InputMaybe<Scalars['Boolean']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Int']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  requiresPrescription?: InputMaybe<Scalars['Boolean']['input']>;
  seoKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  specifications?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UpdateWarehouseAssignmentInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  b2bType?: Maybe<B2BType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditBalance?: Maybe<Scalars['Decimal']['output']>;
  creditLimit?: Maybe<Scalars['Decimal']['output']>;
  creditPeriodDays?: Maybe<Scalars['Int']['output']>;
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  defaultPaymentMethod?: Maybe<PaymentMethodType>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  isProfileComplete?: Maybe<Scalars['Boolean']['output']>;
  isStaff?: Maybe<Scalars['Boolean']['output']>;
  isSuperuser?: Maybe<Scalars['Boolean']['output']>;
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Array<Scalars['String']['output']>>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  roles?: Maybe<Array<UserRole>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userType?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Warehouse>;
  warehouseAssignments?: Maybe<Array<UserWarehouseAssignment>>;
  warehouses?: Maybe<Array<Warehouse>>;
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

export type UserPreferences = {
  __typename?: 'UserPreferences';
  createdAt: Scalars['DateTime']['output'];
  emailNotifications: Scalars['Boolean']['output'];
  enableIpWhitelist: Scalars['Boolean']['output'];
  enableSounds: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  inventoryAlerts: Scalars['Boolean']['output'];
  ipWhitelist: Array<Scalars['String']['output']>;
  itemsPerPage: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  newUserAlerts: Scalars['Boolean']['output'];
  orderUpdates: Scalars['Boolean']['output'];
  requirePasswordChange: Scalars['Boolean']['output'];
  systemHealthAlerts: Scalars['Boolean']['output'];
  theme: Scalars['String']['output'];
  twoFactorAuth: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UserPreferencesInput = {
  emailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  enableIpWhitelist?: InputMaybe<Scalars['Boolean']['input']>;
  enableSounds?: InputMaybe<Scalars['Boolean']['input']>;
  inventoryAlerts?: InputMaybe<Scalars['Boolean']['input']>;
  ipWhitelist?: InputMaybe<Array<Scalars['String']['input']>>;
  itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  newUserAlerts?: InputMaybe<Scalars['Boolean']['input']>;
  orderUpdates?: InputMaybe<Scalars['Boolean']['input']>;
  requirePasswordChange?: InputMaybe<Scalars['Boolean']['input']>;
  systemHealthAlerts?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  twoFactorAuth?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  B2BCustomer = 'B2B_CUSTOMER',
  B2CCustomer = 'B2C_CUSTOMER',
  Customer = 'CUSTOMER',
  Doctor = 'DOCTOR',
  FinanceAdmin = 'FINANCE_ADMIN',
  Picker = 'PICKER',
  SalesTeam = 'SALES_TEAM',
  SuperAdmin = 'SUPER_ADMIN',
  SuperUser = 'SUPER_USER',
  Supplier = 'SUPPLIER',
  WarehouseAdmin = 'WAREHOUSE_ADMIN',
  WarehouseManager = 'WAREHOUSE_MANAGER'
}

export type UserRoleResponse = {
  __typename?: 'UserRoleResponse';
  message: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  userId: Scalars['ID']['output'];
};

export type UserSession = {
  __typename?: 'UserSession';
  appName: Scalars['String']['output'];
  browser: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deviceName: Scalars['String']['output'];
  deviceType: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ipAddress: Scalars['String']['output'];
  isExpired: Scalars['Boolean']['output'];
  lastActive: Scalars['DateTime']['output'];
  refreshTokenHash: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type UserSignupsAggregationResponse = {
  __typename?: 'UserSignupsAggregationResponse';
  count: Scalars['Int']['output'];
  data: Array<TimeAggregationData>;
  endDate?: Maybe<Scalars['String']['output']>;
  period: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  activeUsers: Scalars['Int']['output'];
  inactiveUsers: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
  usersByRole: Array<RoleCount>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type UserStatusResponse = {
  __typename?: 'UserStatusResponse';
  isActive?: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  userId: Scalars['ID']['output'];
};

export type UserWarehouseAssignment = {
  __typename?: 'UserWarehouseAssignment';
  assignedAt: Scalars['DateTime']['output'];
  assignedBy?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  warehouse: Warehouse;
};

export type ValidatePickerCredentialsPayload = {
  __typename?: 'ValidatePickerCredentialsPayload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<PickerUser>;
  warehouses?: Maybe<Array<Warehouse>>;
};

export type ValidateWarehouseCredentialsPayload = {
  __typename?: 'ValidateWarehouseCredentialsPayload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<WarehouseUser>;
  warehouses?: Maybe<Array<Warehouse>>;
};

export type VerificationStatusResponse = {
  __typename?: 'VerificationStatusResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  verification?: Maybe<DoctorVerification>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address?: Maybe<Address>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<User>;
};

export type WarehouseAssignmentResponse = {
  __typename?: 'WarehouseAssignmentResponse';
  assignment?: Maybe<UserWarehouseAssignment>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type WarehouseAuthPayload = {
  __typename?: 'WarehouseAuthPayload';
  accessToken: Scalars['String']['output'];
  availableWarehouses?: Maybe<Array<Warehouse>>;
  expiresAt: Scalars['DateTime']['output'];
  hashPhrase: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  user: WarehouseUser;
  warehouse?: Maybe<Warehouse>;
};

export type WarehouseCredentialsInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type WarehouseInfo = {
  __typename?: 'WarehouseInfo';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  utilization: Scalars['Float']['output'];
};

export type WarehouseInventoryAnalytics = {
  __typename?: 'WarehouseInventoryAnalytics';
  lowStockItems: Scalars['Int']['output'];
  outOfStockItems: Scalars['Int']['output'];
  topProducts: Array<TopProduct>;
  totalInventoryValue: Scalars['Float']['output'];
  totalProducts: Scalars['Int']['output'];
};

export type WarehouseLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  requireOtp?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  warehouseCode?: InputMaybe<Scalars['String']['input']>;
};

export type WarehouseManagerDashboard = {
  __typename?: 'WarehouseManagerDashboard';
  fulfillment: FulfillmentStats;
  orders: WarehouseOrderStats;
  period: PeriodInfo;
  pickTasks: PickTaskStats;
  pickerPerformance: Array<PickerPerformanceData>;
  warehouse: WarehouseInfo;
};

export type WarehouseOrderCount = {
  __typename?: 'WarehouseOrderCount';
  orderCount: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

export type WarehouseOrderStats = {
  __typename?: 'WarehouseOrderStats';
  completed: Scalars['Int']['output'];
  completionRate: Scalars['Float']['output'];
  pending: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  total: Scalars['Int']['output'];
};

export type WarehousePerformance = {
  __typename?: 'WarehousePerformance';
  averageProcessingTime?: Maybe<Scalars['Float']['output']>;
  completedOrders: Scalars['Int']['output'];
  pendingOrders: Scalars['Int']['output'];
  pickerPerformance: Array<PickerPerformance>;
  revenue: Scalars['Float']['output'];
  totalOrders: Scalars['Int']['output'];
  warehouse: Warehouse;
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
  calculatedAt?: Maybe<Scalars['DateTime']['output']>;
  endDate: Scalars['DateTime']['output'];
  fromCache: Scalars['Boolean']['output'];
  lowStockCount?: Maybe<Scalars['Int']['output']>;
  ordersByStatus: Array<StatusCount>;
  outOfStockCount?: Maybe<Scalars['Int']['output']>;
  pendingReceiving?: Maybe<Scalars['Int']['output']>;
  pendingTransfers?: Maybe<Scalars['Int']['output']>;
  period: AnalyticsPeriod;
  startDate: Scalars['DateTime']['output'];
  totalItemsSold: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalProducts?: Maybe<Scalars['Int']['output']>;
  totalRevenue: Scalars['Float']['output'];
  totalStock?: Maybe<Scalars['Int']['output']>;
  turnoverRate?: Maybe<Scalars['Float']['output']>;
  uniqueProducts: Scalars['Int']['output'];
  utilizationRate?: Maybe<Scalars['Float']['output']>;
  warehouseId: Scalars['ID']['output'];
  warehouseName: Scalars['String']['output'];
};

export type WarehouseStripeConfigResponse = {
  __typename?: 'WarehouseStripeConfigResponse';
  config?: Maybe<StripePaymentConfigOutput>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  sampleConfig?: Maybe<StripeConfigSample>;
  success: Scalars['Boolean']['output'];
  validationResult?: Maybe<StripeValidationResult>;
  warehouseCode?: Maybe<Scalars['String']['output']>;
  warehouseId?: Maybe<Scalars['ID']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};

export type WarehouseUser = AuthUser & {
  __typename?: 'WarehouseUser';
  canManageInventory: Scalars['Boolean']['output'];
  canManageShipments: Scalars['Boolean']['output'];
  canViewReports: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
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
  notes?: Maybe<Scalars['String']['output']>;
  product: Product;
};

export type WishlistResponse = {
  __typename?: 'WishlistResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  wishlist?: Maybe<Wishlist>;
};

export type WishlistStats = {
  __typename?: 'WishlistStats';
  itemsCount: Scalars['Int']['output'];
};

export type SalesReportPeriodFragment = { __typename?: 'ReportPeriod', startDate: string, endDate: string, groupBy: string };

export type SalesSummaryFragment = { __typename?: 'SalesSummary', totalOrders: number, totalRevenue: number, completedOrders: number, completedRevenue: number, averageOrderValue: number, conversionRate: number };

export type PeriodRevenueFragment = { __typename?: 'PeriodRevenue', period: string, revenue: number, orderCount: number };

export type StatusRevenueFragment = { __typename?: 'StatusRevenue', status: string, revenue: number, orderCount: number };

export type PaymentMethodRevenueFragment = { __typename?: 'PaymentMethodRevenue', paymentMethod: string, revenue: number, orderCount: number };

export type WarehouseRevenueFragment = { __typename?: 'WarehouseRevenue', warehouseId: string, warehouseName: string, revenue: number, orderCount: number };

export type ProductSalesFragment = { __typename?: 'ProductSales', productId: string, productName: string, sku: string, revenue: number, quantitySold: number, orderCount: number };

export type CategorySalesFragment = { __typename?: 'CategorySales', categoryName: string, revenue: number, orderCount: number };

export type CustomerReportPeriodFragment = { __typename?: 'CustomerReportPeriod', startDate: string, endDate: string };

export type CustomerSummaryFragment = { __typename?: 'CustomerSummary', totalCustomers: number, newCustomers: number, averageLifetimeValue: number, averageOrdersPerCustomer: number };

export type TopCustomerFragment = { __typename?: 'TopCustomer', userId: string, email: string, name: string, revenue: number, orderCount: number };

export type ProductReportPeriodFragment = { __typename?: 'ProductReportPeriod', startDate: string, endDate: string };

export type ProductPerformanceFragment = { __typename?: 'ProductPerformance', productId: string, productName: string, sku: string, categoryName?: string | null, revenue: number, quantitySold: number, orderCount: number, averagePrice: number };

export type CreditSummaryFragment = { __typename?: 'CreditSummary', totalAccounts: number, totalCreditLimit: number, totalCreditBalance: number, totalAvailableCredit: number, utilizationRate: number };

export type OverdueCustomerFragment = { __typename?: 'OverdueCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysOverdue: number };

export type DueSoonCustomerFragment = { __typename?: 'DueSoonCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysUntilDue: number };

export type CreditDashboardSummaryFragment = { __typename?: 'CreditDashboardSummary', overdue: { __typename?: 'CreditOverdueSummary', count: number, totalAmount: number }, dueSoon: { __typename?: 'CreditDueSoonSummary', count: number, totalAmount: number, daysAhead: number }, pendingApproval: { __typename?: 'CreditPendingSummary', count: number }, active: { __typename?: 'CreditActiveSummary', count: number, totalCreditLimit: number, totalCreditBalance: number, totalAvailableCredit: number } };

export type GetSalesReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSalesReportQuery = { __typename?: 'Query', salesReport?: { __typename?: 'SalesReport', period: { __typename?: 'ReportPeriod', startDate: string, endDate: string, groupBy: string }, summary: { __typename?: 'SalesSummary', totalOrders: number, totalRevenue: number, completedOrders: number, completedRevenue: number, averageOrderValue: number, conversionRate: number }, revenueByPeriod: Array<{ __typename?: 'PeriodRevenue', period: string, revenue: number, orderCount: number }>, revenueByStatus: Array<{ __typename?: 'StatusRevenue', status: string, revenue: number, orderCount: number }>, revenueByPaymentMethod: Array<{ __typename?: 'PaymentMethodRevenue', paymentMethod: string, revenue: number, orderCount: number }>, revenueByWarehouse: Array<{ __typename?: 'WarehouseRevenue', warehouseId: string, warehouseName: string, revenue: number, orderCount: number }>, topProducts: Array<{ __typename?: 'ProductSales', productId: string, productName: string, sku: string, revenue: number, quantitySold: number, orderCount: number }>, topCategories: Array<{ __typename?: 'CategorySales', categoryName: string, revenue: number, orderCount: number }> } | null };

export type GetCustomerReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  customerType?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCustomerReportQuery = { __typename?: 'Query', customerReport?: { __typename?: 'CustomerReport', period: { __typename?: 'CustomerReportPeriod', startDate: string, endDate: string }, summary: { __typename?: 'CustomerSummary', totalCustomers: number, newCustomers: number, averageLifetimeValue: number, averageOrdersPerCustomer: number }, topCustomers: Array<{ __typename?: 'TopCustomer', userId: string, email: string, name: string, revenue: number, orderCount: number }> } | null };

export type GetProductPerformanceReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductPerformanceReportQuery = { __typename?: 'Query', productPerformanceReport?: { __typename?: 'ProductPerformanceReport', period: { __typename?: 'ProductReportPeriod', startDate: string, endDate: string }, products: Array<{ __typename?: 'ProductPerformance', productId: string, productName: string, sku: string, categoryName?: string | null, revenue: number, quantitySold: number, orderCount: number, averagePrice: number }> } | null };

export type GetCreditReportQueryVariables = Exact<{
  creditType?: InputMaybe<Scalars['String']['input']>;
  includeOverdue?: InputMaybe<Scalars['Boolean']['input']>;
  includeDueSoon?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetCreditReportQuery = { __typename?: 'Query', creditReport?: { __typename?: 'CreditReport', summary: { __typename?: 'CreditSummary', totalAccounts: number, totalCreditLimit: number, totalCreditBalance: number, totalAvailableCredit: number, utilizationRate: number }, overdueCustomers: Array<{ __typename?: 'OverdueCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysOverdue: number }>, dueSoonCustomers: Array<{ __typename?: 'DueSoonCustomer', accountId: string, userId: string, userEmail: string, userName: string, creditBalance: number, daysUntilDue: number }> } | null };

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


export type GetCreditSummaryQuery = { __typename?: 'Query', creditSummary?: { __typename?: 'CreditDashboardSummary', overdue: { __typename?: 'CreditOverdueSummary', count: number, totalAmount: number }, dueSoon: { __typename?: 'CreditDueSoonSummary', count: number, totalAmount: number, daysAhead: number }, pendingApproval: { __typename?: 'CreditPendingSummary', count: number }, active: { __typename?: 'CreditActiveSummary', count: number, totalCreditLimit: number, totalCreditBalance: number, totalAvailableCredit: number } } | null };

export type GetProfitReportQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProfitReportQuery = { __typename?: 'Query', profitReport?: { __typename?: 'ProfitReport', period?: { __typename?: 'ReportPeriod', startDate: string, endDate: string, groupBy: string } | null, summary: { __typename?: 'ProfitSummary', totalRevenue: number, totalCost: number, grossProfit: number, averageMargin: number }, history: Array<{ __typename?: 'ProfitHistoryItem', date: string, revenue: number, cost: number, profit: number, margin: number }> } | null };
