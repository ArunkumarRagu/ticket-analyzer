# AI-Powered Support Ticket Management System

An AI-assisted, role-based support ticket management system built using **Ruby on Rails (API)**, **React (SPA)**, and **Hugging Face LLMs**.

This system automatically classifies and prioritizes support tickets using a Large Language Model while supporting secure role-based access and agent assignment workflows.

---

## 🚀 Problem Statement

Businesses often struggle to:

* **Automatically categorize** incoming support tickets.
* **Prioritize issues** based on urgency.
* **Assign tickets efficiently** to support agents.
* **Maintain secure access control** across different roles.

Manual classification is slow and inconsistent, leading to delayed response times and customer dissatisfaction.

---

## 💡 Solution

This project demonstrates a full-stack SaaS-style system that:

* Uses **AI (LLM)** to automatically classify and prioritize tickets.
* Implements **secure JWT authentication**.
* Enforces **role-based access control (RBAC)** (Admin / Agent / Customer).
* Supports ticket assignment workflows.
* Uses **asynchronous background processing** for AI analysis.

---

## 🏗 Architecture Overview

```text
React (SPA)
     ↓
Rails API (JWT Auth + RBAC)
     ↓
PostgreSQL
     ↓
ActiveJob (Async Processing)
     ↓
Hugging Face LLM (AI Classification)

```

---

## 👥 Role-Based Access Control

### 👤 Customer

* Register & login.
* Create support tickets.
* View only their own tickets.

### 🛠 Agent

* View only tickets assigned to them.
* Resolve assigned tickets.

### 👑 Admin

* View all tickets.
* Assign tickets to agents.
* Manage system workflow.

*All permissions are enforced strictly at the backend level.*

---

## 🤖 AI Integration

Tickets are analyzed asynchronously using a **Hugging Face LLM**. The model:

1. **Classifies ticket category** (Bug, Billing, Feature Request, etc.).
2. **Assigns priority** (Low, Medium, High).
3. **Generates a short summary**.

AI responses are sanitized and validated before persisting to the database.

---

## 🧠 Key Engineering Highlights

* **API-first Rails architecture** for scalability.
* **JWT-based authentication** for secure, stateless sessions.
* **Rolify-based role management** for granular permissions.
* **Async background job processing** to prevent UI lag.
* **Structured prompt engineering** for consistent JSON outputs.
* **Defensive JSON parsing** to handle potential AI hallucinations.
* **Clean React + Tailwind UI** for a professional user experience.

---

## 🛠 Tech Stack

**Backend**

* Ruby on Rails (API Mode)
* PostgreSQL
* ActiveJob
* JWT & Rolify

**Frontend**

* React (Vite)
* Axios
* Tailwind CSS

**AI**

* Hugging Face Inference API
* LLM-based structured output classification

---

## 📦 Local Setup

### Backend

```bash
cd backend
bundle install
rails db:create
rails db:migrate
rails s

```

**Environment Variable:**
`HUGGINGFACE_API_KEY=your_api_key`

### Frontend

```bash
cd frontend
npm install
npm run dev

```

---

## 🔐 Security Notes

* JWT authentication is required for all protected endpoints.
* Role-based authorization is enforced server-side via Pundit or custom policies.
* Agent assignment is validated against role types.
* Customers are logically scoped to prevent unauthorized data access.

---

## 📌 Future Enhancements

* **Ticket Lifecycle Tracking:** Full audit logs for ticket history.
* **Dashboard Analytics:** Visualizing ticket trends and response times.
* **AI Confidence Scoring:** Flagging low-confidence AI results for manual review.
* **CI/CD Pipeline:** Automated testing and deployment.

---

## 🎯 Project Goal

This project demonstrates the ability to design and build **AI-integrated SaaS systems**, secure multi-role backend APIs, and production-style full-stack architectures.

---

## 🔑 Demo Credentials (For Evaluation Only)

You may use the following demo accounts to explore the system:

### 👑 Admin
Email: admin@gmail.com
Password: password123

### 🛠 Agent
Email: agent@gmail.com
Password: password123

### 👤 Customer
Email: customer@gmail.com
Password: password123

---

## 📄 License

This project is for portfolio and demonstration purposes.

---
