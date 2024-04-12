pipeline {

    agent any

    tools {
        nodejs "NodeJS"
    }
    
    stages {

        stage('Clone repo') {
            steps {
                // clone the repository
                git branch: 'main', url: 'https://github.com/SSG27/TS-I.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies using npm
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

        stage('Run npm run dev') {
            steps {
                // Run 'npm run dev'
                sh 'npm run dev'
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
