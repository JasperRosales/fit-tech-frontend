import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  IconShirt,
  IconShoe,
  IconDeviceWatch,
  IconPlus,
  IconTrash,
  IconHeart,
  IconDownload,
  IconStar,
  IconShoppingCart,
  IconSparkles,
  IconEye,
  IconMusicX as IconMix,
  IconList,
  IconStack3,
  IconClothesRack,
} from "@tabler/icons-react";
import { useState } from "react";

export default function MixMatchBuilder() {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(["outfit-1", "outfit-3"]);

  const clothingCategories = [
    {
      id: "tops",
      name: "Tops",
      icon: IconShirt,
      items: [
        {
          id: "top-1",
          name: "Athletic T-Shirt",
          color: "Blue",
          price: "$24.99",
          image: "👕",
          emoji: "👕",
        },
        {
          id: "top-2",
          name: "Sports Jacket",
          color: "Black",
          price: "$59.99",
          image: "🧥",
          emoji: "🧥",
        },
        {
          id: "top-3",
          name: "Tank Top",
          color: "White",
          price: "$19.99",
          image: "🎽",
          emoji: "🎽",
        },
        {
          id: "top-4",
          name: "Hoodie",
          color: "Gray",
          price: "$39.99",
          image: "🧥",
          emoji: "🧥",
        },
        {
          id: "top-5",
          name: "Polo Shirt",
          color: "Green",
          price: "$29.99",
          image: "👕",
          emoji: "👕",
        },
        {
          id: "top-6",
          name: "Compression Shirt",
          color: "Red",
          price: "$22.99",
          image: "🎽",
          emoji: "🎽",
        },
      ],
    },
    {
      id: "bottoms",
      name: "Bottoms",
      icon: IconShirt,
      items: [
        {
          id: "bottom-1",
          name: "Athletic Shorts",
          color: "Navy",
          price: "$24.99",
          image: "🩳",
          emoji: "🩳",
        },
        {
          id: "bottom-2",
          name: "Running Pants",
          color: "Black",
          price: "$49.99",
          image: "👖",
          emoji: "👖",
        },
        {
          id: "bottom-3",
          name: "Track Pants",
          color: "Gray",
          price: "$44.99",
          image: "👖",
          emoji: "👖",
        },
        {
          id: "bottom-4",
          name: "Compression Leggings",
          color: "Blue",
          price: "$34.99",
          image: "👖",
          emoji: "👖",
        },
        {
          id: "bottom-5",
          name: "Gym Shorts",
          color: "Red",
          price: "$19.99",
          image: "🩳",
          emoji: "🩳",
        },
        {
          id: "bottom-6",
          name: "Training Pants",
          color: "Green",
          price: "$39.99",
          image: "👖",
          emoji: "👖",
        },
      ],
    },
    {
      id: "shoes",
      name: "Footwear",
      icon: IconShoe,
      items: [
        {
          id: "shoe-1",
          name: "Running Shoes",
          color: "Black/Red",
          price: "$89.99",
          image: "🏃‍♂️",
          emoji: "👟",
        },
        {
          id: "shoe-2",
          name: "Training Shoes",
          color: "White/Blue",
          price: "$69.99",
          image: "👟",
          emoji: "👟",
        },
        {
          id: "shoe-3",
          name: "Basketball Shoes",
          color: "Red/Black",
          price: "$129.99",
          image: "🏀",
          emoji: "👟",
        },
        {
          id: "shoe-4",
          name: "Casual Sneakers",
          color: "White",
          price: "$59.99",
          image: "👟",
          emoji: "👟",
        },
        {
          id: "shoe-5",
          name: "Cross Trainers",
          color: "Gray/Blue",
          price: "$79.99",
          image: "🏃‍♂️",
          emoji: "👟",
        },
        {
          id: "shoe-6",
          name: "Minimalist Shoes",
          color: "Black",
          price: "$99.99",
          image: "👟",
          emoji: "👟",
        },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: IconDeviceWatch,
      items: [
        {
          id: "acc-1",
          name: "Smart Watch",
          color: "Silver",
          price: "$149.99",
          image: "⌚",
          emoji: "⌚",
        },
        {
          id: "acc-2",
          name: "Fitness Tracker",
          color: "Black",
          price: "$99.99",
          image: "⌚",
          emoji: "⌚",
        },
        {
          id: "acc-3",
          name: "Water Bottle",
          color: "Blue",
          price: "$19.99",
          image: "💧",
          emoji: "💧",
        },
        {
          id: "acc-4",
          name: "Gym Bag",
          color: "Black",
          price: "$39.99",
          image: "🎒",
          emoji: "🎒",
        },
        {
          id: "acc-5",
          name: "Headphones",
          color: "White",
          price: "$89.99",
          image: "🎧",
          emoji: "🎧",
        },
        {
          id: "acc-6",
          name: "Protein Shaker",
          color: "Green",
          price: "$14.99",
          image: "🥤",
          emoji: "🥤",
        },
      ],
    },
  ];

  const savedOutfits = [
    {
      id: "outfit-1",
      name: "Gym Ready",
      description: "Perfect for intense workouts",
      items: ["top-1", "bottom-1", "shoe-1", "acc-1"],
      isFavorite: true,
      isPublic: false,
      createdAt: "2024-01-15",
      likes: 23,
    },
    {
      id: "outfit-2",
      name: "Casual Run",
      description: "Comfortable for morning jogs",
      items: ["top-3", "bottom-2", "shoe-2"],
      isFavorite: false,
      isPublic: true,
      createdAt: "2024-01-12",
      likes: 15,
    },
    {
      id: "outfit-3",
      name: "Training Pro",
      description: "Professional training attire",
      items: ["top-2", "bottom-4", "shoe-3", "acc-3", "acc-4"],
      isFavorite: true,
      isPublic: false,
      createdAt: "2024-01-10",
      likes: 31,
    },
  ];

  const [currentOutfit, setCurrentOutfit] = useState({
    tops: null,
    bottoms: null,
    shoes: null,
    accessories: [],
  });

  const addToOutfit = (category, item) => {
    if (category === "accessories") {
      setCurrentOutfit((prev) => ({
        ...prev,
        accessories: prev.accessories.includes(item.id)
          ? prev.accessories.filter((id) => id !== item.id)
          : [...prev.accessories, item.id],
      }));
    } else {
      setCurrentOutfit((prev) => ({
        ...prev,
        [category]: prev[category] === item.id ? null : item.id,
      }));
    }
  };

  const clearOutfit = () => {
    setCurrentOutfit({
      tops: null,
      bottoms: null,
      shoes: null,
      accessories: [],
    });
  };

  const toggleFavorite = (outfitId) => {
    setFavorites((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  const getItemById = (id) => {
    if (!id) return null;
    for (const category of clothingCategories) {
      const item = category.items.find((item) => item.id === id);
      if (item) return { ...item, category: category.id };
    }
    return null;
  };

  const getOutfitValue = () => {
    let total = 0;
    const items = Object.values(currentOutfit).flat();
    items.forEach((itemId) => {
      if (typeof itemId === "string") {
        const item = getItemById(itemId);
        if (item) {
          total += parseFloat(item.price.replace("$", ""));
        }
      }
    });
    return total;
  };

  const selectedOutfitItems = Object.entries(currentOutfit)
    .filter(([key, value]) =>
      key !== "accessories" ? value : value.length > 0
    )
    .map(([category, items]) => ({
      category,
      items: category === "accessories" ? items : [items],
    }))
    .flatMap((section) =>
      section.items.map((itemId) => getItemById(itemId)).filter(Boolean)
    );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-green-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconMix className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">
                  Mix & Match Builder
                </h1>
                <p className="text-green-100 text-sm md:text-base drop-shadow">
                  Create your perfect workout outfit
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Outfit Preview */}
          <div className="xl:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconEye className="h-5 w-5" />
                  Current Outfit
                </CardTitle>
                <CardDescription>
                  {selectedOutfitItems.length === 0
                    ? "Select items to build your outfit"
                    : `${selectedOutfitItems.length} items selected`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Outfit Visualization */}
                <div className="bg-gradient-to-b from-blue-50 to-green-50 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center">
                  {selectedOutfitItems.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      <IconMix className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        Your outfit preview will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="text-4xl">👤</div>
                      <div className="grid grid-cols-2 gap-2 text-2xl">
                        {selectedOutfitItems.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-full p-2 shadow-md"
                          >
                            {item.emoji}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Items List */}
                {selectedOutfitItems.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Selected Items:</h4>
                    {selectedOutfitItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.emoji}</span>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.color}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {item.price}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => addToOutfit(item.category, item)}
                          >
                            <IconTrash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Outfit Summary */}
                {selectedOutfitItems.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Value:</span>
                      <span className="text-lg font-bold text-green-600">
                        ${getOutfitValue().toFixed(2)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" className="w-full">
                        <IconShoppingCart className="h-4 w-4 mr-2" />
                        Add All to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <IconSave className="h-4 w-4 mr-2" />
                        Save Outfit
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={clearOutfit}
                    >
                      <IconRotateCcw className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Clothing Categories */}
          <div className="xl:col-span-2">
            <Tabs defaultValue="tops" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                {clothingCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {clothingCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <IconClothesRack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <IconList className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-2 md:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {category.items.map((item) => {
                      const isSelected =
                        category.id === "accessories"
                          ? currentOutfit.accessories.includes(item.id)
                          : currentOutfit[category.id] === item.id;

                      return (
                        <Card
                          key={item.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            isSelected
                              ? "ring-2 ring-green-500 bg-green-50"
                              : "hover:scale-[1.02]"
                          }`}
                          onClick={() => addToOutfit(category.id, item)}
                        >
                          <CardContent className="p-4">
                            <div className="text-center space-y-3">
                              <div className="text-4xl">{item.emoji}</div>
                              <div>
                                <h4 className="font-medium text-sm">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {item.color}
                                </p>
                                <p className="font-semibold text-sm">
                                  {item.price}
                                </p>
                              </div>
                              <div className="flex gap-1 justify-center">
                                {isSelected ? (
                                  <Badge className="bg-green-500">
                                    Selected
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    <IconPlus className="h-3 w-3 mr-1" />
                                    Add
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* Saved Outfits */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconSparkles className="h-5 w-5" />
                Saved Outfits
              </CardTitle>
              <CardDescription>
                Your favorite outfit combinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedOutfits.map((outfit) => {
                  const outfitItems = outfit.items
                    .map((id) => getItemById(id))
                    .filter(Boolean);
                  const isFavorited = favorites.includes(outfit.id);

                  return (
                    <Card
                      key={outfit.id}
                      className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Outfit Preview */}
                          <div className="bg-gradient-to-b from-blue-50 to-green-50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl mb-1">👤</div>
                              <div className="grid grid-cols-3 gap-1 text-lg">
                                {outfitItems.slice(0, 6).map((item, index) => (
                                  <div
                                    key={index}
                                    className="bg-white rounded-full p-1 shadow-sm"
                                  >
                                    {item.emoji}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Outfit Info */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{outfit.name}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => toggleFavorite(outfit.id)}
                              >
                                <IconHeart
                                  className={`h-4 w-4 ${
                                    isFavorited
                                      ? "text-red-500 fill-current"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {outfit.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <IconStar className="h-3 w-3" />
                                <span>{outfit.likes} likes</span>
                              </div>
                              <Badge
                                variant={
                                  outfit.isPublic ? "default" : "secondary"
                                }
                              >
                                {outfit.isPublic ? "Public" : "Private"}
                              </Badge>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <IconEye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <IconDownload className="h-3 w-3 mr-1" />
                              Use
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
