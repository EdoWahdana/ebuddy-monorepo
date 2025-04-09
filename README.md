## Technical Test Monorepo

### How to run

1. Clone the repository
   ```bash
   git clone https://github.com/EdoWahdana/ebuddy-monorepo.git
   cd ebuddy-monorepo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the project
   ```bash
   turbo build
   ```

4. Start the application
   ```bash
   turbo start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000/login
   ```

## 📁 Project Structure

```
monorepo/
├── apps/
│   ├── storefront/     # Main web application
│   └── api/            # Backend API service
├── packages/           # Shared packages
│   ├── interface/      # Shared User interface
│   └── config/         # Shared configurations
└── turbo.json          # Turborepo configuration
```