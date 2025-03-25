# Online Judge

## Overview
This is a **Robust and Scalable Online Judge** built using a **microservice architecture**, supporting multiple programming languages for remote code execution. It ensures **code security** through **containerization** and **sandboxing** using **Docker**. The custom compiler is deployed on **AWS EC2**, providing a reliable and efficient platform for **DSA and interview preparation.**
## Video Demo : [watch video demo](https://www.loom.com/share/ab008802715c4cf884e492ff1bf670e1)
## Features
- **Multi-Language Support**: Supports major programming languages - **C, C++, Java, Python, and JavaScript**.
- **Secure Code Execution**: Utilizes **Docker** to isolate code execution and prevent security vulnerabilities.
- **Real-time Feedback**: Executes code and returns outputs, errors, and execution time.
- **Optimized Performance**: Uses efficient execution pipelines to handle multiple submissions concurrently.
- **User Authentication**: Secure JWT-based authentication for users.
- **Global Chat**: Real-time messaging using **Socket.io** for discussions.
- **LeetCode-like UI**: Aesthetic frontend built with **React, Redux, and Material-UI**.
- **Persistent State Management**: Uses **redux-persist** for seamless user experience.
![image](https://github.com/user-attachments/assets/5fd51bbf-5a7c-425d-980f-bda72a70865b)
![image](https://github.com/user-attachments/assets/4bf60d00-5bb5-41e1-b237-1055433c2008)
![image](https://github.com/user-attachments/assets/ba802e06-c324-4d5a-ac7c-41ec7be0c469)
![image](https://github.com/user-attachments/assets/02c2479e-c92d-4d93-9571-a50a6109a1a0)
![image](https://github.com/user-attachments/assets/749627b0-a2d4-48d9-9612-0aa6977763d1)
![image](https://github.com/user-attachments/assets/b37b4302-13e9-4b51-8ce9-9c1c872fede7)






## Tech Stack
### **Frontend**
- React (Vite)
- Redux Toolkit
- Material-UI
- Socket.io Client

### **Backend**
- Node.js (Express)
- MongoDB (Atlas)
- JWT Authentication
- Socket.io (WebSockets)
- Docker (Sandboxing & Security)
- AWS EC2 (Remote Code Execution)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.0)
- MongoDB (Atlas or Local)
- Docker

### Backend Setup
```sh
# Clone the repository
git clone https://github.com/your-repo/online-judge.git
cd online-judge/server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start the backend
npm start
```

### Frontend Setup
```sh
cd ../client

# Install dependencies
npm install

# Start the frontend
npm run dev
```

### Docker Setup (For Secure Execution)
```sh
cd execution-engine
# Build Docker Image
docker build -t online-judge-engine .
# Run the Execution Engine
docker run -d -p 5000:5000 online-judge-engine
```

## Usage
- Register/Login to the platform.
- Choose a **DSA problem** and submit your code.
- Receive instant feedback on execution status, errors, and runtime.
- Discuss problems with peers in **Global Chat**.

## Deployment
The backend is deployed on **Render**, and the frontend is hosted on **Netlify**. The execution engine runs on **AWS EC2** with Docker.

## Contributing
Feel free to contribute by submitting **issues** or **pull requests**. For major changes, please open an issue first to discuss.

## License
MIT License

---
**Developed by [Naman Sharma](https://github.com/your-github).** 🚀

