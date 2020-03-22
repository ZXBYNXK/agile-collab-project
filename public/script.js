const getAllGraduates = () => {
    const url = '/graduateRoutes';
    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
}
//CREATE NEW GRADUATE : POST
const createNewGraduate = () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const profession = document.getElementById("profession").value;
    const company = document.getElementById("company").value;
    const graduationDate = document.getElementById("graduationDate").value;
    const skills = document.getElementById("skills").value;
    const linkedIn = document.getElementById("linkedIn").value;
    const twitter = document.getElementById("twitter").value;
    const postUrl = `/graduateRoutes`;

    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: makeJSON({ firstName, lastName, email, profession, company, graduationDate, skills, linkedIn, twitter })
    }).then(response => {
        console.log(response)
        return response.json();
    }).then(newGraduate => {
        console.log(newGraduate);
        return newGraduate
    }).catch(err => console.log(err));
}

const getAllArticles = () => {
    const url = '/articleRoutes';
    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
}


const makeJSON = (newGraduate) => {
    return JSON.stringify(newGraduate);
}
try {
    const getTrendingNews = await fetch("http://newsapi.org/v2/top-headlines?country=us&apiKey=dd80dd8bf5ce4c67938429270d5b02bff")
    const parsedJson = await getTrendingNews.json()
    let amountText = document.getElementById("number-of-trending-articles") 
    let count = 0;
    let parent = document.getElementById("trending-articles-results")
    const displayData = parsedJson.articles.map(object => {
       const appended =  parent.appendChild(new Article(object.author || 'Anonymous', object.content || 'N/A' , object.description || 'N/A' , object.publishedAt || 'Anonymous' , object.source.name || 'Anonymous', object.title || 'No-title', object.url || '#', object.urlToImage || 'https://bit.ly/2Qi6yuZ'))
        if (appended) {
            ++count
        }
    })
    amountText.innerText = count + ''
} catch {
    console.log(" Error in 'showTrendingArticle()' ")
} 

