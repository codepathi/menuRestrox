import Modal from '@components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';

const ProductPopup = dynamic(() => import('@components/product/product-popup'));

const ManagedModal: React.FC = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal} variant="bottom">
      {view === 'PRODUCT_VIEW' && <ProductPopup />}
    </Modal>
  );
};

export default ManagedModal;
