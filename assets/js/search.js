const search = (() => {
  let searchInput;
  let posts;
  let results = [];
  let mainContent;

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    let searchTerms = searchValue.trim().split(' ');

    searchTerms.forEach((term, index, array) => {
      if (term.slice(-1) === 's') {
        array[index] = term.slice(0, -1);
      }
    })
    searchTerms = searchTerms.filter((term) => term.length > 2);

    if (searchTerms.length > 0) {
      results = posts.filter((post) => {
        return searchTerms.every((term) => post.content.includes(term));
      });
    } else {
      results = [];
    }

    displayResults();
  }

  const handleClear = () => {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = mainContent;
  }

  const displayResults = () => {
    const mainElement = document.querySelector('main');

    if (results.length > 0) {
      let searchHeading = document.createElement('h1');
      let resultList = document.createElement('div');

      searchHeading.appendChild(document.createTextNode('Search Results'));
      resultList.classList.add('stack', 'spacious');
      resultList.style.marginBottom = '1rem';

      results.forEach((result) => {
        let resultItem = document.createElement('div');
        let anchor = document.createElement('a');
        let postHeading = document.createElement('h2');
        let categoryHeading = document.createElement('h3');
        let content = document.createElement('p');

        resultItem.classList.add('stack');
        anchor.href = result.url;
        anchor.setAttribute('target', '_blank');
        anchor.appendChild(document.createTextNode(result.title));
        categoryHeading.appendChild(document.createTextNode(result.category));
        // categoryHeading.style.marginTop = '.75rem';
        content.appendChild(document.createTextNode(result.content.slice(0, 200) + '...'));

        postHeading.appendChild(anchor);
        resultItem.appendChild(postHeading);
        resultItem.appendChild(categoryHeading);
        resultItem.appendChild(content);
        resultList.appendChild(resultItem);
      })

      mainElement.innerHTML = '';
      mainElement.appendChild(searchHeading);
      mainElement.appendChild(resultList);
    } else {
      mainElement.innerHTML = mainContent;
    }
  }

  const init = async () => {
    searchInput = document.getElementById('search-input');
    mainContent = document.querySelector('main').innerHTML;

    searchInput.value = '';

    const response = await fetch('posts.json');
    posts = await response.json();
  }

  const setEvents = () => {
    searchInput.addEventListener('keyup', handleSearch);
    searchInput.addEventListener('search', handleClear);
  }

  return {
    init,
    setEvents
  };
})();

window.onload = (event) => {
  search.init();
  search.setEvents();
}
