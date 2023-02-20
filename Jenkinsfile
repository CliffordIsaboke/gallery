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
                sh 'npm run build
                sh 'npm test'
            }
        }
        stage('slack message'){
           steps{
               slackSend color: 'good', message: 'Pipeline executed Successfully https://gallery-isaboke.onrender.com'
           }
        }
           stage('Deploy to Render') {
            environment {
                RENDER_EMAIL = credentials('render-email')
                RENDER_PASSWORD = credentials('render-password')
                 }
            steps {
                sh 'render login --email $RENDER_EMAIL --password $RENDER_PASSWORD'
                sh 'render up --detach'
            }
        }
    }

