const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

formDOM.addEventListener("submit", function (e) {
  e.preventDefault();
  //   now lets grab the inputDom value
  const value = inputDOM.value;
  // console.log(value);
  //eğer boşsa yanlış yazısı çıkarmak lazım
  //value'yu fetch yapıp eşleştireceğiz api data ile
  if (!value) {
    //   eğer value falsy ise
    resultsDOM.innerHTML = `<div class="error">please enter valid search term</div> `;
    // eğer return koymazsan javascript kodu okumaya devam eder returnü koymayı  unutma
    return;
  }
  fetcPages(value);
});

// #### Fetch Pages

// - display loading while fetching
// - construct dynamic url
// - display if error
// - display error no items
// - create renderResults()
// - pass valid results into renderResults()

const fetcPages = async (searchValue) => {
  //   console.log(searchValue); // şimdi bir şey inputa yazdığında bunu fetchPages'e geçiyor.
  resultsDOM.innerHTML = `<div class="loading"></div> `; //css de loading spinner var
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    // console.log(data); bunu yazınca giant object çıkıyor query içinde searchü alacağız  işte bu listeyi render resultsa geçeceğiz
    const results = data.query.search;
    // booş arama için if
    if (results.length < 1) {
      resultsDOM.innerHTML = `<div class="error">no matched results please try again</div> `;
      return;
    }

    renderResults(results); //results'ı render'a  geçtik.
  } catch (error) {
    resultsDOM.innerHTML = `<div class="error">there was an error...</div> `;
  }
};

// #### Render Results

// - iterate over the list
// - pull out title, snippet, pageid
// - setup a card
// - set results with div.articles and list inside

const renderResults = (list) => {
  //console.log(list);
  const cardList = list
    .map((item) => {
      //console.log(item); consola apple yaz tüm apple itemslar çıkıyor bunun içinde lazım olanlar title,snippet,pageid
      const { title, snippet, pageid } = item;
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4> 
            <p>
              ${snippet}
            </p>  
          </a> `; // wiki urls içindeki url yi kullanıyor pageid için
    })
    .join("");
  resultsDOM.innerHTML = `
  <div class="articles">
           ${cardList}
        </div>`;
};
