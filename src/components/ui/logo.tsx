import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';
import { useFullLogo } from '@contexts/logo/logo.context';

const Logo: React.FC<any> = ({
  className,
  href,
  displayFullLogo = true,
  ...props
}) => {
  const { isFullLogoInView } = useFullLogo();

  if (displayFullLogo) {
    return (
      <Link
        href={href || '/'}
        className={cn('inline-flex focus:outline-none', className)}
        {...props}
      >
        <Image
          src={siteSettings.fullLogo.url}
          alt={siteSettings.fullLogo.alt}
          height={siteSettings.fullLogo.height}
          width={siteSettings.fullLogo.width}
          layout="fixed"
          loading="eager"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href || '/'}
      className={cn('inline-flex focus:outline-none', className)}
      {...props}
    >
      {isFullLogoInView ? (
        <Image
          src={siteSettings.fullLogo.url}
          alt={siteSettings.fullLogo.alt}
          height={siteSettings.fullLogo.height}
          width={siteSettings.fullLogo.width}
        />
      ) : (
        <Image
          src={siteSettings.logo.url}
          alt={siteSettings.logo.alt}
          height={siteSettings.logo.height}
          width={siteSettings.logo.width}
          layout="fixed"
          loading="eager"
        />
      )}
    </Link>
  );
};

export default Logo;
