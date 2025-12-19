

import * as React from 'react';
import ModalProviderComponent from '@/lib/modal-context';
import { InfoModal } from '@/components/ui/info-modal';

export function ModalProvider({ children }) {
  return (
    <ModalProviderComponent>
      {children}
      <InfoModal />
    </ModalProviderComponent>
  );
}

export default ModalProvider;
