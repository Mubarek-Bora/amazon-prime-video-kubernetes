pipeline {
    agent any

    tools {
        jdk 'jdk'
        nodejs 'node17'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/Mubarek-Bora/amazon-prime-video-kubernetes.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=amazon-prime-video \
                        -Dsonar.projectKey=amazon-prime-video
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs . > trivyfs.txt'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh 'docker build -t amazon-prime-video .'
                        sh 'docker tag amazon-prime-video mubarekbora/amazon-prime-video:latest'
                        sh 'docker push mubarekbora/amazon-prime-video:latest'
                    }
                }
            }
        }

        stage('Docker Scout Image Analysis') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh 'docker-scout quickview mubarekbora/amazon-prime-video:latest'
                        sh 'docker-scout cves mubarekbora/amazon-prime-video:latest'
                        sh 'docker-scout recommendations mubarekbora/amazon-prime-video:latest'
                    }
                }
            }
        }

        stage('Trivy Docker Image Scan') {
            steps {
                sh 'trivy image mubarekbora/amazon-prime-video:latest > trivyimage.txt'
            }
        }

        stage('App Deploy to Docker Container') {
            steps {
                sh 'docker run -d --name amazon-prime-video -p 3000:3000 mubarekbora/amazon-prime-video:latest'
            }
        }
    }

    post {
        always {
            script {
                def buildStatus = currentBuild.currentResult
                def buildUser = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')[0]?.userId ?: 'GitHub User'

                emailext(
                    subject: "Pipeline ${buildStatus}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        <p>This is a Jenkins amazon-prime-video CICD pipeline status.</p>
                        <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                        <p><strong>Build Status:</strong> ${buildStatus}</p>
                        <p><strong>Started by:</strong> ${buildUser}</p>
                        <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    """,
                    to: 'maol2ga@gmail.com',
                    from: 'maol2ga@gmail.com',
                    replyTo: 'maol2ga@gmail.com',
                    mimeType: 'text/html',
                    attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
                )
            }
        }
    }
}

