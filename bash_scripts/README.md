# /bash_scripts
<pre>
        This will only work if you have MongoDB Community Edition Installed (Mongo DB local) 

        The 'set-dev-env' file only contains shell scripts to set the enviroment for only testing and development to only a LOCAL mongoose database. 
    But the file can also be changed to set to the cloud just change the value of the database connection string. But dont push that version to
    the master, id advise actually saving any shell scripts you want to run outside of the applicaton and in another directory on your computer
    then run the script the same way 'source PUT-FILE-PATH-HERE'
</pre>
### How to set enviroment 
<pre>
    Coommand: source bash_scripts/set-dev-env

    Note: This command will set the enviroment for the CURRENT SHELL that you are in. So if you go to another application
        you are working on and try to run your server the enviroment WILL STILL BE the same. So I advise working on applications on seperate
        terminals or just running the script for that application & overwrite the Enviroment Variables before running the server 
</pre>
