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
                sh 'npm run build'
                sh 'npm test'
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
            post {
              success {
            slackSend channel: '#general',
                      color: 'good',
                      message: 'Build and test succeeded!'
            emailext body: 'The build and test succeeded.',
                     subject: 'Build and test succeeded',
                     to: 'isabokec@gmail.com'      
        }

               failure {
            slackSend channel: '#general',
                      color: 'danger',
                      message: 'Build and test failed!'
            emailext body: 'The build and test failed.',
                     subject: 'Build and test failed',
                     to: 'isabokec@gmail.com'
              }
          }
       }

