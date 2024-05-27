# README.md

# **📰** **NEúrēka** 🗞️

## 주식 투자자의 관심사를 중심으로 개인화, 맞춤화된 증권 뉴스를 제공하는 플랫폼

빅데이터 알고리즘을 기반으로 한 증권테마 뉴스 추천 서비스입니다.

프로젝트 이름인 **NEúrēka** 는 News와 Eúrēka의 합성어로 본 프로젝트의 놀랍고 간편한 증권뉴스 추천기능을 표현하기 위해 선정하였습니다.

- SSAFY 특화 빅데이터 추천 프로젝트
- 10기 광주 C105 벚꽃엔딩팀

## 1. 프로젝트 개요

#### 기간 : 2024.02.18 ~ 2024.04.05 (6주)

#### 팀원

김유산(팀장) : BackEnd

윤주찬(팀원) : FrontEnd

이기영(팀원) : Big Data

이승현(팀원) : FrontEnd

조수훈(팀원) : FrontEnd

최시원(팀원) : BackEnd, CI/CD



## 2. 주요 기능 소개

- **증권 뉴스 추천** : 사용자가 선택한 관심 키워드를  기반으로 최근 발행된 증권 뉴스를 확인할 수 있습니다.
- **사용자 맞춤 추천** : 뉴스 열람 시간, 뉴스 평점 등의 요소를 기반으로 사용자 전용 맞춤 뉴스를 추천받을 수 있습니다.
- **기업정보 열람** : 상장 기업의 현재 시세 및 기업 관련 뉴스를 실시간으로 확인할 수 있습니다.
- **경제 용어사전 제공** : 기사를 읽다 생소한 경제용어를 만나면, 이를 즉시 경제 용어사전에 검색해볼 수 있습니다.
- **기업뉴스 메일링** : 관심기업으로 설정해둔 기업의 뉴스를 한 줄로 요약하여 매일 아침 메일로 받아볼 수 있습니다.
- **음성지원, 튜토리얼** : 기사 본문을 사람의 목소리로 읽어드립니다. 또한 친절한 튜토리얼이 저희 서비스를 어떻게 이용하면 좋을지를 알려줍니다

## 3. 주요 기능 시연

### 메인
![메인](./exec/img/메인.gif)

### 기사전체
![기사전체](./exec/img/기사전체.gif)

### 기사상세
![기사상세](./exec/img/기사상세.gif)

### 기업
![기업](./exec/img/기업.gif)

### 튜토리얼
![튜토리얼](./exec/img/튜토리얼.gif)

### 사전
![사전](./exec/img/사전.gif)

### tts
![tts](./exec/img/tts.gif)

### 메일링
![메일링](./exec/img/메일링.gif)


## 4. 기술 스택 및 개발환경

### **💻 IDE**

- Intellij
- Visual Studio Code
- Pycharm

### **🔧** BackEnd

- Spring Boot `3.2.3`
- Spring Data JPA
- Spring Security
- JWT `0.12.3`
- OAuth2

### **🎨** FrontEnd

- Node.js  `20.11.1`
- npm `10.2.4`
- vite `5.1.4`
- type-script `5.2.2`
- React `18.2.0`
- Jotai `2.7.1`
- react-query `3.39.3`

### Big DATA

- Python `3.9.13`
- Django `4.1.13`
- tensorflow `2.16.1`
- torch `2.2.1`

### 🗑 Database

- MongoDB `5.0.26 atlas`
- MySQL `8.3.0`
- Redis `3.2.1`

### **🚀** Server

- AWS EC2

### ⌛ CI/CD

- Docker `25.0.4`
- Jenkins  `2.449`
- Nginx `1.18.0 (Ubuntu)`
- SSL

### 기타

- Bareun ai

### **🤝** 협업

- GitLab
- Jira
- Notion
- Mattermost

## 5. Project Structure

- 시스템 구조도
    
    ![system_architect](./exec/img/system_architect.png)
    
- 사용 기술
    - Backend
        
        ![Backend](./exec/img/Backend.PNG)
        
    - FrontEnd
        
        ![Frontend](./exec/img/Frontend.PNG)
        
    - Python
        
        ![Python_](./exec/img/Python_.PNG)
        
    - Deployment
        
        ![Deployment](./exec/img/Deployment.PNG)
        

- 사용 알고리즘 및 API
    - MMR(Maximal Marginal Relevance)
        - 키워드추출 및 형태소 분석
            1. 코사인 유사도를 통한 문서와 키워드간의 유사도 계산
            2. 키워드 상호간의 유사도 계산
            3. 유사도가 가장 높은 키워드 추출
    - LDA(Latent Dirichlet Allocation)
        - 토픽 모델링 : 초기화 → 반복학습 → 수렴
            1. 문서의 주제 분포 - 문서에 어떤 주제가 얼마나(%로 표현) 포함되어 있는지
            2. 주제의 단어 분포 - 주제가 특정 단어를 포함할 확률
    - K-means
        - 비지도 학습(Unsepervised Learnig) 기반 클러스터링
            1. 군집의 개수 K개 설정
            2. 초기 중심점(Centroid) 설정
            3. 데이터를 군집에 할당(배정)
            4. 중심점 재설정(갱신)
            5. 데이터를 군집에 재할당(배정)
            6. 4, 5를 중심점 위치가 더 이상 변하지 않을 때까지 반복
    - 컨텐츠 기반 필터링
        - 사용자가 선택한 뉴스기사의 **토픽, 키워드, 평점** 을 Parameter로 삼아 컨텐츠 기반 필터링을 진행
    - 한국어 형태소 분석
        - Bareun AI
    - 감성분석
        - KLUE RoBERTa 모델 사용( 출처 : Hugging Face )
    - 기사 요약
        - 기사요약 모델 사용 ( 출처 : Hugging Face )
        - SMTP 프로토콜을 이용하여 사용자의 이메일로 전송
    - TTS(Text-To-Speech)
        - speechSynthesis 사용

## 6. 산출물
### MySQL ERD

![mysql_erd](./exec/img/mysql_erd.png)

### MongoDB ERD

[NEureka_mongoDB](https://www.erdcloud.com/d/hvAGNzPFk9sCjAHSr)

![mongoDB](./exec/img/mongoDB.png)

### 기능명세서

- Backend API 명세서
    - [API](https://www.notion.so/API-86749c326a474fc3b5e665dfe837839d?pvs=21)
- Python API 명세서
    - [퐈이쒄](https://www.notion.so/6427e45a5a314c27bf9ebbc683ddcd1b?pvs=21)

### 화면정의서(Figma)

[Figma](https://www.figma.com/file/DxvjAecvfTV3Grwp22PsQ4/C105?type=design&node-id=0-1&mode=design&t=w9oVHpApvBNlCB6Q-0)


### 포팅 메뉴얼

[포팅메뉴얼](https://www.notion.so/f278439cbb3d49d689069be6314a2e28?pvs=21)
