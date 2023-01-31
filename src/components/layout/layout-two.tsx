import Header from '@components/layout/header/header-two';
import FloatingFooter from '@components/floating-footer/floating-footer';
import cn from 'classnames';

type LayoutType = {
  displayFloatingFooter?: boolean;
  displayLayout?: boolean;
  className?: string;
  displaySearchIcon?: boolean;
  displayGridButton?: boolean;
  displayFullLogo?: boolean;
};

const Layout: React.FC<LayoutType> = ({
  displayFloatingFooter = true,
  displayLayout = true,
  className = '',
  displaySearchIcon = false,
  displayGridButton = true,
  displayFullLogo = true,
  children,
}) => {
  return (
    <div className={cn(className, 'flex flex-col min-h-screen')}>
      {displayLayout ? (
        <Header
          displaySearchIcon={displaySearchIcon}
          displayFullLogo={displayFullLogo}
        />
      ) : null}
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <FloatingFooter
        displayOrderButton={displayFloatingFooter}
        displayGridButton={displayGridButton}
      />
    </div>
  );
};

export default Layout;
