function getRssFeed(url, htmlType) {
    return fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(response => response.text())
        .then(parseXML)
        .then(htmlType);
}

function parseXML(text) {
    return new DOMParser().parseFromString(text, "text/xml");
}

function getRssHTML(xml) {
    return domReadyRss(xml, itemTemplate);
}

function getRssEmailHTML(xml) {
    return domReadyRss(xml, itemEmailTemplate);
}

function domReadyRss(xml, template) {
    var html = [...xml.querySelectorAll("item")]
        .map(destructItemData)
        .map(template)
        .reduce((a, b) => a + b, '');

    return {
        title: xml.querySelector("title") && xml.querySelector("title").textContent,
        html: html
    };
}

function destructItemData(item) {
    return {
        description: item.querySelector("description") && item.querySelector('description').textContent,
        title: item.querySelector('title') && item.querySelector('title').textContent,
        link: item.querySelector('link') && item.querySelector('link').textContent
    };
}

function itemEmailTemplate({
    title,
    description,
    link
}) {
    return `
    <div style="min-height: 256px">
        <h3>${ title }</h3>
        <p>${ description }</p>     
        <div>
            <a href="${link}">OTWÓRZ</a>
        </div>
    </div>`;
}

function itemTemplate({
    title,
    description,
    link
}) {
    return `
    <article>
        <h3>${ title }</h3>
        <p>${ description }</p>
        <a href="${link}">OTWÓRZ</a>
    </article>`;
}