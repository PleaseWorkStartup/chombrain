CD /D %~dp0

cd ..

git remote add chombrain https://github.com/PleaseWorkStartup/chombrain

git subtree pull --prefix chombrain chombrain master --squash

del package.json
mklink package.json chombrain\package.json

del tsconfig.json
mklink tsconfig.json chombrain\tsconfig.json

pause