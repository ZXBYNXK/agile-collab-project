# /views 
<!-- 
Changes made in this directory are written about in here
-->

<!--
This directory is used onlt for .pug files refering to the npm pug dependency.
This transalates code to the browser via the .render(pug-file, <optional-object-for-template>)
The reason for this is to write less code and also be able to pass in data from the database
as the second argument above, and when you do that you can dynamically change the values that are
being outputted to the frontend. And last thing you can write javascript in the pug file bu would haft to 
in the proper way. For more information see: https://pugjs.org/api/getting-started.html
-->

errors.pug renders the home route as the default page if no page is found.