RES=`git pull | wc -l`
if [ "$RES" -gt 1 ]
then
	grunt
	git commit -am"updated font"
	git push
	git checkout gh-pages
	git pull origin master
	git push origin gh-pages
	git checkout master
fi
