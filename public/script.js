const getAllGraduates = () => {
  const url = "/graduateRoutes/all";
  const parent = document.getElementById("results");
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // DR: Selecting the div element that will show the results 'parent'.
      if (!parent.children.length > 0) {
        const displayGraduates = data.reverse().map(object => {
          console.log(1, object);
          // This will append a new element to the parent parent which gets the element (index.html: <div id="results"></div>)
          // See the 'GraduateElement' class below if confused on how this work.
          parent.appendChild(
            new GraduateElement(
              object.firstName,
              object.lastName,
              object.profession,
              object.company,
              object.graduationDate
            )
          );
        });
      } else {
        // This prevents the parent from appending the same informantion all over again. But rather hide it then show it.
        if (parent.style.display === "none") parent.style.display = "inline";
        else parent.style.display = "none";
      }
    })
    .catch(err => console.log(err));
};

//  CREATE NEW GRADUATE : POST
async function createNewGraduate() {
  event.preventDefault();
  const graduateName = document.getElementById("graduateName").value;
  const email = document.getElementById("email").value;
  const profession = document.getElementById("profession").value;
  const company = document.getElementById("company").value;
  const graduationDate = document.getElementById("graduationDate").value;
  const skills = document.getElementById("skills").value;
  const linkedIn = document.getElementById("linkedIn").value;
  const twitter = document.getElementById("twitter").value;
  const postUrl = `/graduateRoutes/post`;

  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: makeJSON({
      firstName,
      lastName,
      email,
      profession,
      company,
      graduationDate,
      skills,
      linkedIn,
      twitter
    })
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(newGraduate => {
      console.log(newGraduate);
      return newGraduate;
    })
    .catch(err => console.log(err));
}

// CX: GET SPECIFIC GRADUATE
function getSpecificGraduate() {
  event.preventDefault();

  const searchName = document.getElementById("searchName").value;

  const url2 = `/graduateRoutes/search/${searchName}`;

  fetch(url2)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const display = data.map(object => {
        if (!object.message) {
          document.getElementById("displayGraduate").innerHTML += `<div> 

            <h3>${object.firstName} ${object.lastName}</h3> 
            <ul>
            <li> Email: ${object.email} </li>
            <li> Profession: ${object.profession}</li>
            <li> Comapny: ${object.company}</li>
            <li> Graduation Date: ${object.graduationDate}</li>
            <li> Skills: ${object.skills}</li>
            <li> LinkedIn: ${object.linkedIn} </li>
            <li> Twitter: ${object.twitter} </li>
            
            </ul>

        </div> `;
        } else {
          document.getElementById("displayGraduate").innerHTML += `<div>
                <p>${object.message}</p>
            </div>
        
            `;
        }
      });

      // .catch(err => console.log(err));
    });
}
// delete a graduate
async function deleteGraduate() {
  event.preventDefault();
  const graduateID = document.getElementById("graduateId").value;
  const deleteUrl = `/graduateRoutes/delete/${graduateID}`;

  fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(deletedGraduate => {
      console.log(deletedGraduate);
      return deletedGraduate;
    })
    .catch(err => console.log(err));
}

const getAllArticles = () => {
  const url = "/articleRoutes";
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
};

const makeJSON = newGraduate => {
  return JSON.stringify(newGraduate);
};

// CX API NEWS

// const api = 'http://newsapi.org/v2/everything?q=';
// const apiKey = "6e400e8253b34851bd569d65c5d2ea91";
// const url = api + searchArticle + 'sortBy=popularity&' + apiKey;
// const url = api + 'sortBy=popularity&apiKey=' + apiKey;

(async function showTrendingArticles() {
    const date = new Date()
    const todaysDate = date.toISOString().slice(0, 10)
    console.log(todaysDate)
    try {
        const getTrendingNews = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=6017031fdb37416997959671d521b753`)
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
  })()
//GS: Here is where I added the news API
// Not done correctly @Georgina
// const getApiArticles = async () => {
// try {
//     const getTrendingNews = await fetch("http://newsapi.org/v2/top-headlines?country=us&apiKey=dd80dd8bf5ce4c67938429270d5b02bff")
//     const parsedJson = await getTrendingNews.json()
//     // let amountText = document.getElementById("number-of-trending-articles")
//     let count = 0;
//     // let parent = document.getElementById("trending-articles-results")
//     const displayData = parsedJson.articles.map(object => {
//         console.log(object)
//         // if (appended) {
//         //     ++count
//         // }
//     })
//     // amountText.innerText = count + ''
// } catch {
//     console.log(" Error in 'showTrendingArticle()' ")
// }
// }

// getApiArticles()

// DR: Adding a class which will be used to construct a HTML element based on each object in an array which is returned from
//  the function 'getAllGraduates'
//  Notice I am only including wsome feilds to keep it breif and if a user wants more information on a graduate then i can link them
//  to their page which will have the rest of the information.
class GraduateElement {
  constructor(firstName, lastName, profession, company, graduationDate) {
    // Will use a 'div' ELement to contain all this information and 'div' is used very often becuase it can contain things in a box like structure.
    // 'document.createElement' creates any html element by only its tag name not the '<' or '/>' added to it. Good for creating elements on the fly.
    let main = document.createElement("div");
    let nameElement = document.createElement("a");
    let professionElement = document.createElement("span");
    let companyElement = document.createElement("span");
    let graduationDateElement = document.createElement("span");

    nameElement.innerText = ` ${firstName} ${lastName} \n`;
    professionElement.innerText = `Profession: ${profession} \n`;
    companyElement.innerText = `Employer: ${company} \n`;
    graduationDateElement.innerText = `Date of graduation${graduationDate} \n`;

    main.style = "padding: 20px";
    nameElement.style = "font-weight: bold; text-decoration: none;";
    nameElement.setAttribute("href", "#"); // The '#' will be changed to a link to another page that displays a graduate. For now it is a link that navigates no where.

    main.appendChild(nameElement);
    main.appendChild(professionElement);
    main.appendChild(companyElement);
    main.appendChild(graduationDateElement);

    return main;
  }
}
class Article {
    constructor(urlOrAuthor, content, description, date, nameOfNewsCompany, title, url, url2Image) {
        let containerForArticle = document.createElement("div")
        let articleTitle = document.createElement("a")
        let articleContent = document.createElement("p")
        let articleDescription = document.createElement("p")
        let articleDate = document.createElement("p");
        let articleNameOfNewsCompany = document.createElement("a")
        let urlImage = document.createElement("img")
        let articleAuthor = document.createElement("p")
        containerForArticle.style = 'display: flex; flex-direction: column;  justify-content: space-evenly;  margin: 12px; padding: 8px; text-align: center;'
        articleTitle.style = 'text-decoration: underline; font-size: 20px; font-weight: bold;'
        articleDate.style = 'font-weight: bold;'
        articleNameOfNewsCompany.style = 'font-style: italic;'
        articleTitle.innerText = title 
        // articleContent.innerText = `${content.slice(0, content.indexOf('.'))} ...`
        articleDate.innerText = new Date(date);
        articleDescription.innerText = description
        articleNameOfNewsCompany.innerText = nameOfNewsCompany;
  
  
        articleAuthor.innerText = `Author: ${urlOrAuthor}`;
        const dotAllowed = ['.com', '.org', '.net', '.gov', '.edu', '.co.uk']
        const check = dotAllowed.some(str => {  return nameOfNewsCompany.includes(str) })
        if(check) {
            articleNameOfNewsCompany.setAttribute("href", nameOfNewsCompany + "")
        }
        articleTitle.setAttribute("href", url)
        urlImage.setAttribute("src", url2Image)
        urlImage.style = ' width: 50vw; margin: 0 auto;'
        containerForArticle.appendChild(urlImage)
        containerForArticle.appendChild(articleTitle)
        containerForArticle.appendChild(articleDate)
        // containerForArticle.appendChild(articleContent)
        containerForArticle.appendChild(articleDescription)
        containerForArticle.appendChild(articleAuthor)
        containerForArticle.appendChild(articleNameOfNewsCompany)
        
        return containerForArticle;
    }
  }
  
// console.log(1, location.href)
