pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-node-api'  // Set your image name here
        DOCKER_CREDENTIALS = 'my-docker-registry'  // Replace with your actual Docker credentials ID
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                checkout scm
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker registry using the credentials stored in Jenkins
                    docker.withRegistry('https://index.docker.io', DOCKER_CREDENTIALS) {
                        docker run 'Logged in to Docker Hub'
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests inside the Docker container with fixed permissions
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm config set unsafe-perm true'  // Set unsafe-perm to true to avoid permissions issues
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to the Docker Hub registry
                    docker.withRegistry('https://index.docker.io', DOCKER_CREDENTIALS) {
                        docker.image(DOCKER_IMAGE).push('latest')
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy the Docker container (example: to a staging environment)
                    docker.run 'Deploying Docker container...'
                    // Deployment commands here (Docker, Kubernetes, etc.)
                }
            }
        }
    }
    post {
        success {
            docker.run 'Pipeline succeeded!'
        }
        failure {
            docker.run 'Pipeline failed!'
        }
    }
}