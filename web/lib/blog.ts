export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  category: string
  date: string
  image: string
  author?: {
    name: string
    avatar?: string
  }
  readTime?: string
  tags?: string[]
  isFeatured?: boolean
}

// Sample data - in a real app, this would come from a CMS or database
const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "The Future of EV Charging Infrastructure",
    slug: "future-of-ev-charging",
    excerpt: "How the charging network is expanding to support the growing number of electric vehicles on the road.",
    content: `
      <p>As electric vehicles continue to gain popularity, one of the most critical factors for widespread adoption is the availability of charging infrastructure. This article explores the current state of EV charging networks and the innovations that are shaping their future.</p>
      
      <h2>The Current State of Charging</h2>
      <p>Currently, there are three main types of EV chargers available:</p>
      <ul>
        <li><strong>Level 1 (120V)</strong>: Standard household outlets that provide about 2-5 miles of range per hour of charging.</li>
        <li><strong>Level 2 (240V)</strong>: Dedicated charging stations that provide about 10-30 miles of range per hour.</li>
        <li><strong>DC Fast Charging</strong>: High-powered stations that can charge an EV to 80% in 20-40 minutes.</li>
      </ul>
      
      <p>While the number of charging stations has grown significantly in recent years, there are still challenges related to coverage in rural areas, reliability, and payment systems.</p>
      
      <h2>Innovations in Charging Technology</h2>
      <p>Several innovations are poised to transform EV charging:</p>
      
      <h3>Wireless Charging</h3>
      <p>Wireless charging pads embedded in parking spaces or even roadways could eliminate the need for cables and plugs. Companies like WiTricity and Plugless Power are already offering aftermarket wireless charging solutions.</p>
      
      <h3>Ultra-Fast Charging</h3>
      <p>New technologies are pushing the boundaries of charging speeds. Companies like Tesla, Electrify America, and ChargePoint are deploying 250kW+ chargers that can add hundreds of miles of range in just 15-20 minutes.</p>
      
      <h3>Battery Swapping</h3>
      <p>Rather than waiting for a battery to charge, some companies are exploring battery swapping stations where depleted batteries can be quickly exchanged for fully charged ones.</p>
      
      <h2>The Role of Government and Utilities</h2>
      <p>Government incentives and utility company investments are playing a crucial role in expanding charging infrastructure. The recent infrastructure bill in the U.S. includes $7.5 billion for EV charging stations, with a goal of building a network of 500,000 chargers nationwide.</p>
      
      <h2>The Future Outlook</h2>
      <p>As charging technology continues to improve and infrastructure expands, range anxiety will become less of a concern for potential EV buyers. With charging times decreasing and availability increasing, the convenience gap between EVs and gas vehicles is narrowing rapidly.</p>
      
      <p>The future of EV charging looks promising, with a diverse ecosystem of charging options that will make electric vehicle ownership more convenient than ever before.</p>
    `,
    category: "Infrastructure",
    date: "May 15, 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "8 min read",
    tags: ["Charging", "Infrastructure", "Technology"],
    isFeatured: false,
  },
  {
    id: "2",
    title: "Comparing the Top 5 Electric SUVs of 2023",
    slug: "top-5-electric-suvs",
    excerpt: "A detailed comparison of range, performance, features, and value among the leading electric SUVs.",
    content: `
      <p>The electric SUV market has exploded in recent years, with options available at various price points and with different capabilities. In this article, we compare the top 5 electric SUVs of 2023 to help you make an informed decision.</p>
      
      <h2>1. Tesla Model Y</h2>
      <p><strong>Range</strong>: 330 miles<br>
      <strong>Price</strong>: Starting at $47,990<br>
      <strong>0-60 mph</strong>: 3.5 seconds (Performance)<br>
      <strong>Key Features</strong>: Autopilot, minimalist interior, supercharger network access</p>
      
      <p>The Tesla Model Y continues to dominate the electric SUV market with its combination of range, performance, and access to Tesla's extensive Supercharger network. The minimalist interior may not appeal to everyone, but the technology and performance are hard to beat.</p>
      
      <h2>2. Ford Mustang Mach-E</h2>
      <p><strong>Range</strong>: Up to 314 miles<br>
      <strong>Price</strong>: Starting at $45,995<br>
      <strong>0-60 mph</strong>: 3.7 seconds (GT Performance)<br>
      <strong>Key Features</strong>: SYNC 4A infotainment, BlueCruise hands-free driving, panoramic fixed-glass roof</p>
      
      <p>Ford's electric Mustang offers a more traditional SUV feel with modern technology. The Mach-E strikes a good balance between performance, practicality, and value, with a design that stands out from the crowd.</p>
      
      <h2>3. Hyundai IONIQ 5</h2>
      <p><strong>Range</strong>: Up to 303 miles<br>
      <strong>Price</strong>: Starting at $41,450<br>
      <strong>0-60 mph</strong>: 5.2 seconds<br>
      <strong>Key Features</strong>: 800V architecture for ultra-fast charging, vehicle-to-load function, retro-futuristic design</p>
      
      <p>The IONIQ 5 stands out with its distinctive design and impressive charging capabilities. It can charge from 10% to 80% in just 18 minutes at a 350kW charger, making it one of the fastest-charging EVs on the market.</p>
      
      <h2>4. Rivian R1S</h2>
      <p><strong>Range</strong>: Up to 316 miles<br>
      <strong>Price</strong>: Starting at $78,000<br>
      <strong>0-60 mph</strong>: 3.0 seconds<br>
      <strong>Key Features</strong>: Quad-motor AWD, adjustable air suspension, off-road capabilities</p>
      
      <p>The Rivian R1S is the adventure-ready option in the electric SUV market. With impressive off-road capabilities, three rows of seating, and strong performance, it's perfect for those who want to take their electric vehicle beyond paved roads.</p>
      
      <h2>5. Kia EV6</h2>
      <p><strong>Range</strong>: Up to 310 miles<br>
      <strong>Price</strong>: Starting at $42,600<br>
      <strong>0-60 mph</strong>: 4.6 seconds (GT-Line AWD)<br>
      <strong>Key Features</strong>: 800V fast-charging, augmented reality head-up display, spacious interior</p>
      
      <p>Sharing a platform with the IONIQ 5, the Kia EV6 offers similar charging capabilities with a sportier design. Its crossover styling and driver-focused cockpit make it appealing to those who want an EV that's fun to drive.</p>
      
      <h2>Conclusion</h2>
      <p>Each of these electric SUVs offers something unique, from Tesla's technology and charging network to Rivian's adventure capabilities. Your choice will depend on your priorities—whether that's range, performance, charging speed, or value.</p>
      
      <p>As the electric SUV market continues to grow, consumers have more excellent options than ever before, making the switch to electric increasingly attractive.</p>
    `,
    category: "Reviews",
    date: "June 2, 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "10 min read",
    tags: ["SUV", "Comparison", "Reviews"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "How to Maximize Your EV Battery Life",
    slug: "maximize-ev-battery-life",
    excerpt: "Essential tips and best practices to extend the lifespan of your electric vehicle battery.",
    content: `
      <p>The battery is the most expensive component of an electric vehicle, so maximizing its lifespan is crucial for getting the most value from your EV. This guide covers the best practices for maintaining your EV battery health.</p>
      
      <h2>Understanding EV Battery Degradation</h2>
      <p>All lithium-ion batteries degrade over time, but the rate of degradation can be influenced by several factors:</p>
      <ul>
        <li>Exposure to extreme temperatures</li>
        <li>Frequent fast charging</li>
        <li>Regularly charging to 100% or depleting to near 0%</li>
        <li>High-power discharge (aggressive driving)</li>
      </ul>
      
      <h2>Optimal Charging Habits</h2>
      
      <h3>The 20-80 Rule</h3>
      <p>For daily use, try to keep your battery between 20% and 80% charged. This range puts the least stress on the battery cells. Most EVs allow you to set a charge limit in the vehicle settings.</p>
      
      <h3>When to Charge to 100%</h3>
      <p>It's fine to charge to 100% occasionally, especially before a long trip. Just try not to leave the battery at 100% for extended periods (like overnight) as this puts additional stress on the cells.</p>
      
      <h3>Slow Charging vs. Fast Charging</h3>
      <p>While DC fast charging is convenient for road trips, regular use can accelerate battery degradation. For daily charging, use Level 1 or Level 2 charging when possible.</p>
      
      <h2>Temperature Management</h2>
      
      <h3>Avoid Extreme Heat</h3>
      <p>High temperatures accelerate battery degradation. When possible, park in the shade or in a garage during hot weather. Many EVs have thermal management systems, but minimizing heat exposure is still beneficial.</p>
      
      <h3>Cold Weather Considerations</h3>
      <p>Cold temperatures temporarily reduce range but don't necessarily cause permanent degradation. However, charging a very cold battery can damage it. If possible, warm up the battery before fast charging in cold weather.</p>
      
      <h2>Driving Habits</h2>
      
      <h3>Gentle Acceleration</h3>
      <p>While the instant torque of EVs is fun, frequent hard acceleration draws high current from the battery, which can increase degradation over time.</p>
      
      <h3>Regenerative Braking</h3>
      <p>Use regenerative braking to recapture energy. This not only extends your range but also reduces wear on your friction brakes.</p>
      
      <h2>Long-Term Storage</h2>
      <p>If storing your EV for an extended period, leave the battery at around 50% charge—not full and not empty. This is the optimal state for battery longevity during storage.</p>
      
      <h2>Software Updates</h2>
      <p>Keep your vehicle's software up to date. Manufacturers often improve battery management algorithms through updates, which can help extend battery life.</p>
      
      <h2>Conclusion</h2>
      <p>By following these best practices, you can significantly slow battery degradation and maximize the lifespan of your EV battery. Remember that some degradation is normal and expected, but with proper care, your EV battery should last many years.</p>
    `,
    category: "Maintenance",
    date: "June 10, 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Michael Torres",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "7 min read",
    tags: ["Battery", "Maintenance", "Tips"],
    isFeatured: false,
  },
  {
    id: "4",
    title: "The Rise of Electric Pickup Trucks",
    slug: "rise-of-electric-pickups",
    excerpt:
      "How electric pickups are changing the landscape of work vehicles and challenging traditional truck makers.",
    category: "Industry",
    date: "May 28, 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Robert Williams",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "9 min read",
    tags: ["Trucks", "Industry", "Work Vehicles"],
    isFeatured: false,
  },
  {
    id: "5",
    title: "Understanding EV Tax Credits and Incentives",
    slug: "ev-tax-credits-guide",
    excerpt: "A comprehensive guide to federal, state, and local incentives available for electric vehicle buyers.",
    category: "Guides",
    date: "May 5, 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Jennifer Lopez",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "6 min read",
    tags: ["Tax Credits", "Incentives", "Buying Guide"],
    isFeatured: false,
  },
  {
    id: "6",
    title: "Solid-State Batteries: The Next EV Revolution",
    slug: "solid-state-batteries",
    excerpt:
      "How solid-state battery technology promises to transform electric vehicles with greater range and faster charging.",
    category: "Technology",
    date: "June 8, 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "8 min read",
    tags: ["Batteries", "Technology", "Innovation"],
    isFeatured: false,
  },
  {
    id: "7",
    title: "The Future of Electric Vehicles: Trends to Watch in 2023",
    slug: "future-of-ev",
    excerpt:
      "From solid-state batteries to autonomous driving, discover the innovations shaping the future of electric mobility.",
    category: "Technology",
    date: "June 15, 2023",
    image: "/placeholder.svg?height=800&width=1600",
    author: {
      name: "Emily Watson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    readTime: "8 min read",
    tags: ["Future", "Technology", "Trends"],
    isFeatured: true,
  },
]

// Functions to fetch data
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // In a real app, this would fetch from an API or CMS
  return blogPostsData
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  // Sort by date (newest first) and limit
  return [...blogPostsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  return blogPostsData.find((post) => post.isFeatured) || null
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogPostsData.find((post) => post.slug === slug) || null
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return blogPostsData.filter((post) => post.category === category)
}

export async function getBlogCategories(): Promise<string[]> {
  const categories = new Set(blogPostsData.map((post) => post.category))
  return Array.from(categories)
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const searchLower = query.toLowerCase()
  return blogPostsData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content?.toLowerCase().includes(searchLower) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
  )
}
