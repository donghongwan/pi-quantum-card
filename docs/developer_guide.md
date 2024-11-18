# Developer Guide for PQC

## Introduction
This guide is intended for developers who want to contribute to the PQC (Post-Quantum Cryptography) project. It covers the setup, coding standards, and contribution process.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (for local development)
- Git

### Setting Up the Development Environment
1. Clone the repository:
   ```bash
   1 git clone https://github.com/KOSASIH/pi-quantum-card.git
   2 cd pi-quantum-card
   ```

2. Install dependencies:

   ```bash
   1 npm install
   ```

3. Set up your environment variables by creating a .env file based on the .env.example file provided.

4. Start the development server:

   ```bash
   1 npm run dev
   ```

## Coding Standards
- Follow the Airbnb JavaScript Style Guide.
- Use meaningful variable and function names.
- Write comments to explain complex logic.

## Testing
- Run unit tests using:
   ```bash
   1 npm test
   ```

Ensure all tests pass before submitting your code.

## Contribution Process
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   1 git checkout -b feature/my-feature
   ```

3. Make your changes and commit them:
   ```bash
   1 git commit -m "Add my feature"
   ```

4. Push your changes to your fork:
   ```bash
   1 git push origin feature/my-feature
   ```

5. Create a pull request to the main repository.


## Conclusion
Thank you for considering contributing to the PQC project. Your contributions help improve the application and benefit the community. For any questions, feel free to reach out to the maintainers.
