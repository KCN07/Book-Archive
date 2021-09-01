document.getElementById('error-message').style.display = 'none';
document.getElementById('error-message1').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
    
}


const searchBook = () =>{
    const searchField = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-message1').style.display ='none';
    

    toggleSpinner('block');
    toggleSearchResult('none');

    if(searchField === ''){
        toggleSpinner('none');
        document.getElementById('error-message1').style.display ='block';
    }

    else{
        fetch(`http://openlibrary.org/search.json?q=${searchField}`)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(error => displayError(error))
    }
}

const displayError = error => {
    toggleSpinner('none');
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = data =>{
    const books = data.docs;
    const searchResult = document.getElementById('search-result');
    const res = document.getElementById('res');
    searchResult.textContent = '';
    const p = document.createElement('p');
    p.style.color = "rgb(107, 172, 9)";
    p.style.fontWeight = "bolder";
    p.style.fontSize = "x-large"
    p.innerText = `Total ${data.numFound} results found`;
    res.appendChild(p);

    
    //console.log(data);
    let cnt = 0;
    books.forEach(book => {
        cnt++;
       
        const div = document.createElement('div');
        
        div.classList.add('col');
        div.innerHTML = `
           <div  class="card h-100 p-5 cards" style = "background-color: rgb(107, 172, 9); ">
               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style = "border-radius: 4px; max-width: 100%; height: 200px; width: 175px; background-color: lightgray;" alt="No photo available">
               <div class="card-body ">
                   <h4 class="card-title"> ${book.title}</h4>
                   <h5 class="card-title">by ${book.author_name[0]}</h5>
                   <h6 class="card-title">Published by ${book.publisher[0]}</h6>
                   <p class="card-text">First Published In ${book.publish_year[0]}</p>
               </div>
           </div>
        
        `;

        searchResult.appendChild(div);
      if(cnt === 20){
          books.length = (cnt - 1);
      }
    })

    toggleSpinner('none');
    toggleSearchResult('block');
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-message1').style.display = 'none';
}