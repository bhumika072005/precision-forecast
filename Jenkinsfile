pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Getting Precision Forecast project'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'python -m pip install selenium'
            }
        }

        stage('Run Selenium Test') {
            steps {
                bat 'python selenium_tests\\test_login.py'
            }
        }
    }
}