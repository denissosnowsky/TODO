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
                sshagent(['github-ds-ssh']) {
                    git remote set-url origin git@github.com:denissosnowsky/TODO.git
                    sh 'npm run deploy'
                }
            }
        }
    }
}