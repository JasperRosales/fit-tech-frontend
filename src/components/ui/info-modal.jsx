import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, InfoIcon, AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { Button } from './button';

import { useModal } from '@/lib/modal-context';

const modalIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InfoIcon,
  confirm: AlertTriangleIcon,
};

// Color variants for different modal types
const modalVariants = {
  success: {
    icon: 'text-green-500',
    border: 'border-green-200 dark:border-green-800',
    bg: 'bg-green-50 dark:bg-green-950/20',
  },
  error: {
    icon: 'text-red-500',
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-950/20',
  },
  info: {
    icon: 'text-blue-500',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
  },
  confirm: {
    icon: 'text-orange-500',
    border: 'border-orange-200 dark:border-orange-800',
    bg: 'bg-orange-50 dark:bg-orange-950/20',
  },
};


export function InfoModal() {
  const { 
    getState,
    hideModal
  } = useModal();
  
  const { 
    isOpen, 
    type, 
    title, 
    message, 
    showCloseButton, 
    onConfirm, 
    confirmText, 
    cancelText, 
    showCancelButton 
  } = getState();
  
  const IconComponent = modalIcons[type] || modalIcons.info;
  const variant = modalVariants[type] || modalVariants.info;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={hideModal}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent 
            className={cn(
              'sm:max-w-md',
              variant.border,
              variant.bg
            )}
            showCloseButton={showCloseButton}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DialogHeader className="text-center">
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className={cn(
                    'p-3 rounded-full',
                    variant.bg
                  )}>
                    <IconComponent 
                      className={cn('w-8 h-8', variant.icon)} 
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <DialogTitle className="text-xl font-semibold text-center">
                    {title}
                  </DialogTitle>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <DialogDescription className="text-center text-base leading-relaxed">
                    {message}
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              <DialogFooter className={cn(
                'flex flex-col-reverse gap-2 sm:flex-row sm:justify-center',
                showCancelButton ? 'sm:justify-between' : 'sm:justify-center'
              )}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {showCancelButton && (
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="w-full sm:w-auto"
                    >
                      {cancelText}
                    </Button>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Button 
                    onClick={handleConfirm}
                    className={cn(
                      'w-full sm:w-auto',
                      type === 'error' && 'bg-red-600 hover:bg-red-700',
                      type === 'success' && 'bg-green-600 hover:bg-green-700',
                      type === 'info' && 'bg-blue-600 hover:bg-blue-700',
                      type === 'confirm' && 'bg-orange-600 hover:bg-orange-700'
                    )}
                  >
                    {confirmText}
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

export default InfoModal;
