
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
                bat '"C:/Users/bhumi/AppData/Local/Programs/Python/Python313/python.exe" -m pip install selenium'
            }
        }

        stage('Run Selenium Test') {
            steps {
                bat '"C:/Users/bhumi/AppData/Local/Programs/Python/Python313/python.exe" selenium_tests\\test_login.py'
            }
        }
    }
}
