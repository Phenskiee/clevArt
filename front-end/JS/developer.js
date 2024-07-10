function showDetails(member) {
    const overlay = document.getElementById('overlay');
    const overlayName = document.getElementById('overlay-name');
    const overlayDescription = document.getElementById('overlay-description');
    const overlayPhoto = document.querySelector('.overlay-photo');
    const overlayCv = document.getElementById('overlay-cv');
    const overlayFacebook = document.getElementById('overlay-facebook');
    const overlayTwitter = document.getElementById('overlay-twitter');
    const overlayInstagram = document.getElementById('overlay-instagram');
    const overlayEmail = document.getElementById('overlay-email');

    let memberDetails;

    switch (member) {
        case 'donnabel':
            memberDetails = {
                name: 'Dela Cruz, Donnabel C.',
                description: 'PLM I.T STUDENT',
                photo: '/front-end/images/donna.jpg',
                cv: '#',
                facebook: '#',
                twitter: '#',
                instagram: '#',
                email: '#'
            };
            break;
        case 'sophia':
            memberDetails = {
                name: 'Domingo, Sophia Kaye G.',
                description: 'PLM I.T STUDENT',
                photo: '/front-end/images/sophia.jpeg',
                cv: '#',
                facebook: '#',
                twitter: '#',
                instagram: '#',
                email: '#'
            };
            break;
        case 'clarissa':
            memberDetails = {
                name: 'Dominguez, Clarissa V.',
                description: 'PLM I.T STUDENT',
                photo: '/front-end/images/clarissa.jpg',
                cv: '#',
                facebook: '#',
                twitter: '#',
                instagram: '#',
                email: '#'
            };
            break;
        case 'stephen':
            memberDetails = {
                name: 'Espeño, Stephen E.',
                description: 'PLM I.T STUDENT',
                photo: '/front-end/images/formal.jpg',
                cv: '#',
                facebook: '#',
                twitter: '#',
                instagram: '#',
                email: '#'
            };
            break;
        case 'joseph':
            memberDetails = {
                name: 'Mandariaga, Joseph Andrei A.',
                description: 'PLM I.T STUDENT',
                photo: '/front-end/images/joseph.jpg',
                cv: '#',
                facebook: '#',
                twitter: '#',
                instagram: '#',
                email: '#'
            };
            break;
        case 'carlos':
            memberDetails = {
                name: 'Pablo, Carlos Miguel D.',
                description: 'PLM I.T STUDENT',
                photo: '/front-end/images/carlos.png',
                cv: '#',
                facebook: '#',
                twitter: '#',
                instagram: '#',
                email: '#'
            };
            break;
        default:
            break;
    }

    overlayName.textContent = memberDetails.name;
    overlayDescription.textContent = memberDetails.description;
    // overlayPhoto.innerHTML = `<img src="${memberDetails.photo}" alt="${memberDetails.name}">`;
    overlayPhoto.style.backgroundImage = `url(${memberDetails.photo})`;
    overlayCv.href = memberDetails.cv
    overlayFacebook.href = memberDetails.facebook;
    overlayTwitter.href = memberDetails.twitter;
    overlayInstagram.href = memberDetails.instagram;
    overlayEmail.href = memberDetails.email;

    overlay.style.display = 'flex';
}

function hideDetails() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}