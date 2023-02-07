#/bin/bash -e -x

./node_modules/.bin/tsc -m umd -t ES6 --sourceMap --strict --pretty `find src -name "*.ts"`
./node_modules/.bin/tsc -m umd -t ES6 --sourceMap --strict --pretty `find test -name "*.ts"`

npm test
