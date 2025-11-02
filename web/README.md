# Nepal EV Marketplace

A modern electric vehicle marketplace built with Next.js, designed specifically for the Nepalese market. This platform allows users to browse, buy, sell, and rent electric vehicles while promoting sustainable transportation.

## Features

- 🚗 **Vehicle Marketplace** - Browse and search electric vehicles
- 🔋 **EV-Focused** - Dedicated platform for electric vehicles
- 📱 **Responsive Design** - Works on all devices
- 🏢 **Company Profiles** - Featured EV manufacturers and dealers
- 📰 **EV News** - Latest news and updates about electric vehicles in Nepal
- 🔌 **Charging Stations** - Find nearby charging stations
- 💰 **Rentals** - Rent electric vehicles for short-term use
- 👤 **User Dashboard** - Manage listings, favorites, and profile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js 18.0 or later [Recommended version `v20.18.1`]
- npm [Recommended version `10.8.2`]

### Installation

1. **Install dependencies**
   `npm ci -f`

2. **Run the development server**
   ` npm run dev `

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.



### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts

### Build for Production

1. **Create a production build**
   `npm run build `

2. **Start the production server**
   ` npm start`

## Data Management

Vehicle data is stored in \`data/vehicles.json\` for easy management and updates. The data includes:

- **Vehicles**: Complete vehicle listings with specifications
- **Coming Soon Vehicles**: Upcoming vehicle releases
- **Categories**: Vehicle types and brands

To update vehicle data, simply edit the JSON file and restart the development server.

## Key Pages

- **Home** (\`/\`) - Landing page with featured vehicles and news
- **Marketplace** (\`/marketplace\`) - Browse all vehicles with filters
- **Vehicle Details** (\`/vehicle/[id]\`) - Individual vehicle pages
- **Companies** (\`/companies\`) - EV manufacturer and dealer profiles
- **Charging Stations** (\`/charging-stations\`) - Find charging locations
- **Blog** (\`/blog\`) - EV news and articles
- **Dashboard** (\`/dashboard\`) - User account management

## Customization

### Adding New Vehicles

1. Edit \`data/vehicles.json\`
2. Add vehicle object with required fields:
   - id, name, price, range, power, image, etc.
3. Restart the development server

### Styling

- Global styles: \`app/globals.css\`
- Component styles: Tailwind CSS classes
- Theme configuration: \`tailwind.config.ts\`

### Adding New Pages

1. Create new folder in \`app/\` directory
2. Add \`page.tsx\` file
3. Export default React component

