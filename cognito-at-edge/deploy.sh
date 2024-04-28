#!/bin/bash

# .env ファイルから環境変数を読み込む
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Cognitoの設定値
REGION=$REGION
USER_POOL_ID=$USER_POOL_ID
APP_CLIENT_ID=$APP_CLIENT_ID
DOMAIN=$DOMAIN
# Lambdaの設定値
FUNCTION_NAME=$FUNCTION_NAME
LAMBDA_REGION=$LAMBDA_REGION 

# スクリプトの存在するディレクトリに移動
cd "$(dirname "$0")"

# テンプレートファイルを読み込み、パラメータを置換して新しいファイルを生成
sed -e "s/{{REGION}}/$REGION/" \
    -e "s/{{USER_POOL_ID}}/$USER_POOL_ID/" \
    -e "s/{{APP_CLIENT_ID}}/$APP_CLIENT_ID/" \
    -e "s/{{DOMAIN}}/$DOMAIN/" \
    index.template.js > temp_index.js

# esbuildを使用してJavaScriptファイルをバンドルし、圧縮
esbuild temp_index.js --platform=node --target=node20 --format=cjs --bundle --minify --external:@aws-sdk --external:@smithy --external:uuid --outfile=index.js

# 中間ファイルを削除
rm temp_index.js

echo "Lambdaに必要なファイルをzipファイルに圧縮します。"
zip -r function.zip index.js

echo "zipファイルをLambdaにアップロードします。"
aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://function.zip --region $LAMBDA_REGION

# 作成したzipファイルを削除
echo "作成したzipファイルを削除します。"
rm function.zip index.js

echo "デプロイが完了しました。"
