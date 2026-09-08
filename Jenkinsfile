pipeline {
  agent {
    docker {
      image 'node:22-bookworm'
      args '-e CI=true'
    }
  }

  options {
    timestamps()
    timeout(time: 15, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Expo compatibility') {
      steps {
        sh 'npx expo install --check'
        sh 'npx expo-doctor@latest'
      }
    }

    stage('TypeScript') {
      steps {
        sh 'npm run typecheck'
      }
    }

    stage('Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Bundle smoke test') {
      steps {
        sh 'npm run bundle'
      }
    }
  }

  post {
    success {
      echo 'PocketFlow quality gates passed.'
    }
    failure {
      echo 'PocketFlow quality gates failed. Review the stage logs above.'
    }
  }
}
