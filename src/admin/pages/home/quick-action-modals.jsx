import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


import { PromotionModal } from "./promotion-modal"

export function QuickActionModals() {
  const [showProductModal, setShowProductModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)

  // Promotion modal form state
  const [promotionFormData, setPromotionFormData] = useState({
    name: "",
    discountType: "",
    discountValue: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    minimumQuantity: false,
    minQuantity: "",
  })
  const [promotionLoading, setPromotionLoading] = useState(false)

  return (
    <>
      {/* Promotion Modal - controlled programmatically via the Quick Actions */}
      <PromotionModal 
        open={false}
        onOpenChange={() => {}}
        trigger={
          <div style={{ display: 'none' }}>
            {/* This modal is controlled programmatically via the Quick Actions */}
          </div>
        }
      />

      {/* Stock Management Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Stock</DialogTitle>
            <DialogDescription>
              Add or manage products in your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">Stock management modal coming soon...</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowProductModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Management Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Users & Personnel</DialogTitle>
            <DialogDescription>
              Add new users or manage existing personnel.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">User management modal coming soon...</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUserModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Modal */}
      <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>View Notifications</DialogTitle>
            <DialogDescription>
              Check system notifications and alerts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">Notification viewer coming soon...</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNotificationModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
