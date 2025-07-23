# 💡 Test Technique – Développeur Fullstack  
Smart Conseil – Book CRUD (Angular + Django)

Minimal fullstack application to manage books (title, author, year) using Angular, Django REST Framework and Docker Compose.

---

## 📸 Overview

- Minimalist Angular UI  
- Complete Django REST API (ModelViewSet)  
- One-command deployment via Docker Compose  

---

## 🚀 Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/kmaili/test_technique_smart_conseil.git
cd test_technique_smart_conseil
```

2. Build and start the containers:
```bash
docker-compose up --build
```

3. Access:
- Frontend: http://localhost  
- API: http://localhost:8000/api/books/

4. Stop all containers:
```bash
docker-compose down
```

---

## ⚙️ Project Structure

```
.
├── backend/                         # Django backend
│   ├── books/                       # CRUD app (models, views, serializers)
│   ├── book_api/                    # Django project configuration
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                        # Angular frontend
│   ├── src/app/
│   │   ├── core/services/           # API service (books.service.ts)
│   │   ├── features/books/
│   │   │   ├── pages/book-dashboard/ # Main CRUD dashboard
│   │   │   └── components/          # Reusable UI components (book-form, book-list)
│   ├── angular.json
│   ├── nginx.conf                   # Nginx configuration for serving Angular
│   └── Dockerfile
│
├── docker-compose.yml               
└── README.md
```

---

## ✨ Features

### 🧠 Backend (Django)
- RESTful API with Django REST Framework  
- CRUD endpoints: /api/books/  
- JSON responses

### 💻 Frontend (Angular)
- Angular 16+ standalone architecture  
- Full CRUD interface (create, read, update, delete)  
- minimalist UI  
- Routing + reusable form component

### 🐳 Dockerization
- Angular frontend built and served via Nginx  
- Django backend exposed on port 8000  
- Fully orchestrated via docker-compose  

---

## 📝 API Testing with curl

📚 Get all books:
```bash
curl http://localhost:8000/api/books/
```

➕ Add a new book:
```bash
curl -X POST http://localhost:8000/api/books/ \
     -H "Content-Type: application/json" \
     -d '{"title": "1984", "author": "George Orwell", "year": 1949}'
```

📝 Update a book (ID = 1):
```bash
curl -X PUT http://localhost:8000/api/books/1/ \
     -H "Content-Type: application/json" \
     -d '{"title": "Animal Farm", "author": "George Orwell", "year": 1945}'
```

🗑️ Delete a book (ID = 1):
```bash
curl -X DELETE http://localhost:8000/api/books/1/
```

---

## 📄 Environment Variables

Angular environment file: frontend/src/environments/environment.ts

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/'
};
```

---

## 👤 Author

- Name: Kmaili Aymen  
- Email: kmailiaymen10@gmail.com  
- GitHub: https://github.com/kmaili
