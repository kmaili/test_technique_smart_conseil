
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .


RUN python manage.py makemigrations && python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "book_api.wsgi:application", "--bind", "0.0.0.0:8000"]