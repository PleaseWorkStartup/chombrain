CD /D %~dp0

cd ..

git remote add plannee-chombrain https://github.com/PleaseWorkStartup/plannee-chombrain
git remote add chombrain https://github.com/PleaseWorkStartup/chombrain

git subtree pull --prefix plannee-chombrain plannee-chombrain master --squash
git subtree pull --prefix plannee-chombrain/chombrain chombrain master --squash

pause