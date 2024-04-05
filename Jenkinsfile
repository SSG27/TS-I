pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from your repository
                git branch: 'main', url: 'https://github.com/SSG27/TS-I.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies using npm
                sh 'npm install'
            }
        }
        
        stage('Run npm run dev') {
            steps {
                // Run npm run dev command
                sh 'npm run dev'
            }
        }
    }
}
