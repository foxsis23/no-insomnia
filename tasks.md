Pages:
- / — Landing with 10 blocks (Hero, WhatTestGives, HowItWorks, SleepTypes, TrustBlock, ResultExample, NightSupport, FurtherProducts, FAQ, Footer)
- /test — 10-question test with progress bar, auto-calculates result type
- /result?type=TYPE — Free result card + 29 UAH paywall
- /result?type=TYPE&paid=true — Full paid result + upsell
- /success — Post-payment page with content + upsell grid
- /offer?product=ID — Generic product purchase page
- /course — Doctor course (590 UAH) with module list
- /privacy, /terms, /contacts, /disclaimer — Legal pages

API Stubs:
- POST /api/payment/create — Generates WayForPay-compatible form data (real HMAC-MD5 if secret key provided)
- POST /api/payment/callback — WayForPay webhook handler
- POST /api/test-result — Saves test results
- GET /api/orders/[token] — Returns order by access token

To start dev server: npm run dev

To go live: Copy .env.local.example → .env.local, fill in WAYFORPAY_MERCHANT_ACCOUNT + WAYFORPAY_SECRET_KEY + NEXT_PUBLIC_SITE_URL.
