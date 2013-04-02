cd `dirname $0`
find ./../ -name ".git" | xargs rm -Rf
find ./../ -name ".DS_Store" | xargs rm -Rf
find ./../ -name ".sass-cache" | xargs rm -Rf