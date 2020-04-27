var $channelBody = document.querySelector('.rss-channel-body');
var $emailForm = document.querySelector('#email');
var $newsForm = document.querySelector('#news');
var $rssTitle = document.querySelector('#title');

function showItems(title, html, showEmail) {
    $rssTitle.textContent = title;
    $channelBody.innerHTML = html;
    $emailForm.style.display = showEmail ? '' : 'none';
}

firebase.initializeApp({
    apiKey: "AIzaSyAPI67JtTvItDYUIAXgh7J72CoSBmRRFW4",
    authDomain: "rrsmo-10a0a.firebaseapp.com",
    databaseURL: "https://rrsmo-10a0a.firebaseio.com",
    projectId: "rrsmo-10a0a",
});

var sendEmail = firebase.functions().httpsCallable('sendEmail');
var fetchRss = firebase.functions().httpsCallable('rss');

$newsForm.addEventListener('submit', ev => {
    ev.preventDefault();

    showItems('Wczytywanie', '');
    getRssFeed($newsForm['url'].value, getRssHTML)
        .then(rss => showItems(rss.title, rss.html, true))
        .catch(er => showItems('Błąd', er));
    return false;
});

$emailForm.addEventListener('submit', ev => {
    ev.preventDefault();
    getRssFeed($newsForm['url'].value, getRssEmailHTML)
        .then(rss => sendEmail({
            to: $emailForm['email'].value,
            subject: rss.title,
            html: rss.html
        }));
    return false;
});