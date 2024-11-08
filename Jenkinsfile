pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-node-api'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'my-docker-resgitry', passwordVariable: 'dckr_pat_6mBdvyf-cfpj7LDnjCeufTDH2w8', usernameVariable: 'ruparani24')]) {
                        // Login to Docker registry using explicit credentials
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD} https://index.docker.io"
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm config set unsafe-perm true'
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io', DOCKER_CREDENTIALS) {
                        docker.image(DOCKER_IMAGE).push('latest')
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.run 'Deploying Docker container...'
                    // Deployment commands here
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
