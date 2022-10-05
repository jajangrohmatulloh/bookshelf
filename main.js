const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const bookSubmit = document.getElementById("bookSubmit");

const searchBookTitle = document.getElementById("searchBookTitle");
const searchSubmit = document.getElementById("searchSubmit");

const incompleteBooks = document.getElementById("incompleteBookshelfList");
const completeBooks = document.getElementById("completeBookshelfList");

let localData = JSON.parse(localStorage.getItem("data")) || [];

const readed = (filter = false) => {
    let readedLists = localData
        .filter(
            (data) =>
                data.isComplete == true &&
                data.title
                    .toLowerCase()
                    .includes(filter ? searchBookTitle.value.toLowerCase() : "")
        )
        .map((data) => {
            return `
      <article class="book_item">
        <h3>${data.title}</h3>
        <p>Penulis: ${data.author}</p>
        <p>Tahun: ${data.year}</p>

        <div class="action">
          <button class="green" data-id="${data.id}">Belum selesai dibaca</button>
          <button class="red" data-id="${data.id}">Hapus buku</button>
        </div>
      </article>
    </div>
    `;
        });
    completeBooks.innerHTML = readedLists.join("");
};

const unread = (filter = false) => {
    let unreadedLists = localData
        .filter(
            (data) =>
                data.isComplete == false &&
                data.title
                    .toLowerCase()
                    .includes(filter ? searchBookTitle.value.toLowerCase() : "")
        )
        .map((data) => {
            return `
      <article class="book_item">
        <h3>${data.title}</h3>
        <p>Penulis: ${data.author}</p>
        <p>Tahun: ${data.year}</p>

        <div class="action">
          <button class="green" data-id="${data.id}">Selesai dibaca</button>
          <button class="red" data-id="${data.id}">Hapus buku</button>
        </div>
      </article>
    </div>
    `;
        });
    incompleteBooks.innerHTML = unreadedLists.join("");
};

const bookAction = (e) => {
    if (e.target.className == "red") {
        for (let i of localData) {
            if (i.id == e.target.dataset.id) {
                localData.splice(i, 1);
            }
        }
    } else if (e.target.className == "green") {
        for (let i of localData) {
            if (i.id == e.target.dataset.id) {
                i.isComplete = i.isComplete ? false : true;
            }
        }
    }
    localStorage.setItem("data", JSON.stringify(localData));
    localData = JSON.parse(localStorage.getItem("data"));
    readed();
    unread();
};

unread();
readed();

bookSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    localData.push({
        id: new Date().getTime(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: inputBookYear.value,
        isComplete: inputBookIsComplete.checked,
    });

    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;

    localStorage.setItem("data", JSON.stringify(localData));
    localData = JSON.parse(localStorage.getItem("data"));

    unread();
    readed();
});

searchSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    unread(true);
    readed(true);
});

completeBooks.addEventListener("click", function (e) {
    bookAction(e);
});

incompleteBooks.addEventListener("click", function (e) {
    bookAction(e);
});
