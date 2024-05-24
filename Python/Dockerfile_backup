# 베이스 이미지 설정
FROM python:3.9

# 작업 디렉토리 설정
WORKDIR /app

# 가상환경 생성 및 활성화
RUN python -m venv venv
RUN /bin/bash -c "source venv/bin/activate"

# 소스 코드 복사
COPY . .

# 의존성 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Django 서버 실행을 위한 디렉토리로 이동
WORKDIR /app/neurek

# Django 서버 실행
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
