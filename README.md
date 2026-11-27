# Asset Management System

## Project Overview
A simple Asset Management System designed to manage and track warehouse assets.

## Requirements
- Add new assets with Asset ID and Asset Name.
- Select an asset category.
- Upload an asset photograph.
- Automatically record date and time.
- View all assets on the dashboard.
- Search assets using Asset ID.
- View individual asset details and photograph.
- Edit and delete asset records.
- Store asset information in an SQLite database.
- Access the application through devices connected to the same local network (LAN).

## How to Run the Project

### 1. Backend Setup
Open the backend folder in the terminal and run:

```bash
npm install
npm run dev
```

### 2. Frontend Setup
Open another terminal, navigate to the frontend folder and run:

```bash
npm install
npm run dev
```

### 3. Open the Application
Open the local URL displayed by Vite in your browser.

### 4. LAN Access
To access the application from another device connected to the same network:

```text
http://YOUR-PC-IP:5173
```

Replace `YOUR-PC-IP` with your computer's local IPv4 address.

## Database
The application uses SQLite to store asset records.

## Project Purpose
This project provides a simple solution for recording, viewing, searching, updating and managing warehouse assets.