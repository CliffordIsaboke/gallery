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
            steps {
                httpRequest httpMode: 'POST', responseHandle: 'NONE', url: 'https://api.render.com/deploy/srv-cfp29rirrk0fd9r51pc0?key=2amkpe0LDQ8', wrapAsMultipart: false
                echo 'Deploy to Render was a success'
            }
        post {
            success {
                slackSend channel: '#general', color:'good',message: "The build  ${env.JOB_NAME} build ${env.BUILD_ID} was successful the site is live at https://gallery-isaboke.onrender.com"
                    emailext attachLog: true, 
                        body: """
                            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                            <p>View console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"</p> 
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
                        body: """
                            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                            <p>View console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"</p> 
                            <p><i>(Build log is attached.)</i></p>
                        """,
                        subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                        to: 'isabokec@gmail.com'
                }  
            }
        }
    }
}
