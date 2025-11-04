default:
    echo 'Hello, world!'


clear:
    git rm --cached -r .


push:
    git add .
    git commit -m "auto commit"
    git push origin main
