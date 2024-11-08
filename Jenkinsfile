pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'ruparani24'  // Docker username
        DOCKER_PASSWORD = 'Vini_2406'  // Docker password
        DOCKER_REGISTRY = 'my-docker-resgitry'  // Docker registry ID
    }

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub with provided credentials
                    withCredentials([usernamePassword(credentialsId: 'my-docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo Logging into Docker Hub...
                            docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t \$DOCKER_REGISTRY/my-image ."
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run tests if needed
                    echo "Running tests..."
                    // e.g., sh 'docker run my-image test-command'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push Docker image to registry
                    echo "Pushing image to Docker registry..."
                    sh "docker push \$DOCKER_REGISTRY/my-image"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the image
                    echo "Deploying the Docker image..."
                    // e.g., sh 'docker run -d \$DOCKER_REGISTRY/my-image'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
