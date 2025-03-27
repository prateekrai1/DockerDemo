FROM python:3.7-slim

WORKDIR /app

COPY demo.py requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "demo.py"]