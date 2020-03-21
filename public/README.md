# /public (Front-End)

<!-- 
When changes are made in this directory write about it in here. 
-->



<!-- 
This directory will contain all the static files that will be used only on the front-end/Browser.
The only type of files that should be in this directory are .css .js and .html files, also images if you want. 
This Directory links to the 'server.js' file you should see the code 'server.use(express.static("public"))'
and that is what causes the server to be able to access this directory and use the files within it in the browser 
-->
### File: 'index.html' 
<pre>
        <!-- Add about what this file will contain -->
        This html file will be sent to the browser when the client makes a request
    to the home route '/'.  This file will contain all the features that are needed
    for new users to get started, also existing users will navigate from this page.
</pre>
<br>

### File: 'script.js' 
<pre>
        This JavaScript file will be used for bringing the features to life in the 
    'index.html' file otherwise the client will not be able to interact with our application,
    though you can make a website entire website in HTML which is now of days uncommon. 
</pre>

### File: 'stlye.css'
<pre>
        This CSS file will be define all the styles that will be used throughout the entire
        web application. Will be included in the link tag in all if not most html files.
</pre>
