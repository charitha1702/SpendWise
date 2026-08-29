# SpendWise

### Understand. Plan. Spend Smarter.

SpendWise is an AI-powered personal finance and expense intelligence platform designed to make expense tracking effortless.
Instead of manually entering every transaction, users can import transaction statements from their UPI apps, banks, cards, and other supported sources. SpendWise extracts, categorizes, analyzes, and visualizes the data to provide a clear picture of personal spending.

> **SpendWise turns financial data into financial clarity.**
---
## Why SpendWise?

Traditional expense trackers require users to manually record every transaction.
That quickly becomes tedious.

SpendWise takes a different approach:

```text
Transaction Statement
        ↓
   Smart Import
        ↓
Transaction Extraction
        ↓
   AI Categorization
        ↓
 Duplicate Detection
        ↓
     User Review
        ↓
    SpendWise Data
        ↓
 Analytics + AI Insights
        ↓
 Smarter Financial Planning
```

The goal is simple: **Less manual tracking. More understanding.**

---

#  Features

##  Smart Import

Import financial statements instead of manually entering every transaction.
Supported formats:
* PDF
* CSV
* Excel
SpendWise processes the statement and extracts relevant transaction information.

### Import workflow

```text
Upload
  ↓
Process
  ↓
Extract
  ↓
Categorize
  ↓
Detect Duplicates
  ↓
Review
  ↓
Import
```

---

##  AI Transaction Categorization

SpendWise automatically organizes transactions into categories such as:

* 🍔 Food
* 🛍 Shopping
* 🚗 Transport
* 🏠 Bills
* 🎬 Entertainment
* 🛒 Groceries
* 💻 Education
* 📦 Other

Users can review and modify classifications before importing.

---

##  Spending Analytics

Understand where your money goes through interactive visualizations.
Includes:

* Spending trends
* Category breakdown
* Income vs expenses
* Monthly comparisons
* Average daily spending
* Spending patterns
* Highest spending categories

---

##  Smart Budgets

Create budgets for:
* Overall spending
* Food
* Shopping
* Transport
* Entertainment
* Custom categories
Track progress in real time.

Example:
```text
Food

₹3,400 / ₹5,000

██████████████░░░░

68%
```

---

##  AI Money Copilot
SpendWise includes an AI-powered conversational interface that lets users ask questions about their own spending data.

Examples:

> Where did most of my money go?

> How much did I spend on food this month?

> Why did my spending increase?

> Compare this month with last month.

> What is my biggest spending category?

The AI provides insights based on the user's authorized transaction data.

---

## Financial Forecast

Estimate where your balance could be heading based on:

* Current balance
* Historical spending
* Recurring expenses
* Upcoming expenses

Example:

```text
Current Balance

₹32,500

        ↓

Estimated Month-End Balance

₹18,420
```

Forecasts are clearly marked as **estimates**, not guaranteed outcomes.

---

##  Before You Spend

A decision-support feature that lets users evaluate a planned purchase.

Example:

```text
Planned Purchase

Headphones
₹3,000

Current Balance
₹24,500

After Purchase
₹21,500

Budget Usage
84%
```

SpendWise provides financial context rather than making the decision for the user.
---

##  Receipt Scanner

Upload a receipt and extract:
* Merchant
* Date
* Items
* Total
* Category

The extracted information can then be reviewed and converted into a transaction.

---

##  Money Challenges

Turn financial goals into simple challenges.

Examples:
* Save ₹1,000 This Week
* Build Your First ₹5,000
* Reduce Food Spending
* No-Spend Weekend

Track progress and stay motivated.

---

#  Security & Privacy

SpendWise handles sensitive financial information, so security is a core part of the architecture.

Key principles:

*  Secure authentication
* Strict per-user data isolation
* Database-level authorization
*  Server-side secret management
*  Secure file uploads
*  Private financial documents
*  AI prompt-injection protection
*  No UPI PIN collection
*  No banking passwords
*  No card CVV collection
*  No credential-based PhonePe scraping

### Statement-first approach

SpendWise does **not** require users to provide banking or UPI credentials.

The MVP focuses on:

```text
UPI / Bank Statement
        ↓
     SpendWise
        ↓
      Import
```

rather than collecting private banking credentials.

---

#  Architecture

```text
                    ┌─────────────────┐
                    │     User        │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ SpendWise Web   │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │ Authentication│         │  Application  │
        │    Layer      │         │     API       │
        └───────────────┘         └───────┬───────┘
                                         │
                     ┌───────────────────┼──────────────────┐
                     ▼                   ▼                  ▼
              ┌────────────┐      ┌────────────┐    ┌────────────┐
              │  Database  │      │   Import   │    │ AI Layer   │
              │            │      │  Processor  │    │            │
              └────────────┘      └────────────┘    └────────────┘
                                         │                  │
                                         ▼                  ▼
                                  PDF / CSV / XLSX     AI Insights
```

---

#  Tech Stack

The exact stack may evolve during development, but the planned architecture includes:

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Responsive UI
* Interactive charts

### Backend

* API-based backend
* Secure authentication
* Server-side validation
* Transaction processing

### Database

* PostgreSQL / Supabase
* Row Level Security (RLS)
* User-owned financial data

### AI

* Google Gemini / compatible LLM
* Transaction categorization
* AI Money Copilot
* Financial insights
* Receipt understanding

### File Processing

* PDF parsing
* CSV processing
* Excel processing
* Receipt/OCR processing

---

#  Project Structure

```text
SpendWise/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── api/
│   ├── services/
│   ├── models/
│   ├── auth/
│   ├── import/
│   └── ai/
│
├── database/
│   ├── migrations/
│   └── policies/
│
├── public/
│
├── .env.example
├── SECURITY.md
├── README.md
└── package.json
```

Adjust the structure to match the actual repository as development progresses.

---

#  Environment Variables

Create a `.env` file locally.

Example:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=

GEMINI_API_KEY=

DATABASE_URL=
```

#  Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/<your-username>/spendwise.git
cd spendwise
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create: 
```text
.env
```
and add the required credentials.

## 4. Start the development server

```bash
npm run dev
```
The application should then be available through the local development URL shown in the terminal.

---

# User Flow

SpendWise has two distinct experiences.

##  Public Experience

```text
Landing Page
     ↓
Video Hero
     ↓
SpendWise Introduction
     ↓
Features
     ↓
Smart Import Preview
     ↓
AI Preview
     ↓
Security
     ↓
Get Started
     ↓
Sign Up / Login
```

##  Authenticated Experience

```text
Login
  ↓
Dashboard
  ↓
Smart Import
  ↓
Transactions
  ↓
Analytics
  ↓
Budgets
  ↓
AI Copilot
  ↓
Forecast
  ↓
Receipts
  ↓
Challenges
  ↓
Before You Spend
```

---

#  Core Product Philosophy

SpendWise is built around five principles:

### 1. Automate

Users shouldn't have to manually record everything.

### 2. Organize

Raw financial data should become understandable information.

### 3. Understand

Users should be able to see their spending patterns.

### 4. Plan

Budgets and forecasts help users prepare.

### 5. Decide

SpendWise provides context while keeping financial decisions in the user's hands.

---

# 🛡️ Security Development Checklist

Before production deployment:

```text
[ ] Authentication implemented
[ ] Authorization implemented
[ ] User data isolation verified
[ ] Database RLS enabled
[ ] API keys removed from frontend
[ ] Secrets stored securely
[ ] File upload validation implemented
[ ] Private file storage configured
[ ] XSS protections verified
[ ] SQL injection protections verified
[ ] IDOR protections tested
[ ] Rate limiting implemented
[ ] Prompt injection protections implemented
[ ] Sensitive logging removed
[ ] HTTPS enabled
[ ] Dependencies audited
[ ] Account/data deletion tested
```

---

#Roadmap

### Phase 1 — MVP

* [ ] Landing page
* [ ] Authentication UI
* [ ] Dashboard
* [ ] Manual transactions
* [ ] Smart statement import
* [ ] Transaction categorization
* [ ] Basic analytics
* [ ] Basic budgets

### Phase 2 — Intelligence

* [ ] AI Money Copilot
* [ ] Spending insights
* [ ] Forecasting
* [ ] Recurring expense detection
* [ ] Before You Spend
* [ ] Receipt scanning

### Phase 3 — Engagement

* [ ] Savings challenges
* [ ] Personalized insights
* [ ] Spending pattern detection
* [ ] Advanced analytics
* [ ] Financial goals

### Phase 4 — Production

* [ ] Security audit
* [ ] Performance optimization
* [ ] Privacy controls
* [ ] Data export
* [ ] Account deletion
* [ ] Production monitoring

---
# Current Status

**Development / MVP**
SpendWise is currently under active development.
Features and architecture may change as the product evolves.

---
#  Contributing
Contributions, suggestions and feedback are welcome.
For major changes, please open an issue first to discuss the proposed change.

---

#  License
This project is currently intended for development and educational purposes.
Add an appropriate open-source license before accepting external contributions.

---

# SpendWise

### Understand. Plan. Spend Smarter.

Built to make personal finance less about **tracking every rupee** and more about **understanding where it goes.**
