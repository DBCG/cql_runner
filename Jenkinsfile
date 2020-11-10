pipeline {
  agent any
    
  tools {nodejs "node11"}
    
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
                s3Upload(bucket: "cql-runner.dataphoria.org", path: 'dist', workingDir: 'dist', includePathPattern: '**/*')
            }
        }
    }
  }
}