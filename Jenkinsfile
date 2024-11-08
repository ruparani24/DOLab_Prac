pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-node-api'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests inside the Docker container
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy the Docker container (example: to a staging environment)
                    echo 'Deploying Docker container...'
                    // Deployment commands here (Docker, Kubernetes, etc.)
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

