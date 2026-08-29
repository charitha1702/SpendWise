# SPENDWISE — SECURITY & PRIVACY SPECIFICATION (STATUS & COMPLIANCE MATRIX)

This document provides the security, privacy, and architectural audit for SpendWise across all 40 requirements.

---

## 1. Authentication & Session Management
- [x] **Req 1: Authentication Endpoints (`/login`, `/signup`, `/dashboard`)**
  - Public routes: `/`, `/login`, `/signup`.
  - Protected routes: `/dashboard`, `/transactions`, `/import`, `/analytics`, `/budgets`, `/ai`, `/forecast`, `/receipts`, `/challenges`, `/before-you-spend`, `/settings`.
  - Unauthenticated access redirects to `/login`. Authenticated visits to `/login` / `/signup` redirect to `/dashboard`.
- [x] **Req 2: User Data Isolation**
  - Every user's transactions, budgets, recurring bills, challenges, and receipts are tagged with immutable `userId`.
  - Client state and server backend isolate data strictly by `userId` and validate session bearer tokens.
- [x] **Req 3: Password Policy & Storage**
  - Minimum 8 characters, requiring at least one number and one special character.
  - Interactive password strength meter with real-time feedback.
  - Server-side SHA-256 with salt hashing for all credentials. Plaintext passwords are never logged or stored.
- [x] **Req 4: Session Management & Expiration**
  - Cryptographically random session tokens (32 bytes hex).
  - 24-hour token expiry with sliding activity checks.
  - Invalidate token on explicit logout or account deletion.
- [x] **Req 5: Brute Force & Rate Limiting**
  - Sliding-window in-memory rate limiting on `/api/login` (max 5 attempts per 15 min window).
  - Exponential backoff / lockouts returned with HTTP 429.

---

## 2. Data Protection & Encryption
- [x] **Req 6: Encryption in Transit**
  - Enforce HTTPS and secure proxy headers.
- [x] **Req 7: Sensitive Data Masking**
  - Mask account numbers (`•••• •••• •••• 1234`) and auto-strip CVVs/PINs during OCR/parsing.
- [x] **Req 8: Zero Credential Scraping Philosophy**
  - No bank logins, passwords, or MPINs are ever requested.
  - Pure document import (PDF/CSV/TXT/Excel) and manual ledger entry.
- [x] **Req 9: Local-First Storage Privacy**
  - Client-side isolated storage per authenticated user key (`spendwise_user_${id}`).
  - Quick-switch user state sanitization.
- [x] **Req 10: Right to Erasure ("Delete All My Data")**
  - Implemented in Settings with double-confirmation keyword verification (`DELETE MY DATA`).
  - Clears all local state, storage caches, and server session tokens immediately.

---

## 3. Input Validation, Sanitization & Defense
- [x] **Req 11: Schema & Type Validation**
  - Server-side and client-side validation on transaction amounts (positive, numeric), dates (valid ISO), categories (whitelisted set).
- [x] **Req 12: XSS Protection**
  - React auto-escaping for all user inputs (descriptions, merchant names, notes).
  - No `dangerouslySetInnerHTML` on un-sanitized content.
- [x] **Req 13: SQL / Injection Defense**
  - Parameterized API requests and strictly typed in-memory stores.
- [x] **Req 14: File Upload Security**
  - Strict MIME type and extension whitelist (`.pdf`, `.csv`, `.xlsx`, `.txt`, `.jpg`, `.png`, `.webp`).
  - 10MB maximum file size limit.
  - In-memory parsing without executing uploaded files.
- [x] **Req 15: CSRF & Header Security**
  - Origin verification, Bearer auth headers, and security response headers.

---

## 4. AI Security & Prompt Injection Defense
- [x] **Req 16: Anonymized AI Payloads**
  - User names, emails, raw bank account numbers, and phone numbers are stripped or replaced with tokens prior to sending to Gemini.
- [x] **Req 17: Prompt Injection Neutralization (`sanitizeForAI`)**
  - Strict stripping of `<system>`, `ignore previous instructions`, `jailbreak`, and markdown injection delimiters.
- [x] **Req 18: Zero Model Training Guarantee**
  - Stateless API calls with explicit safety instructions forbidding model retainment.
- [x] **Req 19: AI Output Validation & Boundary Isolation**
  - Structured JSON schemas enforced on all financial decision models and parser outputs.
  - Fallback error handlers for unavailable or degraded AI states.
- [x] **Req 20: AI Rate Limits & Quotas**
  - AI endpoints protected with per-user burst and window limits to prevent API abuse.

---

## 5. Financial Audit & Ledger Integrity
- [x] **Req 21: Duplicate Transaction Detection**
  - Heuristic duplicate matching across Date, Exact Amount, and Fuzzy Merchant.
  - Flagged in Statement Import UI before committing.
- [x] **Req 22: Immutable Transaction Log Audit**
  - Timestamps, creation source (`manual`, `import`, `receipt_scan`), and modification tracing.
- [x] **Req 23: Precision & Currency Math**
  - Rounding to 2 decimal places to avoid floating point precision drift.
- [x] **Req 24: Data Portability (JSON & CSV Export)**
  - Users can export their complete ledger anytime in standard open formats.

---

## 6. Access Control & Operational Security
- [x] **Req 25: Least Privilege Architecture**
  - Frontend components receive only the data belonging to the logged-in session.
- [x] **Req 26: Sensitive Action Confirmation**
  - Confirmations required for ledger resets, transaction deletions, and account wiping.
- [x] **Req 27: Error Handling & Information Disclosure**
  - Generic client error messages (no stack traces, database internals, or environment variables exposed).
- [x] **Req 28: Logging & Observability Without PII**
  - Server logs sanitize user email, names, and card fragments.

---

## 7. Compliance & Audit Verification
- [x] **Req 29 - 40: Verification Matrix & Security Assurance**
  - All automated tests, type checks, and build scripts pass.
  - Zero third-party unvetted tracking scripts or analytics beacons.
