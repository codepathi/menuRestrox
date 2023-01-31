import cn from 'classnames';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import MinusIcon from '@components/icons/minus-icon';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  variant?: 'small' | 'large';
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  variant = 'small',
  onDecrement,
  onIncrement,
}) => {
  const { width } = useWindowSize();
  const iconSize = width! > 480 ? '15' : '17';

  return (
    <div className="px-3">
      <div
        className={cn('bg-gray-50 bg-opacity-80 rounded-md relative', {
          'py-[3px] h-[31px]': variant === 'small',
          'py-[5px] h-[40px]': variant === 'large',
        })}
      >
        <button
          onClick={onDecrement}
          className={cn('absolute left-[-15px] text-white')}
        >
          <div
            className={cn(
              {
                'w-6 lg:w-7 h-6 lg:h-7': variant === 'small',
                'w-7 lg:w-8 h-7 lg:h-8': variant === 'large',
              },
              'bg-gray-500 rounded-md text-skin-inverted text-4xl flex items-center justify-center focus:outline-none'
            )}
          >
            <MinusIcon width={iconSize} height={iconSize} opacity="1" />
          </div>
        </button>
        <span
          className={cn('text-center inline-block', {
            'mx-7': variant === 'small',
            'mx-12': variant === 'large',
            'w-[15px]': value < 100,
            'w-[25px]': value > 100,
          })}
        >
          {value}
        </span>
        <button
          onClick={onIncrement}
          className={cn('absolute right-[-15px] text-white rounded-md')}
        >
          <div
            className={cn(
              {
                'w-6 lg:w-7 h-6 lg:h-7': variant === 'small',
                'w-7 lg:w-8 h-7 lg:h-8': variant === 'large',
              },
              'bg-skin-primary rounded-md text-skin-inverted text-4xl flex items-center justify-center focus:outline-none'
            )}
          >
            <PlusIcon width={iconSize} height={iconSize} opacity="1" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Counter;
