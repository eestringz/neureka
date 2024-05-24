pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS = 'dockerhub'
    }

    stages {
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // 각 프로젝트 폴더에서 Docker 이미지를 빌드하고 Docker Hub에 푸시
                    buildAndPushImage('Frontend', DOCKER_CREDENTIALS)
                    buildAndPushImage('Backend', DOCKER_CREDENTIALS)
                    buildAndPushImage('Python', DOCKER_CREDENTIALS)
                }
            }
        }
        
        stage('Deploy with Docker') {
            steps {
                script {
                    // 0. 컨테이너 뭐 돌아가는지좀 봐야겠다
                    sh 'docker ps -a'

                    // 1. 기존 작동중인 컨테이너 삭제 및 중지
                    sh 'docker stop Frontend Backend Python || true' // 기존 컨테이너 중지
                    sh 'docker rm Frontend Backend Python || true'   // 기존 컨테이너 삭제

                    // 2. 기존 이미지를 Docker Hub에서 최신 버전으로 갱신
                    sh 'docker pull csw1511/neureka-frontend:latest'
                    sh 'docker pull csw1511/neureka-backend:latest'
                    sh 'docker pull csw1511/neureka-python:latest'

                    // 3. 새로 갱신된 이미지를 기반으로 컨테이너 실행
                    sh 'docker run -d --name Frontend -p 5174:5174 csw1511/neureka-frontend:latest'
                    sh 'docker run -d --name Backend -p 8080:8080 csw1511/neureka-backend:latest'
                    sh 'docker run -d --name Python -p 8000:8000 csw1511/neureka-python:latest'
                }
            }
        }

    }
}

def buildAndPushImage(projectName, credentials) {
    // 프로젝트 폴더로 이동하여 Docker 이미지 빌드 및 푸시
    def lowercaseProjectName = projectName.toLowerCase()
    dir("${projectName}") {
        // Docker 이미지 빌드
        sh "docker build -t csw1511/neureka-${lowercaseProjectName}:latest ."
        sh "echo ${projectName} ${lowercaseProjectName}"

        // Docker Hub에 이미지 푸시
        withCredentials([usernamePassword(credentialsId: credentials, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
            sh "docker push csw1511/neureka-${lowercaseProjectName}:latest"
        }
    }
}