# AskMyDoc AI 🤖📄

An AI-powered document intelligence platform that lets you upload documents, generate smart summaries, and have natural conversations with your files.

---

## What it does

- **Upload** PDF documents
- **Summarize** documents automatically using Google Gemini AI
- **Chat** with your documents using natural language Q&A
- **History** — chat history persists across sessions
- **Dashboard** — track all your documents, storage, and activity
- **Authentication** — secure JWT-based login and registration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS, React Router DOM |
| Backend | Node.js, Express.js (ES Modules) |
| Database | MongoDB + Mongoose |
| Vector Database | ChromaDB |
| Embeddings | HuggingFace Transformers — `all-MiniLM-L6-v2` |
| AI / LLM | Google Gemini 2.5 Flash |
| PDF Parsing | pdf-parse |
| Text Chunking | LangChain `RecursiveCharacterTextSplitter` |
| Auth | JWT + bcryptjs |
| File Upload | Multer |

---


## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- MongoDB Atlas account (free tier)
- Google Gemini API key — [aistudio.google.com](https://aistudio.google.com)

---

### 1. Clone the repository

```bash
git clone https://github.com/tanvipokale98/AskMyDoc-Project.git
cd AskMyDoc-Project
```

---

### 2. Install ChromaDB

```bash
pip install chromadb
```

---

### 3. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://your_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=7d
GEMINI_KEY=AIzaSy_your_gemini_api_key
```

---

### 4. Frontend setup

```bash
cd frontend
npm install
```

### 5. Run the project

You need **3 terminals**:

**Terminal 1 — ChromaDB:**
```bash
cd DocumentParser
chroma run --path ./chromadb-data
```

**Terminal 2 — Backend:**
```bash
cd DocumentParser/backend
npm run dev
```

**Terminal 3 — Frontend:**
```bash
cd DocumentParser/frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT token |
| GET | `/api/dashboard/info` | Yes | Get dashboard stats |
| POST | `/api/documents/upload` | Yes | Upload and process document |
| GET | `/api/documents/info` | Yes | Get all user documents |
| GET | `/api/document/:id/summarize` | Yes | Get or generate summary |
| GET | `/api/document/:id/pdf` | Yes | Get document file URL |
| POST | `/api/document/:id/chat` | Yes | Ask question about document |
| GET | `/api/document/:id/chat/history` | Yes | Get chat history |
| GET | `/api/user/details` | Yes | Get user profile |
| POST | `/api/user/resetpassword` | Yes | Change password |

---

## How the AI Pipeline Works

```
1. User uploads PDF
         ↓
2. Extract text (pdf-parse)
         ↓
3. Generate AI summary (Gemini 2.5 Flash)
         ↓
4. Split text into chunks (LangChain — 1000 chars, 300 overlap)
         ↓
5. Generate embeddings for each chunk (HuggingFace all-MiniLM-L6-v2)
         ↓
6. Store chunks + embeddings in ChromaDB
         ↓
7. Save metadata + summary in MongoDB
         ↓
──────── CHAT ────────
         ↓
8. User asks a question
         ↓
9. Embed the question (same HuggingFace model)
         ↓
10. Search ChromaDB → get top 5 relevant chunks
         ↓
11. Send chunks + question + chat history to Gemini
         ↓
12. Return answer to user
```

---

## Environment Variables

### Backend `.env`

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default 3000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET_KEY` | Secret key for signing JWT tokens |
| `JWT_EXPIRE` | Token expiry duration (e.g. `7d`) |
| `GEMINI_KEY` | Google Gemini API key |

---

## Features

- JWT authentication with protected routes
- PDF upload with multer — stored locally
- Automatic text extraction and chunking
- Vector embeddings stored in ChromaDB for semantic search
- AI summary generation with caching — regenerate on demand
- Persistent chat history per document stored in MongoDB
- Dashboard with document stats and recent activity
- Responsive UI with Ocean Depth color theme

---

##Results
<img width="1901" height="911" alt="Screenshot 2026-03-20 221859" src="https://github.com/user-attachments/assets/7bc85e5d-adca-495f-b987-8dfb58a061ec" />
<img width="1919" height="923" alt="Screenshot 2026-03-20 221837" src="https://github.com/user-attachments/assets/3f8b34a1-29c8-4969-aa2e-b5b3e26b2516" />
<img width="1899" height="921" alt="Screenshot 2026-03-20 221741" src="https://github.com/user-attachments/assets/3476ff9c-51ec-4675-850d-4ee6435a7f97" />



## Author

**Tanvi Pokale** 
