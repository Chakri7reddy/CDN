# 📦 Decentralized Content Delivery Network (CDN) on Internet Computer

This is a decentralized CDN prototype built on the **Internet Computer (ICP)** using:

- 🦀 Rust (for backend)
- ⚛️ React + Tailwind CSS (for frontend)
- 📁 ICP Asset Canisters (for static file hosting)



## 🚀 Features (Current)

- Upload and retrieve file chunks from Rust backend
- React UI with Tailwind styling
- Integrated with DFX for full local development
- Live canister calls using `@dfinity/agent`



## 📁 Project Structure

## ⚙️ Getting Started

> 🧠 **Prerequisites**:
- [Install Rust](https://www.rust-lang.org/tools/install)
- [Install DFX CLI](https://internetcomputer.org/docs/current/developer-docs/setup/download-install)
- [Install Node.js](https://nodejs.org/)
- Optional: VSCode with Rust/TS support



## 🛠️ Installation & Dev Setup

```bash
# 📦 Clone the repository
git clone https://github.com/<your-username>/icp_cdn.git
cd icp_cdn

# 📁 Install frontend dependencies
cd src/icp_cdn_frontend
npm install

# 🔒 Note: `.dfx/`, `node_modules/`, and `src/declarations/` are git-ignored by default.

# 🔁 Go back and generate backend/frontend bindings
cd ../..
dfx generate

# 🚀 Start local Internet Computer replica
dfx start --background

# 📡 Deploy backend + frontend canisters
dfx deploy

# 💻 Run the frontend development server
cd src/icp_cdn_frontend
npm run dev

<<<<<<< HEAD
# Decentralized-CDN
=======
>>>>>>> e017c08fad1dff1f7f6d282fc12e4aa4ed3b9bef
