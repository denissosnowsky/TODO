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

        stage('ESlint') {
            steps {
                sh 'npm run lint'
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
                sh 'git config --global user.name denissosnowsky'
                sh 'git config --global user.email denissosnowsky@gmail.com'
                sh 'git config --global user.name'
                sh 'git config --global user.email'
                sh 'git config user.name'
                sh 'git config user.email'
                sh 'npm run deploy'
            }
        }
    }
}