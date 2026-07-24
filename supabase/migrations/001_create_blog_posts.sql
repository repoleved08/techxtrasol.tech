-- Create blog_posts table
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  content text not null,
  date date not null,
  category text not null,
  read_time text not null,
  image text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table blog_posts enable row level security;

-- Allow public read access
create policy "Public read access" on blog_posts
  for select using (true);

-- Seed data
insert into blog_posts (title, slug, description, content, date, category, read_time, image) values

(
  'Building Scalable Laravel Applications with Clean Architecture',
  'building-scalable-laravel-applications',
  'Learn how to structure Laravel applications using repository pattern, service layers, and clean architecture principles that scale with your business.',
  '## Why Clean Architecture Matters

As your Laravel application grows, so does the complexity of your codebase. Without a clear structure, you end up with controllers doing everything — handling HTTP requests, business logic, and data access all in one place. Clean architecture solves this by separating concerns into distinct layers.

## The Core Layers

### Presentation Layer
Controllers, views, and API resources. This layer only handles HTTP concerns — parsing requests, validating input, and returning responses.

### Application Layer
Service classes and DTOs. This is where your use cases live. A `CreateInvoice` service orchestrates the business logic without knowing about Eloquent or HTTP.

### Domain Layer
Models, value objects, and business rules. This layer contains your core domain logic — the rules that make your business unique.

### Infrastructure Layer
Repositories, external APIs, cache drivers. This layer implements interfaces defined in the domain layer.

## Practical Implementation

Start by creating a `Services` directory under `app/`:

```
app/
├── Http/
│   └── Controllers/
├── Services/
│   └── InvoiceService.php
├── Repositories/
│   └── InvoiceRepository.php
└── Models/
    └── Invoice.php
```

The key insight: your controllers call services, services call repositories, and repositories interact with Eloquent. Each layer depends only on interfaces, not implementations.

## Testing Benefits

Clean architecture makes testing straightforward. Mock the repository interface, test your service logic in isolation. No database needed, no HTTP layer involved.

## Getting Started

You don''t need to refactor everything at once. Start with your next feature — create a service class, extract business logic from your controller, and define a repository interface. Incremental improvements compound over time.',
  '2026-07-15',
  'Software Engineering',
  '8 min read',
  '/content-images/blackspike-wallpaper-01.avif'
),

(
  'Nuxt 4: What''s New and Why It Matters for Your Next Project',
  'nuxt-4-whats-new',
  'A deep dive into Nuxt 4 features — improved performance, better TypeScript support, and new composables that streamline development.',
  '## What Changed in Nuxt 4

Nuxt 4 brings significant improvements to performance, developer experience, and TypeScript support. If you''re starting a new project or planning an upgrade, here''s what you need to know.

## Performance Improvements

### Faster Builds
The new Vite 7 integration delivers noticeably faster cold starts and hot module replacement. Projects that took 30 seconds to build now complete in under 10.

### Smaller Client Bundles
Tree-shaking improvements and better code splitting mean your users download less JavaScript. The default client bundle dropped by approximately 15% in our benchmarks.

### Improved SSR Performance
Server-side rendering is faster thanks to optimized hydration and streaming support. Pages load quicker, and Time to Interactive improves across the board.

## Better TypeScript Support

Nuxt 4 includes first-class TypeScript support with auto-generated types for your routes, components, and composables. No more manual type definitions for `useRoute()` or `$fetch()`.

## New Composables

### `useAppConfig()`
Access your app config from anywhere in your components without prop drilling.

### Enhanced `useFetch()`
Better deduplication, automatic cache invalidation, and improved error handling make data fetching more reliable.

## Migration Path

Upgrading from Nuxt 3 is straightforward for most projects. Run `npx nuxi upgrade` and address any deprecation warnings. The Nuxt team provides detailed migration guides for breaking changes.

## When to Upgrade

If you''re starting a new project, use Nuxt 4 from day one. For existing projects, upgrade during your next sprint — the performance gains and developer experience improvements are worth it.',
  '2026-07-08',
  'Frontend',
  '6 min read',
  '/content-images/blackspike-wallpaper-02.avif'
),

(
  'Integrating AI Chatbots into Business Systems: A Practical Guide',
  'integrating-ai-chatbots',
  'How to build and deploy AI-powered chatbots that integrate with your existing business systems, knowledge bases, and workflows.',
  '## Why AI Chatbots for Business

Customer expectations have changed. People want instant answers, available 24/7, without waiting for business hours. AI chatbots bridge this gap by providing intelligent, context-aware responses that go beyond simple FAQ matching.

## Architecture Overview

A production AI chatbot consists of three layers:

### Frontend Interface
The chat widget on your website or app. This handles user interaction, message display, and conversation history.

### Orchestration Layer
Your backend service that routes messages, manages conversation state, and coordinates between the AI model and your business systems.

### Knowledge Layer
Your business data — product catalogs, documentation, customer records, and internal knowledge bases — indexed and searchable by the AI.

## Building with RAG

Retrieval-Augmented Generation (RAG) is the pattern that makes chatbots useful for business. Instead of relying solely on the LLM''s training data, RAG retrieves relevant information from your knowledge base before generating a response.

### Step 1: Index Your Data
Chunk your documents, generate embeddings, and store them in a vector database like Pinecone or Weaviate.

### Step 2: Retrieval
When a user asks a question, search the vector database for relevant chunks. Use semantic similarity to find the most relevant context.

### Step 3: Generation
Pass the retrieved context along with the user''s question to the LLM. The model generates a response grounded in your actual business data.

## Integration Points

Connect your chatbot to your CRM for customer context, your order system for status updates, and your ticketing system for support automation. The chatbot becomes a unified interface to all your business systems.

## Measuring Success

Track resolution rate, average conversation length, customer satisfaction scores, and escalation rate. A good chatbot resolves 60-80% of queries without human intervention.',
  '2026-07-01',
  'AI',
  '10 min read',
  '/content-images/blackspike-wallpaper-03.avif'
),

(
  'M-Pesa Integration: Complete Guide for Kenyan Businesses',
  'm-pesa-integration-guide',
  'Step-by-step guide to integrating M-Pesa payments into your web application, including STK Push, C2B, and B2C transactions.',
  '## Why M-Pesa Integration Matters

M-Pesa processes over KES 30 trillion annually in Kenya. For any business operating in Kenya, M-Pesa integration isn''t optional — it''s essential. Whether you''re building an e-commerce platform, a SaaS billing system, or a financial application, M-Pesa is the payment backbone.

## Getting Started

### Register as a Daraja API Developer
Visit the Safaricom Developer Portal and create an account. You''ll get sandbox credentials for testing and production credentials after approval.

### Understand the API Products
- **C2B (Customer to Business)**: Customers pay you via M-Pesa
- **B2C (Business to Customer)**: You disburse payments to customers
- **STK Push (Lipa Na M-Pesa Online)**: Initiate a payment request to the customer''s phone
- **Account Balance**: Query your M-Pesa account balance
- **Transaction Status**: Check the status of any transaction

## STK Push Implementation

STK Push is the most common integration. Here''s the flow:

1. User enters their phone number at checkout
2. Your server sends an STK Push request to Safaricom
3. User receives a prompt on their phone
4. User enters their M-Pesa PIN
5. Safaricom sends a callback to your server
6. You verify the transaction and fulfill the order

### Key Considerations

- **Timeout handling**: STK Push has a 120-second timeout. Handle both success and timeout gracefully.
- **Callback URL**: Must be HTTPS. Safaricom will retry callbacks, so make your endpoint idempotent.
- **Amount validation**: Always validate amounts server-side. Never trust client-side values.
- **Transaction verification**: After receiving a callback, verify the transaction using the Transaction Status API.

## Security Best Practices

- Store your consumer key and secret in environment variables, never in code
- Use HTTPS for all callback URLs
- Validate and sanitize all inputs from Safaricom callbacks
- Log all transactions for audit trails
- Implement rate limiting to prevent abuse

## Testing

Use the Safaricom sandbox for development. Test success cases, failures, timeouts, and edge cases. The sandbox allows you to simulate different scenarios before going live.',
  '2026-06-24',
  'Software Engineering',
  '12 min read',
  '/content-images/blackspike-wallpaper-04.avif'
),

(
  'Docker for Developers: From Development to Production',
  'docker-for-developers',
  'A practical guide to containerizing your applications with Docker, setting up CI/CD pipelines, and deploying to production.',
  '## Why Docker

Docker eliminates the "works on my machine" problem. Every developer on your team runs the same environment. Your CI/CD pipeline builds once and deploys everywhere. Production matches development.

## Essential Docker Concepts

### Images
Read-only templates containing your application code, runtime, libraries, and dependencies. Think of them as snapshots of your application.

### Containers
Running instances of images. Containers are lightweight, isolated, and disposable. Start one in seconds, stop it without affecting others.

### Dockerfile
A text file containing instructions to build your image. Each instruction creates a layer in the image. Understanding layer caching is key to building efficient Dockerfiles.

## Writing Better Dockerfiles

### Use Multi-Stage Builds
Separate your build environment from your runtime. This reduces image size dramatically:

```
# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Runtime stage
FROM node:20-slim
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### Leverage Layer Caching
Order your Dockerfile instructions from least to most frequently changing. Dependencies rarely change — copy and install them before copying your source code.

### Use .dockerignore
Exclude unnecessary files from your build context. Node modules, git directories, and documentation shouldn''t be in your image.

## Docker Compose for Development

Docker Compose lets you define multi-service environments in a single file:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - database
      - redis
  database:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
  redis:
    image: redis:7
```

One command starts your entire development environment — application, database, cache, and any other services.

## Production Deployment

### Health Checks
Always define health checks in your Dockerfile or Compose file. This allows orchestrators to restart unhealthy containers automatically.

### Resource Limits
Set memory and CPU limits. Prevent one container from consuming all resources and affecting others.

### Logging
Write logs to stdout/stderr. Let Docker handle log collection and rotation. This works with any container orchestration platform.

## CI/CD Integration

Build images in your CI pipeline, tag them with the commit SHA, and push to a container registry. Deploy by pulling the new image and restarting the container. Rollbacks become as simple as deploying the previous tag.',
  '2026-06-17',
  'DevOps',
  '9 min read',
  '/content-images/blackspike-wallpaper-01.avif'
),

(
  'Digital Transformation for Kenyan SMEs: Where to Start',
  'digital-transformation-kenyan-smes',
  'A roadmap for small and medium businesses in Kenya looking to digitize operations, automate workflows, and scale with technology.',
  '## The Digital Imperative

Kenyan SMEs face increasing pressure to digitize. Customers expect online presence, competitors are adopting automation, and manual processes are becoming unsustainable at scale. Digital transformation isn''t about technology — it''s about survival and growth.

## Common Pain Points

### Manual Operations
Spreadsheets for accounting, paper-based records, manual inventory tracking. These processes are error-prone, slow, and don''t scale.

### Disconnected Systems
Different tools for sales, accounting, HR, and customer management — none of them talk to each other. Data lives in silos, creating duplication and inconsistency.

### Limited Visibility
Without integrated systems, business owners lack real-time visibility into operations, finances, and customer behavior. Decisions are made on gut feeling, not data.

## Where to Start

### Phase 1: Core Operations (Month 1-3)
Start with your most painful manual process. For most businesses, this is either accounting or customer management.

- **Accounting**: Migrate from Excel to a proper accounting system like QuickBooks, Xero, or a custom solution
- **Customer Management**: Implement a CRM to track leads, customers, and interactions
- **Invoicing**: Automate invoice generation and payment tracking

### Phase 2: Process Automation (Month 3-6)
Once your core data is digital, automate repetitive workflows.

- **Approval Workflows**: Replace paper-based approvals with digital routing
- **Inventory Management**: Automate stock tracking, reorder alerts, and supplier management
- **Reporting**: Generate financial and operational reports automatically

### Phase 3: Digital Presence (Month 6-12)
Extend your operations to the digital world.

- **E-Commerce**: Sell online through your own platform or marketplaces
- **Customer Portal**: Give customers self-service access to orders, invoices, and support
- **Mobile App**: Reach customers where they are — on their phones

## Choosing the Right Technology

### Build vs Buy
For core processes (accounting, CRM), use existing SaaS products. For processes unique to your business, build custom solutions. The key is integration — your systems must share data.

### Budget Considerations
Start small, prove value, then expand. A basic CRM costs KES 5,000/month. A custom web application starts at KES 150,000. Choose based on ROI, not features.

### Local Support
Work with local technology partners who understand the Kenyan market. They''ll know M-Pesa integration, local compliance requirements, and the unique challenges of operating in Kenya.

## Measuring Success

Track these metrics before and after digitization:

- **Time savings**: Hours saved per week on manual tasks
- **Error reduction**: Decrease in data entry errors and duplicates
- **Revenue growth**: Impact of digital channels on sales
- **Customer satisfaction**: Response times and resolution rates

Digital transformation is a journey, not a destination. Start with one process, prove the value, and build momentum.',
  '2026-06-10',
  'Business Automation',
  '7 min read',
  '/content-images/blackspike-wallpaper-02.avif'
);
