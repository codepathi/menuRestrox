interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <div className={`border-t border-borderSeperator ${className}`} />;
};

export default Divider;
