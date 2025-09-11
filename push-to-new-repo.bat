@echo off
echo Changing remote repository...
git remote set-url origin https://github.com/Ojogbe/rabni.git
echo.
echo Verifying remote change...
git remote -v
echo.
echo Pushing to new repository...
git push -u origin main --force
echo.
echo Done! Your code has been pushed to the new repository.
pause
