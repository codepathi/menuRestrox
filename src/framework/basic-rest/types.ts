export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};

export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};

export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

type MenuDiscount = {
  amount: number;
  percent?: any;
};

export type Menu = {
  _id: string;
  menuName: string;
  color: string;
  description?: any;
  menuDiscount: MenuDiscount;
  isDeleted: boolean;
  isActive: boolean;
  createdBy: string;
  modifiedBy: string;
};

type AvgReview = {
  noOfReview: number;
};

type Discount = {
  amount: number;
  percent?: any;
};

export type Variant = {
  name: string;
  price: number;
  isDefault: boolean;
  discount: Discount;
  _id: string;
};

export type Items = {
  _id: string;
  itemName: string;
  itemId: string;
  description: string;
  images: any[];
  avgReview: AvgReview;
  isDeleted: boolean;
  variants: Variant[];
  options: any[];
  deletedBy: string;
  discount: any;
  totalCategories?:any;
};

type CategoryObjectId = {
  _id: string;
  categoryName: string;
};

type CategoryType = {
  _id: string;
  categoryObjectId: CategoryObjectId;
};

export type MenuItemList = {
  items: Items;
  categories: CategoryType[];
};

// v2

export type MenuCategory = {
  _id: string;
  categoryName: string;

}

export type MenuItems = {
  _id: string;
  itemName: string;
  itemId: string;
  description: string;
  images: any[];
  avgReview: AvgReview;
  isDeleted: boolean;
  variants: Variant[];
  options: any[];
  deletedBy: string;
  discount: any;
  totalCategories?:any;
  categories?: any[];
}


// -----------

export type Product = {
  success: boolean;
  menu: Menu;
  menuItemList: MenuItemList[];
  message: string;
  restaurantName: string;
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

// Single Product

export interface SingleProductAvgReview {
  noOfReview: number;
}

export interface SingleProductDiscount {
  amount: number;
  percent?: any;
}

export interface SingleProductVariant {
  name: string;
  price: number;
  isDefault: boolean;
  discount: SingleProductDiscount;
  _id: string;
}

export interface SingleProductItem {
  _id: string;
  itemName: string;
  itemId: string;
  images: any[];
  avgReview: SingleProductAvgReview;
  isDeleted: boolean;
  variants: SingleProductVariant[];
  options: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface SingleProductMenuObjectId {
  _id: string;
  menuName: string;
}

export interface SingleProductMenuList {
  _id: string;
  menuObjectId: SingleProductMenuObjectId;
}

export type SingleProduct = {
  success: boolean;
  item: SingleProductItem;
  menuList: SingleProductMenuList[];
  categoriesList: any[];
  message: string;
};


// bishnu thapa

export type CategoriesType = {
 _id: string;
 categoryName: string;
 coverImage: string | null;
 description?: string | null;
 noOfItems: number;
};

export type MenuItemsByCategory = {
  lastItemDate?: string;
  menuItemList: MenuItems[];
  [key: string]: unknown;
}


export type RestaurantType = {
  _id: string;
  type: string;
  currency: string;
  name: string;
  contact?: string;
  email: string;
  displayImage: string;
  activeMenu: string;
  address?: string;
}

export type ErrorType =  {
  [key: string]: any;
}

export type SpaceType = {
  _id: string;
  name: string
}

export type TableType = {
  _id: string;
  capacity: number;
  tableName: string;
  space: SpaceType[]

} 