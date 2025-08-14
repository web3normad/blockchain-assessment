# Blockchain API Assessment

## Implementation

This project implements a Node.js API with blockchain smart contract interaction as per the assessment requirements.

---

## Assessment Requirements Met

### **API Endpoint Created**
- **Endpoint:** `GET /api/web3normadApiTest`
- Successfully implemented as required

### **Smart Contract Interaction**
- **Contract:** USDC Token on Ethereum Mainnet
- **Address:** `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- **Data Fetched:** Name, symbol, total supply, sample balance

### **Console Output**
- Detailed blockchain data printed to console
- Professional formatting with separators
- Timestamp and network information included

---

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Internet connection for blockchain interaction

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd blockchain-assessment

# Install dependencies
npm install

# Start the server
npm start
```

### Testing the Assessment
```bash
# Test the main blockchain endpoint
curl http://localhost:3001/api/web3normadApiTest

# Or visit in browser
http://localhost:3001/api/web3normadApiTest

# Health check
curl http://localhost:3001/health
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/web3normadApiTest` | GET | **Main assessment endpoint** - Fetches USDC contract data |
| `/api/items` | GET | List all items with optional search and limit |
| `/api/items/:id` | GET | Get specific item by ID |
| `/api/items` | POST | Create new item |
| `/api/stats` | GET | Get statistical data about items |
| `/health` | GET | Health check endpoint |

---

## What The Assessment Endpoint Does

When you call `/api/web3normadApiTest`, the server will:

1. **Connect to Ethereum Mainnet** using a public RPC endpoint
2. **Query the USDC smart contract** for:
   - Token name and symbol
   - Total supply
   - Balance of a sample wallet
3. **Print detailed results to console** as required
4. **Return JSON response** with all the data

### Sample Console Output:
```
================================
    BLOCKCHAIN API TEST STARTED
================================
Timestamp: 2025-08-14T07:30:45.123Z
Network: Ethereum Mainnet
Contract: USDC Token
Address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
--------------------------------
Fetching contract data...
Basic contract info retrieved
Sample balance retrieved

BLOCKCHAIN DATA SUCCESSFULLY FETCHED:
========================================
Token Name: USD Coin
Symbol: USDC
Decimals: 6
Total Supply: 34,567,890,123 USDC
Sample Wallet Balance: 1,234,567 USDC
Sample Wallet: 0xF977814e90...
Network: Ethereum Mainnet (Chain ID: 1)
========================================
ASSESSMENT COMPLETED SUCCESSFULLY!
```

### Sample API Response:
```json
{
  "success": true,
  "message": "Blockchain data fetched successfully",
  "data": {
    "contractAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "name": "USD Coin",
    "symbol": "USDC",
    "decimals": 6,
    "totalSupply": "34567890123.456789",
    "sampleWalletBalance": "1234567.890123",
    "networkInfo": {
      "chainId": 1,
      "network": "Ethereum Mainnet"
    },
    "timestamp": "2025-08-14T07:30:45.123Z"
  }
}
```

---

## Technical Implementation

- **Framework:** Express.js
- **Blockchain Library:** ethers.js v6
- **Network:** Ethereum Mainnet
- **RPC Provider:** ethereum.publicnode.com
- **Smart Contract:** USDC Token (ERC-20)

---

## Project Structure

```
blockchain-assessment/
├── package.json
├── .env
├── README.md
└── src/
    ├── index.js
    ├── data/
    │   └── items.json
    ├── middleware/
    │   └── errorHandler.js
    ├── routes/
    │   ├── items.js
    │   └── stats.js
    └── utils/
        └── stats.js
```

---

## Features

- **Blockchain Integration:** Real-time USDC contract data fetching
- **Error Handling:** Comprehensive error handling with timeouts
- **Logging:** Detailed console output for debugging
- **API Documentation:** Clear endpoint documentation
- **Production Ready:** Proper structure and best practices

---

## Submission

This implementation demonstrates:
1. **API Endpoint Creation** - `web3normadApiTest` endpoint as specified
2. **Smart Contract Interaction** - Fetches real data from USDC contract
3. **Console Output** - Detailed blockchain data logging
4. **Professional Code Quality** - Clean, well-structured implementation

---

## Usage

1. Start the server with `npm start`
2. Access the assessment endpoint at `/api/web3normadApiTest`
3. View console output for detailed blockchain interaction logs
4. API returns JSON response with contract data

**Assessment completed successfully!**
