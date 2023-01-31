import React from 'react';
import ActiveLink from '@components/ui/active-link';
import useBreadcrumb, { convertBreadcrumbTitle } from '@utils/use-breadcrumb';
import { useTranslation } from 'next-i18next';
import { IoChevronForward } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { ROUTES } from '@utils/routes';
import { useLocalStorage } from '@utils/use-local-storage';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-skin-muted px-2.5 transition duration-200 ease-in first:ps-0 last:pe-0 hover:text-skin-base dark:text-darkText"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-base text-skin-base mt-[1px] dark:text-darkText"
      {...props}
    >
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="borobazarBreadcrumb flex items-center">
      <ol className="flex items-center w-full overflow-hidden dark:text-darkText">
        {children}
      </ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string; name?: string; id?: string }> =
  ({
    separator = (
      <IoChevronForward className="text-skin-base text-opacity-40 text-15px dark:text-darkText" />
    ),
    name,
    id,
  }) => {
    const breadcrumbs = useBreadcrumb();

    const customBreadCrumb = [
      { breadcrumb: 'products', href: '/products' },
      {
        breadcrumb: name,
        href: `/products/${id}`,
      },
    ];
    const { t } = useTranslation('common');
    const [restaurant, setRestaurant] = useLocalStorage('restaurant');
    const [table, setTable] = useLocalStorage('table');
    ROUTES;
    return (
      <BreadcrumbItems separator={separator}>
        <ActiveLink
          href={`/r/${restaurant}/${table}`}
          className="flex-shrink-0"
          activeClassName="font-semibold text-heading dark:text-darkText"
        >
          <a className="inline-flex items-center">
            <IoHomeOutline className="me-1.5 text-skin-base text-15px dark:text-darkText" />
            {t('breadcrumb-home')}
          </a>
        </ActiveLink>

        <ActiveLink
          href={`/products/${id}`}
          activeClassName="font-semibold text-heading"
          key={'home'}
        >
          <a className="capitalize dark:text-darkText">
            {/* {convertBreadcrumbTitle(breadcrumb.breadcrumb)} */}
            Item
          </a>
        </ActiveLink>
        <ActiveLink
          href={`/products/${id}`}
          activeClassName="font-semibold text-heading"
          key={'home'}
        >
          <a className="capitalize dark:text-darkText">
            {/* {convertBreadcrumbTitle(breadcrumb.breadcrumb)} */}
            {name}
          </a>
        </ActiveLink>
      </BreadcrumbItems>
    );
  };

export default Breadcrumb;
