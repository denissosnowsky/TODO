pipeline {
    agent {
        docker { image 'node:latest' }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            when {
                branch 'master'
                not {
                    changeRequest()
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}