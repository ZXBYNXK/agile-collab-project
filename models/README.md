# /models 

<!-- When changes are made in this directory write about it in here. -->
1. Created Article.js (3/10/20)
    - Created schema & added the following fields: 'graduateName', 'profession', 'message'.
    ```javascript    
    const articleSchema = new mongoose.Schema({
        graduateName: {
            type: String,
            required: true
        },
        profession: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    })
    ```
    <br>  
2. Created Graduate.js (3/14/20) - Update 
    - (previous) Created schema & added the following fields: 'firstName', 'lastName', 'profession', 'email'.
    - (update) Added new fields: 'company', 'graduationDate', 'skills', 'linkedin', 'twittrer'
```javascript
const graduateSchema = new mongoose.Schema({
    firstName: {
      type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profession:{
        type: String,
        default: 'N/A'
    },
    company: {
        type: String,
        default: 'N/A' 
    },
    graduationDate: {
        type: String,
        default: "undergraduate"
    },
    skills: {    
        type: String,
        maxlength: 1000,
        default: 'N/A'
    },
    linkedin: {
        type: String,
        maxlength: 9000
    },
    twitter: { 
        type: String,
        maxlength: 9000
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 9000
    }
});

```

