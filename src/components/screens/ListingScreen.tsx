import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Bed,
  Bath,
  Home,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const SAMPLE_LISTINGS = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    price: 2500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    title: 'Luxury Highrise Studio',
    price: 1800,
    beds: 1,
    baths: 1,
    sqft: 800,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    title: 'Spacious Garden Unit',
    price: 3200,
    beds: 3,
    baths: 2,
    sqft: 1600,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 4,
    title: 'Charming Cottage',
    price: 2200,
    beds: 2,
    baths: 1,
    sqft: 900,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 5,
    title: 'Stylish Loft',
    price: 3000,
    beds: 1,
    baths: 1,
    sqft: 1100,
    image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 6,
    title: 'Cozy Family Home',
    price: 2700,
    beds: 3,
    baths: 2,
    sqft: 1500,
    image: 'https://images.unsplash.com/photo-1560185127-9e4c1c1c1c1c?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 7,
    title: 'Elegant Villa',
    price: 4500,
    beds: 4,
    baths: 3,
    sqft: 2500,
    image: 'https://images.unsplash.com/photo-1568605114967-8b8e1c1c1c1c?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 8,
    title: 'Modern Bungalow',
    price: 3200,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1568605114967-8b8e1c1c1c1c?auto=format&fit=crop&q=80&w=500',
  },
];

export function ListingScreen() {
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Find Your Perfect Home</h1>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location or property name"
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-card rounded-lg shadow-sm"
            >
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+ Bed</SelectItem>
                  <SelectItem value="2">2+ Beds</SelectItem>
                  <SelectItem value="3">3+ Beds</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Button className="self-end">Apply Filters</Button>
            </motion.div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_LISTINGS.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                $ {listing.price}/mo
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" /> {listing.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" /> {listing.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Home className="h-4 w-4" /> {listing.sqft} sqft
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}