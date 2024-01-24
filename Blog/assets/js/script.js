const container = document.querySelector(".container");
const title_field = document.querySelector("#title-field");
const body_field = document.querySelector("#body-field");
const post_button = document.querySelector("#submit");


// Posts feed
let feed = {
    list: document.querySelector(".posts-feed"),
    addPost (titleText, bodyText) {
        let li = document.createElement("li");
        let fs = document.createElement("fieldset");
        let title = document.createElement("h3");
        let body = document.createElement("p");

        title.innerText = titleText;
        body.innerText = bodyText;
        title.classList.add("post-title");
        body.classList.add("post-body");

        fs.append(title);
        fs.append(body);
        li.append(fs);
        this.list.prepend(li);
    }
};


// Function that load when the page load, it prevent transition the the page is loading
(function () {
    document.getElementsByTagName("body")[0].classList.remove("no-transition");
    loadPosts();
})();


// Listener to update the characters counter
body_field.addEventListener("input", () => {
    document.querySelector("#character-counter").innerText = `${body_field.value.length}/500`;
});


// Post function
post_button.addEventListener("click", () => {
    let titleText = title_field.value;
    let bodyText = body_field.value;

    if (titleText !== "" && bodyText !== "") {
        feed.addPost(titleText, bodyText);
        fetch (
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleText,
                    body: bodyText
                })
            }
        );
    }
});


// Add posts with an API
async function loadPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (response.ok) {
        let payload = await response.json(); // Posts
        for (post of payload)
            feed.addPost(post.title, post.body);
    }
}
