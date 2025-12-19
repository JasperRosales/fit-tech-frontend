
"use client"

import * as React from "react"

import { IconCirclePlusFilled } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export function PromotionModal() {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Integrate with promotion service
    console.log("Promotion would be created")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip="Quick Create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
        >
          <IconCirclePlusFilled />
          <span>Quick Create</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Mass Promotion</DialogTitle>
          <DialogDescription>
            Create a promotional campaign with mass discounts for multiple products.
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    <SelectItem value="buy-one-get-one">Buy One Get One</SelectItem>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="sports">Sports & Outdoor</SelectItem>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
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
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="minimum-quantity" />
                <Label htmlFor="minimum-quantity">Apply minimum quantity requirement</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-quantity">Minimum Quantity (if enabled)</Label>
                <Input
                  id="min-quantity"
                  type="number"
                  placeholder="1"
                  min="1"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="customer-tier" />
                <Label htmlFor="customer-tier">Apply to specific customer tiers only</Label>
              </div>
              
              <div className="space-y-2">
                <Label>Customer Tiers (if enabled)</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Bronze</Badge>
                  <Badge variant="outline">Silver</Badge>
                  <Badge variant="outline">Gold</Badge>
                  <Badge variant="outline">Platinum</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Sample Product Discount:</div>
                  <div className="text-sm text-muted-foreground">
                    Product: Premium T-Shirt • Original: $29.99 • Discount: 10% off • Sale Price: $26.99
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Promotion
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

