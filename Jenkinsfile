pipeline {

    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {

        stage('Clone repo') {
            steps {
                git branch: 'main', url: 'https://github.com/SSG27/TS-I.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('SonarQube analysis') {
            steps {
                script {
                    scannerHome = tool 'SonarQube'
                }
                withSonarQubeEnv('LeBron') {
                sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        
        stage('Jest') {
            steps{
                sh 'npm run test'
            }
        }

        // stage('Build') {
        //     steps {
        //         sh 'npm run dev'
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)' 
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }
    
        stage('Build'){
            steps {

                    sshagent (credentials: ['sg-pc']) {
                        sh 'ssh -o StrictHostKeyChecking=no ubuntu@51.20.41.219 "rm -rf TS-I && git clone https://github.com/SSG27/TS-I.git && cd TS-I && npm install && sudo npm run dev -- -p 80 -H 0.0.0.0"'
                    }

            }
        }
    }
}
