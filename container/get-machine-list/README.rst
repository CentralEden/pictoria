
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 496334777267.dkr.ecr.ap-northeast-1.amazonaws.com

docker build -t get-machine-info .

docker tag get-machine-info:latest 496334777267.dkr.ecr.ap-northeast-1.amazonaws.com/get-machine-info:latest

docker push 496334777267.dkr.ecr.ap-northeast-1.amazonaws.com/get-machine-info:latest
