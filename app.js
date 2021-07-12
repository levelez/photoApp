(() => {

    let currentPage = 1;

    const fetchPhotos = (page) => {
        fetch(`https://api.unsplash.com/search/photos?query=trees&page=${page}`, {
            headers: new Headers({
                'Authorization': 'Client-ID WMhXKUmKbQzXomSmb_q3SlbmQpMeH91Oifee7bQUFTA'
            }),
        })
        .then(response => response.json())
        .then(data => {  
            renderList(data);
        });     
    }

    const renderList = (data) => {     
        let ul = document.querySelector('ul');    
        ul.innerHTML = data.results.map(item => {
            let desc = item.alt_description;
            return (
                `<li class="thumb-container">
                    <div>
                        <img 
                            class="thumb" 
                            src=${item.urls.small}
                            data-url-reg=${item.urls.regular}
                            data-desc="${desc}"
                        ></img>
                    </div>
                </li>`
            )    
        }).join(''); 

        document.querySelector('ul').addEventListener('click', (e) => {
            if(e.target.classList.contains('thumb')) {
                let data = {
                    regUrl: e.target.getAttribute('data-url-reg'),
                    desc: e.target.getAttribute('data-desc'),   
                }
                createModal(data);
            }     
        });

        document.querySelector('.pagination').classList.add('visible')
    }

    const pagination = () => {
        const prevButton = document.getElementById('buttonPrev');
        const nextButton = document.getElementById('buttonNext');

        selectedPage();
        clickPage();

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                changePage(currentPage);
            }
        });

        nextButton.addEventListener('click', () => {
            if(currentPage < 5) {
                currentPage++;
                changePage(currentPage);
            }   
        }); 
    }

    const changePage = (page) => {
        let prev = document.getElementById('buttonPrev');
        let next = document.getElementById('buttonNext');

        if (page <= 1) {
            page = 1;
            prev.classList.remove('active');
            next.classList.add('active');        
        } 
        
        if (page >= 5) {
            page = 5;
            prev.classList.add('active');
            next.classList.remove('active');
        }  
        fetchPhotos(page);
        selectedPage();
    }

    const selectedPage = () => {
        let pageNumber = document.getElementById('pageNumber').getElementsByClassName('clickPageNumber'); 
        for (let i = 0; i < pageNumber.length; i++) {
            if (i == currentPage - 1) {
                pageNumber[i].classList.add('active');
            } 
            else {
                pageNumber[i].classList.remove('active');
            }
        }   
    } 

    const clickPage = () => {
        document.addEventListener('click', function(e) {
            if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                changePage(currentPage);
            }
        });
    }   
    
    const createModal = (data) => {  
        closeModal();
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const desc = data.desc.charAt(0).toUpperCase() + data.desc.slice(1);
        
        modal.innerHTML = 
            `<div class="modal-content">
                <div class="header"><button class="close">X</close></div>
                <h2>${desc}</h2>
                <img src=${data.regUrl} />      
            </div>
            `;   
        document.body.append(modal);   

        document.querySelector('.modal').addEventListener('click', (e) => {
            if(e.target.classList.contains('close')) {
                closeModal();
            }     
        }); 
    }

    const closeModal = () => {
        let modal = document.body.querySelector('.modal');
        if(modal) {
            modal.parentNode.removeChild(modal);
        }
        
    }
    
    const init = () => {
        fetchPhotos(1)
        pagination();
    }

    init();
})();



