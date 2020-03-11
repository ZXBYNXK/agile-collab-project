const getAllGraduates = () => {
    const url = '/graduateRoutes';
    fetch(url)
    .then(response => {
        return response.json();
    }).then (data => {
        console.log(data);
    }).catch (err => console.log(err));
}

const getAllArticles = () => {
    const url = '/articleRoutes';
    fetch(url)
    .then(response => {
        return response.json();
    }).then (data => {
        console.log(data);
    }).catch (err => console.log(err));
}