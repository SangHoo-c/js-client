const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement("ul");

window.addEventListener("hashchange", () => {
  const id = location.hash.substring(1);

  const newsContent = getData(CONTENT_URL.replace("@id", id));
  const title = document.createElement("h1");

  container.innerHTML = `
   <h1>${newsContent.title}{</h1>

   <div>
    <a href = "#"> 글 목록으로
    
    </a>
   </div>
  `;
  title.innerHTML = newsContent.title;

  content.appendChild(title);
  console.log(newsContent);
});

// 만들고 있는 구조를 한눈에 파악할 수 있는 방법
for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");

  div.innerHTML = `
  <li>
    <a href="#${newsFeed[i].id}"> 
    ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `;

  ul.appendChild(div.children[0]);
}

container.appendChild(ul);
container.appendChild(content);
