pipeline {
    agent any

    tool "node"

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