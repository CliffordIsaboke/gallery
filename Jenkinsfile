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
            emailext attachLog: true, 
            body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'isabokec@gmail.com'
        }

            failure {
            slackSend channel: '#general',
                      color: 'danger',
                      message: 'Build and test failed!'
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'isabokec@gmail.com'
    
          }  
       }
   }
 
