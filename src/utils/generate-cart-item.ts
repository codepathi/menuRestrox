import isEmpty from 'lodash/isEmpty';

export interface Item {
  id: string | number;
  name: string;
  slug: string;
  image?: string;
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
  variantId: string | number;
  menuId?: string | number;
  discount: number;
  remarks?: string;
}

export interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}

type ItemRawData = any;

export function generateCartItem(
  item: Item,
  variation: Variation,
  itemRawData: ItemRawData = null
) {
  const { id, name, slug, image, price, unit, variantId, discount } = item;
  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      variantId: variation.id,
      productId: id,
      name: `${name} - ${variation.title}`,
      slug,
      unit,
      stock: 100,
      price: discount ? variation.price - discount : variation.price,
      image: image,
      variationId: variation.id,
      remarks: item.remarks ? item.remarks : '',
      itemRawData: itemRawData,
    };
  }

  return {
    id,
    name,
    slug,
    unit,
    image: image,
    stock: 100,
    price: discount ? price - discount : price,
    variantId: variantId,
    remarks: item.remarks ? item.remarks : '',
    itemRawData: itemRawData,
  };
}
