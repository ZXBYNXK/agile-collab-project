# routes/middleware

### defaultRedirect.js
```javascript
    // Redirect to home if no routes understand the URI sent during the request.
    module.exports = (req, res, next) => {
        res.redirect('/')
        next()
    }
```    
