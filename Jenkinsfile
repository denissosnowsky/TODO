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
                sh 'npx eslint --ext .jsx,.js lib/'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            environment {
                ACCESS_TOKEN = credentials('github-PAT')
            }
            when {
                branch 'master'
                not {
                    changeRequest()
                }
            }
            steps {
                sh 'git config --global user.name denissosnowsky'
                sh 'git config --global user.email denissosnowsky@gmail.com'
                sh 'git remote set-url origin https://denissosnowsky:$ACCESS_TOKEN@github.com/denissosnowsky/TODO'
                sh 'npm run deploy'
            }
        }
    }
}