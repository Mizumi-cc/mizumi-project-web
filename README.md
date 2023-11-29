This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables - use `.env.example` as reference
1. Get [FINCRA](https://fincra.com) variables from Fincra dashboard after you create an account. Fincra is what we're using to collect payments and make payouts in tradfi.
2. Get program id after deploying to devnet.
3. use any devnet RPC.
4. Get rates API keys from [here](https://apilayer.com/marketplace/exchangerates_data-api?utm_source=apilayermarketplace&utm_medium=featured).
5. For the ADMIN environment variable, you can create a Solana wallet and export the Keypair in byte array format. Make sure this is the same wallet used as ADMIN in the Solana program and backend.
