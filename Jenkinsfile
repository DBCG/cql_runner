pipeline {
  agent any
    
  tools {nodejs "node10"}
    
  stages {

    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }  

    stage('Publish') {
        steps {
            withAWS(region:'us-west-2', credentials:'jasonevans') {
                s3Upload(bucket: "cql-runner.dataphoria.org", path: '', workingDir: 'dist/cql-runner', includePathPattern: '**/*')
            }
        }
    }
  }
}