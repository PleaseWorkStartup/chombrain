cd ..

git remote add plannee-chombrain https://PleaseWorkStartup:Plannee25000@github.com/PleaseWorkStartup/plannee-chombrain
git remote add chombrain https://PleaseWorkStartup:Plannee25000@github.com/PleaseWorkStartup/chombrain

git subtree pull --prefix plannee-chombrain plannee-chombrain master --squash
git subtree pull --prefix plannee-chombrain/chombrain chombrain master --squash

read -p "Press Enter to Continue"