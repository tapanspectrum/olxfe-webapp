pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        // Define Angular environment if needed
        BUILD_DIR = 'dist/tap-admin/browser'   // Adjust according to your angular.json outputPath
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://gitlab.com/tapanacharjee/food-waste-app-fe.git',
                    credentialsId: 'jenkin-gitlab-latest-username-password'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm cache clean --force'
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Angular App') {
            steps {
                echo 'Building Angular app for production...'
                // Builds production bundle
                sh 'npm run build -- --configuration production'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Angular app...'
                // Example 1: Copy build to Nginx or Apache web directory
                sh '''
                    echo "Copying build files to web root..."
                    sudo rm -rf /var/www/html/*
                    sudo cp -r ${BUILD_DIR}/* /var/www/html/
                    echo "Deployment completed successfully."
                '''

                // Example 2: (Optional) Use PM2 for serving Angular
                // sh '''
                //     pm2 stop angular-frontend || true
                //     pm2 serve ${BUILD_DIR} 8080 --name angular-frontend --spa
                //     pm2 save
                // '''
            }
        }

        stage('Post-Deployment') {
            steps {
                echo 'Running post-deployment cleanup or notifications...'
                // Add Slack/email notifications here if required
            }
        }
    }

    post {
        success {
            echo '✅ Angular deployment succeeded!'
        }
        failure {
            echo '❌ Angular deployment failed.'
        }
    }
}
