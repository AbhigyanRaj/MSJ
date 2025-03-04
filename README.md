# Metaverse Street Journal (MSJ)

## 📌 Project Overview
Metaverse Street Journal is a modern, decentralized journalism platform focused on covering topics related to Web3, NFTs, Blockchain, Crypto, Startups, and Tech Innovations. The platform enables **role-based access control (RBAC)** to provide specific functionalities to different user types, ensuring a structured workflow from content creation to publication and advertisement management.

## 🚀 Key Features
### 🔹 **Role-Based Dashboards**
Each user role has a dedicated dashboard with functionalities tailored to their responsibilities.

- **Super Admin**: User management, role assignment, and platform analytics.
- **Admin**: Moderation of content, user approval, and reported content handling.
- **Editor**: Content supervision, journalist management, and article approval.
- **Journalist**: Write, edit, and submit articles.
- **Advertiser**: Create, manage, and analyze ad performance.
- **Partner**: Collaborate with MSJ, submit partnership proposals.

### 🔹 **Authentication & Authorization**
- Users can **sign up/login with email-password** or **Google Authentication**.
- Role-based access ensures users can only perform allowed actions.
- Firestore manages user roles and permissions dynamically.

### 🔹 **Content Management System (CMS)**
- Journalists create & submit articles.
- Editors review and send them for Admin approval.
- Admins have the final publishing rights.

### 🔹 **Ad Management System**
- Advertisers submit ads for review.
- Admins approve/reject ad campaigns.
- Ad analytics show engagement metrics.

### 🔹 **Analytics & Reporting**
- Dashboards display performance statistics.
- Admins & advertisers get detailed reports on engagement and revenue.

## 🏗 Tech Stack
| Technology  | Usage |
|------------|------------------------------------------------|
| **React.js** | Frontend UI development |
| **Tailwind CSS** | Styling framework for a modern UI |
| **Firebase Authentication** | User authentication (Email & Google) |
| **Firestore Database** | NoSQL database for user roles & content |
| **React Router** | Client-side routing for seamless navigation |
| **Context API** | State management for auth & role-based access |

## 📂 Project Structure
```bash
📦 MSJ_Final
├── 📂 src
│   ├── 📂 components # UI components
│   ├── 📂 context # Auth & Role-based Context API
│   ├── 📂 hooks # Custom hooks (if any)
│   ├── 📂 layouts # Main Layouts
│   ├── 📂 pages # Application pages
│   │   ├── 📂 dashboards # Dashboards for different roles
│   │   ├── 📂 user # User-specific pages (Auth, Profile, etc.)
│   ├── 📂 services # Firebase integrations
│   ├── 📂 utils # Helper functions (if needed)
│   ├── App.jsx # Main application file
│   ├── index.js # Entry point
└── 📜 README.md # Project documentation
```

## 🛠️ Setup & Installation
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-repo-name/MSJ_Final.git
cd MSJ_Final
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Configure Firebase**
- Create a `.env` file in the root directory and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### **4️⃣ Start the Development Server**
```sh
npm run dev
```

## 🔥 Future Enhancements
- **User Notifications** for article approval, ads, and role updates.
- **Dark Mode** for better UI experience.
- **Real-time Chat** between journalists, editors, and advertisers.
- **Blockchain-based Article Verification** for authenticity.

## 🤝 Contributing
If you want to contribute:
1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and commit them.
4. Push your branch and create a Pull Request.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Credits
Developed by **Abhigyann Raj** and contributors.
