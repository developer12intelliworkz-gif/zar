import Button from '@/components/ui/atoms/Button/Button';

type CartButtonProps = {
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function CartButton({
  onClick,
  className,
  showArrow = false,
  disabled = false,
  type = 'button',
}: CartButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      className={className}
      showArrow={showArrow}
      disabled={disabled}
      type={type}
    >
      Add to Cart
    </Button>
  );
}
