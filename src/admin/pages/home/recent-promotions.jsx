import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IconTrendingUp, IconTrash } from "@tabler/icons-react"
import { dashboardService } from "@/services/dashboardService"

import { PromotionEditModal } from "./promotion-edit-modal"

export function RecentPromotions({ onEditComplete }) {
  const [recentPromotions, setRecentPromotions] = useState([
    { id: 1, name: "Loading promotions...", message: "Loading...", time: "...", status: "info", discountDisplay: "..." },
  ])
  
  const [allPromotions, setAllPromotions] = useState([])
  const [showAllPromotionsModal, setShowAllPromotionsModal] = useState(false)
  const [isDeletingPromotion, setIsDeletingPromotion] = useState(false)
  const [promotionsLoading, setPromotionsLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState(null)

  // Delete confirmation modal state
  const DeleteConfirmationModal = ({ 
    open, 
    onOpenChange, 
    itemName, 
    onConfirm, 
    isLoading, 
    title, 
    description 
  }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm} 
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Handle delete promotion
  const handleDeletePromotion = async () => {
    if (!promotionToDelete) return;

    setIsDeletingPromotion(true);
    try {
      const { promotionService } = await import("@/services/promotionService");
      await promotionService.delete(promotionToDelete.id);
      
      // Close modal and reset state
      setShowDeleteModal(false);
      setPromotionToDelete(null);
      
      // Refresh recent promotions
      await loadRecentPromotions();
      
      // If all promotions modal is open, refresh that too
      if (showAllPromotionsModal) {
        await loadAllPromotions();
      }
      
      console.log('Promotion deleted successfully');
    } catch (error) {
      console.error('Failed to delete promotion:', error);
    } finally {
      setIsDeletingPromotion(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (promotion) => {
    setPromotionToDelete(promotion);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPromotionToDelete(null);
  };

  // Handle edit completion (refresh data)
  const handleEditComplete = async () => {
    await loadRecentPromotions();
    if (showAllPromotionsModal) {
      await loadAllPromotions();
    }
    if (onEditComplete) {
      onEditComplete();
    }
  };

  // Load recent promotions (last 5)
  const loadRecentPromotions = async () => {
    setPromotionsLoading(true);
    try {
      const promotions = await dashboardService.getRecentPromotions()
      
      // Enhance promotions data for edit modal compatibility
      const enhancedPromotions = promotions.map(promotion => ({
        id: promotion.id,
        name: promotion.name || promotion.message || "Unnamed Promotion",
        description: promotion.description || "",
        type: promotion.type || "percentage",
        value: promotion.value || 0,
        category: promotion.category || "All",
        category_id: promotion.category_id || null,
        startDate: promotion.startDate || promotion.start_date,
        endDate: promotion.endDate || promotion.end_date,
        status: promotion.status || "inactive",
        is_active: promotion.is_active !== undefined ? promotion.is_active : promotion.status === "active",
        is_published: promotion.is_published || false,
        minimumQuantity: promotion.minimumQuantity || null,
        created_at: promotion.created_at,
        updated_at: promotion.updated_at,
        time: promotion.time || "recently",
        message: promotion.message,
        discountDisplay: promotion.discountDisplay
      }));
      
      setRecentPromotions(enhancedPromotions)
    } catch (error) {
      console.error('Failed to load recent promotions:', error)
      setRecentPromotions([
        { 
          id: 1, 
          name: "Error", 
          message: "Failed to load promotions", 
          time: "now", 
          status: "error", 
          discountDisplay: "-",
          type: "percentage",
          value: 0,
          category: "All"
        },
      ])
    } finally {
      setPromotionsLoading(false);
    }
  }

  // Load all promotions for modal using the updated service method
  const loadAllPromotions = async () => {
    try {
      const promotions = await dashboardService.loadAllPromotions();
      setAllPromotions(promotions);
    } catch (error) {
      console.warn('Failed to load all promotions, using empty array:', error.message);
      setAllPromotions([]);
    }
  }

  useEffect(() => {
    loadRecentPromotions()
  }, [])

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconTrendingUp className="h-5 w-5" />
              <CardTitle>Recent Promotions</CardTitle>
            </div>
            <Dialog open={showAllPromotionsModal} onOpenChange={setShowAllPromotionsModal}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    loadAllPromotions()
                    setShowAllPromotionsModal(true)
                  }}
                >
                  View All
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>All Promotions</DialogTitle>
                  <DialogDescription>
                    View and manage all your promotional campaigns
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {allPromotions.map((promotion, index) => (
                    <Card key={promotion.id || index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium">{promotion.name}</h4>
                              <Badge variant={promotion.status === 'active' ? 'default' : 'secondary'}>
                                {promotion.status}
                              </Badge>
                              <div className="text-lg font-bold text-green-600">
                                {promotion.discountDisplay}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {promotion.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {promotion.startDate} - {promotion.endDate}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Created {promotion.time}
                            </p>
                          </div>
                          <div className="flex gap-1 ml-3">
                            <PromotionEditModal 
                              promotion={promotion} 
                              onUpdate={handleEditComplete}
                            />


                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                              onClick={() => openDeleteModal(promotion)}
                              disabled={isDeletingPromotion}
                            >
                              <IconTrash className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {allPromotions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No promotions found
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {recentPromotions.map((promotion, index) => (
            <Card key={promotion.id || index} className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        promotion.status === 'active' ? 'bg-green-500' :
                        promotion.status === 'inactive' ? 'bg-gray-500' :
                        promotion.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <Badge variant={promotion.status === 'active' ? 'default' : 'secondary'}>
                        {promotion.status}
                      </Badge>
                      <div className="text-sm font-bold text-green-600">
                        {promotion.discountDisplay}
                      </div>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{promotion.message}</h4>
                    <p className="text-xs text-muted-foreground">{promotion.time}</p>
                  </div>
                  <div className="flex gap-1 ml-3">
                    <PromotionEditModal 
                      promotion={promotion} 
                      onUpdate={handleEditComplete}
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                      onClick={() => openDeleteModal(promotion)}
                      disabled={isDeletingPromotion}
                    >
                      <IconTrash className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {recentPromotions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No recent promotions found
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        itemName={promotionToDelete?.name}
        onConfirm={handleDeletePromotion}
        isLoading={isDeletingPromotion}
        title="Delete Promotion"
        description="Are you sure you want to delete this promotion? This action cannot be undone."
      />
    </>
  )
}
