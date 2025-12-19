"use client";

import * as React from "react";

import { IconCirclePlusFilled } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";




import { Switch } from "@/components/ui/switch";

import { promotionService } from "@/services/promotionService";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};


export function PromotionModal({ 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange,
  trigger = null 
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Use external control if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  // Set minimum date to today (can't select yesterday)
  const minDate = getTodayDateString();

  const [formData, setFormData] = React.useState({
    name: "",
    discountType: "",
    discountValue: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    minimumQuantity: false,
    minQuantity: "",
  });


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, value) => {
    // Validate that date is not in the past
    if (value && value < minDate) {
      alert("Please select a date that is not in the past.");
      return;
    }
    
    // Validate end date is not before start date
    if (field === 'endDate' && formData.startDate && value < formData.startDate) {
      alert("End date cannot be before start date.");
      return;
    }
    
    if (field === 'startDate' && formData.endDate && value > formData.endDate) {
      alert("Start date cannot be after end date.");
      return;
    }

    handleInputChange(field, value);
  };



  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare promotion data for API
      const promotionData = {
        name: formData.name,
        type: formData.discountType,
        value: parseFloat(formData.discountValue),
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        minimumQuantity: formData.minimumQuantity
          ? parseInt(formData.minQuantity)
          : null,
      };


      await promotionService.create(promotionData);

      // Reset form and close modal
      setFormData({
        name: "",
        discountType: "",
        discountValue: "",
        category: "",
        startDate: "",
        endDate: "",
        description: "",
        minimumQuantity: false,
        minQuantity: "",
      });
      setOpen(false);

      // You could add a toast notification here
      console.log("Promotion created successfully");
    } catch (error) {
      console.error("Failed to create promotion:", error);
      // You could add error handling/toast notification here
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <SidebarMenuButton
            tooltip="Quick Create"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
          >
            <IconCirclePlusFilled />
            <span>Quick Create</span>
          </SidebarMenuButton>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Mass Promotion</DialogTitle>
          <DialogDescription>
            Create a promotional campaign with mass discounts for multiple
            products.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="promotion-name">Promotion Name</Label>
                <Input
                  id="promotion-name"
                  placeholder="e.g., Summer Sale 2024"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(value) =>
                    handleInputChange("discountType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    <SelectItem value="buy-one-get-one">
                      Buy One Get One
                    </SelectItem>
                    <SelectItem value="tiered">Tiered Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount-value">Discount Value</Label>
                <Input
                  id="discount-value"
                  type="number"
                  placeholder="10"
                  min="0"
                  step="0.01"
                  value={formData.discountValue}
                  onChange={(e) =>
                    handleInputChange("discountValue", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>

                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Shirt">Shirt</SelectItem>
                    <SelectItem value="Pants">Pants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  min={minDate}
                  value={formData.startDate}
                  onChange={(e) =>
                    handleDateChange("startDate", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  min={minDate}
                  value={formData.endDate}
                  onChange={(e) => handleDateChange("endDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your promotion..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="minimum-quantity"
                  checked={formData.minimumQuantity}
                  onCheckedChange={(checked) =>
                    handleInputChange("minimumQuantity", checked)
                  }
                />
                <Label htmlFor="minimum-quantity">
                  Apply minimum quantity requirement
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-quantity">
                  Minimum Quantity (if enabled)
                </Label>
                <Input
                  id="min-quantity"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={formData.minQuantity}
                  onChange={(e) =>
                    handleInputChange("minQuantity", e.target.value)
                  }
                  disabled={!formData.minimumQuantity}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Sample Product Discount:
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Product: Premium T-Shirt • Original: $29.99 • Discount:{" "}
                    {formData.discountValue}
                    {formData.discountType === "percentage" ? "%" : "$"} off •
                    Sale Price: $
                    {(() => {
                      const originalPrice = 29.99;
                      if (formData.discountType === "percentage") {
                        return (
                          originalPrice *
                          (1 - formData.discountValue / 100)
                        ).toFixed(2);
                      } else if (formData.discountType === "fixed") {
                        return Math.max(
                          0,
                          originalPrice - formData.discountValue
                        ).toFixed(2);
                      }
                      return originalPrice.toFixed(2);
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Promotion"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
