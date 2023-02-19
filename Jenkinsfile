pipeline {
    agent any
    tools {
        nodejs "NodeJS-14"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/CliffordIsaboke/gallery.git'
            }
        }
        stage('Build & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('slack message'){
           steps{
               slackSend color: 'good', message: 'Pipeline executed Successfully'
           }
        }
        stage('Deploy') {
            steps {
                sh 'ssh user@server "cd /path/to/app && git pull && npm install && pm2 restart app"'
            }
        }
    }

    post {
        always {
            emailext subject: "Pipeline Completed - ${currentBuild.fullDisplayName}",
                body: "Please find the attached pipeline script.",
                to: "isabokec@gmail.com",
                attachmentsPattern: "Jenkinsfile"
        }
    }
}