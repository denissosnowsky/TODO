pipeline {
    agent any

    nodejs: "node"

    stages {
        stage('Build') {
            steps {
              bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
}